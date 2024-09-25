import { IProject, ITask } from '../../types'
import Task from './Task'
import AddBtn from '../../components/AddBtn'
import { useState } from 'react';
import NewTaskForm from './NewTaskForm';
import Popup from '../../components/Popup';
import Card from '../../components/Card';

const TaskList = ({loading, projects, tasks}: {loading: boolean, projects: IProject[], tasks: ITask[]}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  
  const addTask = () => {
    console.log("Add task");
    setPopupOpen(true);
  }
  
  const close = () => {
    setPopupOpen(false);
  }
  
  return loading ? <p>Loading...</p> : (
    <div className='w-3/4 m-auto'>
        <AddBtn handleClick={addTask} btnName="Task"/>
        {popupOpen && (
          <Popup close={close}>
            <NewTaskForm projects={projects} closePopup={close} />
          </Popup>
        )}
        {
          tasks.length === 0 ? 
          <Card>
            <h2>No Tasks</h2>
            <p>Get started by creating a new task.</p>
          </Card>
          :
          tasks.map((task: ITask) => (
            <Task key={task.id} task={task} projectName={projects.find((project: IProject) => project.id === task.projectId)!.name}/>
          ))
        }
    </div>
  )
}

export default TaskList