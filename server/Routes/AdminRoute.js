import express from "express";
import connection from '../Utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import multer from "multer";
import path from "path";


const router = express.Router();

// Configure multer before any route uses upload.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


//create our api for login
router.post('/login', (req, res) => {
    // console.log(req.body);//check api is showing or not
    // res.json({ message: 'Login request received', data: req.body });
    //connect to the database 
    const sql = 'SELECT * from admin where email = ? and password =?';
    //run the database query
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ message: 'Database error', error: err });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email, id: result[0].id }, 'jwt_secret_key', { expiresIn: '1d' }); //for cokie we need to create a token
            res.cookie('token', token,); //set the cookie with the token
            return res.json({ loginStatus: true, message: 'Login successful' });
        } else {
            return res.json({ loginStatus: false, message: 'Invalid email or password' });
        }
    })

})

//create api for category
router.post('/addcategory', (req, res) => {
    const sql = 'INSERT INTO category (`category`) VALUES(?)';
    connection.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, error: err.message });
        return res.json({ Status: true, message: 'category successfully added' });
    });
});


//create api for get category from database
router.get('/category', (req, res) =>{
    const sql = 'SELECT * FROM category';
    connection.query(sql, (err, result) => {
        if(err) res.json ({ Status: false, Error : "Query error"});
        return res.json ({Status : true, Result : result })
    })
})


//create api for add employee
router.post('/addemployee', upload.single('image'),(req, res) => {
   const sql = 'INSERT INTO employee (name, email, password, salary, address, image, category) VALUES (?) ';
   bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) return res.json({Status: false, Error: "query error"})
  
   const values = [
     req.body.name,
     req.body.email,
     hash,
     req.body.salary,
     req.body.address,
    req.file ? req.file.filename : null,
     req.body.category,
    ]
    
   connection.query(sql, [values], (err, result) =>{
    if(err) return res.json ({Status: false, message: err.message});
    return res.json ({Status: true, message : 'employee successfully added'});
   });
});
});

//create api for get employee from database
router.get('/employee', (req, res) =>{
    const sql = 'SELECT * FROM employee';
    connection.query(sql, (err, result) => {
        if(err) return res.json ({ Status: false, Error : "Query error"});
        return res.json ({Status : true, Result : result })
    })
})




//code for update employee
router.put('/editemployee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE employee SET name = ?, email = ?, password = ?, salary = ?, address = ? WHERE id = ?';              
    connection.query (sql, [req.body.name, req.body.email, req.body.password, req.body.salary, req.body.address, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"});
        return res.json({Status: true, message: "Employee updated successfully"});
    })
})

//code for edit employee
router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"});
        return res.json(result[0]);
    })
}
)

//code for delete employee
router.delete('/deleteemployee/:id', (req, res) => {
    const id  = req.params.id;
    const sql = 'DELETE FROM employee WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query error"});
        return res.json({Status: true, message: "Employee deleted successfully"});
    })
})


//for admin count

router.get('/admincount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS adminCount FROM admin';
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json({ Status: true, Result: result[0].adminCount });
    })
}   
)


router.get('/employeecount', (req, res) => {
    const sql = 'SELECT COUNT(*) AS employeeCount FROM employee';
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json(result[0].employeeCount);
    }   
)
})


router.get('/salarycount', (req, res) => {
    const sql = 'SELECT SUM(salary) AS totalSalary FROM employee';
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json(result[0].totalSalary);
    }   
    )
})

//for admin record
router.get('/adminrecord', (req, res) => {
    const sql = 'SELECT * FROM admin';
    connection.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query error" });
        return res.json({ Status: true, Result: result });
    });
});

//for profile page
router.get('/profile', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ Status: false, Error: 'Authentication required' });
    }

    jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if (err || decoded.role !== 'admin') {
            return res.status(401).json({ Status: false, Error: 'Invalid or expired token' });
        }

        const sql = 'SELECT id, name, email FROM admin WHERE id = ?';
        connection.query(sql, [decoded.id], (queryError, result) => {
            if (queryError) {
                return res.status(500).json({ Status: false, Error: 'Query error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ Status: false, Error: 'Admin profile not found' });
            }

            return res.json({ Status: true, Result: result[0] });
        });
    });
});

//code for delete admin
// router.delete('/deleteadmin/:id', (req, res) => {
//     const id  = req.params.id;
//     const sql = 'DELETE FROM admin WHERE id = ?';   
//     connection.query(sql, [id], (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query error"});
//         return res.json({Status: true, message: "Admin deleted successfully"});
//     }
//     )
// })


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true, message: "Logout successful" });
})










































































export default router;  
