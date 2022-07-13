import { uploadFile } from "../helpers";
import { RequestHandler } from "express";

export const uploadBusImage: RequestHandler = async (req, res, next) => {
    const maxFileSize = 5000000;
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const folderPath = "/bus-images/";
    const errorMessage = "Invalid file type. Only jpeg and png are allowed.";

    const upload = await uploadFile(
        maxFileSize,
        allowedFileTypes,
        folderPath,
        errorMessage
    );

    const uploader = upload.any();

    uploader(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    busImage: {
                        message: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
};
