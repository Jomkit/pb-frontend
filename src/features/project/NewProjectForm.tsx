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
    const initialProjectValues = {
        name: '',
        note: '',
    }

    const currUser = useContext(userContext);
    const navigate = useNavigate();
    
    const handleSubmit = (values: {name: string, note: string}) => {
        try{
            console.log("Submitting values:", values);
            Api.createUserProject(currUser.id!, values);
            navigate("/projects");
        }catch(err: any){
            console.error("Error detected in NewProjectForm:", (err[0] || err));
            alert(err[0] || err);
            navigate("/projects/new");
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