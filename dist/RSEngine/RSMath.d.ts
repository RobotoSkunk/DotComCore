export declare class RSMath {
    /**
     * Mantains a number in a range.
     * @param x The number to clamp.
     * @param min The minimum of the range.
     * @param max The maximum of the range.
     * @returns The clamped number.
     */
    static Clamp(x: number, min: number, max: number): number;
    /**
     * Removes an specific element from an array.
     * @param array The array where the element is gonna go.
     * @param value The element to remove.
     * @returns The modified array.
     */
    static ArrayRemove(array: object[], value: any): object[];
}
