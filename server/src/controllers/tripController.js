import Trip from "../models/Trip.js";

export const getAllTrips = async (req, res) => {
    const userId = req.user._id;
    try {
        const result = await Trip.find({ owner: userId }).populate('motorcycleId').sort({ date: -1 });
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING MOTORCYCLE:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const getSingleTrip = async (req, res) => {
    const id = req.params.id;
    const full = req.query.full
    try {
        let result;
        if (full) {
            result = await Trip.findById(id).populate('motorcycleId');
        } else {
            result = await Trip.findById(id);
        }
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER GETTING SINGLE TRIP:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const createTrip = async (req, res) => {
    const tripData = req.body;
    console.log(tripData)
    if (!tripData) {
        return res.status(400).json({ message: 'Trip data are required!' });
    }
    const id = req.user._id
    tripData.owner = id;

    try {
        const result = await Trip.create(tripData);
        res.status(201).json({ message: 'Successfully create trip!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING TRIP:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const updateTrip = async (req, res) => {
    const tripData = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Trip id is required!' });
    }
    if (!tripData) {
        return res.status(400).json({ message: 'Trip data is required!' });
    }
    try {
        const trip = await Trip.findById(id);
        if (trip.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only owner or admin can update trip!' });
        }

        const result = await Trip.findByIdAndUpdate(id, tripData, { new: true });
        res.status(200).json({ message: 'Successfully update trip!', data: result });
    } catch (error) {
        console.log('ERROR WITH SERVER UPDATING TRIP:', error);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

