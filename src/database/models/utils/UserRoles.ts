export class UserRoles {
	bitmask: number;

	constructor(bitmask: number) { this.bitmask = bitmask; }

	/**
	 * Verifies if the user has the specified role
	 * @param role The role to check
	 * @returns True if the user has the role
	 */
	has(role: keyof typeof UserRoles.FLAGS): boolean {
		return (this.bitmask & UserRoles.FLAGS[role]) !== 0;
	}

	/**
	 * Sets a role for the user
	 * @param role The role to set
	 */
	set(role: keyof typeof UserRoles.FLAGS) {
		this.bitmask |= UserRoles.FLAGS[role];
	}

	/**
	 * Removes a role for the user
	 * @param role The role to remove
	 */
	unset(role: keyof typeof UserRoles.FLAGS): void {
		this.bitmask &= ~UserRoles.FLAGS[role];
	}

	/**
	 * Returns a string list of the roles the user has
	 * @returns The roles the user has
	 */
	*values(): IterableIterator<string> {
		for (const role in UserRoles.FLAGS) {
			if (role === 'ALL') continue;
			if (this.has(role as keyof typeof UserRoles.FLAGS)) yield role;
		}
	}

	/**
	 * Returns a string list of html badges for the roles the user has
	 */
	*badges(): IterableIterator<string> {
		for (const role of this.values()) {
			const roleName = UserRoles.FLAGS_NAMES[role];
			var badgeClass = 'badge';

			switch (role) {
				case 'OWNER': badgeClass += ' alex-skunk'; break;
				case 'DEVELOPER': badgeClass += ' pinky'; break;
				case 'ADMIN': badgeClass += ' success'; break;
				case 'STAFF': badgeClass += ' warning'; break;
				case 'VETERAN': badgeClass += ' orange'; break;
				case 'VERIFIED_USER': badgeClass += ' generic'; break;
				case 'VERIFIED_DEVELOPER': badgeClass += ' alert'; break;
				case 'BUG_HUNTER': badgeClass += ' blurple'; break;
			}

			yield `<span class="${badgeClass}"><div class="dot"></div>${roleName}</span>`;
		}
	}
}
export namespace UserRoles {
	export enum FLAGS {
		OWNER =              1 << 0,
		DEVELOPER =          1 << 1,
		ADMIN =              1 << 2,
		STAFF =              1 << 3,
		VETERAN =            1 << 4,
		VERIFIED_USER =      1 << 5,
		VERIFIED_DEVELOPER = 1 << 6,
		BUG_HUNTER =         1 << 7,
		ALL =                OWNER | DEVELOPER | ADMIN | STAFF | VETERAN | VERIFIED_USER | VERIFIED_DEVELOPER | BUG_HUNTER
	}

	export const FLAGS_NAMES = {
		OWNER:              'Owner',
		DEVELOPER:          'Developer',
		ADMIN:              'Admin',
		STAFF:              'Staff',
		VETERAN:            'Veteran',
		VERIFIED_USER:      'Verified User',
		VERIFIED_DEVELOPER: 'Verified Developer',
		BUG_HUNTER:         'Bug Hunter',
		ALL:                'All'
	}
}
