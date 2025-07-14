import { model, Schema, Types } from 'mongoose'

const motorcycleSchema = new Schema({

    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required!']
    },
    model: {
        type: String,
        required: [true, 'Model is required!']
    },

    description: {
        type: String,
        default: 'No description'
    },

    year: {
        type: String,
        required: [true, 'Year is required!']

    },

    boughtYear: {
        type: String,
        required: [true, 'Bought year is required!']
    },

    soldYear: {
        type: String,
        default: 'Still owned'
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },

    image: {
        type: String,
    },

    imagePublicId: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ['motorcycle', 'car'],
        required: [true, 'Type is required!']
    }

}, { timestamps: true });

const Motorcycle = model('Motorcycle', motorcycleSchema);

export default Motorcycle;