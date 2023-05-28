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


export class RSRandom
{
	/**
	 * Random Integer
	 * @param x The upper range from which the random number will be selected.
	 * @returns A random integer number from [0, x];
	 */
	static Integer(x: number): number
	{
		return Math.floor(Math.random() * x);
	}

	/**
	 * Random Float
	 * @param x The upper range from which the random number will be selected.
	 * @returns A random float number from [0, x];
	 */
	static Float(x: number): number
	{
		return Math.random() * x;
	}

	/**
	 * Random Integer in a range
	 * @param x1 The lower range from which the random number will be selected.
	 * @param x2 The upper range from which the random number will be selected.
	 * @returns A random integer number from [x1, x2];
	 */
	static IntRange(x1: number, x2: number): number
	{
		return Math.floor(Math.random() * (x2 - x1) + x1);
	}

	/**
	 * Random Float in a range
	 * @param x1 The lower range from which the random number will be selected.
	 * @param x2 The upper range from which the random number will be selected.
	 * @returns A random float number from [x1, x2];
	 */
	static FloatRange(x1: number, x2: number): number
	{
		return Math.floor(Math.random() * (x2 - x1) + x1);
	}

	/**
	 * Choose a random value.
	 * @param array An input value that can be any.
	 * @returns The choosen value.
	 */
	static Choose<T>(array: T[]): T
	{
		return array[(RSRandom.Integer(array.length))];
	}

	/**
	 * Wait for a certain amount of time.
	 * @param min The minimum amount of time to wait.
	 * @param max The maximum amount of time to wait.
	 * @returns A promise that will be resolved after the time has passed.
	 */
	static async Wait(minMs: number, maxMs: number): Promise<void>
	{
		return new Promise((resolve) =>
		{
			setTimeout(resolve, RSRandom.IntRange(minMs, maxMs));
		});
	}

	/**
	 * Wait for a certain amount of time.
	 * @param min The minimum amount of time to wait.
	 * @param max The maximum amount of time to wait.
	 * @returns A promise that will be resolved after the time has passed.
	 */
	static async Sleep(minMs: number, maxMs: number): Promise<void>
	{
		return await RSRandom.Wait(minMs, maxMs);
	}

	/**
	 * Shuffle an array.
	 * @param array The array to be shuffled.
	 * @returns 
	 */
	static Shuffle<T>(array: T[]): T[]
	{
		var j: number;
		var x: T;

		for (var i = array.length - 1; i > 0; i--) {
			j = RSRandom.Integer(i + 1);
			x = array[i];
			array[i] = array[j];
			array[j] = x;
		}

		return array;
	}
}
