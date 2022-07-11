import { Schema, model } from "mongoose";
import { IBus } from "../interfaces/main";

const busSchema = new Schema<IBus>({
    busName: {
        type: String,
        required: true,
    },
    busNumber: {
        type: String,
        required: true,
    },
    busType: {
        type: String,
        required: true,
        enum: ["AC", "Non-AC"],
    },
    busDescription: {
        type: String,
        required: true,
    },
    busImage: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export { busSchema };

const Bus = model<IBus>("Bus", busSchema);

export default Bus;
