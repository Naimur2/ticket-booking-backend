import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express } from "express";
import { connect } from "mongoose";

const app: Express = express();
dotenv.config();

const { env } = process;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

const run = async (): Promise<void> => {
    const DB_URL = (env.MONGO_URI as string) + env.MONGO_DB;

    try {
        await connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
};

run();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};

const port: string | number = (env.PORT as string) || 8080;

app.listen(port, () => {
    console.log("Server is running on port 4000");
});
