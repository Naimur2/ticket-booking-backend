import { ICoach } from "../interfaces/main";
// add a coach

export const addCoach = async (req: Request, res: Response) => {
    try {
        const { startingPoint, destination, bus, startingTime } =
            req.body as ICoach;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// get all coaches

// get a coach by id

// update a coach

// delete a coach
