import * as Yup from 'yup';
import { IUser } from '../../types';
import DynamicForm from '../../components/DynamicForm';

const signupSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(6).required(),
    firstName: Yup.string().notRequired(),
    lastName: Yup.string().notRequired(),
    email: Yup.string().email().notRequired()
})

const SignupForm = ({signup}: {signup: (values: IUser) => void}) => {
    const initialUserValues: IUser = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const handleSubmit = async (values: IUser) => {
        await signup(values);
    }   
    
  return (
    <DynamicForm initialValues={initialUserValues} schema={signupSchema} handleSubmit={handleSubmit} />
  )
}

export default SignupForm