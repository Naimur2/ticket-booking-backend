"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bus_controller_1 = require("../controller/bus-controller");
const upload_bus_Image_1 = require("../middlewares/upload-bus-Image");
const check_login_1 = __importDefault(require("../middlewares/check-login"));
const route = (0, express_1.Router)();
route.get("/", bus_controller_1.getAllBuses);
route.get("/:id", bus_controller_1.getBusById);
route.post("/", check_login_1.default, upload_bus_Image_1.uploadBusImage, bus_controller_1.addBus);
route.put("/:id", check_login_1.default, upload_bus_Image_1.uploadBusImage, bus_controller_1.updateBus);
route.delete("/:id", check_login_1.default, bus_controller_1.deleteBus);
exports.default = route;
