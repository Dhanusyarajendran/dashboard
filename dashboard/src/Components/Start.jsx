import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Start = () => {
    const navigate = useNavigate();
  
  useEffect(() => {
        axios.get('http://localhost:5000/verify')
            .then(response => {
                if (response.data.Status) {
                    if (response.data.role === "admin") {
                        navigate('/dashboard')
                    } else {
                        navigate('/employeedetail/' + response.data.id)
                    }

                }
                else {
                    navigate('/start')
                }

            })
            .catch(err => {
                console.log(err);
            })

    }, [])


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginpage">
            <div className="p-5 w-25 rounded border loginform">
                <h2 className="text-center text-white">Login As</h2>

                <div className="d-flex justify-content-between mt-5 mb-2">
                    <button type="button" className="btn btn-primary me-2" onClick={() => { navigate('/employeelogin') }}>Employee</button>
                    <button type="button" className="btn btn-success" onClick={() => { navigate('/login') }}>Admin</button>
                </div>
            </div>
        </div>
    )
}
export default Start;