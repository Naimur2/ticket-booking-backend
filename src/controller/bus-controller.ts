import { Request, Response } from "express";
import Bus from "../schemas/bus-schema";
import { IBus } from "../interfaces/main";
import path from "path";
import { unlink } from "fs";

// add a bus
export const addBus = async (req: Request, res: Response) => {
    try {
        const {
            busName,
            busLiscenseNumber,
            busType,
            busDescription,
            seatNumber,
        } = req.body as IBus;

        const files = req.files as any;
        const busImage = "/uploads/bus-images/" + files[0].filename;

        const bus = new Bus({
            busName,
            busLiscenseNumber,
            busType,
            busDescription,
            busImage,
            seatNumber,
        });

        await bus.save();

        res.status(201).json({
            message: "Bus added successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// get all Buses

export const getAllBuses = async (req: Request, res: Response) => {
    try {
        const buses = await Bus.find();
        res.status(200).json({
            message: "Success",
            data: buses,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get a bus by id
export const getBusById = async (req: Request, res: Response) => {
    try {
        const bus = await Bus.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            data: bus,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// update a bus
export const updateBus = async (req: Request, res: Response) => {
    try {
        const {
            busName,
            busLiscenseNumber,
            busType,
            busDescription,
            seatNumber,
            busImage,
        } = req.body as IBus;

        let newBusImage = busImage;

        if (req.files && req.files.length > 0) {
            const oldBusImage = path.join(
                __dirname,
                "../public",
                busImage as string
            );

            unlink(oldBusImage, (err) => {
                if (err) {
                    res.status(500).json({
                        message: err.message,
                    });
                }
            });

            const files = req.files as any;

            newBusImage = "/uploads/bus-images/" + files[0].filename;
        }

        const bus = await Bus.findByIdAndUpdate(req.params.id, {
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
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// delete a bus
export const deleteBus = async (req: Request, res: Response) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Bus deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
