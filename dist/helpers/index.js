"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.uploadFile = exports.createFolder = void 0;
var create_folder_1 = require("./create-folder");
Object.defineProperty(exports, "createFolder", { enumerable: true, get: function () { return create_folder_1.createFolder; } });
var file_uploader_1 = require("./file-uploader");
Object.defineProperty(exports, "uploadFile", { enumerable: true, get: function () { return file_uploader_1.uploadFile; } });
var start_db_1 = require("./start-db");
Object.defineProperty(exports, "run", { enumerable: true, get: function () { return start_db_1.run; } });
