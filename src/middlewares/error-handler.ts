import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";

import createError from "http-errors";

export const notfoundandler: RequestHandler = (req, res, next) => {
    next(createError(404, "Your requested url was not found"));
};

export const errorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err?.headerSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
    });
};
