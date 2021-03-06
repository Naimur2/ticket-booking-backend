"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth-route"));
const location_routes_1 = __importDefault(require("./location-routes"));
const bus_routes_1 = __importDefault(require("./bus-routes"));
const coach_routes_1 = __importDefault(require("./coach-routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/locations", location_routes_1.default);
router.use("/bus", bus_routes_1.default);
router.use("/coaches", coach_routes_1.default);
exports.default = router;
