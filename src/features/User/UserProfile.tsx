import { useContext } from 'react'
import Frame from '../../components/Frame'
import userContext from '../../components/contexts/userContext'
import SurveyReport from '../survey/SurveyReport';
import Statistics from './Statistics';

const UserProfile = () => {
  const user = useContext(userContext);
  console.log(user);
  
  return (
    <Frame bgColor='bg-green-400' title='User Profile'>
      <div className='w-full lg:w-2/3 m-auto p-4 h-fit bg-white rounded-lg'>

        <div className='w-full lg:w-2/3 m-auto p-4 simple-border'>
          <h2 className='text-bold'>{user.username}</h2>
          <div className='text-start'>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email Address : {user.email}</p>
            
          </div>
        </div>

        {user.id && <SurveyReport userId={user.id!} />}

        <Statistics userId={user.id!} />
      </div>
    </Frame>
  )
}

export default UserProfile