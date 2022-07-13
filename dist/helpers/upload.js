"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const create_folder_1 = require("./create-folder");
const uploadFile = (maxFileSize, _allowedFileTypes, folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    const directory = path_1.default.join(__dirname, "../public/uploads" + folderPath);
    const folder = yield (0, create_folder_1.createFolder)(directory);
    const storage = (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            cb(null, folder);
        },
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const extension = path_1.default.extname(originalname);
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
    return (0, multer_1.default)({
        storage,
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter(req, file, callback) {
            if (_allowedFileTypes.includes(file.mimetype)) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        },
    });
});
exports.uploadFile = uploadFile;
