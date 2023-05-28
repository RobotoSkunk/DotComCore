import { PoolClient } from "pg";
export interface DotComCoreOptions {
    database: {
        host: string;
        database: string;
        user: string;
        password: string;
        port: number;
    };
    hmacSecret: string;
    hmacSalt: string;
    encryptionKey: string;
}
declare class DotComCore {
    private static _options;
    private static _database;
    static Config(options: DotComCoreOptions): void;
    static get hmacSecret(): string;
    static get hmacSalt(): string;
    static get encryptionKey(): string;
    static Connect(): Promise<PoolClient>;
    static HMAC(data: string): Promise<string>;
}
export default DotComCore;
