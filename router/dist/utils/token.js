"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTextToken(token) {
    return token.text !== undefined;
}
exports.isTextToken = isTextToken;
function isVariableToken(token) {
    return token.name !== undefined;
}
exports.isVariableToken = isVariableToken;
