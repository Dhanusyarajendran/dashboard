import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [admin, setAdmin] = useState({
    name: 'Admin',
    email: 'admin@example.com',
    role: 'Administrator'
  });
  const [stats, setStats] = useState({
    employees: 0,
    salary: 0
  });
  

  useEffect(() => {
    axios.get('http://localhost:5000/auth/profile', { withCredentials: true })
      .then((response) => {
        if (response.data.Status && response.data.Result) {
          setAdmin(response.data.Result);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin profile:', error);
      });



    axios.get('http://localhost:5000/auth/employeecount')
      .then((response) => {
        setStats((prev) => ({ ...prev, employees: response.data || 0 }));
      })
      .catch((error) => {
        console.error('Error fetching employee count:', error);
      });




    axios.get('http://localhost:5000/auth/salarycount')
      .then((response) => {
        setStats((prev) => ({ ...prev, salary: response.data || 0 }));
      })
      .catch((error) => {
        console.error('Error fetching salary count:', error);
      });
  }, []);



  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-dark text-white py-4 px-4">
              <h3 className="mb-0">My Profile</h3>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-md-4 text-center mb-4 mb-md-0">
                  <div
                    className="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold"
                    style={{ width: '140px', height: '140px', fontSize: '3rem' }}
                  >
                    {admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <h4 className="mt-3 mb-1">{admin.name || 'Admin User'}</h4>
                  <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                    {admin.role || 'Administrator'}
                  </span>
                </div>

                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="text-muted small text-uppercase">Full Name</label>
                      <div className="form-control bg-light border-0 mt-1">{admin.name || 'Admin User'}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted small text-uppercase">Email</label>
                      <div className="form-control bg-light border-0 mt-1">{admin.email || 'admin@example.com'}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted small text-uppercase">Role</label>
                      <div className="form-control bg-light border-0 mt-1">{admin.role || 'Administrator'}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted small text-uppercase">Status</label>
                      <div className="form-control bg-light border-0 mt-1 text-success fw-semibold">Active</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5 g-3">
                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100 rounded-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Total Employees</span>
                        <i className="bi bi-people-fill fs-4 text-primary"></i>
                      </div>
                      <h2 className="mt-3 mb-0">{stats.employees}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border-0 bg-light h-100 rounded-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Total Salary</span>
                        <i className="bi bi-currency-dollar fs-4 text-success"></i>
                      </div>
                      <h2 className="mt-3 mb-0">${Number(stats.salary || 0).toLocaleString()}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-primary px-4">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;