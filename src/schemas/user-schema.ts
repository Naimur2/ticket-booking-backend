import { model, Schema } from "mongoose";
import { IUserProps } from "../interfaces/main";

const userSchema = new Schema<IUserProps>(
    {
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "user",
            enum: ["admin", "user"],
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUserProps>("User", userSchema);

export default User;

export { userSchema };
