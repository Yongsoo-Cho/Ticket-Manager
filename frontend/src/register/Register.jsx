import React, { useState } from 'react';
import './register.css';
import { register } from './register-operations'

const Register = () => {
  const [email, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const user = {
      email,
      username,
      firstName,
      lastName,
      password
    };

    const data = await register(user);

    if (data.error){
        setError(data.error);
    } else{
        window.location.reload();
    };
  };
   
    return (
      <div class= 'signup-container'>

        <div></div>

        <div className='signup-form-container'>
          <h3 className='signup-form-container-register-title'>REGISTER</h3>
          <form onSubmit={handleSubmit}>
            <h3>Email Address</h3>
            <input 
              type="text" 
              placeholder="Email Address..." 
              value={email} 
              onChange={e=> setEmailAddress(e.target.value)}
              required
            />

            <h3>Username</h3>
            <input 
              type="text" 
              placeholder="Username..." 
              value={username} 
              onChange={e=> setUsername(e.target.value)}
              required
            />

            <h3>First Name</h3>
            <input 
              type="text" 
              placeholder="First Name..." 
              value={firstName} 
              onChange={e=> setFirstName(e.target.value)}
              required
            />

            <h3>Last Name</h3>
            <input 
              type="text" 
              placeholder="Last Name..." 
              value={lastName} 
              onChange={e=> setLastName(e.target.value)}
              required
            />

            <h3>Password</h3>
            <input 
              type="password" 
              placeholder="Password..." 
              value={password} 
              onChange={e=> setPassword(e.target.value)}
              required
            />

            <button>Register</button>

            {error && <h3 className='signup-error'>Something went wrong</h3>}
          </form>
        </div>

        <div></div>

      </div>
      
    );
  }
  
  export default Register;