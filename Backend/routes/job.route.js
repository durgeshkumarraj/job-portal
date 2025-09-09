import express from 'express'; 
import isAuthenticated from '../middlewares/isAuthenticated.js';


import { getAdminJobs, getAllJob, getJobById, postJob } from '../controllers/job.controller.js';


const router = express.Router(); 


 
router.route('/post').post(isAuthenticated,postJob);
router.route("/get").post(isAuthenticated,getAllJob);
router.route("/getadminjobs").post(isAuthenticated,getAdminJobs);
router.route("/get/:id").post(isAuthenticated,getJobById)
// Export the router
export default router;
