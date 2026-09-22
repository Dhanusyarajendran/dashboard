import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Employee = () => {

  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/auth/employee')
      .then(response => {
        if(response.data.Status){
          setEmployee(response.data.Result);
        }
        else{
          alert(response.data.Error)
        }
      })
      .catch((err )=> {
        console.error('err');
      })
  }, []);




  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/deleteemployee/' + id)
    .then(response =>{
        if(response.data.Status){
            alert("employee deleted successfully");
            window.location.reload();
        }
        else{
            alert(response.data.Error);
        }
    })
    .catch(error => {
        console.error(error);
    });

  }


  return (
    <div>
    <div>
        <h4 className='text-center mt-3'>Employee List</h4>
        <Link to = '/dashboard/addemployee' className='btn btn-success ms-2 mt-3 p-2'>Add Employee</Link>
    </div>

    <div>
        <table className='table mt-3'>
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>salary</th>
                <th>address</th>
                <th>Action</th>
                </thead>
                
                <tbody>
                   {employee.map((output)=>(
                    <tr key={output.id}>
                      <td>{output.name}</td>
                      <td>{output.email}</td>
                      <td>{output.salary}</td>
                      <td>{output.address}</td>
                      <td>
                        <Link to={`/dashboard/editemployee/${output.id}`} className='btn btn-info btn-sm me-2' >Edit</Link>
                        <Link className='btn btn-warning btn-sm' onClick={() => handleDelete(output.id)}>Delete</Link>
                      </td>
                    </tr>
                   ))}

                </tbody>
                 
            
        </table>
    </div>
    </div>
  )
}


export default Employee;

