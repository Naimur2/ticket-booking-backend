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
exports.deleteBus = exports.updateBus = exports.getBusById = exports.getAllBuses = exports.addBus = void 0;
const bus_schema_1 = __importDefault(require("../schemas/bus-schema"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const coaches_schema_1 = __importDefault(require("../schemas/coaches-schema"));
const get_bus_seats_1 = require("../helpers/get-bus-seats");
// add a bus
const addBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busName, busLiscenseNumber, busType, busDescription, seatNumber, } = req.body;
        const files = req.files;
        const busImage = "/uploads/bus-images/" + files[0].filename;
        const bus = new bus_schema_1.default({
            busName,
            busLiscenseNumber,
            busType,
            busDescription,
            busImage,
            seatNumber,
        });
        yield bus.save();
        res.status(201).json({
            message: "Bus added successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.addBus = addBus;
// get all Buses
const getAllBuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buses = yield bus_schema_1.default.find();
        res.status(200).json({
            message: "Success",
            data: buses,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBuses = getAllBuses;
// get a bus by id
const getBusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bus = yield bus_schema_1.default.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            data: bus,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getBusById = getBusById;
// update a bus
const updateBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busName, busLiscenseNumber, busType, busDescription, seatNumber, busImage, } = req.body;
        let newBusImage = busImage;
        if (req.files && req.files.length > 0) {
            const oldBusImage = path_1.default.join(__dirname, "../public", busImage);
            (0, fs_1.unlink)(oldBusImage, (err) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });
            const files = req.files;
            newBusImage = "/uploads/bus-images/" + files[0].filename;
        }
        const busId = req.params.id;
        const oldBus = yield bus_schema_1.default.findById(busId);
        const oldSeatNumber = oldBus === null || oldBus === void 0 ? void 0 : oldBus.seatNumber;
        const newSeatNumber = seatNumber;
        if (oldSeatNumber !== newSeatNumber) {
            const seats = (0, get_bus_seats_1.getSeats)(newSeatNumber, 4).map((seat) => {
                return {
                    seatNumber: seat,
                };
            });
            const coachesWithSameBus = yield coaches_schema_1.default.find({ bus: busId });
            coachesWithSameBus.forEach((coach) => {
                coach.seats = seats;
                coach.save();
            });
        }
        const bus = yield bus_schema_1.default.findByIdAndUpdate(busId, {
            busName,
            busLiscenseNumber,
            busType,
            busDescription,
            busImage: newBusImage,
            seatNumber,
        });
        res.status(200).json({
            message: "Bus updated successfully",
            data: bus,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.updateBus = updateBus;
// delete a bus
const deleteBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bus = yield bus_schema_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Bus deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBus = deleteBus;
