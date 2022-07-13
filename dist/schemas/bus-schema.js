"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busSchema = void 0;
const mongoose_1 = require("mongoose");
const busSchema = new mongoose_1.Schema({
    busName: {
        type: String,
        required: true,
    },
    busLiscenseNumber: {
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
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.busSchema = busSchema;
const Bus = (0, mongoose_1.model)("Bus", busSchema);
exports.default = Bus;
