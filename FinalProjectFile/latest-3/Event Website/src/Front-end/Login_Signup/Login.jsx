import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

    {/*Login form */}
    {/*Sends the data to the database and checks the confirmation whether it is valid or not. 
      if it is valid then it will store the user and  redirect to the home page */}
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', { email, password });
      const { user } = response.data;
  
      // Store the user data in the local storage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Login successful:', response.data);
      alert('Login successful! Redirecting to Homepage'); // Alert the user
      navigate('/'); // Navigate to the home page after successful login
    } catch (error) {
      console.error('Login error:', error.response.data);
      alert('Login Failed');
    }
  };

  return (
    <>

    {/* Login form */}
      <div className='login'>
        <div className='form-container'>
          <p className='title'>Login</p>
          <form className='form' onSubmit={handleLogin}>
            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder=''
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='forgot'>
                <a rel='noopener noreferrer' href='#'>
                  Forgot Password ?
                </a>
              </div>
            </div>
            <button className='sign' type='submit'>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;