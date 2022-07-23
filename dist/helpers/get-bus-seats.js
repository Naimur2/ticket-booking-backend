"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeats = void 0;
const getSeats = (seatNumber, seatsPerRow, cb) => {
    let l = 0, k = 0;
    let seats = [];
    for (let i = 0; i < seatNumber; i++) {
        if (i > 0 && i % seatsPerRow === 0) {
            k++;
            l = 0;
        }
        let char = String.fromCharCode(65 + k);
        char = char + "" + (l + 1);
        seats.push(char);
        cb === null || cb === void 0 ? void 0 : cb(char, i);
        l++;
    }
    return seats;
};
exports.getSeats = getSeats;
