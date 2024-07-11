import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
import adminRouter from './routes/admin-routes';
import tourRouter from './routes/tour-routes';
import bookingsRouter from './routes/booking-routes';
import cors from 'cors'
dotenv.config();
const app=express();

app.use(cors())

//middlewares
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter)
app.use("/tour",tourRouter)
app.use("/booking",bookingsRouter)

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.7mwi5kv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

).then(()=>app.listen(5000,()=>console.log("Connected To Database And Server is Running"))).catch(e=>console.log(e));

