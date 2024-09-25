import { useLocation, useNavigate } from 'react-router-dom';
import Frame from '../../components/Frame';
import Card from '../../components/Card';
import Timer from '../timer/Timer';
import { ITask } from '../../types';
import Api from '../../api';
import { useContext, useState } from 'react';
import alertContext from '../../components/contexts/alertContext';

const TaskDetails = () => {
  const {setAlertMessage, setAlertOn} = useContext(alertContext);
  const { state }: {state: ITask} = useLocation();
  const navigate = useNavigate();
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(false);

  const handleDelete = async () => {
    setDeleteBtnDisabled(true);
    const deletedTaskMessage = await Api.deleteTask(state.projectId as string, state.id as string);
    setAlertMessage(deletedTaskMessage);
    setAlertOn(true);

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