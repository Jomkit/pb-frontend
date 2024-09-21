import { Card } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const DynamicForm = ({initialValues, schema, handleSubmit}: any) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, resetForm);
          setSubmitting(false);
      }}
    >
       {({ isSubmitting }) => (
         <Form>
          <Card className='flex flex-col text-start w-1/2 m-auto'>
          { Object.keys(initialValues).map((userField, i) => (
            userField === 'password' ? 
            <>
              <label key={i} className='block text-gray-700 text-sm font-bold mb-2' htmlFor={userField}>{userField}</label>
              <Field className="form-field1 focus:outline-none focus:shadow-outline" id={userField} type="password" name={userField} />
              <ErrorMessage className='text-red-500' name={userField} component="div" />
            </>
            :
            <>
              <label key={i} className='block text-gray-700 text-sm font-bold mb-2' htmlFor={userField}>{userField}</label>
              <Field className="form-field1 focus:outline-none focus:shadow-outline" id={userField} type="text" name={userField} />
              <ErrorMessage className='text-red-500' name={userField} component="div" />
            </>
          ))}

          </Card>

          <button className="btn bg-blue-700 text-white" type="submit" disabled={isSubmitting}>
            Submit
          </button>
         </Form>
       )}
    </Formik>
  )
}

export default DynamicForm