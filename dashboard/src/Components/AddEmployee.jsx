import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";




const AddEmployee = () => {

    
    const [employee, setEmployee] = useState ({
        name : '',
        email : '',
        password: '',
        salary : '',
        address : '',
        image: '',
        category: '',
        
    }); 

     const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/category')
      .then(response => {
        if(response.data.Status){
          setCategory(response.data.Result);
        }
        else{
          alert(response.data.Error)
        }
      })
      .catch(err => {
        console.log(err);

      })
  }, []);

    


    const navigate = useNavigate ();

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData();
      Object.entries(employee).forEach(([field, value]) => {
        if (value !== '') {
          formData.append(field, value);
        }
      });

      axios.post('http://localhost:5000/auth/addemployee', formData)
            .then(response => {
                if (response.data.Status) {
            setEmployee({
              name: '',
              email: '',
              password: '',
              salary: '',
              address: '',
              image: '',
              category: '',
            });
                    console.log(response.data);
                    alert("employee added successfully");
                    navigate('/dashboard/employees');
                }

                else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error(error);

            });
    }

    
    return (
        <div className="container py-5">
            <div className="p-5 border vh-75 w-50 shadow mt-5 d-flex align-items-center justify-content-center mx-auto rounded">
                <form className='w-100' onSubmit={handleSubmit}>
                    <h4 className="text-center mb-3"><strong>Add Employee</strong></h4>

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

                    
                    <div>
                    <label htmlFor="address" className='fw-bold'>Address:</label>
                    <input type="text" id="inputAddress" placeholder="Enter Address" className="form-control w-100 my-3" autoComplete="off" value={employee.address} onChange={(e) => setEmployee({...employee, address: e.target.value})} />
                    </div>

                   <div>
                    <label htmlFor="address" className='fw-bold'>Category:</label>
                    <select name='category' id='category' className='form-select'  value={employee.category}onChange={(e) => setEmployee({ ...employee, category: e.target.value })}>
                          {category.map(output =>{
                            return (
                            <option key = {output.id} value={output.name}>
                                {output.name}
                                </option>
                            )
                          })}
                    </select>
                    </div>


                    <div>
                    <label htmlFor="inputGroupFile01" className='fw-bold'>Select Image:</label>
                    <input type="file" id="inputGroupFile01" accept="image/*" className="form-control w-100 my-3" onChange={(e) => setEmployee({...employee, image: e.target.files[0] || '' })} />
                    </div>


                    <button type="submit" className='btn btn-success'>Add Employee</button>
                </form> 
            </div>
    
        
    </div>
  )
}



export default AddEmployee;  

