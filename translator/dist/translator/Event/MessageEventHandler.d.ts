import { Catalogue } from "../Catalogue";
import { Variables } from "../Variables";
export interface MessageEventHandler {
    id?: string;
    domain?: string;
    locale?: string;
    catalogue?: Catalogue;
    variables?: Variables;
}
