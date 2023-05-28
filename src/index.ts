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


import { PoolClient } from "pg";
import { Database } from "./database";
import { RSCrypto } from "./RSEngine";

export interface DotComCoreOptions
{
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

class DotComCore
{
	private static _options: DotComCoreOptions;
	private static _database: Database;

	public static Config(options: DotComCoreOptions)
	{
		this._options = options;

		this._database = new Database(
			this._options.database.host,
			this._options.database.database,
			this._options.database.user,
			this._options.database.password,
			this._options.database.port
		);
	}

	public static get hmacSecret(): string
	{
		return this._options.hmacSecret;
	}

	public static get hmacSalt(): string
	{
		return this._options.hmacSalt;
	}

	public static get encryptionKey(): string
	{
		return this._options.encryptionKey;
	}

	public static async Connect(): Promise<PoolClient>
	{
		return await this._database.Connect();
	}

	public static async HMAC(data: string): Promise<string>
	{
		return RSCrypto.HMAC(data, DotComCore.hmacSecret);
	}
}


export default DotComCore;
