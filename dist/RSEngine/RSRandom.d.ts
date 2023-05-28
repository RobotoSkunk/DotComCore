export declare class RSRandom {
    /**
     * Random Integer
     * @param x The upper range from which the random number will be selected.
     * @returns A random integer number from [0, x];
     */
    static Integer(x: number): number;
    /**
     * Random Float
     * @param x The upper range from which the random number will be selected.
     * @returns A random float number from [0, x];
     */
    static Float(x: number): number;
    /**
     * Random Integer in a range
     * @param x1 The lower range from which the random number will be selected.
     * @param x2 The upper range from which the random number will be selected.
     * @returns A random integer number from [x1, x2];
     */
    static IntRange(x1: number, x2: number): number;
    /**
     * Random Float in a range
     * @param x1 The lower range from which the random number will be selected.
     * @param x2 The upper range from which the random number will be selected.
     * @returns A random float number from [x1, x2];
     */
    static FloatRange(x1: number, x2: number): number;
    /**
     * Choose a random value.
     * @param array An input value that can be any.
     * @returns The choosen value.
     */
    static Choose<T>(array: T[]): T;
    /**
     * Wait for a certain amount of time.
     * @param min The minimum amount of time to wait.
     * @param max The maximum amount of time to wait.
     * @returns A promise that will be resolved after the time has passed.
     */
    static Wait(minMs: number, maxMs: number): Promise<void>;
    /**
     * Wait for a certain amount of time.
     * @param min The minimum amount of time to wait.
     * @param max The maximum amount of time to wait.
     * @returns A promise that will be resolved after the time has passed.
     */
    static Sleep(minMs: number, maxMs: number): Promise<void>;
    /**
     * Shuffle an array.
     * @param array The array to be shuffled.
     * @returns
     */
    static Shuffle<T>(array: T[]): T[];
}
