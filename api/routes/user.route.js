
import express from 'express';
import { deleteUser,uploadAvatar,
updateUser, test} from '../controllers/user.controller.js'; // Importing the test controller
import { VerifyToken } from '../utils/VerifyToken.js';
const router = express.Router();

router.get('/test', test);  
router.post("/upload/:id", VerifyToken, uploadAvatar)
router.put('/update/:id', VerifyToken,updateUser);  
router.delete('/delete/:id', VerifyToken,deleteUser);  



export default router;