import { IProject, ITask } from "../../types"
import { useContext, useEffect, useState } from "react"
import Api from "../../api"
import Task from "./Task"
import CustomDropdown from "../../components/CustomDropdown"
import AddBtn from "../../components/AddBtn"
import Popup from "../../components/Popup"
import NewTaskForm from "./NewTaskForm"
import userContext from "../../components/contexts/userContext"
import Card from "../../components/Card"
import { useNavigate } from "react-router-dom"

const TaskSelectable = () => {
   const navigate = useNavigate();
   const user = useContext(userContext);
   const [currTaskId, setCurrTaskId] = useState<string>();

  const [tasks, setTasks] = useState([] as ITask[]);
  const [projects, setProjects] = useState([] as IProject[]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get all of a user's projects and then get all tasks of those projects
    const getAllTasks = async () => {
      if(!user.id) return;
      const fetchedProjects = await Api.getUserProjects(user.id!);
      if(fetchedProjects.length === 0){
        console.log("no projects");
        alert("Please create a project first");
        navigate("/projects");
        return;
      }
      const taskPromises = fetchedProjects.map( (project: IProject) => {
        return Api.findProjectTasks(project.id!);
      });
      if(taskPromises.length === 0){
        setIsLoading(false);
        return;
      }

      const loadedTasks = await Promise.all(taskPromises).then((values) => {
        return values.flat(Infinity);
      })

      setTasks(loadedTasks);
      setProjects(fetchedProjects);
      setIsLoading(false);
    }
    getAllTasks();
    
  }, [user]);

  const handleClick = (task: ITask) => {
    setCurrTaskId(task.id);
  }
  
  const addTask = () => {
    setPopupOpen(true);
    // navigate("/tasks/new");
  }

  const close = () => {
    setPopupOpen(false);
  }

  return (
    <>
      <h2 className="pb-6">Let's get to work!</h2>
      {isLoading ? <p>Loading...</p> : 
      <>
        <CustomDropdown label="tasks" items={tasks} handleClick={handleClick} />
        {popupOpen && (
          <Popup close={close}>
            <NewTaskForm closePopup={close} projects={projects} />
          </Popup>
        )}
        <div className="w-full lg:w-3/4 m-auto">
          <AddBtn handleClick={addTask} btnName="Task"/>
          {tasks.length === 0 ? 
          <Card title="No tasks">Get started by creating a new task.</Card>
          
          : 
            (currTaskId ? 
            <Task 
              projectName={projects.filter((project: IProject) => project.id === tasks.filter((task: ITask) => task.id === currTaskId)[0].projectId)[0].name}   
              task={tasks.filter((task: ITask) => task.id === currTaskId)[0]} 
            />
            :
            <Task 
              projectName={projects.filter((project: IProject) => project.id === tasks[0].projectId)[0].name}
              task={tasks[0]} 
            />
            )
          
          }
        </div>
      </>
      }
        
    </>
  )
}

export default TaskSelectable
 