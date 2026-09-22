import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./Components/Login.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Home from './Components/Home.jsx';
import Employee from './Components/Employee.jsx';
import Category from './Components/Category.jsx';
import Profile from './Components/Profile.jsx';
import AddCategory from './Components/AddCategory.jsx';
import AddEmployee from './Components/AddEmployee.jsx';
import EditEmployee from './Components/EditEmployee.jsx';
import Start from './Components/Start.jsx';
import EmployeeLogin from "./Components/EmployeeLogin.jsx";
import EmployeeDetail from './Components/EmployeeDetail.jsx';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/start' element={<Start />} />
    <Route path='/login' element={<Login />} />
    <Route path='/employeelogin' element={<EmployeeLogin />} />
      <Route path='/employeedetail/:id' element={<EmployeeDetail/>} />
    <Route path='/dashboard' element={<Dashboard />}>
      <Route index element={<Home />} />
      <Route path='employees' element={<Employee />} />
      <Route path='category' element={<Category />} />
      <Route path='profile' element={<Profile />} />
      <Route path='addcategory' element={<AddCategory />} />
      <Route path='addemployee' element = {<AddEmployee/>} />
      <Route path='editemployee/:id' element = {<EditEmployee/>} />

     
    </Route>
   </Routes>
   </BrowserRouter>
  );
}


export default App;  

