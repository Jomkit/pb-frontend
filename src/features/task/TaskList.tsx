import { ITask } from '../../types'
import Task from './Task'
import AddBtn from '../../components/AddBtn'
import { useState } from 'react';
import NewTaskForm from './NewTaskForm';
import Popup from '../../components/Popup';
import Card from '../../components/Card';

const TaskList = ({loading, tasks}: {loading: boolean, tasks: ITask[]}) => {
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
            <NewTaskForm />
          </Popup>
        )}
        {
          tasks.length === 0 ? 
          <Card>
            <h2>No Tasks</h2>
            <p>Get started by creating a new task.</p>
          </Card>
          :
          tasks.map((task: any) => (
            <Task key={task.id} task={task}/>
          ))
        }
    </div>
  )
}

export default TaskList