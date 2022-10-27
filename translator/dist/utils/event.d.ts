import { TranslatorEventInterface } from "../translator/Event/TranslatorEventInterface";
export declare class AbstractEventHandler<T> implements TranslatorEventInterface<T> {
    private handlers;
    on(handler: {
        (data: T): void;
    }): void;
    off(handler: {
        (data: T): void;
    }): void;
    trigger(data: T): void;
    expose(): TranslatorEventInterface<T>;
}
