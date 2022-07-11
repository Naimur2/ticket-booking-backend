import dotenv from "dotenv";
import express, { ErrorRequestHandler, Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { run } from "./helpers";
import router from "./routes";
import { notfoundandler, errorHandler } from "./middlewares/error-handler";

const app: Express = express();
dotenv.config();

const { env } = process;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// STARTING OUR DATATABASE

run();

app.use("/api", router);

const port: string | number = (env.PORT as string) || 4000;

app.use(notfoundandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port + "/api");
});
