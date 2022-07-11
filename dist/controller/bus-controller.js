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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBus = void 0;
// add a bus
const addBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busName, busNumber, busType, busDescription, seatNumber, busImage, } = req.body;
        const newData = {};
    }
    catch (error) { }
});
exports.addBus = addBus;
// get all Buses
// get a bus by id
// update a bus
// delete a bus
