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
exports.deleteCoach = exports.updateCoach = exports.getCoachById = exports.getAllCoaches = exports.addCoach = void 0;
const coaches_schema_1 = __importDefault(require("../schemas/coaches-schema"));
// add a coach
const addCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingPoint, destination, bus, startingTime } = req.body;
        const coach = new coaches_schema_1.default({
            startingPoint,
            destination,
            bus,
            startingTime,
        });
        yield coach.save();
        res.status(201).json({
            message: "Coach added successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addCoach = addCoach;
// get all coaches
const getAllCoaches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coaches = yield coaches_schema_1.default.find().populate("startingPoint destination bus");
        res.status(200).json({
            message: "Success",
            data: coaches,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllCoaches = getAllCoaches;
// get a coach by id
const getCoachById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coach = yield coaches_schema_1.default.findById(req.params.id).populate("startingPoint destination bus");
        res.status(200).json({
            message: "Success",
            data: coach,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCoachById = getCoachById;
// update a coach
const updateCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingPoint, destination, bus, startingTime } = req.body;
        const coach = yield coaches_schema_1.default.findByIdAndUpdate(req.params.id, {
            startingPoint,
            destination,
            bus,
            startingTime,
        });
        const updatedCoach = yield coaches_schema_1.default.findById(req.params.id).populate("startingPoint destination bus");
        res.status(200).json({
            message: "Coach updated successfully",
            data: exports.updateCoach,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateCoach = updateCoach;
// delete a coach
const deleteCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield coaches_schema_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Coach deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCoach = deleteCoach;
