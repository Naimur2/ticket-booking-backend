import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { run } from "./helpers";
import { errorHandler, notfoundandler } from "./middlewares/error-handler";
import router from "./routes";
import path from "path";

const static_path = path.join(__dirname, "./public");

const app: Express = express();
dotenv.config();

const { env } = process;

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(static_path));

// STARTING OUR DATATABASE

run();

app.use("/api", router);

const port: string | number = (env.PORT as string) || 4000;

app.use(notfoundandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port + "/api");
});
