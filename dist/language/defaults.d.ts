export type LangCode = 'en' | 'es' | 'pt' | 'fr';
export declare function checkLangCode(lang: string): lang is LangCode;
export declare function getCode(acceptLanguage: string): LangCode;
export interface LangObject {
    en: {
        [key: string]: string;
    };
    es: {
        [key: string]: string;
    };
    pt: {
        [key: string]: string;
    };
    fr: {
        [key: string]: string;
    };
}
