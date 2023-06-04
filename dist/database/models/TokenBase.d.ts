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
    protected static _SafeSeparator(token: string): [string, string];
    /**
     * Generates a new token.
     */
    static GenerateToken(): ITokenBase;
    /**
     * Gets a token from the database.
     * @param token The token to get.
     * @returns The token or null if not found.
     */
    static GetToken(token: string): Promise<TokenBase>;
    /**
     * Validates if a given token is valid with the database.
     * @param token The token to validate.
     * @returns True or false if the token is valid.
     */
    static ValidateToken(token: string): Promise<boolean>;
    /**
     * Deletes the token from the database.
     */
    Delete(): Promise<void>;
}
