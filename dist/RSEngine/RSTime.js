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
exports.RSTime = void 0;
const RSRandom_1 = require("./RSRandom");
class RSTime {
    static s = 1000;
    static m = this.s * 60;
    static h = this.m * 60;
    static d = this.h * 24;
    static w = this.d * 7;
    static M = this.d * 30;
    static y = this.d * 365;
    static get _SECOND_() { return this.s; }
    static get _MINUTE_() { return this.m; }
    static get _HOUR_() { return this.h; }
    static get _DAY_() { return this.d; }
    static get _WEEK_() { return this.w; }
    static get _MONTH_() { return this.M; }
    static get _YEAR_() { return this.y; }
    static langs = {
        en: {
            n: 'now',
            s: ['second', 'seconds'],
            m: ['minute', 'minutes'],
            h: ['hour', 'hours'],
            d: ['day', 'days'],
            w: ['week', 'weeks'],
            M: ['month', 'months'],
            y: ['year', 'years'],
            ago: '$ ago'
        },
        es: {
            n: 'ahora',
            s: ['segundo', 'segundos'],
            m: ['minuto', 'minutos'],
            h: ['hora', 'horas'],
            d: ['día', 'días'],
            w: ['semana', 'semanas'],
            M: ['mes', 'meses'],
            y: ['año', 'años'],
            ago: 'hace $'
        },
        fr: {
            n: 'maintenant',
            s: ['seconde', 'secondes'],
            m: ['minute', 'minutes'],
            h: ['heure', 'heures'],
            d: ['jour', 'jours'],
            w: ['semaine', 'semaines'],
            M: ['mois', 'mois'],
            y: ['an', 'ans'],
            ago: 'il y a $'
        },
        pt: {
            n: 'agora',
            s: ['segundo', 'segundos'],
            m: ['minuto', 'minutos'],
            h: ['hora', 'horas'],
            d: ['dia', 'dias'],
            w: ['semana', 'semanas'],
            M: ['mês', 'meses'],
            y: ['ano', 'anos'],
            ago: 'há $'
        }
    };
    /**
     * Translates a time in milliseconds to a human readable string.
     * @param ms The time in milliseconds.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static ToString(ms, lang = 'en') {
        var langData = this.langs[lang];
        if (!langData) {
            langData = this.langs.en;
        }
        const t = Math.abs(ms);
        if (t >= this.y)
            return `${Math.round(t / this.y)} ${langData.y[+(t >= this.y * 2)]}`;
        if (t >= this.M)
            return `${Math.round(t / this.M)} ${langData.M[+(t >= this.M * 2)]}`;
        if (t >= this.w)
            return `${Math.round(t / this.w)} ${langData.w[+(t >= this.w * 2)]}`;
        if (t >= this.d)
            return `${Math.round(t / this.d)} ${langData.d[+(t >= this.d * 2)]}`;
        if (t >= this.h)
            return `${Math.round(t / this.h)} ${langData.h[+(t >= this.h * 2)]}`;
        if (t >= this.m)
            return `${Math.round(t / this.m)} ${langData.m[+(t >= this.m * 2)]}`;
        if (t >= this.s)
            return `${Math.round(t / this.s)} ${langData.s[+(t >= this.s * 2)]}`;
        return langData.n;
    }
    /**
     * Translates a date to a human readable string relative to the current time.
     * @param date The date to compare.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static Relative(date, lang = 'en') {
        return RSTime.ToString(Date.now() - date.getTime(), lang);
    }
    /**
     * Translates a date to a human readable string relative to the current time, but with the word "ago" appended.
     * @param date The date to compare.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static RelativeAgo(date, lang = 'en') {
        const __tmp = RSTime.Relative(date, lang);
        if (__tmp === this.langs[lang].n) {
            return __tmp;
        }
        return this.langs[lang].ago.replace('$', __tmp);
    }
    /**
     * Sets the timezone of a date.
     * @param date The date to modify.
     * @param GTM The timezone to set in GTM.
     * @returns The modified date.
     */
    static SetTimezone(date, GTM) {
        return new Date(date.getTime() + GTM * 60 * 60 * 1000);
    }
    /**
     * Checks if the birthdate of a user is at least 13 years old.
     * @param birthdate The birthdate of the user.
     * @returns True if the user is at least 13 years old.
     */
    static MinimumAge(birthdate) {
        return Date.now() - birthdate.getTime() >= this.y * 13;
    }
    /**
     * Returns the age of the user in years, but anonymously.
     * @param birthdate The birthdate of the user.
     */
    static KAnonAge(birthdate) {
        const age = ~~((Date.now() - birthdate.getTime()) / this.y);
        if (age < 16)
            return RSRandom_1.RSRandom.IntRange(8, 15);
        if (age < 18)
            return RSRandom_1.RSRandom.Choose([16, 17]);
        if (age < 30)
            return RSRandom_1.RSRandom.IntRange(18, 29);
        return RSRandom_1.RSRandom.IntRange(30, 50);
    }
}
exports.RSTime = RSTime;
(function (RSTime) {
    let MONTH_INDEX;
    (function (MONTH_INDEX) {
        MONTH_INDEX[MONTH_INDEX["JANUARY"] = 0] = "JANUARY";
        MONTH_INDEX[MONTH_INDEX["FEBRUARY"] = 1] = "FEBRUARY";
        MONTH_INDEX[MONTH_INDEX["MARCH"] = 2] = "MARCH";
        MONTH_INDEX[MONTH_INDEX["APRIL"] = 3] = "APRIL";
        MONTH_INDEX[MONTH_INDEX["MAY"] = 4] = "MAY";
        MONTH_INDEX[MONTH_INDEX["JUNE"] = 5] = "JUNE";
        MONTH_INDEX[MONTH_INDEX["JULY"] = 6] = "JULY";
        MONTH_INDEX[MONTH_INDEX["AUGUST"] = 7] = "AUGUST";
        MONTH_INDEX[MONTH_INDEX["SEPTEMBER"] = 8] = "SEPTEMBER";
        MONTH_INDEX[MONTH_INDEX["OCTOBER"] = 9] = "OCTOBER";
        MONTH_INDEX[MONTH_INDEX["NOVEMBER"] = 10] = "NOVEMBER";
        MONTH_INDEX[MONTH_INDEX["DECEMBER"] = 11] = "DECEMBER";
    })(MONTH_INDEX = RSTime.MONTH_INDEX || (RSTime.MONTH_INDEX = {}));
})(RSTime = exports.RSTime || (exports.RSTime = {}));
exports.RSTime = RSTime;
//# sourceMappingURL=RSTime.js.map