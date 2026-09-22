import React from 'react'
import { useNavigate } from 'react-router-dom';

const Start = () => {
const navigate = useNavigate();
  return (
    <div className = "d-flex justify-content-center align-items-center vh-100 loginpage">
        <div className="p-5 w-25 rounded border loginform">
            <h2 className="text-center text-white">Login As</h2>
      
        <div className="d-flex justify-content-between mt-5 mb-2">
            <button type="button" className="btn btn-primary me-2" onClick={() => {navigate('/employeelogin')}}>Employee</button>
            <button type="button" className="btn btn-success" onClick={() => {navigate('/login')}}>Admin</button>
        </div>
    </div>
      </div>
  )
}
export default Start;