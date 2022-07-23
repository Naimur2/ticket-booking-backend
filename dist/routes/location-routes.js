"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controller_1 = require("../controller/location-controller");
const check_login_1 = __importDefault(require("../middlewares/check-login"));
const router = (0, express_1.Router)();
router.get("/", location_controller_1.getAllLocation);
router.get("/:id", location_controller_1.getLocationById);
router.post("/", check_login_1.default, location_controller_1.createLocation);
router.put("/:id", check_login_1.default, location_controller_1.updateLocation);
router.delete("/:id", check_login_1.default, location_controller_1.deleteLocation);
exports.default = router;
