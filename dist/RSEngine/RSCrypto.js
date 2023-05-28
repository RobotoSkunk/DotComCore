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
exports.RSCrypto = void 0;
const crypto_1 = __importDefault(require("crypto"));
class RSCrypto {
    /**
     * The algorithm to use for hashing.
     */
    static algo = 'sha256';
    /**
     * Hashes a string using SHA256.
     * @param data The string to hash.
     * @returns The hashed string.
     */
    static Hash(data) {
        return crypto_1.default.createHash(this.algo).update(data).digest('hex');
    }
    /**
     * Compares two strings safely.
     * @param a The first string.
     * @param b The second string.
     * @returns True or false if the strings are equal.
     */
    static Compare(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        var result = 0;
        for (var i = 0; i < a.length; i++) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
     * Generates a random bytes string encoded in base64 url safe.
     * @param length The length of the random bytes.
     * @returns The random bytes string encoded in base64 url safe.
     */
    static RandomBytes(length) {
        return crypto_1.default.randomBytes(length).toString('base64url');
    }
    /**
     * Encrypts a string using AES-256-GCM.
     * @param data The data to encrypt.
     * @param key The encryption key.
     * @returns The encrypted data encoded in base64.
     */
    static async Encrypt(data, key) {
        return new Promise((resolve, reject) => {
            try {
                const sha256 = crypto_1.default.createHash(this.algo);
                sha256.update(key);
                const iv = crypto_1.default.randomBytes(16);
                const cipher = crypto_1.default.createCipheriv('aes-256-gcm', sha256.digest(), iv);
                const ciphertext = cipher.update(Buffer.from(data));
                resolve(Buffer.concat([
                    iv,
                    ciphertext,
                    cipher.final(),
                    cipher.getAuthTag()
                ]).toString('base64'));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Decrypts a string using AES-256-GCM.
     * @param data The encrypted data encoded in base64.
     * @param key The encryption key.
     * @returns The decrypted data.
     */
    static async Decrypt(data, key) {
        return new Promise((resolve, reject) => {
            try {
                const sha256 = crypto_1.default.createHash(this.algo);
                sha256.update(key);
                const dataBuffer = Buffer.from(data, 'base64');
                const iv = dataBuffer.subarray(0, 16);
                const authTag = dataBuffer.subarray(dataBuffer.length - 16);
                const ciphertext = dataBuffer.subarray(16, dataBuffer.length - 16);
                const decipher = crypto_1.default.createDecipheriv('aes-256-gcm', sha256.digest(), iv);
                decipher.setAuthTag(authTag);
                const plaintext = decipher.update(ciphertext);
                resolve(Buffer.concat([plaintext, decipher.final()]).toString());
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Generates an HMAC using SHA256.
     * @param data The data to hash.
     * @param key The key to use.
     * @returns The HMAC.
     */
    static HMAC(data, key) {
        return crypto_1.default.createHmac('sha256', key).update(data).digest('hex');
    }
    /**
     * Generates a PBKDF2 hash.
     * @param data The data to hash.
     * @param salt The salt to use.
     * @param iterations The number of iterations.
     * @param keylen The length of the key.
     * @returns The resulting hash.
     */
    static async PBKDF2(data, salt, iterations, keylen) {
        return new Promise((resolve, reject) => {
            crypto_1.default.pbkdf2(data, salt, iterations, keylen, 'sha256', (err, derivedKey) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(derivedKey.toString('hex'));
            });
        });
    }
}
exports.RSCrypto = RSCrypto;
//# sourceMappingURL=RSCrypto.js.map