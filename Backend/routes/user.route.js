import express from 'express'; 
import isAuthenticated from '../middlewares/isAuthenticated.js';

import {  register, login, updateProfile, logout } from "../controllers/user.controller.js"; 
const router = express.Router(); 
 import { singleUpload } from '../middlewares/multer.js';


router.route("/register").post(singleUpload,register);
router.route("/login").post(login); 
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload,updateProfile); 

// Export the router
export default router;
