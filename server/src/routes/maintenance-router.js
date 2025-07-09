import express from 'express';
import { protect } from '../middlewares/protect.js';
import { createMaintenance, deleteMaintenance, getAllMaintenance, getSingleMaintenance, updateMaintenance } from '../controllers/maintenanceController.js';

const maintenanceRouter = express.Router();

maintenanceRouter.post('/', protect, createMaintenance)
maintenanceRouter.get('/', protect, getAllMaintenance )
maintenanceRouter.get('/:id', protect, getSingleMaintenance )
maintenanceRouter.put('/:id', protect,  updateMaintenance)
maintenanceRouter.delete('/:id', protect,  deleteMaintenance)

export default maintenanceRouter;
