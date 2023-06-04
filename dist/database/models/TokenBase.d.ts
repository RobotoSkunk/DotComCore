export interface ITokenBase {
    id: string;
    validator: string;
    createdAt: Date;
    expiresAt: Date;
    originalValidator?: string;
}
/**
 * Represents a generic token.
 */
export declare class TokenBase implements ITokenBase {
    id: string;
    validator: string;
    createdAt: Date;
    expiresAt: Date;
    constructor(id: string, validator: string, createdAt: Date, expiresAt: Date);
    /**
     * Splits a token into two parts, the id and the validator.
     * @param token The token to split.
     * @returns A tuple with the id and the validator.
     */
    private static _SafeSeparator;
    /**
     * Generates a new token.
     */
    static GenerateToken(): ITokenBase;
    /**
     * Validates if a given token is valid with the database.
     * @param token The token to validate.
     * @returns True or false if the token is valid.
     */
    static ValidateToken(token: string): Promise<boolean>;
}