import React, { useState } from "react";
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const Login = props => {
  const { 
    handleChange, 
    handleSubmit, 
    values,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidation(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );

  const [login, setLogin] = useState(true);
  const [firebaseErr, setFirebaseErr] = useState(null);

  async function authenticateUser() {
    const { name, email, password } = values
    try {
      const response = login 
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password)
    props.history.push('/')
    } catch(err) {
      console.error(err)
      setFirebaseErr(err.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
      <form 
        onSubmit={console.log('gfdgdf')}
        className="flex flex-column">
        {!login && (
          <input 
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text"
            placeholder="name"
            autoComplete="off"
          />)}
        <input 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          onBlur={handleBlur}
          className={errors.email && 'error-input' }
          type="email"
          name="email"
          placeholder="email"
          autoComplete="off"
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
        <input 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && 'error-input' }
          type="password"
          name="password"
          placeholder="password"
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseErr && <p className="error-text">{firebaseErr}</p>}
        <div className="flex mv3">
          <button
            disabled={isSubmitting}
            style={{background: isSubmitting ? 'gray' : 'orange'}}
            type="button"
            className="button pointer mv2"
            onClick={handleSubmit}
          >Submit</button>
          <button type="button" className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account" 
                   : "Already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
          <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  )
}

export default Login;