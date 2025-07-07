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
export const google = async (req, res, next) => {
  const { Username, email, photo } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      return res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
    else {
      const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8); // Generate a random password;
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // Hash the generated password
     const rawUsername = req.body.Username;
const processedUsername =
  rawUsername && typeof rawUsername === "string" && rawUsername.trim().length > 0
    ? rawUsername.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
    : "user" + Math.random().toString(36).slice(-4);

const newUser = new User({
  Username: processedUsername,
  email: req.body.email,
  password: hashedPassword,
  avatar: req.body.photo
});
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
       res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  }
   
  catch (error) {
    next(error);
  }
}
  