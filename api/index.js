import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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


//creating api routes

api.get('/test', (req, res) => {//request is the data that we get from client side and response is the data that we send to client side
 res.send('Hello World!'); //send is used to send the data to client side
});