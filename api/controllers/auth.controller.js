import  User from '../models/user.model.js'; // Importing User model
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
export const signup = async (req, res, next) => {
  const { Username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing the password
  const newuser = new User({ Username, email, password: hashedPassword });
  try{
  await newuser.save()
  res.status(201).json('User created successfully',);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
} 
