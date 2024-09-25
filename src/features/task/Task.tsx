import { Link } from 'react-router-dom';
import Card from '../../components/Card'
import { ITask } from '../../types';
import Timer from '../timer/Timer';

const Task = ({task, projectName}: {task: ITask, projectName?: string}) => {
  const { projectId, name } = task;
  
  return (
    <Card title={name} subtitle={`Project: ${projectName ? projectName : "Unassigned"}`}>
    <Link to={`/tasks/${task.id}`} state={task}>
    <p className='btn bg-blue-500 text-white'>Click for more info</p>
    </Link>
      <div className='m-2'>
        <Timer projectId={projectId!} task={task} />
      </div>
    </Card>
  )
}

export default Task