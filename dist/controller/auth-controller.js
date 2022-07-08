"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationController = exports.registerController = exports.loginController = void 0;
const bcrypt_1 = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
dotenv_1.default.config();
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.find({ email: req.body.email });
        const userData = yield user_schema_1.default.find({ email: req.body.email }).select({
            password: 0,
        });
        if (user && user.length > 0) {
            const isValidPassword = yield (0, bcrypt_1.compare)(req.body.password, user[0].password);
            if (isValidPassword) {
                // generate Token
                const token = (0, jsonwebtoken_1.sign)({
                    email: user[0].email,
                    _id: user[0]._id,
                    role: user[0].role,
                }, process.env.JWT_SECRET, {
                    expiresIn: "2d",
                });
                res.status(200).json({
                    user: userData[0],
                    access_token: token,
                    message: "Login Successfull",
                });
            }
            else {
                res.status(401).json({ error: "Authentication failed! 1" });
            }
        }
        else {
            res.status(401).json({ error: "Authentication failed! 2" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "There was a server side error!" });
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role, firstName, lastName, termsAccepted } = req.body;
    const user = yield user_schema_1.default.find({ email }).select({ password: 0 });
    if ((user === null || user === void 0 ? void 0 : user.length) > 0) {
        res.status(400).json({
            message: "Registration failed. Try with another email.",
        });
    }
    else {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = new user_schema_1.default({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            termsAccepted,
        });
        yield newUser.save();
        const token = (0, jsonwebtoken_1.sign)({
            email: newUser.email,
            _id: newUser._id,
            role: newUser.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });
        console.log("Registration successful.");
        res.status(201).json({
            message: "Registration successful.",
            user: newUser,
            access_token: token,
        });
    }
});
exports.registerController = registerController;
const validationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, _id } = req.body.user;
    console.log(email, _id);
    const user = yield user_schema_1.default.find({ email, _id }).select({ password: 0 });
    if ((user === null || user === void 0 ? void 0 : user.length) > 0) {
        res.status(200).json({
            message: "Validation successful.",
            user: user[0],
        });
    }
    else {
        res.status(401).json({
            message: "Validation failed.",
        });
    }
});
exports.validationController = validationController;
