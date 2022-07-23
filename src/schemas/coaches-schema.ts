import { model, Schema, Types } from "mongoose";
import { ICoach } from "../interfaces/main";

const CoachesSchema = new Schema<ICoach>(
    {
        startingPoint: {
            type: Types.ObjectId,
            ref: "Location",
        },
        destination: {
            type: Types.ObjectId,
            ref: "Location",
        },
        bus: {
            type: Types.ObjectId,
            ref: "Bus",
        },
        startingTime: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        seats: [
            {
                seatNumber: {
                    type: String,
                    required: true,
                },
                seatStatus: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
                user: {
                    type: Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

const Coach = model<ICoach>("Coach", CoachesSchema);

export { CoachesSchema };
export default Coach;
