import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
const navigate = useNavigate();
axios.defaults.withCredentials = true; //save the cookie in the browser

const[error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:5000/auth/login', value)
    .then((response)=>{
      if(response.data.loginStatus){
        navigate('/dashboard');
      }else {
        setError(response.data.message);
        // alert(response.data.message); foe error message 
    
      }
    })
    .catch(error=>{
      console.log(error);
      setError('Unable to connect to the server');
    })
  };


  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 loginpage">
      <div className="p-5 w-25 rounded border bg-light loginform">
        <div className="text-danger"> 
          {error && error}
          </div>

        <h2 className="text-center mb-4">Login Page</h2>
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e)=>setValue({...value, email: e.target.value})}
              className="form-control rounded-0"
            
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e)=>setValue({...value, password: e.target.value})}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3 w-100 rounded-0">
            Login
          </button>

          <div className="mb-3">
            <input
              type="checkbox"
              id="checkbox"
              className="form-check-input"
            />
            <label htmlFor="checkbox" className="form-label">you are agree with terms and conditions</label>
          </div>


        </form>
      </div>
   </div>
      
  );
};

export default Login;