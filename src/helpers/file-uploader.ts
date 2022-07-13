import multer, { diskStorage, Multer } from "multer";
import path from "path";
import { createFolder } from "./create-folder";
import createError from "http-errors";

export const uploadFile = async (
    maxFileSize: number,
    _allowedFileTypes: string[],
    folderPath: string,
    errorMessage: string
): Promise<Multer> => {
    const directory = path.join(__dirname, "../public/uploads" + folderPath);
    const folder = await createFolder(directory);

    const storage = diskStorage({
        destination: (req, file, cb) => {
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const extension = path.extname(originalname);
            const filename = originalname
                .replace(extension, "")
                .trim()
                .split(" ")
                .join("-")
                .toLowerCase()
                .concat(Date.now().toString())
                .concat(extension);
            cb(null, filename);
        },
    });

    return multer({
        storage,
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter(req, file, callback) {
            if (_allowedFileTypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(createError(errorMessage));
            }
        },
    });
};
