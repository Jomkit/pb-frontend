import { Link } from 'react-router-dom'
import Frame from './Frame'

const UnauthorizedAccess = () => {
  return (
    <Frame title="Unauthorized Access" bgColor='bg-gray-400'>
        <h1>You do not have access to this page</h1>
        <h2>Please <Link to="/login" className='text-blue-500 underline'>Login</Link> or <Link to="/signup" className='text-blue-500 underline'>Signup</Link></h2>
    </Frame>
  )
}

export default UnauthorizedAccess