import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoute from "./Routes/AdminRoute.js";
import employeeRoute from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";


const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5177"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRoute); //for admin route
app.use('/employee', employeeRoute); //for employee route


//verify the user
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ Status: false, Error: "Authentication required" });

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) return res.status(401).json({ Status: false, Error: "Invalid or expired token" });
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  });
}


app.get('/verify', verifyUser, (req, res, next) => {
  return res.json({Status:true, role: req.role, id: req.id});
})


app.listen(5000, () => {
  console.log("Server is running");
});



