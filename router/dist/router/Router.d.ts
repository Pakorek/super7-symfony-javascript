import { RouterInterface } from "./RouterInterface";
import { RouterSettings } from "./RouterSettings";
import { RouteCollection } from "./RouteCollection";
export declare const DefaultSettings: RouterSettings;
export declare class Router implements RouterInterface {
    settings: RouterSettings;
    collection: RouteCollection | undefined;
    private initialized;
    constructor(settings?: RouterSettings);
    getCollection(): RouteCollection;
    private initialize;
    private throwIfNotInitialized;
    private parseTokens;
    private parseCollection;
    private buildQueryParameters;
    private getQueryParameters;
    url(name: string, parameters?: any, schemeRelative?: boolean): string;
    path(name: string, parameters?: any): string;
    absoluteUrl(path: string, schemeRelative?: boolean): string;
    logoutUrl(): string | null;
    logoutPath(): string | null;
}
