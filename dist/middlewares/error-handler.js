"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notfoundandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const notfoundandler = (req, res, next) => {
    next((0, http_errors_1.default)(404, "Your requested url was not found"));
};
exports.notfoundandler = notfoundandler;
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next("Something went wrong");
    }
    else {
        res.status(err.status || 500);
        res.json({
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
};
exports.errorHandler = errorHandler;
