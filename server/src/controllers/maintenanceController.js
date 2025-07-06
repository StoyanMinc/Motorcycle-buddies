import Maintenance from "../models/Maintenance.js";

export const createMaintenance = async (req, res) => {
    const maintenanceData = req.body;
    if (!maintenanceData) {
        return res.status(400).json({ message: 'Maintenance data and image are required!' });
    }
    const id = req.user._id
    maintenanceData.owner = id;

    try {
        const result = await Maintenance.create(maintenanceData);
        res.status(201).json({ message: 'Successfully create maintenance!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING MAINTENANCE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}