// importing the dependencies
import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import path from 'path'

// importing the functions
import { connectDB } from './src/config/db.js';


// importing the routes
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import itemRoutes from './src/routes/itemRoutes.js'
import swapRoutes from './src/routes/swapRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/swaps', swapRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req,res) =>{
    res.send('hello World!')
})

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log("App is listening at port: ", PORT)
        console.log("The URL is http://localhost:5001/")
    })

})