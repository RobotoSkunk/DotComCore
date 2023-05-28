import { Database } from "../connection";
import { UserRoles } from "./utils/UserRoles";
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
 */
export declare class User implements IUser {
    id: string;
    hash: string;
    name: string;
    handler: string;
    birthdate: Date;
    roles: UserRoles;
    private static _database;
    constructor(data: IUser);
    static SetDatabase(database: Database): Promise<void>;
}
