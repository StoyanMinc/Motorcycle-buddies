import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createTrip, deleteTrip, getAllTrips, getSingleTrip, updateTrip } from '../controllers/tripController.js';

const tripRouter = express.Router();

tripRouter.post('/', protect, createTrip)
tripRouter.get('/', protect, getAllTrips )
tripRouter.get('/:id', protect, getSingleTrip )
tripRouter.put('/:id', protect, updateTrip )
tripRouter.delete('/:id', protect, deleteTrip )

export default tripRouter;
