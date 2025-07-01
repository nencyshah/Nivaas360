import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Userrouter from './routes/user.route.js'; // Importing user routes
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

//app.get('/test', (req, res) => {//request is the data that we get from client side and response is the data that we send to client side
 //res.json({
  //message: 'Hello World!' //json is used to send the data in json format
// }) send is used to send the data to client side
//}); app.get for defining routes.

app.use('/api/user',Userrouter); //middleware to parse JSON data