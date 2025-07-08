import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createMaintenance, getAllMaintenance } from '../controllers/maintenanceController.js';


const maintenanceRouter = express.Router();

maintenanceRouter.post('/', protect, createMaintenance)
maintenanceRouter.get('/', protect, getAllMaintenance )

export default maintenanceRouter;
