import express from 'express'
<<<<<<< HEAD

const app = express();

=======
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


>>>>>>> 9491bd184058ac55bf1712f81fb3afd36d7f4762
app.get('/' , (req,res) => {
    res.send("welcome to coe project");
})

<<<<<<< HEAD
=======

app.use('/api/auth' , authRoutes)




>>>>>>> 9491bd184058ac55bf1712f81fb3afd36d7f4762
app.listen(3000 , () =>{
    console.log(`Server is running on http://localhost:3000`);
})