import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
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


  return (
    <div>
      <h4 className='text-center mt-3'>Category List</h4>
      <Link to="/dashboard/addcategory" className='btn btn-success p-2 ms-2 mt-3'>Add Category</Link>
    <div className='mt-3'>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
           {category.map((output)=>(
            <tr key={output.id}>
            <td>{output.category}</td>
            </tr>
           )
          )}
          
        </tbody>
      </table>
      </div>
    </div>
   

  )
}

export default Category;
