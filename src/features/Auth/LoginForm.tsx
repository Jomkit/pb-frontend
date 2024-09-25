
import * as Yup from 'yup';
import DynamicForm from '../../components/DynamicForm';

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
})

const LoginForm = ({login}: {login: (username: string, password: string) => void}) => {

  const handleSubmit = async (values: {username: string, password: string}, resetForm: Function) => {
    try{
      await login(values.username, values.password);

    }catch(err: any){
      console.log(err[0] || err);
      
      alert(err[0] || err);
      resetForm();
    }
  }

  return (
    <DynamicForm initialValues={{ username: '', password: '' }} schema={loginSchema} handleSubmit={handleSubmit} />
  )
}

export default LoginForm