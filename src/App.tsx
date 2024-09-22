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
import NewProjectForm from './features/project/NewProjectForm'
import UserContext from './components/contexts/userContext'
import NewTaskForm from './features/task/NewTaskForm'
import TaskDetails from './features/task/TaskDetails'
import Footer from './components/Footer'
import UnauthorizedAccess from './components/UnauthorizedAccess'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const [ currProjectId, setCurrProjectId ] = useLocalStorage("currProjectId");
  const [currTaskId, setCurrTaskId] = useLocalStorage("currTaskId");

  // contains username & id
  const [ currUserToken, setCurrUserToken ] = useLocalStorage("currUserToken"); 
  const [ currUser, setCurrUser ] = useState({} as IUser);
  
  
  // Get current user info when currUserToken changes
  useEffect(() => {
    const getCurrUser = async (userToken: string) => {

      try{
        const user:any = jwtDecode<JwtPayload & {user: IUser}>(userToken);
        
        const userInfo = await Api.getUser(user.id);
        
        setCurrUser(userInfo.user as any);
        console.log("currProjectId", currProjectId);
        console.log("currTaskId", currTaskId);
        
      } catch(err: any){
        if(err instanceof InvalidTokenError){
        console.error("Warning:", (err || err[0]));
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
      alert("Logging in...");
      
      navigate("/");
    }catch (err: any){
      alert(err[0] || err);

      navigate("/login");
    }
  }

  // Logout user, also resets currUserToken, currUser, and currProjectId
  const logout = () => {
    setCurrUserToken(null);
    setCurrProjectId(null);
    setCurrTaskId(null);
    localStorage.removeItem("currTaskId");
    localStorage.removeItem("currProjectId");
    setCurrUser({} as IUser);
    
    alert("Logged out...");
    navigate("/login");
  }

  const newUserSetup = async ({userId, username}: {userId: number, username: string}) => {
    const result = await Api.createUserProject(userId as number, {name: `${username}'s first project`, note: "This is my first project"});
    const project = result.clockifyProject;
    const task = await Api.createTask(project.id, {userId: userId, data: {name: `${username}'s first task`}});
    setCurrProjectId(project.id);
    setCurrTaskId(task.id);
  }
  
  const signup = async (values: IUser) => {
    try{
      const token = await Api.register(values);
      console.log("token in signup", token);
      const user = jwtDecode<IUser>(token);
      await newUserSetup({userId: user.id!, username: user.username});
      alert("Signing up...");
      setCurrUserToken(token);
      navigate("/");
    }catch(err: any){
      alert(err[0] || err);
    }
  }

  return (
    <>
    <UserContext.Provider value={currUser}>
      
      <NavBar currUserToken={currUserToken as string} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login><LoginForm login={login} /></Login>} />
        <Route path="/signup" element={<Signup signup={signup} />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
          <Route path="/tasks/new" element={<NewTaskForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<NewProjectForm />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedAccess />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer />
    </UserContext.Provider>
    </>
  )
}

export default App
