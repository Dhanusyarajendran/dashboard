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
        <main className="container-fluid px-3 px-lg-4 py-4">
            <header className="mb-4">
                <p className="text-uppercase text-success fw-semibold small mb-1">Overview</p>
                <h1 className="h3 fw-bold mb-0">Dashboard</h1>
            </header>

            <section className="row g-3 g-xl-4 mb-4" aria-label="Dashboard summary">
                <div className="col-12 col-md-6 col-xl-4 rounded-3">
                    <article className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48 }} aria-hidden="true">
                                <i className="bi bi-person-badge fs-5" />
                            </div>
                            <div>
                                <p className="text-secondary small mb-1">Administrators</p>
                                <p className="h3 fw-bold mb-0">{adminCount}</p>
                            </div>
                        </div>
                    </article>
                </div>


                <div className="col-12 col-md-6 col-xl-4">
                    <article className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-primary-subtle text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48 }} aria-hidden="true">
                                <i className="bi bi-people fs-5" />
                            </div>
                            <div>
                                <p className="text-secondary small mb-1">Employees</p>
                                <p className="h3 fw-bold mb-0">{employeeCount}</p>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="col-12 col-md-6 col-xl-4">
                    <article className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4 d-flex align-items-center gap-3">
                            <div className="rounded-3 bg-warning-subtle text-warning-emphasis d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48 }} aria-hidden="true">
                                <i className="bi bi-cash-stack fs-5" />
                            </div>
                            <div>
                                <p className="text-secondary small mb-1">Total salary</p>
                                <p className="h3 fw-bold mb-0">$ {Number(salaryCount || 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>



            <section className="card border-0 shadow-sm" aria-label="Administrator list">
                <div className="card-header bg-white border-0 px-4 pt-4 pb-3">
                    <p className="text-uppercase text-success fw-semibold small mb-1">Access management</p>
                    <h2 className="h5 fw-bold mb-0">Administrators</h2>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Email address</th>
                                    <th scope="col" className="text-end px-4 py-3" style={{ width: 220 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminRecord.map((output) => (
                                    <tr key={output.id}>
                                        <td className="px-4 py-3 fw-medium">{output.email}</td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button type="button" className="btn btn-info btn-sm">Edit</button>
                                                <button type="button" className="btn btn-warning btn-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {adminRecord.length === 0 && (
                                    <tr>
                                        <td colSpan="2" className="text-center text-secondary py-5">No administrators found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
 )

}



export default Home; 


