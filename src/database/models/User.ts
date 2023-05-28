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


import { Database } from "../connection";
import { UserRoles } from "./utils/UserRoles";

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
 */
export class User implements IUser
{
	public id: string;
	public hash: string;
	public name: string;
	public handler: string;
	public birthdate: Date;
	public roles: UserRoles;

	private static _database: Database;


	constructor(data: IUser)
	{
		this.id = data.id;
		this.hash = data.hash;
		this.name = data.name;
		this.handler = data.handler;
		this.birthdate = data.birthdate;
		this.roles = data.roles;
	}

	public static async SetDatabase(database: Database): Promise<void>
	{
		User._database = database;
	}



}
