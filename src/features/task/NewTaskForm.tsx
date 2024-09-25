import * as Yup from 'yup';
import userContext from '../../components/contexts/userContext';
import { useContext } from 'react';
import Api from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { IProject } from '../../types';
import alertContext from '../../components/contexts/alertContext';


const NewTaskForm = ({projects, closePopup}: {projects: IProject[], closePopup: () => void}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTaskValues = {
        projectId: "",
        name: '',
    }
    
    const currUser = useContext(userContext);
    const { setAlertMessage, setAlertOn } = useContext(alertContext);
    
    const newTaskSchema = Yup.object().shape({
        projectId: Yup.string().required().oneOf(projects.map( project => project.id!)),
        name: Yup.string().required(),
    })

    const handleSubmit = async (values: {projectId: string, name: string}) => {
        try{
            const {projectId, name} = values;
            console.log("values", values);
            await Api.createTask(projectId as string, {userId: currUser.id!, data: {name: name}});
            setAlertMessage(`Task ${name} created!`);
            setAlertOn(true);
            if(location.pathname === "/tasks"){
                navigate('/');
            }else{
                navigate('/tasks');
            }

        }catch(err: any){
            // Temporary fix for Clockify API restriction on unique names
            console.error("Error detected in NewTaskForm:", (err[0] || err));
            setAlertMessage("Task name already exists in app, please try another name");
            setAlertOn(true);

            closePopup();
        }
    }
    
  return (
    <div className='m-8 space-y-3'>
        <h2>Create New Task</h2>
        
        <Formik
        initialValues={initialTaskValues}
        validationSchema={newTaskSchema}
        onSubmit={handleSubmit}>
            <Form className='flex flex-col space-y-5'>
                <div>
                    <Field className="form-field1 focus:outline-none focus:shadow-outline" as="select" aria-label="projectId" name="projectId">
                        <option value="">Select Project</option>
                        {projects.map( (project) => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage className='text-red-500' name="projectId" component="div" />
                </div>

                <div>
                    <Field className="form-field1 focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Task Name" />
                    <ErrorMessage className='text-red-500' name="name" component="div" />
                </div>
                
                <button className='btn bg-green-400' type="submit">Submit</button>
            </Form>
        </Formik>
    </div>
  )
}

export default NewTaskForm