"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../utils/event");
const pluralPosition_1 = require("../utils/pluralPosition");
exports.DefaultSettings = {
    debug: true,
    domain: 'messages',
    locale: 'en',
    pluralVariables: ['%count%', '{{ count }}', '{{count}}', '$count'],
    pluralSeparator: '|',
    strategy: 'strict',
};
class Translator {
    constructor(settings) {
        this.messageNotFoundEvent = new event_1.AbstractEventHandler();
        this.translatedEvent = new event_1.AbstractEventHandler();
        this.settings = Object.assign(Object.assign({}, exports.DefaultSettings), settings);
    }
    convert(number) {
        if ('-Inf' === number) {
            return Number.NEGATIVE_INFINITY;
        }
        else if ('+Inf' === number || 'Inf' === number) {
            return Number.POSITIVE_INFINITY;
        }
        return parseInt(number, 10);
    }
    pluralize(message, locale, variables) {
        let number = 1, _p, _e, _explicit = [], _standard = [], _matches = [], _parts = message.split(this.settings.pluralSeparator || exports.DefaultSettings.pluralSeparator), _cPluralRegex = new RegExp(/^\s*((\{\s*(-?\d+[\s*,\s*\-?\d+]*)\s*\})|([[\]])\s*(-Inf|-?\d+)\s*,\s*(\+?Inf|-?\d+)\s*([[\]]))\s?(.+?)$/), _iPluralRegex = new RegExp(/^\s*(\{\s*(\?\d+[\s*,\s*\-?\d+]*)\s*\})|([[\]])\s*(-Inf|-?\d+)\s*,\s*(\+?Inf|-?\d+)\s*([[\]])/), _sPluralRegex = new RegExp(/^\w+: +(.+)$/);
        if (variables) {
            (this.settings.pluralVariables || exports.DefaultSettings.pluralVariables).forEach((name) => {
                if (name in variables) {
                    number = +variables[name] || number;
                    return;
                }
            });
        }
        for (_p = 0; _p < _parts.length; _p++) {
            var _part = _parts[_p];
            if (_cPluralRegex.test(_part)) {
                _matches = _part.match(_cPluralRegex);
                if (null !== _matches) {
                    _explicit[+_matches[0]] = _matches[_matches.length - 1];
                }
            }
            else if (_sPluralRegex.test(_part)) {
                _matches = _part.match(_sPluralRegex);
                if (null !== _matches) {
                    _standard.push(+_matches[1]);
                }
            }
            else {
                _standard.push(_part);
            }
        }
        for (_e in _explicit) {
            if (_iPluralRegex.test(_e)) {
                _matches = _e.match(_iPluralRegex);
                if (_matches && _matches[1]) {
                    let _ns = _matches[2].split(','), _n;
                    for (_n in _ns) {
                        if (number === +_ns[_n]) {
                            return _explicit[_e];
                        }
                    }
                }
                else if (_matches) {
                    let _leftNumber = this.convert(_matches[4]);
                    let _rightNumber = this.convert(_matches[5]);
                    if (('[' === _matches[3] ? number >= _leftNumber : number > _leftNumber) &&
                        (']' === _matches[6] ? number <= _rightNumber : number < _rightNumber)) {
                        return _explicit[_e];
                    }
                }
            }
        }
        return _standard[pluralPosition_1.getPluralPosition(number, locale)] || _standard[0] || '';
    }
    find(id, variables, domain, locale) {
        let locales = [locale || '', this.settings.locale || '', exports.DefaultSettings.locale];
        let fallbackDomain = domain || this.settings.domain || exports.DefaultSettings.domain;
        if ('fallback' === this.settings.strategy) {
            for (let locale of locales) {
                if (locale in this.catalogue) {
                    if (fallbackDomain in this.catalogue[locale]) {
                        if (id in this.catalogue[locale][fallbackDomain]) {
                            return this.fetch(id, variables, fallbackDomain, locale);
                        }
                        // console.log(`Could not find domain ${domain} in ${locale}`);
                    }
                }
                // console.log(`Could not find locale ${locale}`);
            }
        }
        else if ('strict' === this.settings.strategy) {
            if (undefined === locale || !(locale in this.catalogue)) {
                throw new Error(`Locale '${locale}' does not exist in your catalogue.`);
            }
            if (undefined === domain || !(domain in this.catalogue[locale])) {
                throw new Error(`Domain '${domain}' does not exist in the ${locale} catalogue.`);
            }
            if (id in this.catalogue[locale][domain]) {
                return this.fetch(id, variables, domain, locale);
            }
        }
        throw new Error(`Message '${id}' does not exist in domain '${domain}' of locale '${locale}' (using ${this.settings.strategy} strategy).`);
    }
    fetch(id, variables, domain, locale) {
        let message = this.catalogue[locale][domain][id];
        message = this.pluralize(message, locale, variables);
        for (let key in variables) {
            message = String(message).replace(key, String(variables[key]));
        }
        return message;
    }
    get catalogue() {
        try {
            return this.settings.data;
        }
        catch (error) {
            throw new Error('Unable to parse the given catalogue: ' + error);
        }
    }
    add(id, value, domain, locale) {
        domain = domain || this.settings.domain || exports.DefaultSettings.domain;
        locale = locale || this.settings.locale || exports.DefaultSettings.locale;
        if (0 === id.length) {
            throw new Error('Parameter id must not be blank.');
        }
        if (!this.catalogue[locale]) {
            this.catalogue[locale] = {};
        }
        if (!this.catalogue[locale][domain]) {
            this.catalogue[locale][domain] = {};
        }
        if (id in this.catalogue[locale][domain]) {
            // debug
        }
        this.catalogue[locale][domain][id] = value;
        return this;
    }
    trans(id, variables, domain, locale) {
        domain = domain || this.settings.domain || exports.DefaultSettings.domain;
        locale = locale || this.settings.locale || exports.DefaultSettings.locale;
        variables = variables || {};
        try {
            let message = this.find(id, variables, domain, locale);
            this.translatedEvent.trigger({ catalogue: this.catalogue, domain, id, locale, variables });
            return message;
        }
        catch (e) {
            this.messageNotFoundEvent.trigger({ catalogue: this.catalogue, domain, id, locale, variables });
            return id;
        }
    }
    on(event, handler) {
        switch (event) {
            case 'messageNotFound':
                this.messageNotFoundEvent.on(handler);
                break;
            case 'translated':
                this.translatedEvent.on(handler);
                break;
        }
    }
    off(event, handler) {
        switch (event) {
            case 'messageNotFound':
                this.messageNotFoundEvent.off(handler);
                break;
            case 'translated':
                this.translatedEvent.off(handler);
                break;
        }
    }
}
exports.Translator = Translator;
