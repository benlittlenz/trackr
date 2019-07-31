import React, { useContext } from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateJob from '../Auth/validateCreateJob';

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
    <form 
      className="flex flex-column mt3"
    >
    <input 
        onChange={handleChange}
        value={values.companyName}
        name="companyName"
        placeholder="Company Name"
        autoComplete="off"
        type="text"
        className={errors.companyName && 'error-input'}
    />
    {errors.companyName && <p className="error-text">{errors.companyName}</p>}
    <input 
        onChange={handleChange}
        value={values.job}
        name="job"
        placeholder="description for your job"
        autoComplete="off"
        type="text"
        className={errors.job && 'error-input'}
    />
    {errors.job && <p className="error-text">{errors.job}</p>}
    <input 
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="description for your link"
        autoComplete="off"
        type="text"
        className={errors.description && 'error-input'}
    />
    {errors.description && <p className="error-text">{errors.description}</p>}
      <button
        onClick={handleSubmit}
        className="button"
        type="button"
      >
      Submit
      </button>
    </form>
  );
}

export default CreateJob;