import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditCategory = () => {
     const { id } = useParams();
  const [category, setCategory] = useState('');
  const navigate = useNavigate();


  //get category data form database
  useEffect(() => {
    axios.get(`http://localhost:5000/auth/category/${id}`)
      .then(({ data }) => {
        if (data.Status) {
          setCategory(data.Result.category);
        } else {
          alert(data.Error || 'Unable to load category.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Unable to load category.');
      });
  }, [id]);


    //update category
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/auth/category/${id}`, { category })
      .then(({ data }) => {
        if (data.Status) {
          navigate('/dashboard/category');
        } else {
          alert(data.Error || 'Unable to update category.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Unable to update category.');
      });
  }


  return (
    <div className="container py-5">
    <div className="px-3 py-5 border vh-75 w-25 shadow mt-5 d-flex align-items-center justify-content-center mx-auto rounded ">
        <form onSubmit={handleSubmit} className='w-75'>
          <h4 className="text-center mb-3"><strong>Edit Category</strong></h4>
            <label htmlFor="category" className='fw-bold'>Category:</label>
            <input type="text" id="category" placeholder="Category Name" className='form-control w-100 my-3' value={category} onChange={(e) =>setCategory(e.target.value)} required />
            <button type="submit" className='btn btn-success' disabled={!category.trim()}>Update Category</button>
        </form>
    </div>
    </div>
  )
}

export default EditCategory;

