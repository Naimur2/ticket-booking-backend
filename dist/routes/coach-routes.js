"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coach_controller_1 = require("../controller/coach-controller");
const check_login_1 = __importDefault(require("../middlewares/check-login"));
const router = (0, express_1.Router)();
router.get("/", coach_controller_1.getAllCoaches);
router.post("/search", coach_controller_1.searchCoach);
router.get("/:id", coach_controller_1.getCoachById);
router.get("/user-tickets/:id", check_login_1.default, coach_controller_1.getUserTickets);
router.post("/", check_login_1.default, coach_controller_1.addCoach);
router.put("/book/:id", check_login_1.default, coach_controller_1.bookTicket);
router.put("/cancel/:id", check_login_1.default, coach_controller_1.cancelTicket);
router.put("/:id", check_login_1.default, coach_controller_1.updateCoach);
router.delete("/:id", check_login_1.default, coach_controller_1.deleteCoach);
exports.default = router;
