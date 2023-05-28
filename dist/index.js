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
const database_1 = require("./database");
const RSEngine_1 = require("./RSEngine");
class DotComCore {
    static _options;
    static _database;
    static Config(options) {
        this._options = options;
        this._database = new database_1.Database(this._options.database.host, this._options.database.database, this._options.database.user, this._options.database.password, this._options.database.port);
    }
    static get hmacSecret() {
        return this._options.hmacSecret;
    }
    static get hmacSalt() {
        return this._options.hmacSalt;
    }
    static get encryptionKey() {
        return this._options.encryptionKey;
    }
    static async Connect() {
        return await this._database.Connect();
    }
    static async HMAC(data) {
        return RSEngine_1.RSCrypto.HMAC(data, DotComCore.hmacSecret);
    }
}
exports.default = DotComCore;
//# sourceMappingURL=index.js.map