import Frame from '../../components/Frame'
import { IUser } from '../../types'
import SignupForm from './SignupForm'

const Signup = ({signup}: {signup: (values: IUser) => void}) => {
  return (
    <Frame bgColor='bg-green-400' title='Signup'>
        <SignupForm signup={signup} />
    </Frame>
  )
}

export default Signup