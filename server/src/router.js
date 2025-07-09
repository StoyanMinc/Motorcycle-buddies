import express from 'express';
import userRouter from './routes/user-router.js';
import adminRouter from './routes/admin-router.js';
import motorcycleRouter from './routes/motorcycle-router.js';
import maintenanceRouter from './routes/maintenance-router.js';
import tripRouter from './routes/trip-router.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/motorcycles', motorcycleRouter);
router.use('/maintenance', maintenanceRouter);
router.use('/trips', tripRouter);

export default router;