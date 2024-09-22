import * as Yup from 'yup';
import DynamicForm from '../../components/DynamicForm';
import userContext from '../../components/contexts/userContext';
import { useContext } from 'react';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';

const newTaskSchema = Yup.object().shape({
    name: Yup.string().required(),
})

const NewTaskForm = () => {
    const navigate = useNavigate();
    const initialTaskValues = {
        name: '',
    }


    // need to fix issue of sending curr user id,
    const currUser = useContext(userContext);
    const currProjectId = localStorage.getItem("currProjectId");
    
    const handleSubmit = async (values: {name: string}) => {
        try{
            await Api.createTask(currProjectId as string, {userId: currUser.id, data: {...values}});
            navigate(0);         

        }catch(err: any){
            console.error("Error detected in NewTaskForm:", (err[0] || err));
            alert("Name already exists in app, please try another name");
            navigate(0);
        }
    }
    
  return (
    <div className='m-8'>
        <h2>Create New Task</h2>
        <DynamicForm initialValues={initialTaskValues} schema={newTaskSchema} handleSubmit={handleSubmit} />
    </div>
  )
}

export default NewTaskForm