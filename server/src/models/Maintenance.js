import { model, Schema, Types } from 'mongoose'

const maintenanceSchema = new Schema({

    motorcycleId: {
        type: Types.ObjectId,
        ref: 'Motorcycle',
        required: true
    },
    serviceType: {
        type: String,
        required: [true, 'Service type is required!']
    },

    description: {
        type: String,
        default: 'No description'
    },

    cost: {
        type: Number,
        required: [true, 'Cost is required!']
    },

    mileage: {
        type: Number,
        required: [true, 'Mileage is required!']
    }

}, { timestamps: true });

const Maintenance = model('Maintenance', maintenanceSchema);

export default Maintenance;