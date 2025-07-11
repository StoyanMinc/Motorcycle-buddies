import { model, Schema, Types } from 'mongoose'

const tripSchema = new Schema({

    motorcycleId: {
        type: Types.ObjectId,
        ref: 'Motorcycle',
        required: true
    },

    address: {
        type: String,
        required: [true, 'Address is required!']
    },

    tripTitle: {
        type: String,
        required: [true, 'Trip title is required!']
    },

    friends: {
        type: [String],
        default: [],
    },

    gps: {
        type: String,
        required: [true, 'GPS is required!']
    },

    date: {
        type: Date,
        required: [true, 'Date is required!']
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

const Trip = model('Trip', tripSchema);

export default Trip;