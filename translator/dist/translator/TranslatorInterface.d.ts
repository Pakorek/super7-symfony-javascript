import { Variables } from "./Variables";
/**
 * Your front-end translator.
 *
 * @interface TranslatorInterface
 */
export interface TranslatorInterface {
    /**
     * Translates the given message.
     *
     * When a number is provided as a parameter named "%count%", the message is parsed for plural
     * forms and a translation is chosen according to this number using the following rules:
     *
     * Given a message with different plural translations separated by a
     * pipe (|), this method returns the correct portion of the message based
     * on the given number, locale and the pluralization rules in the message
     * itself.
     *
     * The message supports two different types of pluralization rules:
     *
     * interval: {0} There are no apples|{1} There is one apple|]1,Inf] There are %count% apples
     * indexed:  There is one apple|There are %count% apples
     *
     * The indexed solution can also contain labels (e.g. one: There is one apple).
     * This is purely for making the translations more clear - it does not
     * affect the functionality.
     *
     * The two methods can also be mixed:
     *     {0} There are no apples|one: There is one apple|more: There are %count% apples
     *
     * An interval can represent a finite set of numbers:
     *  {1,2,3,4}
     *
     * An interval can represent numbers between two numbers:
     *  [1, +Inf]
     *  ]-1,2[
     *
     * The left delimiter can be [ (inclusive) or ] (exclusive).
     * The right delimiter can be [ (exclusive) or ] (inclusive).
     * Beside numbers, you can use -Inf and +Inf for the infinite.
     *
     * @see https://en.wikipedia.org/wiki/ISO_31-11
     *
     * @param {string} id Localization identifier.
     * @param {any} variables Some variables association.
     * @param {string | undefined} domain Domain to seek messages into.
     * @param {string | undefined} locale Target locale.
     *
     * @returns {string} Translated message, or `id` if not found.
     */
    trans(id: string, variables: Variables, domain: string | undefined, locale: string | undefined): string;
    /**
     * Adds a translation to the translator. If the `id` already exists, it will be replaced with that value.
     * If the domain or locale is not given, the defaults will be used.
     *
     * @param {string} id Localization identifier.
     * @param {string} value The translation string.
     * @param {string | undefined} domain Domain to seek messages into.
     * @param {string | undefined} locale Target locale.
     *
     * @returns {this} Self, for chaining.
     */
    add(id: string, value: string, domain: string | undefined, locale: string | undefined): this;
}
