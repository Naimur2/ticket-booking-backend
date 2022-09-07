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
exports.cancelTicket = exports.getUserTickets = exports.bookTicket = exports.searchCoach = exports.deleteCoach = exports.updateCoach = exports.getCoachById = exports.getAllCoaches = exports.addCoach = void 0;
const coaches_schema_1 = __importDefault(require("../schemas/coaches-schema"));
const get_bus_seats_1 = require("../helpers/get-bus-seats");
const bus_schema_1 = __importDefault(require("../schemas/bus-schema"));
// add a coach
const addCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingPoint, destination, bus, startingTime, price, date } = req.body;
        const busDetails = yield bus_schema_1.default.findById(bus);
        const seatNo = busDetails === null || busDetails === void 0 ? void 0 : busDetails.seatNumber;
        const seats = (0, get_bus_seats_1.getSeats)(seatNo, 4).map((seat) => {
            return {
                seatNumber: seat,
            };
        });
        const coach = new coaches_schema_1.default({
            startingPoint,
            destination,
            bus,
            startingTime,
            price,
            date,
            seats,
        });
        yield coach.save();
        res.status(201).json({
            message: "Coach added successfully",
            // data: coach,
        });
    }
    catch (error) {
        console.log(error);
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
        const coach = yield coaches_schema_1.default.findById(req.params.id).populate("startingPoint destination bus seats.user");
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
        const { startingPoint, destination, bus, startingTime, maximumSeats, date, } = req.body;
        const coach = yield coaches_schema_1.default.findByIdAndUpdate(req.params.id, {
            startingPoint,
            destination,
            bus,
            startingTime,
            maximumSeats,
            date,
        });
        const updatedCoach = yield coaches_schema_1.default.findById(req.params.id).populate("startingPoint destination bus");
        res.status(200).json({
            message: "Coach updated successfully",
            data: updatedCoach,
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
// delete a coach
const searchCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingPoint, destination, date } = req.body;
        console.log(startingPoint, destination, date);
        const data = yield coaches_schema_1.default.find({
            startingPoint,
            destination,
            date: date,
        }).populate("startingPoint destination bus");
        if (data.length === 0) {
            res.status(200).json({
                message: "No coaches found",
                data: data,
            });
        }
        else {
            res.status(200).json({
                message: "Success",
                data: data,
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchCoach = searchCoach;
const bookTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coachId, seats, userId } = req.body;
        const coach = yield coaches_schema_1.default.findById(coachId);
        const newSeats = coach === null || coach === void 0 ? void 0 : coach.seats;
        seats.forEach((seat) => {
            newSeats.forEach((newSeat) => {
                if (newSeat.seatNumber === seat.seatNumber) {
                    newSeat.seatStatus = true;
                    newSeat.user = userId;
                }
            });
        });
        const coachData = yield coaches_schema_1.default.findByIdAndUpdate(coachId, {
            seats: newSeats,
        });
        res.status(200).json({
            message: "Ticket booked successfully",
            data: coachData,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.bookTicket = bookTicket;
const getUserTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coaches = yield coaches_schema_1.default.find({
            seats: {
                $elemMatch: {
                    user: req.params.userId,
                },
            },
        }).populate("startingPoint destination bus");
        const filteredCoach = coaches.filter((coach) => {
            return coach.seats.some((seat) => {
                return seat.seatStatus === true;
            });
        });
        res.status(200).json({
            message: "Success",
            data: filteredCoach,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserTickets = getUserTickets;
const cancelTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { coachId, seats, userId } = req.body;
        const coach = yield coaches_schema_1.default.find({
            _id: coachId,
            seats: {
                $elemMatch: {
                    user: userId,
                },
            },
        });
        const newSeats = (_a = coach[0]) === null || _a === void 0 ? void 0 : _a.seats;
        const updatedSeats = newSeats === null || newSeats === void 0 ? void 0 : newSeats.map((newSeat) => {
            var _a;
            if (((_a = newSeat === null || newSeat === void 0 ? void 0 : newSeat.user) === null || _a === void 0 ? void 0 : _a.toString()) === userId) {
                return {
                    seatNumber: newSeat.seatNumber,
                    seatStatus: false,
                };
            }
            return newSeat;
        });
        if (updatedSeats) {
            const coachData = yield coaches_schema_1.default.findByIdAndUpdate(coachId, {
                seats: updatedSeats,
            });
            res.status(200).json({
                message: "Ticket cancelled successfully",
                data: coachData,
            });
        }
        else {
            res.status(404).json({
                message: "No tickets found",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.cancelTicket = cancelTicket;
