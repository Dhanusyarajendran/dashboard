import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    const [adminCount, setAdminCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [salaryCount, setSalaryCount] = useState(0);   
    const[adminRecord, setAdminRecord] = useState([]);
    // const[deleteId, setDeleteId] = useState(null);
    
    // const handleDelete = (id) => {
    //     axios.delete('http://localhost:5000/auth/deleteadmin/' + id)
    //     .then(response => {
    //         if(response.data.Status){
    //             alert("Admin deleted successfully");
    //             window.location.reload();
    //         }
    //         else{
    //             alert(response.data.Error);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // }


    const admin = () => {
        axios.get('http://localhost:5000/auth/admincount')
            .then(response => {
                if(response.data.Status){
                    setAdminCount(response.data.Result);
                }
            });
    };


    const employee = () => {
        axios.get('http://localhost:5000/auth/employeecount')
            .then(response => {
                setEmployeeCount(response.data);
            });
    };


    const salary = () => {
        axios.get('http://localhost:5000/auth/salarycount')
            .then(response => {
                setSalaryCount(response.data);
            });
    };

    
    const record = () => {
        axios.get('http://localhost:5000/auth/adminrecord')
         .then(response => {
            if(response.data.Status){
                setAdminRecord(response.data.Result);
            }   
            else{
                alert(response.data.Error);
            }
         })
        }

    useEffect(() => {
        admin();
        employee();
        salary();
        record();
    }, []);



  return (
    <div className='container'>
        <div className='px-3 d-flex justify-content-around mt-3 bg-grey'>
        <div className='border pt-2 pb-3 px-3 w-25 shawdow-sm rounded mx-auto mt-5'>
            <div className='text-center mt-3'>
                <h4>Admin</h4>
            </div>
            <hr />
            <div className='text-center mt-3'>
                <h5>Total: {adminCount}</h5>
                </div>
        </div>

        <div className='border pt-2 pb-3 px-3 w-25 shawdow-sm rounded mx-auto mt-5'>
            <div className='text-center mt-3'>
                <h4>Employee</h4>
            </div>
            <hr />
            <div className='text-center mt-3'>
                <h5>Total: {employeeCount}</h5>
                </div>
        </div>

        <div className='border pt-2 pb-3 px-3 w-25 shawdow-sm rounded mx-auto mt-5'>
            <div className='text-center mt-3'>
                <h4>Salary</h4>
            </div>
            <hr />
            <div className='text-center mt-3'>
                <h5>Total: $ {salaryCount}</h5>
                </div>
        </div>


    </div>

    <div className='mt-5'>
        <h3>List of Admins</h3>
        <table className='table mt-3'>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>

                {adminRecord.map((output) => (
                    <tr key={output.id}>
                        <td>{output.email}</td>
                        <td>
                           <button className='btn btn-primary me-3'>Edit</button>
                           <button className='btn btn-warning'>Delete</button>
                        </td>
                    </tr>
                ))}
                      
                
            </tbody> 
            
        </table>
    </div>
    </div>
 ) 

}

export default Home; 


