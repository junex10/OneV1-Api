"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const os_1 = require("os");
exports.defaultCreateOptions = {
    filename: path_1.join(os_1.tmpdir(), `html-pdf-${process.pid}.pdf`),
};
