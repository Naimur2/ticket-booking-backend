"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helpers_1 = require("./helpers");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const { env } = process;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
// STARTING OUR DATATABASE
(0, helpers_1.run)();
const errorHandler = (err, req, res, next) => {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};
app.use("/", routes_1.default);
const port = env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port);
});
