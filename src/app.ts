import cors from "cors";
import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express } from "express";
import { run } from "./helpers";
import router from "./routes";

const app: Express = express();
dotenv.config();

const { env } = process;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

// STARTING OUR DATATABASE
run();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};

app.use("/", router);

const port: string | number = (env.PORT as string) || 4000;

app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port);
});
