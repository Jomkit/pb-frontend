import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import Api from "../../api"
import { ITask } from "../../types"
import alertContext from "../../components/contexts/alertContext"
import { useContext } from "react"

const newSurveySchema = Yup.object().shape({
    score: Yup.number().required().oneOf([1, 2, 3, 4, 5]),
    description: Yup.string().notRequired()
})

const NewSurveyForm = ({projectId, task, timerId, closePopup}: {projectId: string, task: ITask, timerId: string, closePopup: () => void}) => {
    const { setAlertMessage, setAlertOn } = useContext(alertContext);
    
    const initialValues = {
        score: 0,
        description: ""
    }
    
    const handleSubmit = (values: {score: number, description: string}) => {
        try{
            const data = {
                projectId: projectId,
                taskId: task.id,
                timerId: timerId,
                ...values
            }
            Api.createSurvey(data);

            setAlertMessage("Survey created!");
            setAlertOn(true);
            closePopup();

        }catch(err: any){
            console.error("Error detected in NewSurveyForm:", (err[0] || err));
            setAlertMessage("Error creating survey");
            setAlertOn(true);
            closePopup();
        }
        
    }
    
  return (
    <div className='m-8 space-y-4'>
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validationSchema={newSurveySchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
        closePopup();
    }}
    >
    {({ isSubmitting }) => (
        <Form>
            <div className="mb-4">
                <div id="score" className="text-xl font-bold">
                    <p>Please rate productivity for the following task:</p> 
                    <p>{task.name}</p>
                    </div>
                <div>1 (not productive) - 5 (very productive)</div>
                <div className="space-x-4" role="group" aria-labelledby="score">
                    <label>
                        <Field type="radio" name="score" value="1" />
                        <span>1</span>
                    </label>
                    <label>
                        <Field type="radio" name="score" value="2" />
                        <span>2</span>
                    </label>
                    <label>
                        <Field type="radio" name="score" value="3" />
                        <span>3</span>
                    </label>
                    <label>
                        <Field type="radio" name="score" value="4" />
                        <span>4</span>
                    </label>
                    <label>
                        <Field type="radio" name="score" value="5" />
                        <span>5</span>
                    </label>
                </div>
                <ErrorMessage className='text-red-500' name="score" component="div" />
            </div>
            
            <div>
                <label className='text-xl font-bold' htmlFor="description">Notes</label>
                <Field className="form-field1 focus:outline-none focus:shadow-outline" id="description" type="text" as="textarea" name="description" placeholder="Enter notes here..." />
                <ErrorMessage className='text-red-500' name="description" component="div" />
            </div>

            <div><p>Remember to take a break!</p></div>

            <button className="btn bg-blue-700 text-white" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
        
    )}
    </Formik>
    </div>
  )
}

export default NewSurveyForm