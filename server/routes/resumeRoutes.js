import express from 'express';
import { createResume } from '../controllers/resumeController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from "../configs/multer.js";
import { updateResume,deleteResume,getResumeById ,getResumeByIdPublic} from "../controllers/resumeController.js";





const resumeRouter = express.Router();


resumeRouter.post('/create',protect, createResume);
resumeRouter.put('/update',upload.single('image'),protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', protect, getResumeByIdPublic);


export default resumeRouter;