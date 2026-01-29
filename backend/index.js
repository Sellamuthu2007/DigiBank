import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import connectDB from './config/db.js';
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

app.listen(3000 , () =>{
    console.log(`Server is running on http://localhost:3000`);
})
