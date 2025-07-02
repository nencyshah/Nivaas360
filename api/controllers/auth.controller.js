import  User from '../models/user.model.js'; // Importing User model
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
export const signup = async (req, res) => {
  const { Username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hashing the password
  const newuser = new User({ Username, email, password: hashedPassword });
  await newuser.save()
    .then(user => {
      res.status(201).json({ message: "User registered successfully", user });
    })
    .catch(err => {
      res.status(500).json({ message: "Error registering user", error: err.message });
    });
}; 