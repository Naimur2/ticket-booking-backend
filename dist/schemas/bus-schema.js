"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busSchema = void 0;
const mongoose_1 = require("mongoose");
const busSchema = new mongoose_1.Schema({
    busName: {
        type: String,
        required: true,
    },
    busNumber: {
        type: String,
        required: true,
    },
    busType: {
        type: String,
        required: true,
        enum: ["AC", "Non-AC"],
    },
    busDescription: {
        type: String,
        required: true,
    },
    busImage: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.busSchema = busSchema;
const Bus = (0, mongoose_1.model)("Bus", busSchema);
exports.default = Bus;
