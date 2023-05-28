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
exports.RSUtils = void 0;
class RSUtils {
    /**
     * Makes the program sleep for some miliseconds.
     * @param ms The time to wait.
     * @returns Your mom.
     */
    static async Sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Makes the program sleep for some miliseconds.
     * @param ms The time to wait.
     * @returns Your mom.
     */
    static async Wait(ms) {
        return await RSUtils.Sleep(ms);
    }
    /**
     * Encodes an ascii string to base64.
     * @param text The text to be converted to.
     * @returns The string encoded in base64.
     */
    static async ToBase64(text) {
        return Buffer.from(text, 'utf8').toString('base64');
    }
    /**
     * Decodes an ascii string to base64.
     * @param text The text to be converted to.
     * @returns The string decoded from base64.
     */
    static async FromBase64(text) {
        return Buffer.from(text, 'base64').toString('utf8');
    }
    /**
     * Encodes a string to base64 url safe.
     * @param text The text to be converted to.
     * @returns The string encoded in base64 url safe.
     */
    static async ToBase64Url(text) {
        return Buffer.from(text, 'utf8').toString('base64url');
    }
    /**
     * Decodes a string from base64 url safe.
     * @param text The text to be converted to.
     * @returns The string decoded from base64 url safe.
     */
    static async FromBase64Url(text) {
        return Buffer.from(text, 'base64url').toString('utf8');
    }
    /**
     * Escapes all html special characters in a string.
     * @param text The text to be converted to.
     * @returns The string with escaped html special characters.
     */
    static EscapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        for (const key in map) {
            const regex = new RegExp(key, 'g');
            text = text.replace(regex, map[key]);
        }
        return text;
    }
    /**
     * Separates a number with commas.
     * @param x The number to be separated.
     * @returns The separated number.
     */
    static NumberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    /**
     * Translates ms time to spanish.
     * @param ms The time to be translated.
     * @returns The translated time.
     */
    static TranslateTime(ms) {
        const words = {
            'second': 'segundo', 'seconds': 'segundos',
            'minute': 'minuto', 'minutes': 'minutos',
            'hour': 'hora', 'hours': 'horas',
            'day': 'día', 'days': 'días',
            'week': 'semana', 'weeks': 'semanas',
            'month': 'mes', 'months': 'meses',
            'year': 'año', 'years': 'años'
        };
        for (const word in words) {
            if (ms.includes(word)) {
                return `${ms.replace(word, words[word])}`;
            }
        }
        return ms;
    }
    /**
     * Anonymizes a user agent.
     * @param userAgent The user agent to be anonymized.
     * @returns The anonymized user agent.
     */
    static AnonymizeAgent(userAgent) {
        return userAgent
            .replace(/( \[FB(.*))$/g, '')
            .replace(/( V1_AND_(.*))$/g, '')
            .replace(/\/(\d+\.?)+/g, (match, p1) => {
            return match.split('.').map((v, i) => i === 0 ? v : '0').join('.');
        });
    }
    /**
     * Verifies a captcha token with hcaptcha.
     * @param token The private token.
     * @param secret The secret key.
     * @returns Whether the captcha is valid or not.
     */
    static async VerifyCaptcha(token, secret) {
        try {
            const res = await fetch(`https://hcaptcha.com/siteverify`, {
                method: 'POST',
                body: new URLSearchParams({ 'secret': secret, 'response': token })
            });
            if (res.ok) {
                const json = await res.json();
                return json.success;
            }
        }
        catch (_) { }
        return false;
    }
    /**
     * Gets the key of an enum by its value.
     * @param obj
     * @param value
     * @returns
     */
    static EnumKey(enumDeclaration, value) {
        for (const key in enumDeclaration) {
            if (enumDeclaration[key] === value) {
                return key;
            }
        }
        return null;
    }
    /**
     * Checks if a given string is a valid url.
     * @param url The url to be checked.
     * @returns Whether the url is valid or not.
     */
    static ValidURL(url) {
        try {
            new URL(url);
            return true;
        }
        catch (_) { }
        return false;
    }
}
exports.RSUtils = RSUtils;
//# sourceMappingURL=RSUtils.js.map