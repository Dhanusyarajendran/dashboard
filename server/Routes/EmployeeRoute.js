import express, { response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from "../Utils/db.js"; 

const router = express.Router();

//create api for employee login 

router.post('/employeelogin', (req, res) => {
    // console.log(req.body);//check api is showing or not
    // res.json({ message: 'Login request received', data: req.body });
    //connect to the database 
    const sql = 'SELECT * from employee where email = ?';
    //run the database query
    connection.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ message: 'Database error', error: err });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) =>{
                if(err) return res.json ({ message: 'Database error', error: err });
                if(response){
                     const email = result[0].email;
            const token = jwt.sign(
                { role: "employee", email: email }, 'employee_secret_key', { expiresIn: '1d' }
            ); //for cokie we need to create a token
             res.cookie('token', token); //set the cookie with the token
            return res.json({loginStatus: true, message: 'Login successful',  id: result[0].id,
            });
             
                }
            })
           
           
        } else {
            return res.json({ loginStatus: false, message: 'Invalid email or password' });
        }
    });

});


//get api for employee details 

router.get('/employeedetail/:id', (req, res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?';
    connection.query(sql, [id], (err, result) =>{
       if(err) res.json ({ Status: false, Error : "Query error"});
        return res.json ({Status : true, Result : result })
    })
    })

 

export default router;  