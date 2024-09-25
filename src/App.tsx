import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'
import Api from './api'
import useLocalStorage from './components/hooks/useLocalStorage'
import Home from './components/Home'
import Login from './features/Auth/Login'
import Tasks from './features/task/Tasks'
import Projects from './features/project/Projects'
import UserProfile from './features/User/UserProfile'
import Signup from './features/Auth/Signup'
import LoginForm from './features/Auth/LoginForm'
import { InvalidTokenError, jwtDecode, JwtPayload } from 'jwt-decode'
import { IUser } from './types'
import ProjectDetails from './features/project/ProjectDetails'
import UserContext from './components/contexts/userContext'
import alertContext from './components/contexts/alertContext'
import TaskDetails from './features/task/TaskDetails'
import Footer from './components/Footer'
import UnauthorizedAccess from './components/UnauthorizedAccess'
import ProtectedRoutes from './components/ProtectedRoutes'
import Alert from './components/Alert'

function App() {

  // contains username & id
  const [ currUserToken, setCurrUserToken ] = useLocalStorage("currUserToken"); 
  const [ currUser, setCurrUser ] = useState({} as IUser);

  const [ alertOn, setAlertOn ] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  
  // Get current user info when currUserToken changes
  useEffect(() => {
    const getCurrUser = async (userToken: string) => {

      try{
        interface customJwtPayload extends JwtPayload {
          user: IUser;
          id: number;
        }
        
        const user = jwtDecode<customJwtPayload>(userToken);
        
        const userInfo = await Api.getUser(user.id);
        
        setCurrUser(userInfo.user);
        
      } catch(err: unknown){
        if(err instanceof InvalidTokenError){
        if(currUserToken) console.error("Warning:", (err || err[0]));
        }
      }
    }
    
    getCurrUser(currUserToken as string);
  }, [currUserToken]);

  // get projects
  
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try{
      await Api.login(username, password).then(user => {
        setCurrUserToken(user.token);
      })
      setAlertMessage(`Welcome back, ${username}!`);
      setAlertOn(true);
      
      navigate("/");
    }catch (err: any){
      // console.error(err[0] || err);
      setAlertMessage("Invalid username or password. Please try again.");
      setAlertOn(true);

      navigate("/login");
    }
  }

  // Logout user, also resets currUserToken, currUser, and currProjectId
  const logout = () => {
    setCurrUserToken(null);
    setCurrUser({} as IUser);
    setAlertMessage("You have been logged out.");
    setAlertOn(true);
    
    navigate("/login");
  }

  const newUserSetup = async ({userId, username}: {userId: number, username: string}) => {
    const newProject = await Api.createUserProject(userId as number, {name: `${username}'s first project`, note: "This is my first project"});
    const project = newProject.clockifyProject;
    await Api.createTask(project.id, {userId: userId, data: {name: `${username}'s first task`}});
  }
  
  const signup = async (values: IUser) => {
    try{
      const token = await Api.register(values);
      console.log("token in signup", token);
      const user = jwtDecode<IUser>(token!);
      await newUserSetup({userId: user.id!, username: user.username});

      setAlertMessage(`Thanks for joining, ${user.username}!`);
      setAlertOn(true);
      
      setCurrUserToken(token);
      navigate("/");
    }catch(err: any){
      console.error(err[0] || err);
    }
  }

  return (
    <>
    <UserContext.Provider value={currUser}>
      
      <alertContext.Provider value={{setAlertMessage, setAlertOn}}>
        <NavBar currUserToken={currUserToken as string} logout={logout} />
        {alertOn &&
          <Alert close={() => setAlertOn(false)}>
            {alertMessage}
          </Alert>
        }
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login><LoginForm login={login} /></Login>} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          <Route path="/unauthorized" element={<UnauthorizedAccess />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </alertContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default App
