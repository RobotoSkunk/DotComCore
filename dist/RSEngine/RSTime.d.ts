import { LangCode } from '../language/defaults';
export declare class RSTime {
    private static readonly s;
    private static readonly m;
    private static readonly h;
    private static readonly d;
    private static readonly w;
    private static readonly M;
    private static readonly y;
    static get _SECOND_(): number;
    static get _MINUTE_(): number;
    static get _HOUR_(): number;
    static get _DAY_(): number;
    static get _WEEK_(): number;
    static get _MONTH_(): number;
    static get _YEAR_(): number;
    static readonly langs: {
        en: {
            n: string;
            s: string[];
            m: string[];
            h: string[];
            d: string[];
            w: string[];
            M: string[];
            y: string[];
            ago: string;
        };
        es: {
            n: string;
            s: string[];
            m: string[];
            h: string[];
            d: string[];
            w: string[];
            M: string[];
            y: string[];
            ago: string;
        };
        fr: {
            n: string;
            s: string[];
            m: string[];
            h: string[];
            d: string[];
            w: string[];
            M: string[];
            y: string[];
            ago: string;
        };
        pt: {
            n: string;
            s: string[];
            m: string[];
            h: string[];
            d: string[];
            w: string[];
            M: string[];
            y: string[];
            ago: string;
        };
    };
    /**
     * Translates a time in milliseconds to a human readable string.
     * @param ms The time in milliseconds.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static ToString(ms: number, lang?: LangCode): string;
    /**
     * Translates a date to a human readable string relative to the current time.
     * @param date The date to compare.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static Relative(date: Date, lang?: LangCode): string;
    /**
     * Translates a date to a human readable string relative to the current time, but with the word "ago" appended.
     * @param date The date to compare.
     * @param lang The language to use.
     * @returns A human readable string.
     */
    static RelativeAgo(date: Date, lang?: LangCode): string;
    /**
     * Sets the timezone of a date.
     * @param date The date to modify.
     * @param GTM The timezone to set in GTM.
     * @returns The modified date.
     */
    static SetTimezone(date: Date, GTM: number): Date;
    /**
     * Checks if the birthdate of a user is at least 13 years old.
     * @param birthdate The birthdate of the user.
     * @returns True if the user is at least 13 years old.
     */
    static MinimumAge(birthdate: Date): boolean;
    /**
     * Returns the age of the user in years, but anonymously.
     * @param birthdate The birthdate of the user.
     */
    static KAnonAge(birthdate: Date): number;
}
export declare namespace RSTime {
    enum MONTH_INDEX {
        JANUARY = 0,
        FEBRUARY = 1,
        MARCH = 2,
        APRIL = 3,
        MAY = 4,
        JUNE = 5,
        JULY = 6,
        AUGUST = 7,
        SEPTEMBER = 8,
        OCTOBER = 9,
        NOVEMBER = 10,
        DECEMBER = 11
    }
}
