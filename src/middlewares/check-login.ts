import { Request, RequestHandler, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ITokenData } from "../interfaces/main";
dotenv.config();

const { env } = process;

const checkLogin: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.headers) {
        const { authorization } = req.headers as any;
        try {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, env.JWT_SECRET as string);
            const { _id, email } = decoded as ITokenData;
            req.body.user = { _id, email };

            next();
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    }
};

export default checkLogin;
