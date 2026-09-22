import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth/addcategory', { category })//get data 
    .then(response=>{
      setCategory('');
      if(response.data.Status){
          alert("category added successfully");
      navigate('/dashboard/category');
      }
      else{
        alert(response.data.Error);
      }
    })
    .catch(error=>{
      console.error(error);
      
    });
  }


  return (
    <div className="container py-5">
    <div className="px-3 py-5 border vh-75 w-25 shadow mt-5 d-flex align-items-center justify-content-center mx-auto rounded">
        <form onSubmit={handleSubmit} className='w-75'>
          <h4 className="text-center mb-3"><strong>Add Category</strong></h4>
            <label htmlFor="category" className='fw-bold'>Category:</label>
            <input type="text" placeholder="Category Name" className='form-control w-100 my-3' value={category} onChange={(e) =>setCategory(e.target.value)}/>
            <button type="submit" className='btn btn-success'>Add Category</button>
        </form>
    </div>
    </div>
  )
}

export default AddCategory;

