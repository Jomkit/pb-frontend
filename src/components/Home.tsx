import Frame from './Frame'
import TaskSelectable from '../features/task/TaskSelectable'
import Timer from '../features/timer/Timer';
import Card from './Card';
import { Link } from 'react-router-dom';
import userContext from './contexts/userContext';
import { useContext } from 'react';

const Home = () => {
  const user = useContext(userContext);

  return (
    <Frame bgColor="bg-cyan-500" title="Productivity Buddy">
      { user.id ? <TaskSelectable /> : 
        <>
        <Card title="Welcome!">
          <div>
            <p>Productivity Buddy is a timer app for students and people who want to get work done</p>
            <p>To access the main features, please <Link to="/login" className='text-blue-500 underline'>login</Link> or <Link to="/signup" className='text-blue-500 underline'>signup</Link></p>
            <p>Or, start focusing now with a timer!</p>
          </div>

        </Card>
          <Timer />
          <p>*Note, data will not be recorded without logging in</p>
        </>
      }
    </Frame>
  )
}

export default Home