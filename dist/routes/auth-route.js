"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_login_1 = __importDefault(require("../middlewares/check-login"));
const auth_controller_1 = require("../controller/auth-controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.loginController);
router.post("/register", auth_controller_1.registerController);
router.get("/validate", check_login_1.default, auth_controller_1.validationController);
router.post("/user-info", check_login_1.default, auth_controller_1.getUserInfo);
router.put("/update-info", check_login_1.default, auth_controller_1.updateUserInfo);
exports.default = router;
