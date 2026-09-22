import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employee/employeedetail/${id}`)
      .then(response => {
        if(response.data.Status){
        setEmployee(response.data.Result[0]);
        }
         else{
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
    <div>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Salary: {employee.salary}</p>
      <p>Address: {employee.address}</p>
      
    </div>
  );
};

export default EmployeeDetail;