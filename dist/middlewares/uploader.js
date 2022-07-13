"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const helpers_1 = require("../helpers");
const uploader = (maxFileSize, _allowedFileTypes, folderPath, errorMessage) => {
    return (0, helpers_1.uploadFile)(maxFileSize, _allowedFileTypes, folderPath, errorMessage);
};
exports.uploader = uploader;
