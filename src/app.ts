import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express } from "express";

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on port 4000");
});
