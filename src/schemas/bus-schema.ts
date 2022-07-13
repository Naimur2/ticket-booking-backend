import { Schema, model } from "mongoose";
import { IBus } from "../interfaces/main";

const busSchema = new Schema<IBus>(
    {
        busName: {
            type: String,
            required: true,
        },
        busLiscenseNumber: {
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
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export { busSchema };

const Bus = model<IBus>("Bus", busSchema);

export default Bus;
