export declare class UserRoles {
    bitmask: number;
    constructor(bitmask: number);
    /**
     * Verifies if the user has the specified role
     * @param role The role to check
     * @returns True if the user has the role
     */
    has(role: keyof typeof UserRoles.FLAGS): boolean;
    /**
     * Sets a role for the user
     * @param role The role to set
     */
    set(role: keyof typeof UserRoles.FLAGS): void;
    /**
     * Removes a role for the user
     * @param role The role to remove
     */
    unset(role: keyof typeof UserRoles.FLAGS): void;
    /**
     * Returns a string list of the roles the user has
     * @returns The roles the user has
     */
    values(): IterableIterator<string>;
    /**
     * Returns a string list of html badges for the roles the user has
     */
    badges(): IterableIterator<string>;
}
export declare namespace UserRoles {
    enum FLAGS {
        OWNER = 1,
        DEVELOPER = 2,
        ADMIN = 4,
        STAFF = 8,
        VETERAN = 16,
        VERIFIED_USER = 32,
        VERIFIED_DEVELOPER = 64,
        BUG_HUNTER = 128,
        ALL = 255
    }
    const FLAGS_NAMES: {
        OWNER: string;
        DEVELOPER: string;
        ADMIN: string;
        STAFF: string;
        VETERAN: string;
        VERIFIED_USER: string;
        VERIFIED_DEVELOPER: string;
        BUG_HUNTER: string;
        ALL: string;
    };
}
