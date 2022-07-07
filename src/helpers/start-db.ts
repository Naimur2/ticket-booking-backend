import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { env } = process;

export const run = async (): Promise<void> => {
    const DB_URL = env.MONGO_URI as string;

    try {
        await connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
};
