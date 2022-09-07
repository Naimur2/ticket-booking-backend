"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachesSchema = void 0;
const mongoose_1 = require("mongoose");
const CoachesSchema = new mongoose_1.Schema({
    startingPoint: {
        type: mongoose_1.Types.ObjectId,
        ref: "Location",
    },
    destination: {
        type: mongoose_1.Types.ObjectId,
        ref: "Location",
    },
    bus: {
        type: mongoose_1.Types.ObjectId,
        ref: "Bus",
    },
    startingTime: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    maximumSeats: {
        type: Number,
        required: true,
        default: 4,
    },
    seats: [
        {
            seatNumber: {
                type: String,
                required: true,
            },
            seatStatus: {
                type: Boolean,
                required: true,
                default: false,
            },
            user: {
                type: mongoose_1.Types.ObjectId,
                ref: "User",
            },
        },
    ],
}, { timestamps: true });
exports.CoachesSchema = CoachesSchema;
const Coach = (0, mongoose_1.model)("Coach", CoachesSchema);
exports.default = Coach;
