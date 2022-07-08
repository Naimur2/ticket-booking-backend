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
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getAllLocation = void 0;
const locatio_schema_1 = __importDefault(require("../schemas/locatio-schema"));
const getAllLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield locatio_schema_1.default.find();
        res.status(200).json({
            message: "Success",
            locations,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllLocation = getAllLocation;
const getLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield locatio_schema_1.default.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            location,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getLocationById = getLocationById;
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newData = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            description: data.description,
        };
        const location = new locatio_schema_1.default(newData);
        yield location.save();
        res.status(201).json({
            message: "Success",
            location,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createLocation = createLocation;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield locatio_schema_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            message: "Success",
            location,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield locatio_schema_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Location deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteLocation = deleteLocation;
