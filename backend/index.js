<<<<<<< HEAD
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import connectDB from './config/db.js';
=======
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import connectDB from "./config/db.js";
>>>>>>> 6eca8a2e726bc08d27755e7c6d989de530696566
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
   {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
    credentials: true
   }
))
app.use('/api/auth' , authRoutes)

app.get('/' , (req,res) => {
    res.send("welcome to coe project");
})

<<<<<<< HEAD





=======
>>>>>>> 6eca8a2e726bc08d27755e7c6d989de530696566
app.listen(3000 , () =>{
    console.log(`Server is running on http://localhost:3000`);
})
