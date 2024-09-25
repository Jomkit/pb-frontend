import * as Yup from 'yup';
import DynamicForm from '../../components/DynamicForm';
import userContext from '../../components/contexts/userContext';
import { useContext } from 'react';
import Api from '../../api';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../components/contexts/alertContext';

const newProjectSchema = Yup.object().shape({
    name: Yup.string().required(),
    note: Yup.string().notRequired(),
})

const NewProjectForm = ({closePopup}: {closePopup: () => void}) => {
    const currUser = useContext(userContext);
    const { setAlertMessage, setAlertOn } = useContext(alertContext);
    const navigate = useNavigate();
    
    const initialProjectValues = { 
        name: '',
        note: '',
    }

    
    const handleSubmit = async (values: {name: string, note: string}) => {
        try{
            await Api.createUserProject(currUser.id!, values);
            setAlertMessage(`Project ${values.name} created! Lets add some tasks!`);
            setAlertOn(true);
            
            navigate("/tasks");
        }catch(err: any){
            // Temporary fix for Clockify API restriction on unique names
            console.error("Error detected in NewProjectForm:", (err[0] || err));
            setAlertMessage("Project name already exists in app, please try another name");
            setAlertOn(true);
            
            closePopup();
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