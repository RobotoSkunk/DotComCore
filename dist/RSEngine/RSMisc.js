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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSMisc = void 0;
// Note: RSMisc is just a compatibility translation layer for the old RSEngine.
const RSUtils_1 = require("./RSUtils");
/**
 * @deprecated Use RSUtils instead.
 */
exports.RSMisc = {};
for (const key in RSUtils_1.RSUtils) {
    exports.RSMisc[key] = RSUtils_1.RSUtils[key];
}
//# sourceMappingURL=RSMisc.js.map