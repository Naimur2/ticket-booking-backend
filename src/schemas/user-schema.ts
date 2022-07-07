import { Schema, model } from "mongoose";
import { UserProps } from "../interfaces/main";

const userSchema = new Schema<UserProps>({
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
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const User = model<UserProps>("User", userSchema);

export default User;

export { userSchema };
