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


import { RSFiles } from '../RSEngine';
import path from 'path';


export namespace ConfigLoader
{
	export type ConfigFile = 'email_names_blocklist.conf' |
							'disposable_email_blocklist.conf' |
							'common_email_domains_whitelist.conf';


	/**
	 * Loads a configuration file.
	 * @param type The type of the configuration file.
	 * @returns The configuration file as an array of strings.
	 */
	export async function Load(type: ConfigFile): Promise<string[]>
	{
		const data = await RSFiles.Read(path.join(__dirname, 'config', type));

		if (process.platform === 'win32') {
			return data.split('\r\n');
		}

		return data.split('\n');
	}
}

