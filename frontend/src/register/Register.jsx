import React, { useState } from 'react';
import './register.css';
import { register } from './register-operations';
import { Link } from 'react-router-dom';
import Arrow from '../uikit/arrow.svg';
import isAuthenticated from '../utils/isAuthenticated';

const Register = () => {
  const defaultFields = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    adminCode: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFields);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const data = await register({...formFields});

    if (data.error){
        setSuccess(false);
        setError(true);
    } else{
        if (isAuthenticated){
          window.location.reload();
        }

        setFormFields(defaultFields);
        setSuccess(true);
        setError(false);
    };
  };

  const handleChange = (e) =>{
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFields = {
      ...formFields,
      [fieldName]: fieldValue
    }

    setFormFields(newFields);
  }
   
    return (
      <div class= 'signup-container'>

        <div className='signup-form-container'>
          <h1 className='signup-form-container-register-title'>Register</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Email Address..." 
              value={formFields.email} 
              name = 'email'
              onChange={handleChange}
              required
            />

            <input 
              type="text" 
              placeholder="Username..." 
              value={formFields.username} 
              name = 'username'
              onChange={handleChange}
              required
            />

            <input 
              type="text" 
              placeholder="First Name..." 
              value={formFields.firstName} 
              name = 'firstName'
              onChange={handleChange}
              required
            />

            <input 
              type="text" 
              placeholder="Last Name..." 
              value={formFields.lastName} 
              name = 'lastName'
              onChange={handleChange}
              required
            />

            <input 
              type="password" 
              placeholder="Password..." 
              value={formFields.password} 
              name = 'password'
              onChange={handleChange}
              required
            />

            <input 
              type="password" 
              placeholder="Admin Code -Optional"
              value={formFields.adminCode}
              name = 'adminCode'
              onChange={handleChange}
            />

            <button> 
              <img id='searchButton' src={Arrow} alt="Arrow"/>
            </button>

            {error && <h3 className='signup-error'>Something went wrong</h3>}
            {success && <h3 className='signup-success'>Account has been created. Wait for admin to enable account.</h3>}
          </form>
        </div>

        <div>
          <div className='register-container'>
            <Link to="/" className='register-link'><h3>Back to Login</h3></Link>
          </div>
        </div>

      </div>
    
      
    );
  }
  
  export default Register;