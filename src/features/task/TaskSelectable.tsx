import { ITask } from "../../types"
import { useContext, useEffect, useState } from "react"
import Api from "../../api"
import Task from "./Task"
import useLocalStorage from "../../components/hooks/useLocalStorage"
import CustomDropdown from "../../components/CustomDropdown"
import AddBtn from "../../components/AddBtn"
import Popup from "../../components/Popup"
import NewTaskForm from "./NewTaskForm"
import userContext from "../../components/contexts/userContext"

const TaskSelectable
 = () => {

  const user = useContext(userContext);
  const [tasks, setTasks] = useState([] as ITask[]);
  const [currTaskId, setCurrTaskId] = useLocalStorage("currTaskId", "undefined");
  const [currProjectId, setCurrProjectId] = useLocalStorage("currProjectId", "undefined");
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get all of a user's projects and then get all tasks of those projects
    const getAllTasks = async () => {
      if(!user.id) return;
      const projects = await Api.getUserProjects(user.id!);
      const taskPromises = projects.map( (project: any) => {
        return Api.findProjectTasks(project.id);
      });
      if(taskPromises.length === 0){
        console.log("no tasks");
        return;
      }

      const loadedTasks = await Promise.all(taskPromises).then((values) => {
        return values.flat(Infinity);
      })
      
      if(currProjectId == "undefined") setCurrProjectId(projects[0].id);
      if(currTaskId == "undefined") setCurrTaskId(loadedTasks[0].id);
      setTasks(loadedTasks);
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
            <NewTaskForm />
          </Popup>
        )}
        <div className="w-full lg:w-3/4 m-auto">
          <AddBtn handleClick={addTask} btnName="Task"/>
          {currTaskId !== "undefined" ? 
          <Task task={tasks.filter((task: ITask) => task.id === currTaskId)[0]} />
          :
          <Task task={tasks[0]} />
          }
        </div>
      </>
      }
        
    </>
  )
}

export default TaskSelectable
 