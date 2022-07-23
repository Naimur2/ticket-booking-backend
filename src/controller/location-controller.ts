import { Request, Response } from "express";
import { ILocation } from "../interfaces/main";
import Location from "../schemas/location-schema";

export const getAllLocation = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            message: "Success",
            locations,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getLocationById = async (req: Request, res: Response) => {
    try {
        const location = await Location.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            location,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createLocation = async (req: Request, res: Response) => {
    try {
        const data: ILocation = req.body;

        const newData = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            description: data.description,
        };

        const location = new Location(newData);

        await location.save();
        res.status(201).json({
            message: "Success",
            location,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        res.status(200).json({
            message: "Success",
            location,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Location deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
