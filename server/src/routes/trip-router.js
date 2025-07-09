import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createTrip, getAllTrips } from '../controllers/tripController.js';

const tripRouter = express.Router();

tripRouter.post('/', protect, createTrip)
tripRouter.get('/', protect, getAllTrips )

export default tripRouter;
