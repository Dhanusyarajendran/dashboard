import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoute from "./Routes/AdminRoute.js";
import employeeRoute from "./Routes/EmployeeRoute.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5177"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRoute);
app.use('/employee', employeeRoute);


app.listen(5000, () => {
  console.log("Server is running");
});

