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


import fs from 'fs';
import fsp from 'fs/promises';

export class RSFiles
{
	/**
	 * Checks if a file exists.
	 * @param filePath The file path to check.
	 * @returns True or false if the file exists or not.
	 */
	static async Exists(filePath: string): Promise<boolean>
	{
		var toReturn = true;
		fs.access(filePath, fs.constants.F_OK, (err) =>
		{
			if (err) toReturn = false;
		});

		return new Promise((resolve, reject) =>
		{
			resolve(toReturn);
		});
	}

	/**
	 * Asynchronously writes data to a file, replacing the file if it already exists.
	 * @param filePath The file path to write.
	 * @param data The data to write in.
	 * @returns True or false if the writing fails.
	 */
	static async Write(filePath: string, data: string): Promise<boolean>
	{
		return new Promise(async (resolve, reject) =>
		{
			try {
				await fsp.writeFile(filePath, data);
				return resolve(true);
			} catch (err) {
				return reject(err);
			}
		});
	}

	/**
	 * Asynchronously reads the entire contents of a file.
	 * @param filePath The file path to read.
	 * @returns The file data if success or null if it fails.
	 */
	static async Read(filePath: string): Promise<string | null>
	{
		return new Promise(async (resolve, reject) =>
		{
			if (await RSFiles.Exists(filePath)) {
				try {
					const data = await fsp.readFile(filePath, 'utf-8');
					resolve(data);
				} catch (err) {
					return resolve(null);
				}
			} else {
				resolve(null);
			}
		});
	}
}
