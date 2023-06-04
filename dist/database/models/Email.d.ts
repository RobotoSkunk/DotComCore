/// <reference types="node" />
import { MxRecord } from 'dns';
export interface IEmail {
    id: string;
    hash: string;
    email: string;
    userId: string;
    type: Email.Type;
    verified: boolean;
    createdAt: Date;
    /**
     * Indicates if the email address is fake, helps to prevent leak real addresses
     * to spammers and other malicious users.
     */
    isFake: boolean;
}
/**
 * Represents an email address.
 */
export declare class Email implements IEmail {
    id: string;
    hash: string;
    email: string;
    userId: string;
    type: Email.Type;
    verified: boolean;
    createdAt: Date;
    isFake: boolean;
    static readonly regex: RegExp;
    constructor(email: IEmail);
    /**
     * Converts a SQL query result to an email address.
     * @param queryData The SQL query result.
     * @returns	The email address.
     */
    protected static _SQL2Email(queryData: any): Email;
    /**
     * Hashes an email address using _HMAC.
     * @param email The email address.
     * @returns The hashed email address.
     */
    protected static _HMAC(email: string): Promise<string>;
    /**
     * Gets an email address by its id.
     * @param id The email id.
     * @returns The email address, or null if not found.
     */
    static GetById(id: string): Promise<Email | null>;
    /**
     * Gets an email address.
     * @param email The email address.
     * @returns The email address, or null if not found.
     */
    static Get(email: string): Promise<Email | null>;
    /**
     * Verifies if an email address is valid.
     * @param email The email address.
     * @returns True if the email address is valid, false otherwise.
     */
    static VerifyIfValid(email: string): Promise<boolean>;
    /**
     * Reaches out to the DNS server to get the MX records for a domain.
     * @param domain The domain.
     * @returns The found MX records.
     */
    static LookupMX(domain: string): Promise<MxRecord[]>;
    /**
     * Checks if an email address exists.
     * @param email The email address.
     * @returns True if the email address exists, false otherwise.
     */
    static Exists(email: string): Promise<boolean>;
    /**
     * Updates the type of an email address.
     * @param type The new type.
     */
    SetType(type: Email.Type): Promise<void>;
}
export declare namespace Email {
    /**
     * List of email address types.
     */
    enum Type {
        PRIMARY = 0,
        CONTACT = 1,
        SECONDARY = 2
    }
    /**
     * List of pre-valid domains for email addresses.
     */
    const validDomains: string[];
    /**
     * List of common bot names that are not allowed to register.
     */
    const invalidNames: string[];
    /**
     * List of disposable email domains.
     */
    const disposableEmailBlocklist: string[];
}
