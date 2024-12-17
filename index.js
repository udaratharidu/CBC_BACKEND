import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';

dotenv.config();


const app = express();

const mongoUrl = "mongodb+srv://udara:123@cluster0.erxl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json());

app.use((req, _res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    jwt.verify(req.headers.authorization.split(" ")[1], "cbc-secret-key-7973", (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }


});



app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

