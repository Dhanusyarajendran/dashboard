import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLogin = () => {
    const [value, setValue] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; //save the cookie in the browser
    
   const handlesubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/employee/employeelogin', value)
    .then(response => {
        if(response.data.loginStatus){
        navigate('/employeedetail/' + response.data.id);
        }
        else{
            alert(response.data.message);

        }
    })
    .catch(error => {
        console.error(error);
    });
}
  return (
   <div className="container d-flex align-items-center justify-content-center vh-100 loginpage">
      <div className="p-5 w-25 rounded border bg-light loginform">
       
        <h2 className="text-center mb-4">Login Page</h2>
        <form className="my-4" onSubmit={handlesubmit}>
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

   }

export default EmployeeLogin;