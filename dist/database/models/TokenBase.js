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
exports.TokenBase = void 0;
const Core_1 = __importDefault(require("../../Core"));
const RSEngine_1 = require("../../RSEngine");
const crypto_1 = __importDefault(require("crypto"));
/**
 * Represents a generic token.
 */
class TokenBase {
    id;
    validator;
    createdAt;
    expiresAt;
    constructor(id, validator, createdAt, expiresAt) {
        this.id = id;
        this.validator = validator;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
    /**
     * Splits a token into two parts, the id and the validator.
     * @param token The token to split.
     * @returns A tuple with the id and the validator.
     */
    static _SafeSeparator(token) {
        if (!token.includes('.')) {
            return ['', ''];
        }
        const [id, validator] = token.split('.');
        return [id, validator];
    }
    /**
     * Generates a new token.
     */
    static GenerateToken() {
        const id = crypto_1.default.randomBytes(32).toString('base64url');
        const validator = crypto_1.default.randomBytes(64).toString('base64url');
        return {
            id,
            validator: RSEngine_1.RSCrypto.Hash(validator),
            createdAt: null,
            expiresAt: null,
            originalValidator: validator
        };
    }
    /**
     * Validates if a given token is valid with the database.
     * @param token The token to validate.
     * @returns True or false if the token is valid.
     */
    static async ValidateToken(token) {
        const [id, validator] = TokenBase._SafeSeparator(token);
        if (id === '' || validator === '') {
            return false;
        }
        const client = await Core_1.default.Connect();
        try {
            const result = await client.query(`SELECT val_key FROM tokens WHERE id = $1`, [id]);
            if (result.rowCount === 0) {
                return false;
            }
            const validatorHash = result.rows[0].val_key;
            if (!RSEngine_1.RSCrypto.CompareHash(validator, validatorHash)) {
                return false;
            }
            return true;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
}
exports.TokenBase = TokenBase;
//# sourceMappingURL=TokenBase.js.map