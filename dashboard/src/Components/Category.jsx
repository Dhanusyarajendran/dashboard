import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

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


  //delete category
  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/auth/deletecategory/' + id)
    .then(response =>{  
      if(response.data.Status){
        setCategory(current => current.filter(item => item.id !== id));
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
    <main className="container-fluid px-3 px-lg-4 py-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <div>
          <p className="text-uppercase text-success fw-semibold small mb-1">Organization</p>
          <h1 className="h3 fw-bold mb-0">Categories</h1>
        </div>
        <Link to="/dashboard/addcategory" className="btn btn-success">
          <i className="bi bi-plus-lg me-2" aria-hidden="true" />Add category
        </Link>
      </div>


      <section className="card border-0 shadow-sm" aria-label="Category list">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="px-4 py-3">Category name</th>
                  <th scope="col" className="text-end px-4 py-3" style={{ width: 180 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {category.map((output) => (
                  <tr key={output.id}>
                    <td className="px-4 py-3 fw-medium">{output.category}</td>
                    <td className="px-4 py-3">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                          onClick={() => navigate(`/dashboard/editcategory/${output.id}`)}
                        >
                        Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDelete(output.id)}
                        >
                       Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) }
                {category.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center text-secondary py-5">
                      No categories have been added yet.
                    </td>
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

      
export default Category;

