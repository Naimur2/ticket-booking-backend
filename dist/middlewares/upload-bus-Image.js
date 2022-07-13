"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBusImage = void 0;
const helpers_1 = require("../helpers");
const uploadBusImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const maxFileSize = 5000000;
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const folderPath = "/bus-images/";
    const errorMessage = "Invalid file type. Only jpeg and png are allowed.";
    const upload = yield (0, helpers_1.uploadFile)(maxFileSize, allowedFileTypes, folderPath, errorMessage);
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
        }
        else {
            next();
        }
    });
});
exports.uploadBusImage = uploadBusImage;
