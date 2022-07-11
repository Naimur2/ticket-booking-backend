import { Request, Response } from "express";
import Bus from "../schemas/bus-schema";
import { IBus } from "../interfaces/main";

// add a bus
export const addBus = async (req: Request, res: Response) => {
    try {
        const {
            busName,
            busNumber,
            busType,
            busDescription,
            seatNumber,
            busImage,
        } = req.body as IBus;

        const newData = {};
    } catch (error) {}
};

// get all Buses

// get a bus by id

// update a bus

// delete a bus
