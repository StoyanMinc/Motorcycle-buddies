import Maintenance from "../models/Maintenance.js";

export const createMaintenance = async (req, res) => {
    const maintenanceData = req.body;
    console.log(maintenanceData)
    if (!maintenanceData) {
        return res.status(400).json({ message: 'Maintenance data are required!' });
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

export const getAllMaintenance = async (req, res) => {
    const userId = req.user._id;
    try {
        const result = await Maintenance.find({ owner: userId }).populate('motorcycleId', 'model manufacturer');
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING MAINTENANCE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const getSingleMaintenance = async (req, res) => {
    const id = req.params.id;
    const full = req.query.full
    try {
        let result;
        if (full) {
            result = await Maintenance.findById(id).populate('motorcycleId');
        } else {
            result = await Maintenance.findById(id);
        }
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING SINGLE MAINTENANCE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const updateMaintenance = async (req, res) => {
    const maintenanceData = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Maintenance id is required!' });
    }
    if (!maintenanceData) {
        return res.status(400).json({ message: 'Maintenance data is required!' });
    }
    try {
        const maintenance = await Maintenance.findById(id);
        if (maintenance.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only owner or admin can update trip!' });
        }

        const result = await Maintenance.findByIdAndUpdate(id, maintenanceData, { new: true });
        res.status(200).json({ message: 'Successfully update maintenance!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER UPDATING MAINTENANCE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const deleteMaintenance = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Maintenance id is required!' });
    }
    try {
        const maintenance = await Maintenance.findById(id);
        if (maintenance.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only owner or admin can delete maintenance!' });
        }
        await Maintenance.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully delete maintenance!' });
    } catch (error) {
        console.log('ERROR WITH SERVER DELETING MAINTENANCE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}