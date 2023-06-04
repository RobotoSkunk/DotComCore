import { Email } from './Email';
import { UserRoles } from './utils/UserRoles';
export interface IUser {
    id: string;
    hash: string;
    name: string;
    handler: string;
    birthdate: Date;
    roles: UserRoles;
    createdAt?: Date;
    bio?: string;
    endDate?: Date;
}
/**
 * Represents an user account.
 * Note: This class is not intended to create, update or delete users, it is only
 * intended to retrieve user data.
 */
export declare class User implements IUser {
    id: string;
    hash: string;
    name: string;
    handler: string;
    birthdate: Date;
    roles: UserRoles;
    constructor(data: IUser);
    get url(): string;
    get avatar(): string;
    /**
     * Generates a crypto key for the user.
     * @param hash The user hash.
     * @returns The crypto key.
     */
    private static GenerateCryptoKey;
    /**
     * Returns the crypto key for the user.
     * @returns The crypto key.
     */
    GetCryptoKey(): Promise<string>;
    /**
     * Converts a SQL query result to an email address.
     * @param queryData The SQL query result.
     * @returns	The email address.
     */
    private static _SQL2User;
    /**
     * Checks if the password is correct.
     * @param password The password to check.
     * @param id The user ID.
     * @returns True if the password is correct, otherwise false.
     */
    private static _CheckPassword;
    /**
     * Authenticate the user by email and password.
     * @param email The email address of the user.
     * @param password The password of the user.
     * @returns The user object if the authentication was successful, otherwise null.
     */
    static Authenticate(email: string, password: string): Promise<User | null>;
    /**
     * Returns an user by its ID.
     * @param id The user ID.
     * @returns The user object if found, otherwise null.
     */
    static GetById(id: string): Promise<User | null>;
    /**
     * Returns an user by its handler.
     * @param handler The user handler.
     * @returns The user object if found, otherwise null.
     */
    static GetByHandler(handler: string): Promise<User | null>;
    /**
     * Checks if an user exists.
     * @param id The user ID.
     * @returns True if the user exists, otherwise false.
     */
    static Exists(id: string): Promise<boolean>;
    /**
     * Checks if an user exists by its handler.
     * @param handler The user handler.
     * @returns True if the user exists, otherwise false.
     */
    static ExistsByHandler(handler: string): Promise<boolean>;
    /**
     * Verifies the user password.
     * @param password The password to verify.
     * @returns True if the password is correct, otherwise false.
     */
    VerifyPassword(password: string): Promise<boolean>;
    /**
     * Checks if the user has 2FA enabled.
     * @returns True if the user has 2FA enabled, otherwise false.
     */
    Uses2FA(): Promise<boolean>;
    /**
     * Returns the user primary email.
     */
    GetPrimaryEmail(): Promise<Email>;
    /**
     * Returns the user emails.
     * Note: This method only returns secondary emails if the user has some.
     */
    GetSecondaryEmails(): AsyncGenerator<Email>;
}
