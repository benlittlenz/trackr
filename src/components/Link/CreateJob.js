import React, { useContext } from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateJob from '../Auth/validateCreateJob';
import { Button, Divider, Form, Input } from 'semantic-ui-react'

import FirebaseContext from '../../firebase/context';

const INITAL_STATE = {
    companyName: '',
    job: '',
    description: '',
}

const CreateJob = props => {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITAL_STATE, 
    validateCreateJob, 
    handleCreateJob
  )

  console.log(INITAL_STATE)

  function handleCreateJob() {
    if(!user) {
      props.history.push('/login');
    } else {
      const { companyName, job, description } = values;
      const newJob = {
        companyName,
        job,
        description,
        createdBy: {
          id: user.uid,
          name: user.displayName
        },
        created: Date.now()
      }
      firebase.db.collection('job').add(newJob);
      props.history.push('/')
    }
  }
  return (
    <div
      style={{
        width: '50%',
        margin: '0 auto'
      }}
    >
      <Form size="large">
        <Form.Field
          onChange={handleChange}
          value={values.companyName}
          name='companyName' 
          control='input' 
          placeholder='Company Name' 
          
          
        />
        <Form.Field
          onChange={handleChange}
          value={values.job}
          name="job"
          control='select' 
          placeholder='Job'>
            <option value=''></option>
            <option value='Face Fix'>Face Fix</option>
            <option value='Surface Mount'>Surface Mount</option>
            <option value='Semi Frameless Post'>Semi Frameless Post</option>
            <option value='Glass'>Glass</option>
          </Form.Field>
        <Form.Field
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="description for job"
          control='input' 
        />
        {errors.description && <p className="error-text">{errors.description}</p>}
        <Button
          onClick={handleSubmit}
          className="button"
          type="button"
        >
        Submit
        </Button>
      </Form>
    </div>

  );
}

export default CreateJob;

    // {/* <input 
    //     onChange={handleChange}
    //     value={values.companyName}
    //     name="companyName"
    //     placeholder="Company Name"
    //     autoComplete="off"
    //     type="text"
    //     className={errors.companyName && 'error-input'}
    // /> */}
    // {errors.companyName && <p className="error-text">{errors.companyName}</p>}
    // <input 
    //     onChange={handleChange}
    //     value={values.job}
    //     name="job"
    //     placeholder="description for your job"
    //     autoComplete="off"
    //     type="text"
    //     className={errors.job && 'error-input'}
    // />
    // {errors.job && <p className="error-text">{errors.job}</p>}
    // <input 
    //     onChange={handleChange}
    //     value={values.description}
    //     name="description"
    //     placeholder="description for your link"
    //     autoComplete="off"
    //     type="text"
    //     className={errors.description && 'error-input'}
    // />