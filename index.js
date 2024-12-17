import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';

dotenv.config();


const app = express();

const mongoUrl = "mongodb+srv://udara:123@cluster0.erxl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json())


app.use("/api/users",userRouter);
app.use("/api/products",productRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

