import * as Yup from 'yup';
import DynamicForm from '../../components/DynamicForm';
import userContext from '../../components/contexts/userContext';
import { useContext } from 'react';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';

const newProjectSchema = Yup.object().shape({
    name: Yup.string().required(),
    note: Yup.string().notRequired(),
})

const NewProjectForm = () => {
    const currUser = useContext(userContext);
    const navigate = useNavigate();
    
    const initialProjectValues = {
        name: '',
        note: '',
    }

    
    const handleSubmit = async (values: {name: string, note: string}) => {
        try{
            await Api.createUserProject(currUser.id!, values);
            navigate(0);
        }catch(err: any){
            console.error("Error detected in NewProjectForm:", (err[0] || err));
            alert("Name already exists in app, please try another name");
            navigate(0);
        }
    }
    
  return (
    <div className='m-8'>
        <h2>Create New Project</h2>
        <DynamicForm initialValues={initialProjectValues} schema={newProjectSchema} handleSubmit={handleSubmit} />
    </div>
  )
}

export default NewProjectForm