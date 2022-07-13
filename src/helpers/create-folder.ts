import fs from "fs";
import createError from "http-errors";

export const createFolder = async (directory: string): Promise<string> => {
    try {
        console.log(directory);
        const isExistsFolder = fs.existsSync(directory);
        if (!isExistsFolder) {
            console.warn(`Folder ${directory} does not exists. Creating it...`);
            fs.mkdirSync(directory);
            return directory;
        }
        return directory;
    } catch (error) {
        throw createError(500, "Error create folder");
    }
};
