import { VariableToken } from "../router/token/VariableToken";
import { Token } from "../router/token/Token";
import { TextToken } from "../router/token/TextToken";
export declare function isTextToken(token: Token): token is TextToken;
export declare function isVariableToken(token: Token): token is VariableToken;
