import express from 'express';
import { protect } from '../middlewares/protect.js';
import { upload } from '../middlewares/multer.js';
import {
    createMotorcycle,
    deleteMotorcycle,
    getAllMotorcycles,
    getCurrentMotorcycles,
    getOneMotorcycle,
    updateMotorycle

} from '../controllers/motorcycleController.js';

const motorcycleRouter = express.Router();

motorcycleRouter.get('/', protect, getAllMotorcycles);
motorcycleRouter.get('/current', protect, getCurrentMotorcycles);
motorcycleRouter.get('/:id', protect, getOneMotorcycle);
motorcycleRouter.post('/', protect, upload.single('image'), createMotorcycle);
motorcycleRouter.put('/:id', protect, upload.single('image'), updateMotorycle);
motorcycleRouter.delete('/:id', protect, deleteMotorcycle);

export default motorcycleRouter;