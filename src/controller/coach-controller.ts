import { RequestHandler } from "express";
import { ICoach } from "../interfaces/main";
import Coach from "../schemas/coaches-schema";
import { getSeats } from "../helpers/get-bus-seats";
import Bus from "../schemas/bus-schema";

// add a coach
export const addCoach: RequestHandler = async (req, res) => {
    try {
        const { startingPoint, destination, bus, startingTime, price, date } =
            req.body;

        const busDetails = await Bus.findById(bus);
        const seatNo = busDetails?.seatNumber as any;

        const seats = getSeats(seatNo, 4).map((seat) => {
            return {
                seatNumber: seat,
            };
        });

        const coach = new Coach({
            startingPoint,
            destination,
            bus,
            startingTime,
            price,
            date,
            seats,
        });

        await coach.save();

        res.status(201).json({
            message: "Coach added successfully",
            // data: coach,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// get all coaches
export const getAllCoaches: RequestHandler = async (req, res) => {
    try {
        const coaches = await Coach.find().populate(
            "startingPoint destination bus"
        );

        res.status(200).json({
            message: "Success",
            data: coaches,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get a coach by id
export const getCoachById: RequestHandler = async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id).populate(
            "startingPoint destination bus"
        );

        res.status(200).json({
            message: "Success",
            data: coach,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// update a coach
export const updateCoach: RequestHandler = async (req, res) => {
    try {
        const { startingPoint, destination, bus, startingTime } =
            req.body as ICoach;

        const coach = await Coach.findByIdAndUpdate(req.params.id, {
            startingPoint,
            destination,
            bus,
            startingTime,
        });

        const updatedCoach = await Coach.findById(req.params.id).populate(
            "startingPoint destination bus"
        );

        res.status(200).json({
            message: "Coach updated successfully",
            data: updatedCoach,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// delete a coach
export const deleteCoach: RequestHandler = async (req, res) => {
    try {
        await Coach.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Coach deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// delete a coach
export const searchCoach: RequestHandler = async (req, res) => {
    try {
        const { startingPoint, destination, date } = req.body;
        console.log(startingPoint, destination, date);
        const data = await Coach.find({
            startingPoint,
            destination,
            date: date,
        }).populate("startingPoint destination bus");

        if (data.length === 0) {
            res.status(200).json({
                message: "No coaches found",
                data: data,
            });
        } else {
            res.status(200).json({
                message: "Success",
                data: data,
            });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
