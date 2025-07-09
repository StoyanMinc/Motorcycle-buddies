import Trip from "../models/Trip.js";

export const getAllTrips = async (req, res) => {
    const userId = req.user._id;
    try {
        const result = await Trip.find({ owner: userId }).populate('motorcycleId');
        res.status(200).json(result);
    } catch (error) {
        console.log('ERROR WITH SERVER CREATING MOTORCYCLE:', error);
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
