import { model, Schema } from "mongoose";
import { ILocation } from "../interfaces/main";

const schema = new Schema<ILocation>(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Location = model<ILocation>("Location", schema);

export default Location;

export { schema };
