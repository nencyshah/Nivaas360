
import express from 'express';
import { test, UpdateUserInfo} from '../controllers/user.controller.js'; // Importing the test controller
const router = express.Router();

router.get('/test', test);  
router.get('/update:id',UpdateUserInfo);  //


export default router;