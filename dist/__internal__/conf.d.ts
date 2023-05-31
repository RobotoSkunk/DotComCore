export declare namespace ConfigLoader {
    type ConfigFile = 'email_names_blocklist.conf' | 'disposable_email_blocklist.conf' | 'common_email_domains_whitelist.conf';
    /**
     * Loads a configuration file.
     * @param type The type of the configuration file.
     * @returns The configuration file as an array of strings.
     */
    function Load(type: ConfigFile): Promise<string[]>;
}
