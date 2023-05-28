export declare class RSFiles {
    /**
     * Checks if a file exists.
     * @param filePath The file path to check.
     * @returns True or false if the file exists or not.
     */
    static Exists(filePath: string): Promise<boolean>;
    /**
     * Asynchronously writes data to a file, replacing the file if it already exists.
     * @param filePath The file path to write.
     * @param data The data to write in.
     * @returns True or false if the writing fails.
     */
    static Write(filePath: string, data: string): Promise<boolean>;
    /**
     * Asynchronously reads the entire contents of a file.
     * @param filePath The file path to read.
     * @returns The file data if success or null if it fails.
     */
    static Read(filePath: string): Promise<string | null>;
}
