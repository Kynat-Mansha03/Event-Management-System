import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  {/*Sends the data to the database and checks the confirmation whether it is valid or not. 
      if it is valid then it will store the user and  redirect to the home page */}
      const handleSignup = async () => {
        console.log('In Handle Sign Up');
      
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
      
        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          alert('Password should contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
          return;
        }
      
        try {
          console.log('Signup:', name, email, password);
          const response = await axios.post('http://localhost:8081/api/signup', { name, email, password });
          const { user } = response.data;
      
          // Store the user data in the local storage
          localStorage.setItem('user', JSON.stringify(user));
      
          console.log('Signup successful:', response.data);
          alert('Signup successful! Redirecting to Homepage'); // Alert the user
          navigate('/'); // Redirect to homepage after successful signup
        } catch (error) {
          console.error('Signup error:', error.response.data);
          alert('SignUp Failed');
        }
      };

  return (
    <>
      {/* Signup form */}
      <div className='login'>
        <div className='form-container'>
          <p className='title'>Sign Up</p>
          <form className='form' onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            <div className='input-group'>
              <label htmlFor='username'>Name</label>
              <input
                type='text'
                name='username'
                id='username'
                placeholder=''
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
            <button className='sign'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
