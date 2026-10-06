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
    <div className="container-fluid px-3 px-lg-4 py-4">
     <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
            <div>
              <p className="text-uppercase text-success fw-semibold small mb-1">Organization</p>
              <h1 className="h3 fw-bold mb-0">Employees</h1>
            </div>
            <Link to="/dashboard/addemployee" className="btn btn-success">
              <i className="bi bi-plus-lg me-2" aria-hidden="true" />Add employee
            </Link>
          </div>

      <section className="card border-0 shadow-sm" aria-label="Employee list">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="px-4 py-3">Name</th>
                  <th scope="col" className="py-3">Image</th>
                  <th scope="col" className="py-3">Email</th>
                  <th scope="col" className="py-3">Salary</th>
                  <th scope="col" className="py-3">Address</th>
                  <th scope="col" className="text-end px-4 py-3" style={{ width: 180 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((output) => (
                  <tr key={output.id}>
                    <td className="px-4 py-3 fw-medium">{output.name}</td>
                    <td className="py-3">
                      {output.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${output.image}`}
                          alt={`${output.name}`}
                          width="44"
                          height="44"
                          className="rounded-circle object-fit-cover"
                        />
                      ) : (
                        <span className="text-secondary small">No image</span>
                      )}
                    </td>
                    <td className="py-3 text-break">{output.email}</td>
                    <td className="py-3">{output.salary}</td>
                    <td className="py-3">{output.address}</td>
                    <td className="px-4 py-3">
                      <div className="d-flex justify-content-end gap-2">
                        <Link to={`/dashboard/editemployee/${output.id}`} className="btn btn-info btn-sm">Edit</Link>
                        <button type="button" className="btn btn-warning btn-sm" onClick={() => handleDelete(output.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {employee.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-secondary py-5">
                      No employees have been added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
 )

}
export default Employee; 

