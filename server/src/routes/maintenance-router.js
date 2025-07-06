import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createMaintenance } from '../controllers/maintenanceController.js';


const maintenanceRouter = express.Router();

maintenanceRouter.post('/', protect, createMaintenance)

export default maintenanceRouter;
