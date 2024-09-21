import { useLocation, useNavigate } from 'react-router-dom';
import Frame from '../../components/Frame';
import Card from '../../components/Card';
import Timer from '../timer/Timer';
import { ITask } from '../../types';
import Api from '../../api';
import { useState } from 'react';

const TaskDetails = () => {
  // const projectId = localStorage.get("currProjectId");
  const { state }: {state: ITask} = useLocation();
  const navigate = useNavigate();
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false);

  const handleDelete = async () => {
    setDeleteBtnDisabled(true);
    const deletedTask = await Api.deleteTask(state.projectId as string, state.id as string);

    console.log(deletedTask);
    alert(deletedTask);
    navigate("/tasks");
  }

  return (
    <Frame bgColor="bg-orange-400" title="Task Details">
      <Card title={state.name}> 
        <div>
          <button className='btn font-bold bg-red-400' onClick={handleDelete} disabled={deleteBtnDisabled}>Delete</button>
        </div>
          <div className='m-2'>
            <Timer projectId={state.projectId as string} task={state} />
          </div>
      </Card>
    </Frame>
  )
}

export default TaskDetails