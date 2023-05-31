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
exports.Email = void 0;
const __1 = __importDefault(require("../.."));
const promises_1 = __importDefault(require("dns/promises"));
const conf_1 = require("../../__internal__/conf");
/**
 * Represents an email address.
 */
class Email {
    id;
    hash;
    email;
    userId;
    type;
    verified;
    createdAt;
    isFake;
    static regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor(email) {
        this.id = email.id;
        this.hash = email.hash;
        this.email = email.email;
        this.userId = email.userId;
        this.type = email.type;
        this.verified = email.verified;
        this.createdAt = email.createdAt;
        this.isFake = email.isFake;
    }
    // #region Static methods
    /**
     * Converts a SQL query result to an email address.
     * @param queryData The SQL query result.
     * @returns	The email address.
     */
    static _SQL2Email(queryData) {
        return new Email({
            id: queryData.id,
            hash: queryData.hash,
            email: queryData.email,
            userId: queryData.usrid,
            type: queryData.refer,
            verified: queryData.verified,
            createdAt: queryData.created_at,
            isFake: queryData.is_fake
        });
    }
    /**
     * Hashes an email address using _HMAC.
     * @param email The email address.
     * @returns The hashed email address.
     */
    static async _HMAC(email) {
        return __1.default.HMAC(email.toLowerCase() + __1.default.hmacSalt);
    }
    /**
     * Gets an email address by its id.
     * @param id The email id.
     * @returns The email address, or null if not found.
     */
    static async GetById(id) {
        const client = await __1.default.Connect();
        try {
            const query = await client.query(`SELECT * FROM emails WHERE id = $1`, [id]);
            if (query.rowCount === 0) {
                return null;
            }
            return Email._SQL2Email(query.rows[0]);
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Gets an email address.
     * @param email The email address.
     * @returns The email address, or null if not found.
     */
    static async Get(email) {
        const client = await __1.default.Connect();
        try {
            const _HMAC = Email._HMAC(email);
            const query = await client.query(`SELECT * FROM emails WHERE hash = $1`, [_HMAC]);
            if (query.rowCount === 0) {
                return null;
            }
            return Email._SQL2Email(query.rows[0]);
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    /**
     * Verifies if an email address is valid.
     * @param email The email address.
     * @returns True if the email address is valid, false otherwise.
     */
    static async VerifyIfValid(email) {
        // Check syntax of email
        email = email.toLowerCase();
        if (email.length > 200 || !Email.regex.test(email)) {
            return false;
        }
        const [user, domain] = email.split('@');
        // Check if user is not a reserved name
        if (Email.invalidNames.includes(user)) {
            return false;
        }
        // Check if domain is a pre-approved domain (this is to prevent doing DNS lookups for common domains)
        if (Email.validDomains.includes(domain)) {
            return true;
        }
        // Check if domain is not disposable
        try {
            for (const line of Email.disposableEmailBlocklist) {
                if (line === user)
                    return false;
            }
        }
        catch (_) { }
        // If everything is ok, check if domain has MX records
        const records = await Email.LookupMX(domain);
        if (records.length === 0) {
            return false;
        }
        // No problems found, email is valid
        return true;
    }
    /**
     * Reaches out to the DNS server to get the MX records for a domain.
     * @param domain The domain.
     * @returns The found MX records.
     */
    static async LookupMX(domain) {
        try {
            return await promises_1.default.resolveMx(domain);
        }
        catch (_) { }
        return [];
    }
    /**
     * Checks if an email address exists.
     * @param email The email address.
     * @returns True if the email address exists, false otherwise.
     */
    static async Exists(email) {
        const client = await __1.default.Connect();
        try {
            const _HMAC = await Email._HMAC(email);
            const query = await client.query(`SELECT 1 FROM emails WHERE hash = $1`, [_HMAC]);
            return query.rowCount > 0;
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
    // #endregion
    // #region Instance methods
    /**
     * Updates the type of an email address.
     * @param type The new type.
     */
    async SetType(type) {
        const client = await __1.default.Connect();
        try {
            await client.query(`UPDATE emails SET refer = $1 WHERE id = $2`, [type, this.id]);
        }
        catch (e) {
            throw e;
        }
        finally {
            client.release();
        }
    }
}
exports.Email = Email;
(function (Email) {
    /**
     * List of email address types.
     */
    let Type;
    (function (Type) {
        Type[Type["PRIMARY"] = 0] = "PRIMARY";
        Type[Type["CONTACT"] = 1] = "CONTACT";
        Type[Type["SECONDARY"] = 2] = "SECONDARY";
    })(Type = Email.Type || (Email.Type = {}));
    /**
     * List of pre-valid domains for email addresses.
     */
    Email.validDomains = [];
    /**
     * List of common bot names that are not allowed to register.
     */
    Email.invalidNames = [];
    /**
     * List of disposable email domains.
     */
    Email.disposableEmailBlocklist = [];
})(Email = exports.Email || (exports.Email = {}));
exports.Email = Email;
(async () => {
    for (const domain of await conf_1.ConfigLoader.Load('common_email_domains_whitelist.conf')) {
        Email.validDomains.push(domain);
    }
    for (const name of await conf_1.ConfigLoader.Load('email_names_blocklist.conf')) {
        Email.invalidNames.push(name);
    }
    for (const domain of await conf_1.ConfigLoader.Load('disposable_email_blocklist.conf')) {
        Email.disposableEmailBlocklist.push(domain);
    }
});
//# sourceMappingURL=Email.js.map