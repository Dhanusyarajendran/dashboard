import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";



const EditEmployee = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState ({
        name : "",
        email : "",
        password: "",
        salary : "",
        address : "",
        
    }); 

    // const [category, setCategory] = useState([]);

    // useEffect(() => {   
    //     axios.get('http://localhost:5000/auth/category')
    //         .then(response => {
    //             setCategory(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    //this code for edit employee data
    useEffect(() => {
        axios.get(`http://localhost:5000/auth/employee/${id}`)
            .then(response => { 
                setEmployee({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    salary: response.data.salary,
                    address: response.data.address,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);
          
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/auth/editemployee/${id}`, employee)
            .then(response => {
                setEmployee('');
                if (response.data.Status) {
                    alert("employee updated successfully");
                    navigate('/dashboard/employees');
                } else {
                    alert(response.data.Error || response.data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="container py-5">
            <div className="p-5 border vh-75 w-50 shadow mt-5 d-flex align-items-center justify-content-center mx-auto rounded">
                <form className='w-100' onSubmit={handleSubmit}>
                    <h4 className="text-center mb-3"><strong>Edit Employee</strong></h4>

                    <div>
                    <label htmlFor="name" className='fw-bold'>Name:</label>
                    <input type="text" id="inputName" placeholder="Enter Name" className="form-control w-100 my-3" value={employee.name} onChange={(e) => setEmployee({...employee, name: e.target.value})} />
                    </div>

                      <div>
                    <label htmlFor="email" className='fw-bold'>Email:</label>
                    <input type="email" id="inputEmail" placeholder="Enter Email" className="form-control w-100 my-3" autoComplete="off" value={employee.email} onChange={(e) => setEmployee({...employee, email: e.target.value})} />
                    </div>

                      <div>
                    <label htmlFor="password" className='fw-bold'>Password:</label>
                    <input type="password" id="inputPassword" placeholder="Enter Password" className="form-control w-100 my-3" autoComplete="off" value={employee.password} onChange={(e) => setEmployee({...employee, password: e.target.value})} />
                    </div>

                      <div>
                    <label htmlFor="salary" className='fw-bold'>Salary:</label>
                    <input type="number" id="inputSalary" placeholder="Enter Salary" className="form-control w-100 my-3" autoComplete="off" value={employee.salary} onChange={(e) => setEmployee({...employee, salary: e.target.value})} />
                    </div>

                      {/* <div>
                    <label htmlFor="category" className='fw-bold'>Category:</label>
                    <select className="form-select w-100 my-3 category" value={employee.category} onChange={(e) => setEmployee({...employee, category: e.target.value})}>
                       {category.map((output)=>(
            <tr key={output.id}>
            <td>{output.category}</td>
            </tr>
           )
          )}
                    </select>

                      </div> */}

                    
                    <div>
                    <label htmlFor="address" className='fw-bold'>Address:</label>
                    <input type="address" id="inputAddress" placeholder="Enter Address" className="form-control w-100 my-3" autoComplete="off" value={employee.address} onChange={(e) => setEmployee({...employee, address: e.target.value})} />
                    </div>


                    <button type="submit" className='btn btn-success'>Edit Employee</button>
                </form> 
            </div>
    
        
    </div>
    );
};



export default EditEmployee; 