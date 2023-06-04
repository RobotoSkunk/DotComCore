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
exports.User = void 0;
const __1 = __importDefault(require("../.."));
const RSEngine_1 = require("../../RSEngine");
const Email_1 = require("./Email");
const UserRoles_1 = require("./utils/UserRoles");
const bcrypt_1 = __importDefault(require("bcrypt"));
const argon2_1 = __importDefault(require("argon2"));
/**
 * Represents an user account.
 * Note: This class is not intended to create, update or delete users, it is only
 * intended to retrieve user data.
 */
class User {
    id;
    hash;
    name;
    handler;
    birthdate;
    roles;
    constructor(data) {
        this.id = data.id;
        this.hash = data.hash;
        this.name = data.name;
        this.handler = data.handler;
        this.birthdate = data.birthdate;
        this.roles = data.roles;
    }
    get url() {
        return `/user/${this.handler}`;
    }
    get avatar() {
        return `/avatar/default.webp`; // `/avatar/${this.handler}.webp`;
    }
    /**
     * Generates a crypto key for the user.
     * @param hash The user hash.
     * @returns The crypto key.
     */
    static async GenerateCryptoKey(hash) {
        return await RSEngine_1.RSCrypto.PBKDF2(__1.default.encryptionKey, hash, 1000, 32);
    }
    /**
     * Returns the crypto key for the user.
     * @returns The crypto key.
     */
    async GetCryptoKey() {
        return await User.GenerateCryptoKey(this.hash);
    }
    /**
     * Converts a SQL query result to an email address.
     * @param queryData The SQL query result.
     * @returns	The email address.
     */
    static _SQL2User(queryData) {
        return new User({
            id: queryData.id,
            hash: queryData.hash,
            name: queryData.name,
            handler: queryData.handler,
            birthdate: queryData.birthdate,
            roles: new UserRoles_1.UserRoles(queryData.roles)
        });
    }
    /**
     * Checks if the password is correct.
     * @param password The password to check.
     * @param id The user ID.
     * @returns True if the password is correct, otherwise false.
     */
    static async _CheckPassword(password, id) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT password FROM users WHERE id = $1`, [id]);
            const passwordHash = query.rows[0].password;
            // If the password hash starts with $2, it means that the password is hashed with bcrypt.
            if (passwordHash.startsWith('$2')) {
                if (!(await bcrypt_1.default.compare(password, passwordHash))) {
                    return false;
                }
                // Bcrypt is deprecated, so we will update the password hash to argon2.
                const newPassword = await argon2_1.default.hash(password);
                await client.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, id]);
            }
            else {
                if (!(await argon2_1.default.verify(passwordHash, password))) {
                    return false;
                }
                // For security reasons, rehash the password if needed.
                if (argon2_1.default.needsRehash(passwordHash)) {
                    const newPassword = await argon2_1.default.hash(password);
                    await client.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, id]);
                }
            }
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Authenticate the user by email and password.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @returns The user object if the authentication was successful, otherwise null.
     */
    static async Authenticate(email, password) {
        const client = await __1.default.Connect();
        try {
            const emailObj = await Email_1.Email.Get(email);
            if (!emailObj || emailObj.type !== Email_1.Email.Type.PRIMARY) {
                return null;
            }
            if (!(await User._CheckPassword(password, emailObj.userId))) {
                return null;
            }
            const user = await User.GetById(emailObj.userId);
            return user;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Returns an user by its ID.
     * @param id The user ID.
     * @returns The user object if found, otherwise null.
     */
    static async GetById(id) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT id, hash, name, handler, birthdate, roles
												FROM users WHERE id = $1`, [id]);
            if (query.rowCount === 0) {
                return null;
            }
            return new User(User._SQL2User(query.rows[0]));
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Returns an user by its handler.
     * @param handler The user handler.
     * @returns The user object if found, otherwise null.
     */
    static async GetByHandler(handler) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT id, hash, name, handler, birthdate, roles
												FROM users WHERE handler = $1`, [handler]);
            if (query.rowCount === 0) {
                return null;
            }
            return new User(User._SQL2User(query.rows[0]));
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Checks if an user exists.
     * @param id The user ID.
     * @returns True if the user exists, otherwise false.
     */
    static async Exists(id) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT 1 FROM users WHERE id = $1`, [id]);
            return query.rowCount > 0;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Checks if an user exists by its handler.
     * @param handler The user handler.
     * @returns True if the user exists, otherwise false.
     */
    static async ExistsByHandler(handler) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT 1 FROM users WHERE handler = $1`, [handler]);
            return query.rowCount > 0;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Verifies the user password.
     * @param password The password to verify.
     * @returns True if the password is correct, otherwise false.
     */
    async VerifyPassword(password) {
        return await User._CheckPassword(password, this.id);
    }
    /**
     * Checks if the user has 2FA enabled.
     * @returns True if the user has 2FA enabled, otherwise false.
     */
    async Uses2FA() {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT totp_enabled FROM users WHERE id = $1`, [this.id]);
            return query.rows[0].totp_enabled;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Returns the user primary email.
     */
    async GetPrimaryEmail() {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT id FROM emails WHERE usrid = $1 AND refer = 0`, [this.id]);
            return await Email_1.Email.Get(query.rows[0].id);
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Returns the user emails.
     * Note: This method only returns secondary emails if the user has some.
     */
    async *GetSecondaryEmails() {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT id FROM emails WHERE usrid = $1 AND refer = 2`, [this.id]);
            if (query.rowCount === 0) {
                const primaryEmail = await this.GetPrimaryEmail();
                return yield primaryEmail;
            }
            else {
                for (const email of query.rows) {
                    yield await Email_1.Email.Get(email.id);
                }
            }
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map