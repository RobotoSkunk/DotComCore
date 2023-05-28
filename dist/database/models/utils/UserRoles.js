"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
class UserRoles {
    bitmask;
    constructor(bitmask) { this.bitmask = bitmask; }
    /**
     * Verifies if the user has the specified role
     * @param role The role to check
     * @returns True if the user has the role
     */
    has(role) {
        return (this.bitmask & UserRoles.FLAGS[role]) !== 0;
    }
    /**
     * Sets a role for the user
     * @param role The role to set
     */
    set(role) {
        this.bitmask |= UserRoles.FLAGS[role];
    }
    /**
     * Removes a role for the user
     * @param role The role to remove
     */
    unset(role) {
        this.bitmask &= ~UserRoles.FLAGS[role];
    }
    /**
     * Returns a string list of the roles the user has
     * @returns The roles the user has
     */
    *values() {
        for (const role in UserRoles.FLAGS) {
            if (role === 'ALL')
                continue;
            if (this.has(role))
                yield role;
        }
    }
    /**
     * Returns a string list of html badges for the roles the user has
     */
    *badges() {
        for (const role of this.values()) {
            const roleName = UserRoles.FLAGS_NAMES[role];
            var badgeClass = 'badge';
            switch (role) {
                case 'OWNER':
                    badgeClass += ' alex-skunk';
                    break;
                case 'DEVELOPER':
                    badgeClass += ' pinky';
                    break;
                case 'ADMIN':
                    badgeClass += ' success';
                    break;
                case 'STAFF':
                    badgeClass += ' warning';
                    break;
                case 'VETERAN':
                    badgeClass += ' orange';
                    break;
                case 'VERIFIED_USER':
                    badgeClass += ' generic';
                    break;
                case 'VERIFIED_DEVELOPER':
                    badgeClass += ' alert';
                    break;
                case 'BUG_HUNTER':
                    badgeClass += ' blurple';
                    break;
            }
            yield `<span class="${badgeClass}"><div class="dot"></div>${roleName}</span>`;
        }
    }
}
exports.UserRoles = UserRoles;
(function (UserRoles) {
    let FLAGS;
    (function (FLAGS) {
        FLAGS[FLAGS["OWNER"] = 1] = "OWNER";
        FLAGS[FLAGS["DEVELOPER"] = 2] = "DEVELOPER";
        FLAGS[FLAGS["ADMIN"] = 4] = "ADMIN";
        FLAGS[FLAGS["STAFF"] = 8] = "STAFF";
        FLAGS[FLAGS["VETERAN"] = 16] = "VETERAN";
        FLAGS[FLAGS["VERIFIED_USER"] = 32] = "VERIFIED_USER";
        FLAGS[FLAGS["VERIFIED_DEVELOPER"] = 64] = "VERIFIED_DEVELOPER";
        FLAGS[FLAGS["BUG_HUNTER"] = 128] = "BUG_HUNTER";
        FLAGS[FLAGS["ALL"] = 255] = "ALL";
    })(FLAGS = UserRoles.FLAGS || (UserRoles.FLAGS = {}));
    UserRoles.FLAGS_NAMES = {
        OWNER: 'Owner',
        DEVELOPER: 'Developer',
        ADMIN: 'Admin',
        STAFF: 'Staff',
        VETERAN: 'Veteran',
        VERIFIED_USER: 'Verified User',
        VERIFIED_DEVELOPER: 'Verified Developer',
        BUG_HUNTER: 'Bug Hunter',
        ALL: 'All'
    };
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
//# sourceMappingURL=UserRoles.js.map