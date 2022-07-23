"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const helpers_1 = require("./helpers");
const error_handler_1 = require("./middlewares/error-handler");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const static_path = path_1.default.join(__dirname, "./public");
const app = (0, express_1.default)();
dotenv_1.default.config();
const { env } = process;
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.static(static_path));
app.use(express_1.default.urlencoded({ extended: true }));
// STARTING OUR DATATABASE
(0, helpers_1.run)();
app.use("/api", routes_1.default);
const port = env.PORT || 4000;
app.use(error_handler_1.notfoundandler);
app.use(error_handler_1.errorHandler);
app.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port + "/api");
});
