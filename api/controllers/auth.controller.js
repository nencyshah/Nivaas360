import User from "../models/user.model.js"; // Importing User model
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import{ errorHandler } from "../utils/error.js"; // Importing error handler utility
import jwt from "jsonwebtoken"; // Importing JWT for token generation
export const signup = async (req, res, next) => {
  const { Username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing the password
  const newuser = new User({ Username, email, password: hashedPassword });
  try {
    await newuser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  } 
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

