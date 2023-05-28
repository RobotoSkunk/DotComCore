import * as PostgreSQL from 'pg';
export declare class Database {
    private _connectionPool;
    constructor(host: string, database: string, user: string, password: string, port: number);
    Connect(): Promise<PostgreSQL.PoolClient>;
}
