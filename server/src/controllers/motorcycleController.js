import Motorcycle from "../models/Motorcycle.js";
import cloudinary from "../utils/cloudinery.js";

export const getAllMotorcycles = async (req, res) => {
    const userId = req.user._id;
    try {
        const result = await Motorcycle.find({ owner: userId }).populate('owner', 'username');
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
    const file = req.file;
    const id = req.user._id
    motorcycleData.owner = id;
    console.log(motorcycleData)
    if (!motorcycleData || !file) {
        return res.status(400).json({ message: 'Motorcycle data and image are required!' });
    }
    try {
        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'motorcycles' }, (err, result) => {
                    if (result) resolve(result);
                    else reject(err);
                });
                stream.end(file.buffer);
            });
        const uploadResult = await streamUpload();
        motorcycleData.image = uploadResult.secure_url;
        motorcycleData.imagePublicId = uploadResult.public_id;

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
    const file = req.file;

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
        if (file) {
            if (motorcycle.imagePublicId) {
                await cloudinary.uploader.destroy(motorcycle.imagePublicId);
            }

            const streamUpload = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'motorcycles' },
                        (err, result) => {
                            if (result) resolve(result);
                            else reject(err);
                        }
                    );
                    stream.end(file.buffer);
                });

            const uploadResult = await streamUpload();
            motorcycleData.image = uploadResult.secure_url;
            motorcycleData.imagePublicId = uploadResult.public_id;
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
        await cloudinary.uploader.destroy(motorcycle.imagePublicId);
        await Motorcycle.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully delete motorcycle!' });
    } catch (error) {
        console.log('ERROR WITH SERVER DELETING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}