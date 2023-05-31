/*
	MIT License

	Copyright (c) 2023 Edgar Alexis Lima <contact@robotoskunk.com>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/


import DotComCore from '../..';
import { RSCrypto } from '../../RSEngine';
import { Email } from './Email';
import { UserRoles } from './utils/UserRoles';

import bcrypt from 'bcrypt';
import argon2 from 'argon2';



export interface IUser
{
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
export class User implements IUser
{
	public id: string;
	public hash: string;
	public name: string;
	public handler: string;
	public birthdate: Date;
	public roles: UserRoles;


	constructor(data: IUser)
	{
		this.id = data.id;
		this.hash = data.hash;
		this.name = data.name;
		this.handler = data.handler;
		this.birthdate = data.birthdate;
		this.roles = data.roles;
	}

	public get url(): string {
		return `/user/${this.handler}`;
	}

	public get avatar(): string {
		return `/avatar/default.webp`; // `/avatar/${this.handler}.webp`;
	}


	/**
	 * Generates a crypto key for the user.
	 * @param hash The user hash.
	 * @returns The crypto key.
	 */
	private static async GenerateCryptoKey(hash: string): Promise<string>
	{
		return await RSCrypto.PBKDF2(DotComCore.encryptionKey, hash, 1000, 32);
	}

	/**
	 * Returns the crypto key for the user.
	 * @returns The crypto key.
	 */
	public async GetCryptoKey(): Promise<string>
	{
		return await User.GenerateCryptoKey(this.hash);
	}

	/**
	 * Converts a SQL query result to an email address.
	 * @param queryData The SQL query result.
	 * @returns	The email address.
	 */
	private static _SQL2User(queryData: any): User
	{
		return new User({
			id: queryData.id,
			hash: queryData.hash,
			name: queryData.name,
			handler: queryData.handler,
			birthdate: queryData.birthdate,
			roles: new UserRoles(queryData.roles)
		});
	}

	/**
	 * Checks if the password is correct.
	 * @param password The password to check.
	 * @param id The user ID.
	 * @returns True if the password is correct, otherwise false.
	 */
	private static async _CheckPassword(password: string, id: string): Promise<boolean>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT password FROM users WHERE id = $1`, [ id ]);
			const passwordHash: string = query.rows[0].password;


			// If the password hash starts with $2, it means that the password is hashed with bcrypt.
			if (passwordHash.startsWith('$2')) {
				if (!(await bcrypt.compare(password, passwordHash))) {
					return false;
				}

				// Bcrypt is deprecated, so we will update the password hash to argon2.
				const newPassword = await argon2.hash(password);
				await client.query('UPDATE users SET password = $1 WHERE id = $2', [ newPassword, id ]);

			} else {
				if (!(await argon2.verify(passwordHash, password))) {
					return false;
				}

				// For security reasons, rehash the password if needed.
				if (argon2.needsRehash(passwordHash)) {
					const newPassword = await argon2.hash(password);
					await client.query('UPDATE users SET password = $1 WHERE id = $2', [ newPassword, id ]);
				}
			}
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Authenticate the user by email and password.
	 * @param email The email address of the user.
	 * @param password The password of the user.
	 * @returns The user object if the authentication was successful, otherwise null.
	 */
	public static async Authenticate(email: string, password: string): Promise<User | null>
	{
		const client = await DotComCore.Connect();

		try {
			const emailObj = await Email.Get(email);

			if (!emailObj || emailObj.type !== Email.Type.PRIMARY) {
				return null;
			}

			if (!(await User._CheckPassword(password, emailObj.userId))) {
				return null;
			}

			const user = await User.GetById(emailObj.userId);
			return user;
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Returns an user by its ID.
	 * @param id The user ID.
	 * @returns The user object if found, otherwise null.
	 */
	public static async GetById(id: string): Promise<User | null>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT id, hash, name, handler, birthdate, roles
												FROM users WHERE id = $1`, [ id ]);

			if (query.rowCount === 0) {
				return null;
			}

			return new User(User._SQL2User(query.rows[0]));
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Returns an user by its handler.
	 * @param handler The user handler.
	 * @returns The user object if found, otherwise null.
	 */
	public static async GetByHandler(handler: string): Promise<User | null>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT id, hash, name, handler, birthdate, roles
												FROM users WHERE handler = $1`, [ handler ]);

			if (query.rowCount === 0) {
				return null;
			}

			return new User(User._SQL2User(query.rows[0]));
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Checks if an user exists.
	 * @param id The user ID.
	 * @returns True if the user exists, otherwise false.
	 */
	public static async Exists(id: string): Promise<boolean>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT 1 FROM users WHERE id = $1`, [ id ]);
			return query.rowCount > 0;
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Checks if an user exists by its handler.
	 * @param handler The user handler.
	 * @returns True if the user exists, otherwise false.
	 */
	public static async ExistsByHandler(handler: string): Promise<boolean>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT 1 FROM users WHERE handler = $1`, [ handler ]);
			return query.rowCount > 0;
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Verifies the user password.
	 * @param password The password to verify.
	 * @returns True if the password is correct, otherwise false.
	 */
	public async VerifyPassword(password: string): Promise<boolean>
	{
		return await User._CheckPassword(password, this.id);
	}

	/**
	 * Checks if the user has 2FA enabled.
	 * @returns True if the user has 2FA enabled, otherwise false.
	 */
	public async Uses2FA(): Promise<boolean>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT totp_enabled FROM users WHERE id = $1`, [ this.id ]);
			return query.rows[0].totp_enabled;
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Returns the user primary email.
	 */
	public async GetPrimaryEmail(): Promise<Email>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT id FROM emails WHERE usrid = $1 AND refer = 0`, [ this.id ]);
			return await Email.Get(query.rows[0].id);
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}

	/**
	 * Returns the user emails.
	 * Note: This method only returns secondary emails if the user has some.
	 */
	public async *GetEmails(): AsyncGenerator<Email>
	{
		const client = await DotComCore.Connect();

		try {
			const query = await client.query(`SELECT id FROM emails WHERE usrid = $1 AND refer = 2`, [ this.id ]);

			if (query.rowCount === 0) {
				const primaryEmail = await this.GetPrimaryEmail();

				return yield primaryEmail;
			} else {
				for (const email of query.rows) {
					yield await Email.Get(email.id);
				}
			}
		} catch (e) {
			throw e;
		} finally {
			client.release();
		}
	}
}
