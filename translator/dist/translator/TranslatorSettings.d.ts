import { TranslationStrategy } from "./TranslationStrategy";
/**
 * The required settings for your front-end translator.
 *
 * @interface TranslatorSettings
 */
export interface TranslatorSettings {
    /**
     * Enabled console debugging.
     */
    debug?: boolean;
    /**
     * The default locale for translating.
     */
    locale?: string;
    /**
     * The default domain for translating.
     */
    domain?: 'messages' | string;
    /**
     * The character separating multiple pluralized sentences.
     * Avoid changing that if you don't know what you are doing.
     */
    pluralSeparator?: string;
    /**
     * The catalogue file.
     */
    data?: any;
    /**
     * If `strict`, the translator will translate messages matching the exact domain and locale.
     * If `fallback`, the translator will try to translate message from the domain and locale, and will fallback to the configured locales.
     */
    strategy?: TranslationStrategy;
    /**
     * The variables the translator will look for in order to pluralize a translation.
     */
    pluralVariables?: string[];
}
