import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import employeeimg from '../assets/employeeimg.png';

const EmployeeDetail = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employee/employeedetail/${id}`)
      .then(response => {
        if (response.data.Status) {
          setEmployee(response.data.Result[0]);
        }
        else {
          alert(response.data.Error)
        }
      })


      .catch((error) => {
        console.error(error);
      });
  }, []);

  //something is not showing it will print error messgage

  if (!employee) {
    return <p>Employee details not found.</p>;
  }

  return (
    <div >
      <div className='d-flex justify-content-center flex-column align-items-center mt-5 vh-75'>
        <img src={employeeimg} alt="Employee profile" className="d-block rounded-circle object-fit-cover w-50 h-50" />
        <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
          <p className='fw-bold fs-4'>Name: {employee.name}</p>
          <p className='fw-bold fs-4'>Email: {employee.email}</p>
          <p className='fw-bold fs-4'>Salary: {employee.salary}</p>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center '>
        <button type='submit' className='btn btn-success me-2'>Edit</button>
        <button type='submit' className='btn btn-danger'>Delete</button>
      </div>
    </div>

  );
};


export default EmployeeDetail;
