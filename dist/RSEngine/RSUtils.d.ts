export declare class RSUtils {
    /**
     * Makes the program sleep for some miliseconds.
     * @param ms The time to wait.
     * @returns Your mom.
     */
    static Sleep(ms: number): Promise<void>;
    /**
     * Makes the program sleep for some miliseconds.
     * @param ms The time to wait.
     * @returns Your mom.
     */
    static Wait(ms: number): Promise<void>;
    /**
     * Encodes an ascii string to base64.
     * @param text The text to be converted to.
     * @returns The string encoded in base64.
     */
    static ToBase64(text: string): Promise<string>;
    /**
     * Decodes an ascii string to base64.
     * @param text The text to be converted to.
     * @returns The string decoded from base64.
     */
    static FromBase64(text: string): Promise<string>;
    /**
     * Encodes a string to base64 url safe.
     * @param text The text to be converted to.
     * @returns The string encoded in base64 url safe.
     */
    static ToBase64Url(text: string): Promise<string>;
    /**
     * Decodes a string from base64 url safe.
     * @param text The text to be converted to.
     * @returns The string decoded from base64 url safe.
     */
    static FromBase64Url(text: string): Promise<string>;
    /**
     * Escapes all html special characters in a string.
     * @param text The text to be converted to.
     * @returns The string with escaped html special characters.
     */
    static EscapeHtml(text: string): string;
    /**
     * Separates a number with commas.
     * @param x The number to be separated.
     * @returns The separated number.
     */
    static NumberWithCommas(x: number): string;
    /**
     * Translates ms time to spanish.
     * @param ms The time to be translated.
     * @returns The translated time.
     */
    static TranslateTime(ms: string): string;
    /**
     * Anonymizes a user agent.
     * @param userAgent The user agent to be anonymized.
     * @returns The anonymized user agent.
     */
    static AnonymizeAgent(userAgent: string): string;
    /**
     * Verifies a captcha token with hcaptcha.
     * @param token The private token.
     * @param secret The secret key.
     * @returns Whether the captcha is valid or not.
     */
    static VerifyCaptcha(token: string, secret: string): Promise<boolean>;
    /**
     * Gets the key of an enum by its value.
     * @param obj
     * @param value
     * @returns
     */
    static EnumKey<T>(enumDeclaration: T, value: any): keyof T | null;
    /**
     * Checks if a given string is a valid url.
     * @param url The url to be checked.
     * @returns Whether the url is valid or not.
     */
    static ValidURL(url: string): boolean;
}
