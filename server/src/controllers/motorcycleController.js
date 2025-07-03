import Motorcycle from "../models/Motorcycle.js";

export const getAllMotorcycles = async (req, res) => {
    try {
        const result = await Motorcycle.find();
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const getOneMotorcycle = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Motorcycle id is required!' });
    }
    try {
        const motorcycle = await Motorcycle.findById(id);
        if (!motorcycle) {
            return res.status(404).json({ message: 'Motorcycle not found!' });
        }
        res.status(200).json(motorcycle);
    } catch (error) {
        console.log('ERROR WITH SERVER UPDATING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const createMotorcycle = async (req, res) => {
    const motorcycleData = req.body;
    if (!motorcycleData) {
        return res.status(400).json({ message: 'Motorcycle data required!' });
    }
    try {
        const result = await Motorcycle.create(motorcycleData);

        res.status(201).json({ message: 'Successfully create motorcycle!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const updateMotorycle = async (req, res) => {
    const motorcycleData = req.body;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Motorcycle id is required!' });
    }
    if (!motorcycleData) {
        return res.status(400).json({ message: 'Motorcycle data is required!' });
    }
    try {
        const motorcycle = await Motorcycle.findById(id);
        if (motorcycle.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only owner or admin can update motorcycle!' });
        }
        const result = await Motorcycle.findByIdAndUpdate(id, motorcycleData, { new: true });
        res.status(200).json({ message: 'Successfully update motorcycle!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER UPDATING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const deleteMotorcycle = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Motorcycle id is required!' });
    }
    try {
        const motorcycle = await Motorcycle.findById(id);
        if (motorcycle.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only owner or admin can delete motorcycle!' });
        }
        await Motorcycle.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully delete motorcycle!' });
    } catch (error) {
        console.log('ERROR WITH SERVER DELETING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}