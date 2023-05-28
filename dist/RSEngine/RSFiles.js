"use strict";
/*
    MIT License

    Copyright (c) 2023 Edgar Alexis Lima <contact@robotoskunk.com>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
class RSFiles {
    /**
     * Checks if a file exists.
     * @param filePath The file path to check.
     * @returns True or false if the file exists or not.
     */
    static async Exists(filePath) {
        var toReturn = true;
        fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
            if (err)
                toReturn = false;
        });
        return new Promise((resolve, reject) => {
            resolve(toReturn);
        });
    }
    /**
     * Asynchronously writes data to a file, replacing the file if it already exists.
     * @param filePath The file path to write.
     * @param data The data to write in.
     * @returns True or false if the writing fails.
     */
    static async Write(filePath, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await promises_1.default.writeFile(filePath, data);
                return resolve(true);
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    /**
     * Asynchronously reads the entire contents of a file.
     * @param filePath The file path to read.
     * @returns The file data if success or null if it fails.
     */
    static async Read(filePath) {
        return new Promise(async (resolve, reject) => {
            if (await RSFiles.Exists(filePath)) {
                try {
                    const data = await promises_1.default.readFile(filePath, 'utf-8');
                    resolve(data);
                }
                catch (err) {
                    return resolve(null);
                }
            }
            else {
                resolve(null);
            }
        });
    }
}
exports.RSFiles = RSFiles;
//# sourceMappingURL=RSFiles.js.map