import { ErrorRequestHandler, RequestHandler } from "express";

import createError from "http-errors";

export const notfoundandler: RequestHandler = (req, res, next) => {
    next(createError(404, "Your requested url was not found"));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next("Something went wrong");
    } else {
        res.status(err.status || 500);
        res.json({
            message: err?.message || "Something went wrong",
            error: err,
        });
    }
};
