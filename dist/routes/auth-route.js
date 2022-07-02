"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth-controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.loginController);
router.post("/register", auth_controller_1.registerController);
router.get("/validate", auth_controller_1.validationController);
exports.default = router;
