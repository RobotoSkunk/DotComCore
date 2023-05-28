export declare class RSCrypto {
    static algo: string;
    /**
     * Hashes a string using SHA256.
     * @param data The string to hash.
     * @returns The hashed string.
     */
    static Hash(data: string): string;
    /**
     * Compares two strings safely.
     * @param a The first string.
     * @param b The second string.
     * @returns True or false if the strings are equal.
     */
    static Compare(a: string, b: string): boolean;
    /**
     * Generates a random bytes string encoded in base64 url safe.
     * @param length The length of the random bytes.
     * @returns The random bytes string encoded in base64 url safe.
     */
    static RandomBytes(length: number): string;
    /**
     * Encrypts a string using AES-256-GCM.
     * @param data The data to encrypt.
     * @param key The encryption key.
     * @returns The encrypted data encoded in base64.
     */
    static Encrypt(data: string, key: string): Promise<string>;
    /**
     * Decrypts a string using AES-256-GCM.
     * @param data The encrypted data encoded in base64.
     * @param key The encryption key.
     * @returns The decrypted data.
     */
    static Decrypt(data: string, key: string): Promise<string>;
    /**
     * Generates an HMAC using SHA256.
     * @param data The data to hash.
     * @param key The key to use.
     * @returns The HMAC.
     */
    static HMAC(data: string, key: string): string;
    /**
     * Generates a PBKDF2 hash.
     * @param data The data to hash.
     * @param salt The salt to use.
     * @param iterations The number of iterations.
     * @param keylen The length of the key.
     * @returns The resulting hash.
     */
    static PBKDF2(data: string, salt: string, iterations: number, keylen: number): Promise<string>;
}
