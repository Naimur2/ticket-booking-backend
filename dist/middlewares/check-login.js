"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { env } = process;
const checkLogin = (req, res, next) => {
    if (req.headers) {
        const { authorization } = req.headers;
        try {
            const token = authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, env.JWT_SECRET);
            const { _id, email } = decoded;
            req.body.email = email;
            req.body._id = _id;
            next();
        }
        catch (error) {
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    }
};
exports.default = checkLogin;
