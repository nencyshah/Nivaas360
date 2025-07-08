import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Userrouter from './routes/user.route.js'; // Importing user routes
import authRouter from './routes/auth.routes.js'; // Importing auth routes // Importing auth routes
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);       
}); 
const app = express();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use(express.json()); // Middleware to parse URL-encoded data
app.use(cookieParser()); // Middleware to parse cookies

//creating api routes


//app.get('/test', (req, res) => {//request is the data that we get from client side and response is the data that we send to client side
 //res.json({
  //message: 'Hello World!' //json is used to send the data in json format
// }) send is used to send the data to client side
//}); app.get for defining routes.
 //middleware to parse JSON data
app.use('/api/user',Userrouter); //middleware to parse JSON data
app.use('/api/auth', authRouter); //middleware to parse JSON data

app.use((err, req, res, next) => {
  //err is error comming from the server,
  // req is the request from the client side,
  //  res is the response from the server side,
  //  next is used to call the next middleware
  const statuscode= err.statuscode || 500;// Log the error stack trace
  const message = err.message || 'Something went wrong';
  console.error(err.stack);
  return res.status(statuscode).json({
    success: false,
    status: statuscode,
    message: message
  });    
});