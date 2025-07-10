
import express from 'express';
import { test} from '../controllers/user.controller.js'; // Importing the test controller
import {updateUser,uploadProfileImage} from "../controllers/auth.controller.js";
// import User from "../models/user.model.js";
import { VerifyToken } from '../utils/VerifyToken.js';
const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
router.get('/test', test);  
router.post("/upload/:id", VerifyToken, uploadProfileImage)
router.post('/update/:id', VerifyToken,updateUser);  
// router.post('/upload-avatar', async (req, res) => {
//   try {
//     const { userId, avatar } = req.body;
//     if (!userId || !avatar) {
//       return res.status(400).json({ message: "userId and avatar (base64) are required" });
//     }
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.avatar = avatar; // avatar should be a base64 string
//     await user.save();

//     res.status(200).json({ message: "Avatar uploaded successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


export default router;