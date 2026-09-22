import { Link, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard =() =>{
    const navigate = useNavigate();
        axios.defaults.withCredentials = true;

     const handleLogout = () => {
        axios.get('http://localhost:5000/auth/logout')
            .then(response => {
                if(response.data.Status){
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return(
        <div className="container-fluid px-0 m-0">
            <div className="row flex-nowrap">
                <div  className="col-auto col-md-3 col-xl-2 px-0 bg-dark">

                    <div className="d-flex flex-column align-items-center px-3 text-white min-vh-100">
                        <Link to="/dashboard" className="text-white text-decoration-none mb-4 mt-4"><span className='fw-bolder fs-5 d-none d-sm-inline'>Code With Yourself</span></Link>

                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-start row-gap-4" id="menu">
                            <li className="w-100"><Link to="/dashboard" className="text-white text-decoration-none px-0 align-middle"><i className="bi bi-speedometer2"></i><span className='ms-2 d-none d-sm-inline'>Dashboard</span></Link></li>
                            <li className="w-100"><Link to="/dashboard/employees" className="text-white text-decoration-none"><i className="bi bi-people"></i><span className='ms-2 d-none d-sm-inline'>Manage Employees</span></Link></li>
                            <li className="w-100"><Link to="/dashboard/category" className="text-white text-decoration-none"><i className="bi bi-list"></i><span className='ms-2 d-none d-sm-inline'>Category</span></Link></li>
                            <li className="w-100"><Link to="/dashboard/profile" className="text-white text-decoration-none"><i className="bi bi-person"></i><span className='ms-2 d-none d-sm-inline'>profile</span></Link></li>
                            <li className="w-100"><Link to="/dashboard/logout" className="text-white text-decoration-none"><i className="bi bi-box-arrow-right"></i><span className='ms-2 d-none d-sm-inline' onClick={handleLogout}>logout</span></Link></li>
                        </ul>
                    </div>

                </div>

                <div className='col p-0 m-0'>
                   
                   <div className='p-3 d-flex justify-content-center shadow'>
                      <h4>Employee Management System</h4>
                   </div>
                   <Outlet />
                </div>


                </div>
        </div>
    );
}
export default Dashboard;



