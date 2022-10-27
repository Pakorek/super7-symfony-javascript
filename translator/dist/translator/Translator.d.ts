import { TranslatorSettings } from "./TranslatorSettings";
import { TranslatorInterface } from "./TranslatorInterface";
import { MessageEventHandler } from "./Event/MessageEventHandler";
import { Variables } from "./Variables";
import { Catalogue } from "./Catalogue";
import { MessageEvents } from "./Event/MessageEvents";
export declare const DefaultSettings: TranslatorSettings;
export declare class Translator implements TranslatorInterface {
    settings: TranslatorSettings;
    private readonly messageNotFoundEvent;
    private readonly translatedEvent;
    constructor(settings?: TranslatorSettings);
    private convert;
    private pluralize;
    private find;
    private fetch;
    readonly catalogue: Catalogue;
    add(id: string, value: string, domain?: string, locale?: string): this;
    trans(id: string, variables?: Variables, domain?: string, locale?: string): string;
    on(event: MessageEvents, handler: {
        (data: MessageEventHandler): void;
    }): void;
    off(event: MessageEvents, handler: {
        (data: MessageEventHandler): void;
    }): void;
}
