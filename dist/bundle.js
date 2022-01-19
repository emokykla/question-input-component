(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("APQuestionInput", [], factory);
	else if(typeof exports === 'object')
		exports["APQuestionInput"] = factory();
	else
		root["APQuestionInput"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hotwired/stimulus/dist/stimulus.js":
/*!**********************************************************!*\
  !*** ./node_modules/@hotwired/stimulus/dist/stimulus.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Application": function() { return /* binding */ Application; },
/* harmony export */   "AttributeObserver": function() { return /* binding */ AttributeObserver; },
/* harmony export */   "Context": function() { return /* binding */ Context; },
/* harmony export */   "Controller": function() { return /* binding */ Controller; },
/* harmony export */   "ElementObserver": function() { return /* binding */ ElementObserver; },
/* harmony export */   "IndexedMultimap": function() { return /* binding */ IndexedMultimap; },
/* harmony export */   "Multimap": function() { return /* binding */ Multimap; },
/* harmony export */   "StringMapObserver": function() { return /* binding */ StringMapObserver; },
/* harmony export */   "TokenListObserver": function() { return /* binding */ TokenListObserver; },
/* harmony export */   "ValueListObserver": function() { return /* binding */ ValueListObserver; },
/* harmony export */   "add": function() { return /* binding */ add; },
/* harmony export */   "defaultSchema": function() { return /* binding */ defaultSchema; },
/* harmony export */   "del": function() { return /* binding */ del; },
/* harmony export */   "fetch": function() { return /* binding */ fetch; },
/* harmony export */   "prune": function() { return /* binding */ prune; }
/* harmony export */ });
/*
Stimulus 3.0.1
Copyright © 2021 Basecamp, LLC
 */
class EventListener {
    constructor(eventTarget, eventName, eventOptions) {
        this.eventTarget = eventTarget;
        this.eventName = eventName;
        this.eventOptions = eventOptions;
        this.unorderedBindings = new Set();
    }
    connect() {
        this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
    }
    disconnect() {
        this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
    }
    bindingConnected(binding) {
        this.unorderedBindings.add(binding);
    }
    bindingDisconnected(binding) {
        this.unorderedBindings.delete(binding);
    }
    handleEvent(event) {
        const extendedEvent = extendEvent(event);
        for (const binding of this.bindings) {
            if (extendedEvent.immediatePropagationStopped) {
                break;
            }
            else {
                binding.handleEvent(extendedEvent);
            }
        }
    }
    get bindings() {
        return Array.from(this.unorderedBindings).sort((left, right) => {
            const leftIndex = left.index, rightIndex = right.index;
            return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
        });
    }
}
function extendEvent(event) {
    if ("immediatePropagationStopped" in event) {
        return event;
    }
    else {
        const { stopImmediatePropagation } = event;
        return Object.assign(event, {
            immediatePropagationStopped: false,
            stopImmediatePropagation() {
                this.immediatePropagationStopped = true;
                stopImmediatePropagation.call(this);
            }
        });
    }
}

class Dispatcher {
    constructor(application) {
        this.application = application;
        this.eventListenerMaps = new Map;
        this.started = false;
    }
    start() {
        if (!this.started) {
            this.started = true;
            this.eventListeners.forEach(eventListener => eventListener.connect());
        }
    }
    stop() {
        if (this.started) {
            this.started = false;
            this.eventListeners.forEach(eventListener => eventListener.disconnect());
        }
    }
    get eventListeners() {
        return Array.from(this.eventListenerMaps.values())
            .reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
    }
    bindingConnected(binding) {
        this.fetchEventListenerForBinding(binding).bindingConnected(binding);
    }
    bindingDisconnected(binding) {
        this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
    }
    handleError(error, message, detail = {}) {
        this.application.handleError(error, `Error ${message}`, detail);
    }
    fetchEventListenerForBinding(binding) {
        const { eventTarget, eventName, eventOptions } = binding;
        return this.fetchEventListener(eventTarget, eventName, eventOptions);
    }
    fetchEventListener(eventTarget, eventName, eventOptions) {
        const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
        const cacheKey = this.cacheKey(eventName, eventOptions);
        let eventListener = eventListenerMap.get(cacheKey);
        if (!eventListener) {
            eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
            eventListenerMap.set(cacheKey, eventListener);
        }
        return eventListener;
    }
    createEventListener(eventTarget, eventName, eventOptions) {
        const eventListener = new EventListener(eventTarget, eventName, eventOptions);
        if (this.started) {
            eventListener.connect();
        }
        return eventListener;
    }
    fetchEventListenerMapForEventTarget(eventTarget) {
        let eventListenerMap = this.eventListenerMaps.get(eventTarget);
        if (!eventListenerMap) {
            eventListenerMap = new Map;
            this.eventListenerMaps.set(eventTarget, eventListenerMap);
        }
        return eventListenerMap;
    }
    cacheKey(eventName, eventOptions) {
        const parts = [eventName];
        Object.keys(eventOptions).sort().forEach(key => {
            parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
        });
        return parts.join(":");
    }
}

const descriptorPattern = /^((.+?)(@(window|document))?->)?(.+?)(#([^:]+?))(:(.+))?$/;
function parseActionDescriptorString(descriptorString) {
    const source = descriptorString.trim();
    const matches = source.match(descriptorPattern) || [];
    return {
        eventTarget: parseEventTarget(matches[4]),
        eventName: matches[2],
        eventOptions: matches[9] ? parseEventOptions(matches[9]) : {},
        identifier: matches[5],
        methodName: matches[7]
    };
}
function parseEventTarget(eventTargetName) {
    if (eventTargetName == "window") {
        return window;
    }
    else if (eventTargetName == "document") {
        return document;
    }
}
function parseEventOptions(eventOptions) {
    return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
}
function stringifyEventTarget(eventTarget) {
    if (eventTarget == window) {
        return "window";
    }
    else if (eventTarget == document) {
        return "document";
    }
}

function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
}
function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
function dasherize(value) {
    return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
}
function tokenize(value) {
    return value.match(/[^\s]+/g) || [];
}

class Action {
    constructor(element, index, descriptor) {
        this.element = element;
        this.index = index;
        this.eventTarget = descriptor.eventTarget || element;
        this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
        this.eventOptions = descriptor.eventOptions || {};
        this.identifier = descriptor.identifier || error("missing identifier");
        this.methodName = descriptor.methodName || error("missing method name");
    }
    static forToken(token) {
        return new this(token.element, token.index, parseActionDescriptorString(token.content));
    }
    toString() {
        const eventNameSuffix = this.eventTargetName ? `@${this.eventTargetName}` : "";
        return `${this.eventName}${eventNameSuffix}->${this.identifier}#${this.methodName}`;
    }
    get params() {
        if (this.eventTarget instanceof Element) {
            return this.getParamsFromEventTargetAttributes(this.eventTarget);
        }
        else {
            return {};
        }
    }
    getParamsFromEventTargetAttributes(eventTarget) {
        const params = {};
        const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`);
        const attributes = Array.from(eventTarget.attributes);
        attributes.forEach(({ name, value }) => {
            const match = name.match(pattern);
            const key = match && match[1];
            if (key) {
                Object.assign(params, { [camelize(key)]: typecast(value) });
            }
        });
        return params;
    }
    get eventTargetName() {
        return stringifyEventTarget(this.eventTarget);
    }
}
const defaultEventNames = {
    "a": e => "click",
    "button": e => "click",
    "form": e => "submit",
    "details": e => "toggle",
    "input": e => e.getAttribute("type") == "submit" ? "click" : "input",
    "select": e => "change",
    "textarea": e => "input"
};
function getDefaultEventNameForElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName in defaultEventNames) {
        return defaultEventNames[tagName](element);
    }
}
function error(message) {
    throw new Error(message);
}
function typecast(value) {
    try {
        return JSON.parse(value);
    }
    catch (o_O) {
        return value;
    }
}

class Binding {
    constructor(context, action) {
        this.context = context;
        this.action = action;
    }
    get index() {
        return this.action.index;
    }
    get eventTarget() {
        return this.action.eventTarget;
    }
    get eventOptions() {
        return this.action.eventOptions;
    }
    get identifier() {
        return this.context.identifier;
    }
    handleEvent(event) {
        if (this.willBeInvokedByEvent(event)) {
            this.invokeWithEvent(event);
        }
    }
    get eventName() {
        return this.action.eventName;
    }
    get method() {
        const method = this.controller[this.methodName];
        if (typeof method == "function") {
            return method;
        }
        throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
    }
    invokeWithEvent(event) {
        const { target, currentTarget } = event;
        try {
            const { params } = this.action;
            const actionEvent = Object.assign(event, { params });
            this.method.call(this.controller, actionEvent);
            this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
        }
        catch (error) {
            const { identifier, controller, element, index } = this;
            const detail = { identifier, controller, element, index, event };
            this.context.handleError(error, `invoking action "${this.action}"`, detail);
        }
    }
    willBeInvokedByEvent(event) {
        const eventTarget = event.target;
        if (this.element === eventTarget) {
            return true;
        }
        else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
            return this.scope.containsElement(eventTarget);
        }
        else {
            return this.scope.containsElement(this.action.element);
        }
    }
    get controller() {
        return this.context.controller;
    }
    get methodName() {
        return this.action.methodName;
    }
    get element() {
        return this.scope.element;
    }
    get scope() {
        return this.context.scope;
    }
}

class ElementObserver {
    constructor(element, delegate) {
        this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
        this.element = element;
        this.started = false;
        this.delegate = delegate;
        this.elements = new Set;
        this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
        if (!this.started) {
            this.started = true;
            this.mutationObserver.observe(this.element, this.mutationObserverInit);
            this.refresh();
        }
    }
    pause(callback) {
        if (this.started) {
            this.mutationObserver.disconnect();
            this.started = false;
        }
        callback();
        if (!this.started) {
            this.mutationObserver.observe(this.element, this.mutationObserverInit);
            this.started = true;
        }
    }
    stop() {
        if (this.started) {
            this.mutationObserver.takeRecords();
            this.mutationObserver.disconnect();
            this.started = false;
        }
    }
    refresh() {
        if (this.started) {
            const matches = new Set(this.matchElementsInTree());
            for (const element of Array.from(this.elements)) {
                if (!matches.has(element)) {
                    this.removeElement(element);
                }
            }
            for (const element of Array.from(matches)) {
                this.addElement(element);
            }
        }
    }
    processMutations(mutations) {
        if (this.started) {
            for (const mutation of mutations) {
                this.processMutation(mutation);
            }
        }
    }
    processMutation(mutation) {
        if (mutation.type == "attributes") {
            this.processAttributeChange(mutation.target, mutation.attributeName);
        }
        else if (mutation.type == "childList") {
            this.processRemovedNodes(mutation.removedNodes);
            this.processAddedNodes(mutation.addedNodes);
        }
    }
    processAttributeChange(node, attributeName) {
        const element = node;
        if (this.elements.has(element)) {
            if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
                this.delegate.elementAttributeChanged(element, attributeName);
            }
            else {
                this.removeElement(element);
            }
        }
        else if (this.matchElement(element)) {
            this.addElement(element);
        }
    }
    processRemovedNodes(nodes) {
        for (const node of Array.from(nodes)) {
            const element = this.elementFromNode(node);
            if (element) {
                this.processTree(element, this.removeElement);
            }
        }
    }
    processAddedNodes(nodes) {
        for (const node of Array.from(nodes)) {
            const element = this.elementFromNode(node);
            if (element && this.elementIsActive(element)) {
                this.processTree(element, this.addElement);
            }
        }
    }
    matchElement(element) {
        return this.delegate.matchElement(element);
    }
    matchElementsInTree(tree = this.element) {
        return this.delegate.matchElementsInTree(tree);
    }
    processTree(tree, processor) {
        for (const element of this.matchElementsInTree(tree)) {
            processor.call(this, element);
        }
    }
    elementFromNode(node) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            return node;
        }
    }
    elementIsActive(element) {
        if (element.isConnected != this.element.isConnected) {
            return false;
        }
        else {
            return this.element.contains(element);
        }
    }
    addElement(element) {
        if (!this.elements.has(element)) {
            if (this.elementIsActive(element)) {
                this.elements.add(element);
                if (this.delegate.elementMatched) {
                    this.delegate.elementMatched(element);
                }
            }
        }
    }
    removeElement(element) {
        if (this.elements.has(element)) {
            this.elements.delete(element);
            if (this.delegate.elementUnmatched) {
                this.delegate.elementUnmatched(element);
            }
        }
    }
}

class AttributeObserver {
    constructor(element, attributeName, delegate) {
        this.attributeName = attributeName;
        this.delegate = delegate;
        this.elementObserver = new ElementObserver(element, this);
    }
    get element() {
        return this.elementObserver.element;
    }
    get selector() {
        return `[${this.attributeName}]`;
    }
    start() {
        this.elementObserver.start();
    }
    pause(callback) {
        this.elementObserver.pause(callback);
    }
    stop() {
        this.elementObserver.stop();
    }
    refresh() {
        this.elementObserver.refresh();
    }
    get started() {
        return this.elementObserver.started;
    }
    matchElement(element) {
        return element.hasAttribute(this.attributeName);
    }
    matchElementsInTree(tree) {
        const match = this.matchElement(tree) ? [tree] : [];
        const matches = Array.from(tree.querySelectorAll(this.selector));
        return match.concat(matches);
    }
    elementMatched(element) {
        if (this.delegate.elementMatchedAttribute) {
            this.delegate.elementMatchedAttribute(element, this.attributeName);
        }
    }
    elementUnmatched(element) {
        if (this.delegate.elementUnmatchedAttribute) {
            this.delegate.elementUnmatchedAttribute(element, this.attributeName);
        }
    }
    elementAttributeChanged(element, attributeName) {
        if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
            this.delegate.elementAttributeValueChanged(element, attributeName);
        }
    }
}

class StringMapObserver {
    constructor(element, delegate) {
        this.element = element;
        this.delegate = delegate;
        this.started = false;
        this.stringMap = new Map;
        this.mutationObserver = new MutationObserver(mutations => this.processMutations(mutations));
    }
    start() {
        if (!this.started) {
            this.started = true;
            this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
            this.refresh();
        }
    }
    stop() {
        if (this.started) {
            this.mutationObserver.takeRecords();
            this.mutationObserver.disconnect();
            this.started = false;
        }
    }
    refresh() {
        if (this.started) {
            for (const attributeName of this.knownAttributeNames) {
                this.refreshAttribute(attributeName, null);
            }
        }
    }
    processMutations(mutations) {
        if (this.started) {
            for (const mutation of mutations) {
                this.processMutation(mutation);
            }
        }
    }
    processMutation(mutation) {
        const attributeName = mutation.attributeName;
        if (attributeName) {
            this.refreshAttribute(attributeName, mutation.oldValue);
        }
    }
    refreshAttribute(attributeName, oldValue) {
        const key = this.delegate.getStringMapKeyForAttribute(attributeName);
        if (key != null) {
            if (!this.stringMap.has(attributeName)) {
                this.stringMapKeyAdded(key, attributeName);
            }
            const value = this.element.getAttribute(attributeName);
            if (this.stringMap.get(attributeName) != value) {
                this.stringMapValueChanged(value, key, oldValue);
            }
            if (value == null) {
                const oldValue = this.stringMap.get(attributeName);
                this.stringMap.delete(attributeName);
                if (oldValue)
                    this.stringMapKeyRemoved(key, attributeName, oldValue);
            }
            else {
                this.stringMap.set(attributeName, value);
            }
        }
    }
    stringMapKeyAdded(key, attributeName) {
        if (this.delegate.stringMapKeyAdded) {
            this.delegate.stringMapKeyAdded(key, attributeName);
        }
    }
    stringMapValueChanged(value, key, oldValue) {
        if (this.delegate.stringMapValueChanged) {
            this.delegate.stringMapValueChanged(value, key, oldValue);
        }
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
        if (this.delegate.stringMapKeyRemoved) {
            this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
        }
    }
    get knownAttributeNames() {
        return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
    }
    get currentAttributeNames() {
        return Array.from(this.element.attributes).map(attribute => attribute.name);
    }
    get recordedAttributeNames() {
        return Array.from(this.stringMap.keys());
    }
}

function add(map, key, value) {
    fetch(map, key).add(value);
}
function del(map, key, value) {
    fetch(map, key).delete(value);
    prune(map, key);
}
function fetch(map, key) {
    let values = map.get(key);
    if (!values) {
        values = new Set();
        map.set(key, values);
    }
    return values;
}
function prune(map, key) {
    const values = map.get(key);
    if (values != null && values.size == 0) {
        map.delete(key);
    }
}

class Multimap {
    constructor() {
        this.valuesByKey = new Map();
    }
    get keys() {
        return Array.from(this.valuesByKey.keys());
    }
    get values() {
        const sets = Array.from(this.valuesByKey.values());
        return sets.reduce((values, set) => values.concat(Array.from(set)), []);
    }
    get size() {
        const sets = Array.from(this.valuesByKey.values());
        return sets.reduce((size, set) => size + set.size, 0);
    }
    add(key, value) {
        add(this.valuesByKey, key, value);
    }
    delete(key, value) {
        del(this.valuesByKey, key, value);
    }
    has(key, value) {
        const values = this.valuesByKey.get(key);
        return values != null && values.has(value);
    }
    hasKey(key) {
        return this.valuesByKey.has(key);
    }
    hasValue(value) {
        const sets = Array.from(this.valuesByKey.values());
        return sets.some(set => set.has(value));
    }
    getValuesForKey(key) {
        const values = this.valuesByKey.get(key);
        return values ? Array.from(values) : [];
    }
    getKeysForValue(value) {
        return Array.from(this.valuesByKey)
            .filter(([key, values]) => values.has(value))
            .map(([key, values]) => key);
    }
}

class IndexedMultimap extends Multimap {
    constructor() {
        super();
        this.keysByValue = new Map;
    }
    get values() {
        return Array.from(this.keysByValue.keys());
    }
    add(key, value) {
        super.add(key, value);
        add(this.keysByValue, value, key);
    }
    delete(key, value) {
        super.delete(key, value);
        del(this.keysByValue, value, key);
    }
    hasValue(value) {
        return this.keysByValue.has(value);
    }
    getKeysForValue(value) {
        const set = this.keysByValue.get(value);
        return set ? Array.from(set) : [];
    }
}

class TokenListObserver {
    constructor(element, attributeName, delegate) {
        this.attributeObserver = new AttributeObserver(element, attributeName, this);
        this.delegate = delegate;
        this.tokensByElement = new Multimap;
    }
    get started() {
        return this.attributeObserver.started;
    }
    start() {
        this.attributeObserver.start();
    }
    pause(callback) {
        this.attributeObserver.pause(callback);
    }
    stop() {
        this.attributeObserver.stop();
    }
    refresh() {
        this.attributeObserver.refresh();
    }
    get element() {
        return this.attributeObserver.element;
    }
    get attributeName() {
        return this.attributeObserver.attributeName;
    }
    elementMatchedAttribute(element) {
        this.tokensMatched(this.readTokensForElement(element));
    }
    elementAttributeValueChanged(element) {
        const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
        this.tokensUnmatched(unmatchedTokens);
        this.tokensMatched(matchedTokens);
    }
    elementUnmatchedAttribute(element) {
        this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
    }
    tokensMatched(tokens) {
        tokens.forEach(token => this.tokenMatched(token));
    }
    tokensUnmatched(tokens) {
        tokens.forEach(token => this.tokenUnmatched(token));
    }
    tokenMatched(token) {
        this.delegate.tokenMatched(token);
        this.tokensByElement.add(token.element, token);
    }
    tokenUnmatched(token) {
        this.delegate.tokenUnmatched(token);
        this.tokensByElement.delete(token.element, token);
    }
    refreshTokensForElement(element) {
        const previousTokens = this.tokensByElement.getValuesForKey(element);
        const currentTokens = this.readTokensForElement(element);
        const firstDifferingIndex = zip(previousTokens, currentTokens)
            .findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
        if (firstDifferingIndex == -1) {
            return [[], []];
        }
        else {
            return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
        }
    }
    readTokensForElement(element) {
        const attributeName = this.attributeName;
        const tokenString = element.getAttribute(attributeName) || "";
        return parseTokenString(tokenString, element, attributeName);
    }
}
function parseTokenString(tokenString, element, attributeName) {
    return tokenString.trim().split(/\s+/).filter(content => content.length)
        .map((content, index) => ({ element, attributeName, content, index }));
}
function zip(left, right) {
    const length = Math.max(left.length, right.length);
    return Array.from({ length }, (_, index) => [left[index], right[index]]);
}
function tokensAreEqual(left, right) {
    return left && right && left.index == right.index && left.content == right.content;
}

class ValueListObserver {
    constructor(element, attributeName, delegate) {
        this.tokenListObserver = new TokenListObserver(element, attributeName, this);
        this.delegate = delegate;
        this.parseResultsByToken = new WeakMap;
        this.valuesByTokenByElement = new WeakMap;
    }
    get started() {
        return this.tokenListObserver.started;
    }
    start() {
        this.tokenListObserver.start();
    }
    stop() {
        this.tokenListObserver.stop();
    }
    refresh() {
        this.tokenListObserver.refresh();
    }
    get element() {
        return this.tokenListObserver.element;
    }
    get attributeName() {
        return this.tokenListObserver.attributeName;
    }
    tokenMatched(token) {
        const { element } = token;
        const { value } = this.fetchParseResultForToken(token);
        if (value) {
            this.fetchValuesByTokenForElement(element).set(token, value);
            this.delegate.elementMatchedValue(element, value);
        }
    }
    tokenUnmatched(token) {
        const { element } = token;
        const { value } = this.fetchParseResultForToken(token);
        if (value) {
            this.fetchValuesByTokenForElement(element).delete(token);
            this.delegate.elementUnmatchedValue(element, value);
        }
    }
    fetchParseResultForToken(token) {
        let parseResult = this.parseResultsByToken.get(token);
        if (!parseResult) {
            parseResult = this.parseToken(token);
            this.parseResultsByToken.set(token, parseResult);
        }
        return parseResult;
    }
    fetchValuesByTokenForElement(element) {
        let valuesByToken = this.valuesByTokenByElement.get(element);
        if (!valuesByToken) {
            valuesByToken = new Map;
            this.valuesByTokenByElement.set(element, valuesByToken);
        }
        return valuesByToken;
    }
    parseToken(token) {
        try {
            const value = this.delegate.parseValueForToken(token);
            return { value };
        }
        catch (error) {
            return { error };
        }
    }
}

class BindingObserver {
    constructor(context, delegate) {
        this.context = context;
        this.delegate = delegate;
        this.bindingsByAction = new Map;
    }
    start() {
        if (!this.valueListObserver) {
            this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
            this.valueListObserver.start();
        }
    }
    stop() {
        if (this.valueListObserver) {
            this.valueListObserver.stop();
            delete this.valueListObserver;
            this.disconnectAllActions();
        }
    }
    get element() {
        return this.context.element;
    }
    get identifier() {
        return this.context.identifier;
    }
    get actionAttribute() {
        return this.schema.actionAttribute;
    }
    get schema() {
        return this.context.schema;
    }
    get bindings() {
        return Array.from(this.bindingsByAction.values());
    }
    connectAction(action) {
        const binding = new Binding(this.context, action);
        this.bindingsByAction.set(action, binding);
        this.delegate.bindingConnected(binding);
    }
    disconnectAction(action) {
        const binding = this.bindingsByAction.get(action);
        if (binding) {
            this.bindingsByAction.delete(action);
            this.delegate.bindingDisconnected(binding);
        }
    }
    disconnectAllActions() {
        this.bindings.forEach(binding => this.delegate.bindingDisconnected(binding));
        this.bindingsByAction.clear();
    }
    parseValueForToken(token) {
        const action = Action.forToken(token);
        if (action.identifier == this.identifier) {
            return action;
        }
    }
    elementMatchedValue(element, action) {
        this.connectAction(action);
    }
    elementUnmatchedValue(element, action) {
        this.disconnectAction(action);
    }
}

class ValueObserver {
    constructor(context, receiver) {
        this.context = context;
        this.receiver = receiver;
        this.stringMapObserver = new StringMapObserver(this.element, this);
        this.valueDescriptorMap = this.controller.valueDescriptorMap;
        this.invokeChangedCallbacksForDefaultValues();
    }
    start() {
        this.stringMapObserver.start();
    }
    stop() {
        this.stringMapObserver.stop();
    }
    get element() {
        return this.context.element;
    }
    get controller() {
        return this.context.controller;
    }
    getStringMapKeyForAttribute(attributeName) {
        if (attributeName in this.valueDescriptorMap) {
            return this.valueDescriptorMap[attributeName].name;
        }
    }
    stringMapKeyAdded(key, attributeName) {
        const descriptor = this.valueDescriptorMap[attributeName];
        if (!this.hasValue(key)) {
            this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
        }
    }
    stringMapValueChanged(value, name, oldValue) {
        const descriptor = this.valueDescriptorNameMap[name];
        if (value === null)
            return;
        if (oldValue === null) {
            oldValue = descriptor.writer(descriptor.defaultValue);
        }
        this.invokeChangedCallback(name, value, oldValue);
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
        const descriptor = this.valueDescriptorNameMap[key];
        if (this.hasValue(key)) {
            this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
        }
        else {
            this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
        }
    }
    invokeChangedCallbacksForDefaultValues() {
        for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
            if (defaultValue != undefined && !this.controller.data.has(key)) {
                this.invokeChangedCallback(name, writer(defaultValue), undefined);
            }
        }
    }
    invokeChangedCallback(name, rawValue, rawOldValue) {
        const changedMethodName = `${name}Changed`;
        const changedMethod = this.receiver[changedMethodName];
        if (typeof changedMethod == "function") {
            const descriptor = this.valueDescriptorNameMap[name];
            const value = descriptor.reader(rawValue);
            let oldValue = rawOldValue;
            if (rawOldValue) {
                oldValue = descriptor.reader(rawOldValue);
            }
            changedMethod.call(this.receiver, value, oldValue);
        }
    }
    get valueDescriptors() {
        const { valueDescriptorMap } = this;
        return Object.keys(valueDescriptorMap).map(key => valueDescriptorMap[key]);
    }
    get valueDescriptorNameMap() {
        const descriptors = {};
        Object.keys(this.valueDescriptorMap).forEach(key => {
            const descriptor = this.valueDescriptorMap[key];
            descriptors[descriptor.name] = descriptor;
        });
        return descriptors;
    }
    hasValue(attributeName) {
        const descriptor = this.valueDescriptorNameMap[attributeName];
        const hasMethodName = `has${capitalize(descriptor.name)}`;
        return this.receiver[hasMethodName];
    }
}

class TargetObserver {
    constructor(context, delegate) {
        this.context = context;
        this.delegate = delegate;
        this.targetsByName = new Multimap;
    }
    start() {
        if (!this.tokenListObserver) {
            this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
            this.tokenListObserver.start();
        }
    }
    stop() {
        if (this.tokenListObserver) {
            this.disconnectAllTargets();
            this.tokenListObserver.stop();
            delete this.tokenListObserver;
        }
    }
    tokenMatched({ element, content: name }) {
        if (this.scope.containsElement(element)) {
            this.connectTarget(element, name);
        }
    }
    tokenUnmatched({ element, content: name }) {
        this.disconnectTarget(element, name);
    }
    connectTarget(element, name) {
        var _a;
        if (!this.targetsByName.has(name, element)) {
            this.targetsByName.add(name, element);
            (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
        }
    }
    disconnectTarget(element, name) {
        var _a;
        if (this.targetsByName.has(name, element)) {
            this.targetsByName.delete(name, element);
            (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
        }
    }
    disconnectAllTargets() {
        for (const name of this.targetsByName.keys) {
            for (const element of this.targetsByName.getValuesForKey(name)) {
                this.disconnectTarget(element, name);
            }
        }
    }
    get attributeName() {
        return `data-${this.context.identifier}-target`;
    }
    get element() {
        return this.context.element;
    }
    get scope() {
        return this.context.scope;
    }
}

class Context {
    constructor(module, scope) {
        this.logDebugActivity = (functionName, detail = {}) => {
            const { identifier, controller, element } = this;
            detail = Object.assign({ identifier, controller, element }, detail);
            this.application.logDebugActivity(this.identifier, functionName, detail);
        };
        this.module = module;
        this.scope = scope;
        this.controller = new module.controllerConstructor(this);
        this.bindingObserver = new BindingObserver(this, this.dispatcher);
        this.valueObserver = new ValueObserver(this, this.controller);
        this.targetObserver = new TargetObserver(this, this);
        try {
            this.controller.initialize();
            this.logDebugActivity("initialize");
        }
        catch (error) {
            this.handleError(error, "initializing controller");
        }
    }
    connect() {
        this.bindingObserver.start();
        this.valueObserver.start();
        this.targetObserver.start();
        try {
            this.controller.connect();
            this.logDebugActivity("connect");
        }
        catch (error) {
            this.handleError(error, "connecting controller");
        }
    }
    disconnect() {
        try {
            this.controller.disconnect();
            this.logDebugActivity("disconnect");
        }
        catch (error) {
            this.handleError(error, "disconnecting controller");
        }
        this.targetObserver.stop();
        this.valueObserver.stop();
        this.bindingObserver.stop();
    }
    get application() {
        return this.module.application;
    }
    get identifier() {
        return this.module.identifier;
    }
    get schema() {
        return this.application.schema;
    }
    get dispatcher() {
        return this.application.dispatcher;
    }
    get element() {
        return this.scope.element;
    }
    get parentElement() {
        return this.element.parentElement;
    }
    handleError(error, message, detail = {}) {
        const { identifier, controller, element } = this;
        detail = Object.assign({ identifier, controller, element }, detail);
        this.application.handleError(error, `Error ${message}`, detail);
    }
    targetConnected(element, name) {
        this.invokeControllerMethod(`${name}TargetConnected`, element);
    }
    targetDisconnected(element, name) {
        this.invokeControllerMethod(`${name}TargetDisconnected`, element);
    }
    invokeControllerMethod(methodName, ...args) {
        const controller = this.controller;
        if (typeof controller[methodName] == "function") {
            controller[methodName](...args);
        }
    }
}

function readInheritableStaticArrayValues(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return Array.from(ancestors.reduce((values, constructor) => {
        getOwnStaticArrayValues(constructor, propertyName).forEach(name => values.add(name));
        return values;
    }, new Set));
}
function readInheritableStaticObjectPairs(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return ancestors.reduce((pairs, constructor) => {
        pairs.push(...getOwnStaticObjectPairs(constructor, propertyName));
        return pairs;
    }, []);
}
function getAncestorsForConstructor(constructor) {
    const ancestors = [];
    while (constructor) {
        ancestors.push(constructor);
        constructor = Object.getPrototypeOf(constructor);
    }
    return ancestors.reverse();
}
function getOwnStaticArrayValues(constructor, propertyName) {
    const definition = constructor[propertyName];
    return Array.isArray(definition) ? definition : [];
}
function getOwnStaticObjectPairs(constructor, propertyName) {
    const definition = constructor[propertyName];
    return definition ? Object.keys(definition).map(key => [key, definition[key]]) : [];
}

function bless(constructor) {
    return shadow(constructor, getBlessedProperties(constructor));
}
function shadow(constructor, properties) {
    const shadowConstructor = extend(constructor);
    const shadowProperties = getShadowProperties(constructor.prototype, properties);
    Object.defineProperties(shadowConstructor.prototype, shadowProperties);
    return shadowConstructor;
}
function getBlessedProperties(constructor) {
    const blessings = readInheritableStaticArrayValues(constructor, "blessings");
    return blessings.reduce((blessedProperties, blessing) => {
        const properties = blessing(constructor);
        for (const key in properties) {
            const descriptor = blessedProperties[key] || {};
            blessedProperties[key] = Object.assign(descriptor, properties[key]);
        }
        return blessedProperties;
    }, {});
}
function getShadowProperties(prototype, properties) {
    return getOwnKeys(properties).reduce((shadowProperties, key) => {
        const descriptor = getShadowedDescriptor(prototype, properties, key);
        if (descriptor) {
            Object.assign(shadowProperties, { [key]: descriptor });
        }
        return shadowProperties;
    }, {});
}
function getShadowedDescriptor(prototype, properties, key) {
    const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
    const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
    if (!shadowedByValue) {
        const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
        if (shadowingDescriptor) {
            descriptor.get = shadowingDescriptor.get || descriptor.get;
            descriptor.set = shadowingDescriptor.set || descriptor.set;
        }
        return descriptor;
    }
}
const getOwnKeys = (() => {
    if (typeof Object.getOwnPropertySymbols == "function") {
        return (object) => [
            ...Object.getOwnPropertyNames(object),
            ...Object.getOwnPropertySymbols(object)
        ];
    }
    else {
        return Object.getOwnPropertyNames;
    }
})();
const extend = (() => {
    function extendWithReflect(constructor) {
        function extended() {
            return Reflect.construct(constructor, arguments, new.target);
        }
        extended.prototype = Object.create(constructor.prototype, {
            constructor: { value: extended }
        });
        Reflect.setPrototypeOf(extended, constructor);
        return extended;
    }
    function testReflectExtension() {
        const a = function () { this.a.call(this); };
        const b = extendWithReflect(a);
        b.prototype.a = function () { };
        return new b;
    }
    try {
        testReflectExtension();
        return extendWithReflect;
    }
    catch (error) {
        return (constructor) => class extended extends constructor {
        };
    }
})();

function blessDefinition(definition) {
    return {
        identifier: definition.identifier,
        controllerConstructor: bless(definition.controllerConstructor)
    };
}

class Module {
    constructor(application, definition) {
        this.application = application;
        this.definition = blessDefinition(definition);
        this.contextsByScope = new WeakMap;
        this.connectedContexts = new Set;
    }
    get identifier() {
        return this.definition.identifier;
    }
    get controllerConstructor() {
        return this.definition.controllerConstructor;
    }
    get contexts() {
        return Array.from(this.connectedContexts);
    }
    connectContextForScope(scope) {
        const context = this.fetchContextForScope(scope);
        this.connectedContexts.add(context);
        context.connect();
    }
    disconnectContextForScope(scope) {
        const context = this.contextsByScope.get(scope);
        if (context) {
            this.connectedContexts.delete(context);
            context.disconnect();
        }
    }
    fetchContextForScope(scope) {
        let context = this.contextsByScope.get(scope);
        if (!context) {
            context = new Context(this, scope);
            this.contextsByScope.set(scope, context);
        }
        return context;
    }
}

class ClassMap {
    constructor(scope) {
        this.scope = scope;
    }
    has(name) {
        return this.data.has(this.getDataKey(name));
    }
    get(name) {
        return this.getAll(name)[0];
    }
    getAll(name) {
        const tokenString = this.data.get(this.getDataKey(name)) || "";
        return tokenize(tokenString);
    }
    getAttributeName(name) {
        return this.data.getAttributeNameForKey(this.getDataKey(name));
    }
    getDataKey(name) {
        return `${name}-class`;
    }
    get data() {
        return this.scope.data;
    }
}

class DataMap {
    constructor(scope) {
        this.scope = scope;
    }
    get element() {
        return this.scope.element;
    }
    get identifier() {
        return this.scope.identifier;
    }
    get(key) {
        const name = this.getAttributeNameForKey(key);
        return this.element.getAttribute(name);
    }
    set(key, value) {
        const name = this.getAttributeNameForKey(key);
        this.element.setAttribute(name, value);
        return this.get(key);
    }
    has(key) {
        const name = this.getAttributeNameForKey(key);
        return this.element.hasAttribute(name);
    }
    delete(key) {
        if (this.has(key)) {
            const name = this.getAttributeNameForKey(key);
            this.element.removeAttribute(name);
            return true;
        }
        else {
            return false;
        }
    }
    getAttributeNameForKey(key) {
        return `data-${this.identifier}-${dasherize(key)}`;
    }
}

class Guide {
    constructor(logger) {
        this.warnedKeysByObject = new WeakMap;
        this.logger = logger;
    }
    warn(object, key, message) {
        let warnedKeys = this.warnedKeysByObject.get(object);
        if (!warnedKeys) {
            warnedKeys = new Set;
            this.warnedKeysByObject.set(object, warnedKeys);
        }
        if (!warnedKeys.has(key)) {
            warnedKeys.add(key);
            this.logger.warn(message, object);
        }
    }
}

function attributeValueContainsToken(attributeName, token) {
    return `[${attributeName}~="${token}"]`;
}

class TargetSet {
    constructor(scope) {
        this.scope = scope;
    }
    get element() {
        return this.scope.element;
    }
    get identifier() {
        return this.scope.identifier;
    }
    get schema() {
        return this.scope.schema;
    }
    has(targetName) {
        return this.find(targetName) != null;
    }
    find(...targetNames) {
        return targetNames.reduce((target, targetName) => target
            || this.findTarget(targetName)
            || this.findLegacyTarget(targetName), undefined);
    }
    findAll(...targetNames) {
        return targetNames.reduce((targets, targetName) => [
            ...targets,
            ...this.findAllTargets(targetName),
            ...this.findAllLegacyTargets(targetName)
        ], []);
    }
    findTarget(targetName) {
        const selector = this.getSelectorForTargetName(targetName);
        return this.scope.findElement(selector);
    }
    findAllTargets(targetName) {
        const selector = this.getSelectorForTargetName(targetName);
        return this.scope.findAllElements(selector);
    }
    getSelectorForTargetName(targetName) {
        const attributeName = this.schema.targetAttributeForScope(this.identifier);
        return attributeValueContainsToken(attributeName, targetName);
    }
    findLegacyTarget(targetName) {
        const selector = this.getLegacySelectorForTargetName(targetName);
        return this.deprecate(this.scope.findElement(selector), targetName);
    }
    findAllLegacyTargets(targetName) {
        const selector = this.getLegacySelectorForTargetName(targetName);
        return this.scope.findAllElements(selector).map(element => this.deprecate(element, targetName));
    }
    getLegacySelectorForTargetName(targetName) {
        const targetDescriptor = `${this.identifier}.${targetName}`;
        return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
    }
    deprecate(element, targetName) {
        if (element) {
            const { identifier } = this;
            const attributeName = this.schema.targetAttribute;
            const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
            this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". ` +
                `The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
        }
        return element;
    }
    get guide() {
        return this.scope.guide;
    }
}

class Scope {
    constructor(schema, element, identifier, logger) {
        this.targets = new TargetSet(this);
        this.classes = new ClassMap(this);
        this.data = new DataMap(this);
        this.containsElement = (element) => {
            return element.closest(this.controllerSelector) === this.element;
        };
        this.schema = schema;
        this.element = element;
        this.identifier = identifier;
        this.guide = new Guide(logger);
    }
    findElement(selector) {
        return this.element.matches(selector)
            ? this.element
            : this.queryElements(selector).find(this.containsElement);
    }
    findAllElements(selector) {
        return [
            ...this.element.matches(selector) ? [this.element] : [],
            ...this.queryElements(selector).filter(this.containsElement)
        ];
    }
    queryElements(selector) {
        return Array.from(this.element.querySelectorAll(selector));
    }
    get controllerSelector() {
        return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
    }
}

class ScopeObserver {
    constructor(element, schema, delegate) {
        this.element = element;
        this.schema = schema;
        this.delegate = delegate;
        this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
        this.scopesByIdentifierByElement = new WeakMap;
        this.scopeReferenceCounts = new WeakMap;
    }
    start() {
        this.valueListObserver.start();
    }
    stop() {
        this.valueListObserver.stop();
    }
    get controllerAttribute() {
        return this.schema.controllerAttribute;
    }
    parseValueForToken(token) {
        const { element, content: identifier } = token;
        const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
        let scope = scopesByIdentifier.get(identifier);
        if (!scope) {
            scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
            scopesByIdentifier.set(identifier, scope);
        }
        return scope;
    }
    elementMatchedValue(element, value) {
        const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
        this.scopeReferenceCounts.set(value, referenceCount);
        if (referenceCount == 1) {
            this.delegate.scopeConnected(value);
        }
    }
    elementUnmatchedValue(element, value) {
        const referenceCount = this.scopeReferenceCounts.get(value);
        if (referenceCount) {
            this.scopeReferenceCounts.set(value, referenceCount - 1);
            if (referenceCount == 1) {
                this.delegate.scopeDisconnected(value);
            }
        }
    }
    fetchScopesByIdentifierForElement(element) {
        let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
        if (!scopesByIdentifier) {
            scopesByIdentifier = new Map;
            this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
        }
        return scopesByIdentifier;
    }
}

class Router {
    constructor(application) {
        this.application = application;
        this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
        this.scopesByIdentifier = new Multimap;
        this.modulesByIdentifier = new Map;
    }
    get element() {
        return this.application.element;
    }
    get schema() {
        return this.application.schema;
    }
    get logger() {
        return this.application.logger;
    }
    get controllerAttribute() {
        return this.schema.controllerAttribute;
    }
    get modules() {
        return Array.from(this.modulesByIdentifier.values());
    }
    get contexts() {
        return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
    }
    start() {
        this.scopeObserver.start();
    }
    stop() {
        this.scopeObserver.stop();
    }
    loadDefinition(definition) {
        this.unloadIdentifier(definition.identifier);
        const module = new Module(this.application, definition);
        this.connectModule(module);
    }
    unloadIdentifier(identifier) {
        const module = this.modulesByIdentifier.get(identifier);
        if (module) {
            this.disconnectModule(module);
        }
    }
    getContextForElementAndIdentifier(element, identifier) {
        const module = this.modulesByIdentifier.get(identifier);
        if (module) {
            return module.contexts.find(context => context.element == element);
        }
    }
    handleError(error, message, detail) {
        this.application.handleError(error, message, detail);
    }
    createScopeForElementAndIdentifier(element, identifier) {
        return new Scope(this.schema, element, identifier, this.logger);
    }
    scopeConnected(scope) {
        this.scopesByIdentifier.add(scope.identifier, scope);
        const module = this.modulesByIdentifier.get(scope.identifier);
        if (module) {
            module.connectContextForScope(scope);
        }
    }
    scopeDisconnected(scope) {
        this.scopesByIdentifier.delete(scope.identifier, scope);
        const module = this.modulesByIdentifier.get(scope.identifier);
        if (module) {
            module.disconnectContextForScope(scope);
        }
    }
    connectModule(module) {
        this.modulesByIdentifier.set(module.identifier, module);
        const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
        scopes.forEach(scope => module.connectContextForScope(scope));
    }
    disconnectModule(module) {
        this.modulesByIdentifier.delete(module.identifier);
        const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
        scopes.forEach(scope => module.disconnectContextForScope(scope));
    }
}

const defaultSchema = {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-target",
    targetAttributeForScope: identifier => `data-${identifier}-target`
};

class Application {
    constructor(element = document.documentElement, schema = defaultSchema) {
        this.logger = console;
        this.debug = false;
        this.logDebugActivity = (identifier, functionName, detail = {}) => {
            if (this.debug) {
                this.logFormattedMessage(identifier, functionName, detail);
            }
        };
        this.element = element;
        this.schema = schema;
        this.dispatcher = new Dispatcher(this);
        this.router = new Router(this);
    }
    static start(element, schema) {
        const application = new Application(element, schema);
        application.start();
        return application;
    }
    async start() {
        await domReady();
        this.logDebugActivity("application", "starting");
        this.dispatcher.start();
        this.router.start();
        this.logDebugActivity("application", "start");
    }
    stop() {
        this.logDebugActivity("application", "stopping");
        this.dispatcher.stop();
        this.router.stop();
        this.logDebugActivity("application", "stop");
    }
    register(identifier, controllerConstructor) {
        if (controllerConstructor.shouldLoad) {
            this.load({ identifier, controllerConstructor });
        }
    }
    load(head, ...rest) {
        const definitions = Array.isArray(head) ? head : [head, ...rest];
        definitions.forEach(definition => this.router.loadDefinition(definition));
    }
    unload(head, ...rest) {
        const identifiers = Array.isArray(head) ? head : [head, ...rest];
        identifiers.forEach(identifier => this.router.unloadIdentifier(identifier));
    }
    get controllers() {
        return this.router.contexts.map(context => context.controller);
    }
    getControllerForElementAndIdentifier(element, identifier) {
        const context = this.router.getContextForElementAndIdentifier(element, identifier);
        return context ? context.controller : null;
    }
    handleError(error, message, detail) {
        var _a;
        this.logger.error(`%s\n\n%o\n\n%o`, message, error, detail);
        (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error);
    }
    logFormattedMessage(identifier, functionName, detail = {}) {
        detail = Object.assign({ application: this }, detail);
        this.logger.groupCollapsed(`${identifier} #${functionName}`);
        this.logger.log("details:", Object.assign({}, detail));
        this.logger.groupEnd();
    }
}
function domReady() {
    return new Promise(resolve => {
        if (document.readyState == "loading") {
            document.addEventListener("DOMContentLoaded", () => resolve());
        }
        else {
            resolve();
        }
    });
}

function ClassPropertiesBlessing(constructor) {
    const classes = readInheritableStaticArrayValues(constructor, "classes");
    return classes.reduce((properties, classDefinition) => {
        return Object.assign(properties, propertiesForClassDefinition(classDefinition));
    }, {});
}
function propertiesForClassDefinition(key) {
    return {
        [`${key}Class`]: {
            get() {
                const { classes } = this;
                if (classes.has(key)) {
                    return classes.get(key);
                }
                else {
                    const attribute = classes.getAttributeName(key);
                    throw new Error(`Missing attribute "${attribute}"`);
                }
            }
        },
        [`${key}Classes`]: {
            get() {
                return this.classes.getAll(key);
            }
        },
        [`has${capitalize(key)}Class`]: {
            get() {
                return this.classes.has(key);
            }
        }
    };
}

function TargetPropertiesBlessing(constructor) {
    const targets = readInheritableStaticArrayValues(constructor, "targets");
    return targets.reduce((properties, targetDefinition) => {
        return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
    }, {});
}
function propertiesForTargetDefinition(name) {
    return {
        [`${name}Target`]: {
            get() {
                const target = this.targets.find(name);
                if (target) {
                    return target;
                }
                else {
                    throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
                }
            }
        },
        [`${name}Targets`]: {
            get() {
                return this.targets.findAll(name);
            }
        },
        [`has${capitalize(name)}Target`]: {
            get() {
                return this.targets.has(name);
            }
        }
    };
}

function ValuePropertiesBlessing(constructor) {
    const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
    const propertyDescriptorMap = {
        valueDescriptorMap: {
            get() {
                return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
                    const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair);
                    const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
                    return Object.assign(result, { [attributeName]: valueDescriptor });
                }, {});
            }
        }
    };
    return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
        return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
    }, propertyDescriptorMap);
}
function propertiesForValueDefinitionPair(valueDefinitionPair) {
    const definition = parseValueDefinitionPair(valueDefinitionPair);
    const { key, name, reader: read, writer: write } = definition;
    return {
        [name]: {
            get() {
                const value = this.data.get(key);
                if (value !== null) {
                    return read(value);
                }
                else {
                    return definition.defaultValue;
                }
            },
            set(value) {
                if (value === undefined) {
                    this.data.delete(key);
                }
                else {
                    this.data.set(key, write(value));
                }
            }
        },
        [`has${capitalize(name)}`]: {
            get() {
                return this.data.has(key) || definition.hasCustomDefaultValue;
            }
        }
    };
}
function parseValueDefinitionPair([token, typeDefinition]) {
    return valueDescriptorForTokenAndTypeDefinition(token, typeDefinition);
}
function parseValueTypeConstant(constant) {
    switch (constant) {
        case Array: return "array";
        case Boolean: return "boolean";
        case Number: return "number";
        case Object: return "object";
        case String: return "string";
    }
}
function parseValueTypeDefault(defaultValue) {
    switch (typeof defaultValue) {
        case "boolean": return "boolean";
        case "number": return "number";
        case "string": return "string";
    }
    if (Array.isArray(defaultValue))
        return "array";
    if (Object.prototype.toString.call(defaultValue) === "[object Object]")
        return "object";
}
function parseValueTypeObject(typeObject) {
    const typeFromObject = parseValueTypeConstant(typeObject.type);
    if (typeFromObject) {
        const defaultValueType = parseValueTypeDefault(typeObject.default);
        if (typeFromObject !== defaultValueType) {
            throw new Error(`Type "${typeFromObject}" must match the type of the default value. Given default value: "${typeObject.default}" as "${defaultValueType}"`);
        }
        return typeFromObject;
    }
}
function parseValueTypeDefinition(typeDefinition) {
    const typeFromObject = parseValueTypeObject(typeDefinition);
    const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
    const typeFromConstant = parseValueTypeConstant(typeDefinition);
    const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
    if (type)
        return type;
    throw new Error(`Unknown value type "${typeDefinition}"`);
}
function defaultValueForDefinition(typeDefinition) {
    const constant = parseValueTypeConstant(typeDefinition);
    if (constant)
        return defaultValuesByType[constant];
    const defaultValue = typeDefinition.default;
    if (defaultValue !== undefined)
        return defaultValue;
    return typeDefinition;
}
function valueDescriptorForTokenAndTypeDefinition(token, typeDefinition) {
    const key = `${dasherize(token)}-value`;
    const type = parseValueTypeDefinition(typeDefinition);
    return {
        type,
        key,
        name: camelize(key),
        get defaultValue() { return defaultValueForDefinition(typeDefinition); },
        get hasCustomDefaultValue() { return parseValueTypeDefault(typeDefinition) !== undefined; },
        reader: readers[type],
        writer: writers[type] || writers.default
    };
}
const defaultValuesByType = {
    get array() { return []; },
    boolean: false,
    number: 0,
    get object() { return {}; },
    string: ""
};
const readers = {
    array(value) {
        const array = JSON.parse(value);
        if (!Array.isArray(array)) {
            throw new TypeError("Expected array");
        }
        return array;
    },
    boolean(value) {
        return !(value == "0" || value == "false");
    },
    number(value) {
        return Number(value);
    },
    object(value) {
        const object = JSON.parse(value);
        if (object === null || typeof object != "object" || Array.isArray(object)) {
            throw new TypeError("Expected object");
        }
        return object;
    },
    string(value) {
        return value;
    }
};
const writers = {
    default: writeString,
    array: writeJSON,
    object: writeJSON
};
function writeJSON(value) {
    return JSON.stringify(value);
}
function writeString(value) {
    return `${value}`;
}

class Controller {
    constructor(context) {
        this.context = context;
    }
    static get shouldLoad() {
        return true;
    }
    get application() {
        return this.context.application;
    }
    get scope() {
        return this.context.scope;
    }
    get element() {
        return this.scope.element;
    }
    get identifier() {
        return this.scope.identifier;
    }
    get targets() {
        return this.scope.targets;
    }
    get classes() {
        return this.scope.classes;
    }
    get data() {
        return this.scope.data;
    }
    initialize() {
    }
    connect() {
    }
    disconnect() {
    }
    dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
        const type = prefix ? `${prefix}:${eventName}` : eventName;
        const event = new CustomEvent(type, { detail, bubbles, cancelable });
        target.dispatchEvent(event);
        return event;
    }
}
Controller.blessings = [ClassPropertiesBlessing, TargetPropertiesBlessing, ValuePropertiesBlessing];
Controller.targets = [];
Controller.values = {};




/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/radios/radios.scss":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/radios/radios.scss ***!
  \************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "ap-input-radios {\n  display: block;\n  position: absolute;\n}\nap-input-radios .ap-input-radios__label {\n  display: flex;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid black;\n}\nap-input-radios .ap-input-radios__input {\n  margin: 0;\n}\nap-input-radios.ap-input-radios--is-selected .ap-input-radios__label {\n  border-width: 5px;\n}", "",{"version":3,"sources":["webpack://./src/components/radios/radios.scss"],"names":[],"mappings":"AAAA;EACI,cAAA;EACA,kBAAA;AACJ;AAEQ;EACI,aAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,uBAAA;AAAZ;AAGQ;EACI,SAAA;AADZ;AAMQ;EACI,iBAAA;AAJZ","sourcesContent":["ap-input-radios {\n    display: block;\n    position: absolute;\n\n    .ap-input-radios {\n        &__label {\n            display: flex;\n            box-sizing: border-box;\n            width: 100%;\n            height: 100%;\n            align-items: center;\n            justify-content: center;\n            border: 1px solid black;\n        }\n\n        &__input {\n            margin: 0;\n        }\n    }\n\n    &.ap-input-radios--is-selected {\n        .ap-input-radios__label {\n            border-width: 5px;\n        }\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/handlebars/dist/handlebars.js":
/*!****************************************************!*\
  !*** ./node_modules/handlebars/dist/handlebars.js ***!
  \****************************************************/
/***/ (function(module) {

/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __nested_webpack_require_1638__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_1638__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_1638__.m = modules;

/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_1638__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_1638__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_1638__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_2839__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_2839__(1)['default'];

	exports.__esModule = true;

	var _handlebarsRuntime = __nested_webpack_require_2839__(2);

	var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

	// Compiler imports

	var _handlebarsCompilerAst = __nested_webpack_require_2839__(45);

	var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

	var _handlebarsCompilerBase = __nested_webpack_require_2839__(46);

	var _handlebarsCompilerCompiler = __nested_webpack_require_2839__(51);

	var _handlebarsCompilerJavascriptCompiler = __nested_webpack_require_2839__(52);

	var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

	var _handlebarsCompilerVisitor = __nested_webpack_require_2839__(49);

	var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

	var _handlebarsNoConflict = __nested_webpack_require_2839__(44);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	var _create = _handlebarsRuntime2['default'].create;
	function create() {
	  var hb = _create();

	  hb.compile = function (input, options) {
	    return _handlebarsCompilerCompiler.compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return _handlebarsCompilerCompiler.precompile(input, options, hb);
	  };

	  hb.AST = _handlebarsCompilerAst2['default'];
	  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
	  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
	  hb.Parser = _handlebarsCompilerBase.parser;
	  hb.parse = _handlebarsCompilerBase.parse;
	  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst.Visitor = _handlebarsCompilerVisitor2['default'];

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }),
/* 2 */
/***/ (function(module, exports, __nested_webpack_require_5051__) {

	'use strict';

	var _interopRequireWildcard = __nested_webpack_require_5051__(3)['default'];

	var _interopRequireDefault = __nested_webpack_require_5051__(1)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __nested_webpack_require_5051__(4);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __nested_webpack_require_5051__(37);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __nested_webpack_require_5051__(6);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __nested_webpack_require_5051__(5);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __nested_webpack_require_5051__(38);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __nested_webpack_require_5051__(44);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_7277__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_7277__(1)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __nested_webpack_require_7277__(5);

	var _exception = __nested_webpack_require_7277__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __nested_webpack_require_7277__(10);

	var _decorators = __nested_webpack_require_7277__(30);

	var _logger = __nested_webpack_require_7277__(32);

	var _logger2 = _interopRequireDefault(_logger);

	var _internalProtoAccess = __nested_webpack_require_7277__(33);

	var VERSION = '4.7.7';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 8;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var LAST_COMPATIBLE_COMPILER_REVISION = 7;

	exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0 <4.3.0',
	  8: '>= 4.3.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  },
	  /**
	   * Reset the memory of illegal property accesses that have already been logged.
	   * @deprecated should only be used in handlebars test-cases
	   */
	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
	    _internalProtoAccess.resetLoggedProperties();
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_13814__) {

	'use strict';

	var _Object$defineProperty = __nested_webpack_require_13814__(7)['default'];

	exports.__esModule = true;
	var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      endLineNumber = undefined,
	      column = undefined,
	      endColumn = undefined;

	  if (loc) {
	    line = loc.start.line;
	    endLineNumber = loc.end.line;
	    column = loc.start.column;
	    endColumn = loc.end.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;
	      this.endLineNumber = endLineNumber;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (_Object$defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true
	        });
	        Object.defineProperty(this, 'endColumn', {
	          value: endColumn,
	          enumerable: true
	        });
	      } else {
	        this.column = column;
	        this.endColumn = endColumn;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __nested_webpack_require_15674__) {

	module.exports = { "default": __nested_webpack_require_15674__(8), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __nested_webpack_require_15825__) {

	var $ = __nested_webpack_require_15825__(9);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __nested_webpack_require_16519__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_16519__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	exports.moveHelperToHooks = moveHelperToHooks;

	var _helpersBlockHelperMissing = __nested_webpack_require_16519__(11);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __nested_webpack_require_16519__(12);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __nested_webpack_require_16519__(25);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __nested_webpack_require_16519__(26);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __nested_webpack_require_16519__(27);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __nested_webpack_require_16519__(28);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __nested_webpack_require_16519__(29);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

	function moveHelperToHooks(instance, helperName, keepHelper) {
	  if (instance.helpers[helperName]) {
	    instance.hooks[helperName] = instance.helpers[helperName];
	    if (!keepHelper) {
	      delete instance.helpers[helperName];
	    }
	  }
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __nested_webpack_require_18215__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __nested_webpack_require_18215__(5);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_19312__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _Object$keys = __nested_webpack_require_19312__(13)['default'];

	var _interopRequireDefault = __nested_webpack_require_19312__(1)['default'];

	exports.__esModule = true;

	var _utils = __nested_webpack_require_19312__(5);

	var _exception = __nested_webpack_require_19312__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else if (global.Symbol && context[global.Symbol.iterator]) {
	        var newContext = [];
	        var iterator = context[global.Symbol.iterator]();
	        for (var it = iterator.next(); !it.done; it = iterator.next()) {
	          newContext.push(it.value);
	        }
	        context = newContext;
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        (function () {
	          var priorKey = undefined;

	          _Object$keys(context).forEach(function (key) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          });
	          if (priorKey !== undefined) {
	            execIteration(priorKey, i - 1, true);
	          }
	        })();
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_22424__) {

	module.exports = { "default": __nested_webpack_require_22424__(14), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __nested_webpack_require_22577__) {

	__nested_webpack_require_22577__(15);
	module.exports = __nested_webpack_require_22577__(21).Object.keys;

/***/ }),
/* 15 */
/***/ (function(module, exports, __nested_webpack_require_22735__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __nested_webpack_require_22735__(16);

	__nested_webpack_require_22735__(18)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }),
/* 16 */
/***/ (function(module, exports, __nested_webpack_require_23006__) {

	// 7.1.13 ToObject(argument)
	var defined = __nested_webpack_require_23006__(17);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __nested_webpack_require_23439__) {

	// most Object methods by ES6 should accept primitives
	var $export = __nested_webpack_require_23439__(19)
	  , core    = __nested_webpack_require_23439__(21)
	  , fails   = __nested_webpack_require_23439__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __nested_webpack_require_23907__) {

	var global    = __nested_webpack_require_23907__(20)
	  , core      = __nested_webpack_require_23907__(21)
	  , ctx       = __nested_webpack_require_23907__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 22 */
/***/ (function(module, exports, __nested_webpack_require_26325__) {

	// optional / simple context binding
	var aFunction = __nested_webpack_require_26325__(23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __nested_webpack_require_27271__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_27271__(1)['default'];

	exports.__esModule = true;

	var _exception = __nested_webpack_require_27271__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __nested_webpack_require_28034__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_28034__(1)['default'];

	exports.__esModule = true;

	var _utils = __nested_webpack_require_28034__(5);

	var _exception = __nested_webpack_require_28034__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#if requires exactly one argument');
	    }
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#unless requires exactly one argument');
	    }
	    return instance.helpers['if'].call(this, conditional, {
	      fn: options.inverse,
	      inverse: options.fn,
	      hash: options.hash
	    });
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field, options) {
	    if (!obj) {
	      // Note for 5.0: Change to "obj == null" in 5.0
	      return obj;
	    }
	    return options.lookupProperty(obj, field);
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __nested_webpack_require_30680__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_30680__(1)['default'];

	exports.__esModule = true;

	var _utils = __nested_webpack_require_30680__(5);

	var _exception = __nested_webpack_require_30680__(6);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#with requires exactly one argument');
	    }
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __nested_webpack_require_31862__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_31862__(1)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __nested_webpack_require_31862__(31);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ }),
/* 31 */
/***/ (function(module, exports, __nested_webpack_require_32330__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __nested_webpack_require_32330__(5);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __nested_webpack_require_33155__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __nested_webpack_require_33155__(5);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      // eslint-disable-next-line no-console
	      if (!console[method]) {
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ }),
/* 33 */
/***/ (function(module, exports, __nested_webpack_require_34482__) {

	'use strict';

	var _Object$create = __nested_webpack_require_34482__(34)['default'];

	var _Object$keys = __nested_webpack_require_34482__(13)['default'];

	var _interopRequireWildcard = __nested_webpack_require_34482__(3)['default'];

	exports.__esModule = true;
	exports.createProtoAccessControl = createProtoAccessControl;
	exports.resultIsAllowed = resultIsAllowed;
	exports.resetLoggedProperties = resetLoggedProperties;

	var _createNewLookupObject = __nested_webpack_require_34482__(36);

	var _logger = __nested_webpack_require_34482__(32);

	var logger = _interopRequireWildcard(_logger);

	var loggedProperties = _Object$create(null);

	function createProtoAccessControl(runtimeOptions) {
	  var defaultMethodWhiteList = _Object$create(null);
	  defaultMethodWhiteList['constructor'] = false;
	  defaultMethodWhiteList['__defineGetter__'] = false;
	  defaultMethodWhiteList['__defineSetter__'] = false;
	  defaultMethodWhiteList['__lookupGetter__'] = false;

	  var defaultPropertyWhiteList = _Object$create(null);
	  // eslint-disable-next-line no-proto
	  defaultPropertyWhiteList['__proto__'] = false;

	  return {
	    properties: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
	    },
	    methods: {
	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
	      defaultValue: runtimeOptions.allowProtoMethodsByDefault
	    }
	  };
	}

	function resultIsAllowed(result, protoAccessControl, propertyName) {
	  if (typeof result === 'function') {
	    return checkWhiteList(protoAccessControl.methods, propertyName);
	  } else {
	    return checkWhiteList(protoAccessControl.properties, propertyName);
	  }
	}

	function checkWhiteList(protoAccessControlForType, propertyName) {
	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
	    return protoAccessControlForType.whitelist[propertyName] === true;
	  }
	  if (protoAccessControlForType.defaultValue !== undefined) {
	    return protoAccessControlForType.defaultValue;
	  }
	  logUnexpecedPropertyAccessOnce(propertyName);
	  return false;
	}

	function logUnexpecedPropertyAccessOnce(propertyName) {
	  if (loggedProperties[propertyName] !== true) {
	    loggedProperties[propertyName] = true;
	    logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
	  }
	}

	function resetLoggedProperties() {
	  _Object$keys(loggedProperties).forEach(function (propertyName) {
	    delete loggedProperties[propertyName];
	  });
	}

/***/ }),
/* 34 */
/***/ (function(module, exports, __nested_webpack_require_37419__) {

	module.exports = { "default": __nested_webpack_require_37419__(35), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __nested_webpack_require_37572__) {

	var $ = __nested_webpack_require_37572__(9);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __nested_webpack_require_37753__) {

	'use strict';

	var _Object$create = __nested_webpack_require_37753__(34)['default'];

	exports.__esModule = true;
	exports.createNewLookupObject = createNewLookupObject;

	var _utils = __nested_webpack_require_37753__(5);

	/**
	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
	 * The resulting object can be used with "object[property]" to check if a property exists
	 * @param {...object} sources a varargs parameter of source objects that will be merged
	 * @returns {object}
	 */

	function createNewLookupObject() {
	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	    sources[_key] = arguments[_key];
	  }

	  return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
	}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __nested_webpack_require_38977__) {

	'use strict';

	var _Object$seal = __nested_webpack_require_38977__(39)['default'];

	var _Object$keys = __nested_webpack_require_38977__(13)['default'];

	var _interopRequireWildcard = __nested_webpack_require_38977__(3)['default'];

	var _interopRequireDefault = __nested_webpack_require_38977__(1)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __nested_webpack_require_38977__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __nested_webpack_require_38977__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __nested_webpack_require_38977__(4);

	var _helpers = __nested_webpack_require_38977__(10);

	var _internalWrapHelper = __nested_webpack_require_38977__(43);

	var _internalProtoAccess = __nested_webpack_require_38977__(33);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
	    return;
	  }

	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
	    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	  } else {
	    // Use the embedded version info since the runtime doesn't know about this revision yet
	    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as pseudo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
	  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }
	    partial = env.VM.resolvePartial.call(this, partial, context, options);

	    var extendedOptions = Utils.extend({}, options, {
	      hooks: this.hooks,
	      protoAccessControl: this.protoAccessControl
	    });

	    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, extendedOptions);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name, loc) {
	      if (!obj || !(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
	          loc: loc
	        });
	      }
	      return container.lookupProperty(obj, name);
	    },
	    lookupProperty: function lookupProperty(parent, propertyName) {
	      var result = parent[propertyName];
	      if (result == null) {
	        return result;
	      }
	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
	        return result;
	      }

	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
	        return result;
	      }
	      return undefined;
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        var result = depths[i] && container.lookupProperty(depths[i], name);
	        if (result != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    mergeIfNeeded: function mergeIfNeeded(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: _Object$seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }

	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }

	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
	      container.helpers = mergedHelpers;

	      if (templateSpec.usePartial) {
	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
	      }

	      container.hooks = {};
	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

	      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
	      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
	      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
	    } else {
	      container.protoAccessControl = options.protoAccessControl; // internal option
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	      container.hooks = options.hooks;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	/**
	 * This is currently part of the official API, therefore implementation details should not be changed.
	 */

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

	function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
	  _Object$keys(mergedHelpers).forEach(function (helperName) {
	    var helper = mergedHelpers[helperName];
	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
	  });
	}

	function passLookupPropertyOption(helper, container) {
	  var lookupProperty = container.lookupProperty;
	  return _internalWrapHelper.wrapHelper(helper, function (options) {
	    return Utils.extend({ lookupProperty: lookupProperty }, options);
	  });
	}

/***/ }),
/* 39 */
/***/ (function(module, exports, __nested_webpack_require_52129__) {

	module.exports = { "default": __nested_webpack_require_52129__(40), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __nested_webpack_require_52282__) {

	__nested_webpack_require_52282__(41);
	module.exports = __nested_webpack_require_52282__(21).Object.seal;

/***/ }),
/* 41 */
/***/ (function(module, exports, __nested_webpack_require_52440__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __nested_webpack_require_52440__(42);

	__nested_webpack_require_52440__(18)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.wrapHelper = wrapHelper;

	function wrapHelper(helper, transformOptionsFn) {
	  if (typeof helper !== 'function') {
	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
	    return helper;
	  }
	  var wrapper = function wrapper() /* dynamic arguments */{
	    var options = arguments[arguments.length - 1];
	    arguments[arguments.length - 1] = transformOptionsFn(options);
	    return helper.apply(this, arguments);
	  };
	  return wrapper;
	}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var AST = {
	  // Public API used to evaluate derived attributes regarding AST nodes
	  helpers: {
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    helperExpression: function helperExpression(node) {
	      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
	    },

	    scopedId: function scopedId(path) {
	      return (/^\.|this\b/.test(path.original)
	      );
	    },

	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    simpleId: function simpleId(path) {
	      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
	    }
	  }
	};

	// Must be exported as an object rather than the root of the module as the jison lexer
	// must modify the object to operate properly.
	exports['default'] = AST;
	module.exports = exports['default'];

/***/ }),
/* 46 */
/***/ (function(module, exports, __nested_webpack_require_55372__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_55372__(1)['default'];

	var _interopRequireWildcard = __nested_webpack_require_55372__(3)['default'];

	exports.__esModule = true;
	exports.parseWithoutProcessing = parseWithoutProcessing;
	exports.parse = parse;

	var _parser = __nested_webpack_require_55372__(47);

	var _parser2 = _interopRequireDefault(_parser);

	var _whitespaceControl = __nested_webpack_require_55372__(48);

	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

	var _helpers = __nested_webpack_require_55372__(50);

	var Helpers = _interopRequireWildcard(_helpers);

	var _utils = __nested_webpack_require_55372__(5);

	exports.parser = _parser2['default'];

	var yy = {};
	_utils.extend(yy, Helpers);

	function parseWithoutProcessing(input, options) {
	  // Just return if an already-compiled AST was passed in.
	  if (input.type === 'Program') {
	    return input;
	  }

	  _parser2['default'].yy = yy;

	  // Altering the shared object here, but this is ok as parser is a sync operation
	  yy.locInfo = function (locInfo) {
	    return new yy.SourceLocation(options && options.srcName, locInfo);
	  };

	  var ast = _parser2['default'].parse(input);

	  return ast;
	}

	function parse(input, options) {
	  var ast = parseWithoutProcessing(input, options);
	  var strip = new _whitespaceControl2['default'](options);

	  return strip.accept(ast);
	}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	// File ignored in coverage tests via setting in .istanbul.yml
	/* Jison generated parser */
	"use strict";

	exports.__esModule = true;
	var handlebars = (function () {
	    var parser = { trace: function trace() {},
	        yy: {},
	        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
	        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
	        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
	        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

	            var $0 = $$.length - 1;
	            switch (yystate) {
	                case 1:
	                    return $$[$0 - 1];
	                    break;
	                case 2:
	                    this.$ = yy.prepareProgram($$[$0]);
	                    break;
	                case 3:
	                    this.$ = $$[$0];
	                    break;
	                case 4:
	                    this.$ = $$[$0];
	                    break;
	                case 5:
	                    this.$ = $$[$0];
	                    break;
	                case 6:
	                    this.$ = $$[$0];
	                    break;
	                case 7:
	                    this.$ = $$[$0];
	                    break;
	                case 8:
	                    this.$ = $$[$0];
	                    break;
	                case 9:
	                    this.$ = {
	                        type: 'CommentStatement',
	                        value: yy.stripComment($$[$0]),
	                        strip: yy.stripFlags($$[$0], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 10:
	                    this.$ = {
	                        type: 'ContentStatement',
	                        original: $$[$0],
	                        value: $$[$0],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 11:
	                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 12:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
	                    break;
	                case 13:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
	                    break;
	                case 14:
	                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
	                    break;
	                case 15:
	                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 16:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 17:
	                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
	                    break;
	                case 18:
	                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
	                    break;
	                case 19:
	                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
	                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
	                    program.chained = true;

	                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

	                    break;
	                case 20:
	                    this.$ = $$[$0];
	                    break;
	                case 21:
	                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
	                    break;
	                case 22:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 23:
	                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
	                    break;
	                case 24:
	                    this.$ = {
	                        type: 'PartialStatement',
	                        name: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        indent: '',
	                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 25:
	                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
	                    break;
	                case 26:
	                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
	                    break;
	                case 27:
	                    this.$ = $$[$0];
	                    break;
	                case 28:
	                    this.$ = $$[$0];
	                    break;
	                case 29:
	                    this.$ = {
	                        type: 'SubExpression',
	                        path: $$[$0 - 3],
	                        params: $$[$0 - 2],
	                        hash: $$[$0 - 1],
	                        loc: yy.locInfo(this._$)
	                    };

	                    break;
	                case 30:
	                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 31:
	                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 32:
	                    this.$ = yy.id($$[$0 - 1]);
	                    break;
	                case 33:
	                    this.$ = $$[$0];
	                    break;
	                case 34:
	                    this.$ = $$[$0];
	                    break;
	                case 35:
	                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
	                    break;
	                case 36:
	                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
	                    break;
	                case 37:
	                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
	                    break;
	                case 38:
	                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
	                    break;
	                case 39:
	                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
	                    break;
	                case 40:
	                    this.$ = $$[$0];
	                    break;
	                case 41:
	                    this.$ = $$[$0];
	                    break;
	                case 42:
	                    this.$ = yy.preparePath(true, $$[$0], this._$);
	                    break;
	                case 43:
	                    this.$ = yy.preparePath(false, $$[$0], this._$);
	                    break;
	                case 44:
	                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
	                    break;
	                case 45:
	                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
	                    break;
	                case 46:
	                    this.$ = [];
	                    break;
	                case 47:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 48:
	                    this.$ = [];
	                    break;
	                case 49:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 50:
	                    this.$ = [];
	                    break;
	                case 51:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 58:
	                    this.$ = [];
	                    break;
	                case 59:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 64:
	                    this.$ = [];
	                    break;
	                case 65:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 70:
	                    this.$ = [];
	                    break;
	                case 71:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 78:
	                    this.$ = [];
	                    break;
	                case 79:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 82:
	                    this.$ = [];
	                    break;
	                case 83:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 86:
	                    this.$ = [];
	                    break;
	                case 87:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 90:
	                    this.$ = [];
	                    break;
	                case 91:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 94:
	                    this.$ = [];
	                    break;
	                case 95:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 98:
	                    this.$ = [$$[$0]];
	                    break;
	                case 99:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	                case 100:
	                    this.$ = [$$[$0]];
	                    break;
	                case 101:
	                    $$[$0 - 1].push($$[$0]);
	                    break;
	            }
	        },
	        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
	        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
	        parseError: function parseError(str, hash) {
	            throw new Error(str);
	        },
	        parse: function parse(input) {
	            var self = this,
	                stack = [0],
	                vstack = [null],
	                lstack = [],
	                table = this.table,
	                yytext = "",
	                yylineno = 0,
	                yyleng = 0,
	                recovering = 0,
	                TERROR = 2,
	                EOF = 1;
	            this.lexer.setInput(input);
	            this.lexer.yy = this.yy;
	            this.yy.lexer = this.lexer;
	            this.yy.parser = this;
	            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
	            var yyloc = this.lexer.yylloc;
	            lstack.push(yyloc);
	            var ranges = this.lexer.options && this.lexer.options.ranges;
	            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
	            function popStack(n) {
	                stack.length = stack.length - 2 * n;
	                vstack.length = vstack.length - n;
	                lstack.length = lstack.length - n;
	            }
	            function lex() {
	                var token;
	                token = self.lexer.lex() || 1;
	                if (typeof token !== "number") {
	                    token = self.symbols_[token] || token;
	                }
	                return token;
	            }
	            var symbol,
	                preErrorSymbol,
	                state,
	                action,
	                a,
	                r,
	                yyval = {},
	                p,
	                len,
	                newState,
	                expected;
	            while (true) {
	                state = stack[stack.length - 1];
	                if (this.defaultActions[state]) {
	                    action = this.defaultActions[state];
	                } else {
	                    if (symbol === null || typeof symbol == "undefined") {
	                        symbol = lex();
	                    }
	                    action = table[state] && table[state][symbol];
	                }
	                if (typeof action === "undefined" || !action.length || !action[0]) {
	                    var errStr = "";
	                    if (!recovering) {
	                        expected = [];
	                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
	                            expected.push("'" + this.terminals_[p] + "'");
	                        }
	                        if (this.lexer.showPosition) {
	                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                        } else {
	                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
	                        }
	                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
	                    }
	                }
	                if (action[0] instanceof Array && action.length > 1) {
	                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	                }
	                switch (action[0]) {
	                    case 1:
	                        stack.push(symbol);
	                        vstack.push(this.lexer.yytext);
	                        lstack.push(this.lexer.yylloc);
	                        stack.push(action[1]);
	                        symbol = null;
	                        if (!preErrorSymbol) {
	                            yyleng = this.lexer.yyleng;
	                            yytext = this.lexer.yytext;
	                            yylineno = this.lexer.yylineno;
	                            yyloc = this.lexer.yylloc;
	                            if (recovering > 0) recovering--;
	                        } else {
	                            symbol = preErrorSymbol;
	                            preErrorSymbol = null;
	                        }
	                        break;
	                    case 2:
	                        len = this.productions_[action[1]][1];
	                        yyval.$ = vstack[vstack.length - len];
	                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
	                        if (ranges) {
	                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	                        }
	                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	                        if (typeof r !== "undefined") {
	                            return r;
	                        }
	                        if (len) {
	                            stack = stack.slice(0, -1 * len * 2);
	                            vstack = vstack.slice(0, -1 * len);
	                            lstack = lstack.slice(0, -1 * len);
	                        }
	                        stack.push(this.productions_[action[1]][0]);
	                        vstack.push(yyval.$);
	                        lstack.push(yyval._$);
	                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	                        stack.push(newState);
	                        break;
	                    case 3:
	                        return true;
	                }
	            }
	            return true;
	        }
	    };
	    /* Jison generated lexer */
	    var lexer = (function () {
	        var lexer = { EOF: 1,
	            parseError: function parseError(str, hash) {
	                if (this.yy.parser) {
	                    this.yy.parser.parseError(str, hash);
	                } else {
	                    throw new Error(str);
	                }
	            },
	            setInput: function setInput(input) {
	                this._input = input;
	                this._more = this._less = this.done = false;
	                this.yylineno = this.yyleng = 0;
	                this.yytext = this.matched = this.match = '';
	                this.conditionStack = ['INITIAL'];
	                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
	                if (this.options.ranges) this.yylloc.range = [0, 0];
	                this.offset = 0;
	                return this;
	            },
	            input: function input() {
	                var ch = this._input[0];
	                this.yytext += ch;
	                this.yyleng++;
	                this.offset++;
	                this.match += ch;
	                this.matched += ch;
	                var lines = ch.match(/(?:\r\n?|\n).*/g);
	                if (lines) {
	                    this.yylineno++;
	                    this.yylloc.last_line++;
	                } else {
	                    this.yylloc.last_column++;
	                }
	                if (this.options.ranges) this.yylloc.range[1]++;

	                this._input = this._input.slice(1);
	                return ch;
	            },
	            unput: function unput(ch) {
	                var len = ch.length;
	                var lines = ch.split(/(?:\r\n?|\n)/g);

	                this._input = ch + this._input;
	                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	                //this.yyleng -= len;
	                this.offset -= len;
	                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	                this.match = this.match.substr(0, this.match.length - 1);
	                this.matched = this.matched.substr(0, this.matched.length - 1);

	                if (lines.length - 1) this.yylineno -= lines.length - 1;
	                var r = this.yylloc.range;

	                this.yylloc = { first_line: this.yylloc.first_line,
	                    last_line: this.yylineno + 1,
	                    first_column: this.yylloc.first_column,
	                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
	                };

	                if (this.options.ranges) {
	                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	                }
	                return this;
	            },
	            more: function more() {
	                this._more = true;
	                return this;
	            },
	            less: function less(n) {
	                this.unput(this.match.slice(n));
	            },
	            pastInput: function pastInput() {
	                var past = this.matched.substr(0, this.matched.length - this.match.length);
	                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
	            },
	            upcomingInput: function upcomingInput() {
	                var next = this.match;
	                if (next.length < 20) {
	                    next += this._input.substr(0, 20 - next.length);
	                }
	                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	            },
	            showPosition: function showPosition() {
	                var pre = this.pastInput();
	                var c = new Array(pre.length + 1).join("-");
	                return pre + this.upcomingInput() + "\n" + c + "^";
	            },
	            next: function next() {
	                if (this.done) {
	                    return this.EOF;
	                }
	                if (!this._input) this.done = true;

	                var token, match, tempMatch, index, col, lines;
	                if (!this._more) {
	                    this.yytext = '';
	                    this.match = '';
	                }
	                var rules = this._currentRules();
	                for (var i = 0; i < rules.length; i++) {
	                    tempMatch = this._input.match(this.rules[rules[i]]);
	                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                        match = tempMatch;
	                        index = i;
	                        if (!this.options.flex) break;
	                    }
	                }
	                if (match) {
	                    lines = match[0].match(/(?:\r\n?|\n).*/g);
	                    if (lines) this.yylineno += lines.length;
	                    this.yylloc = { first_line: this.yylloc.last_line,
	                        last_line: this.yylineno + 1,
	                        first_column: this.yylloc.last_column,
	                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
	                    this.yytext += match[0];
	                    this.match += match[0];
	                    this.matches = match;
	                    this.yyleng = this.yytext.length;
	                    if (this.options.ranges) {
	                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
	                    }
	                    this._more = false;
	                    this._input = this._input.slice(match[0].length);
	                    this.matched += match[0];
	                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
	                    if (this.done && this._input) this.done = false;
	                    if (token) return token;else return;
	                }
	                if (this._input === "") {
	                    return this.EOF;
	                } else {
	                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
	                }
	            },
	            lex: function lex() {
	                var r = this.next();
	                if (typeof r !== 'undefined') {
	                    return r;
	                } else {
	                    return this.lex();
	                }
	            },
	            begin: function begin(condition) {
	                this.conditionStack.push(condition);
	            },
	            popState: function popState() {
	                return this.conditionStack.pop();
	            },
	            _currentRules: function _currentRules() {
	                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	            },
	            topState: function topState() {
	                return this.conditionStack[this.conditionStack.length - 2];
	            },
	            pushState: function begin(condition) {
	                this.begin(condition);
	            } };
	        lexer.options = {};
	        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

	            function strip(start, end) {
	                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
	            }

	            var YYSTATE = YY_START;
	            switch ($avoiding_name_collisions) {
	                case 0:
	                    if (yy_.yytext.slice(-2) === "\\\\") {
	                        strip(0, 1);
	                        this.begin("mu");
	                    } else if (yy_.yytext.slice(-1) === "\\") {
	                        strip(0, 1);
	                        this.begin("emu");
	                    } else {
	                        this.begin("mu");
	                    }
	                    if (yy_.yytext) return 15;

	                    break;
	                case 1:
	                    return 15;
	                    break;
	                case 2:
	                    this.popState();
	                    return 15;

	                    break;
	                case 3:
	                    this.begin('raw');return 15;
	                    break;
	                case 4:
	                    this.popState();
	                    // Should be using `this.topState()` below, but it currently
	                    // returns the second top instead of the first top. Opened an
	                    // issue about it at https://github.com/zaach/jison/issues/291
	                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
	                        return 15;
	                    } else {
	                        strip(5, 9);
	                        return 'END_RAW_BLOCK';
	                    }

	                    break;
	                case 5:
	                    return 15;
	                    break;
	                case 6:
	                    this.popState();
	                    return 14;

	                    break;
	                case 7:
	                    return 65;
	                    break;
	                case 8:
	                    return 68;
	                    break;
	                case 9:
	                    return 19;
	                    break;
	                case 10:
	                    this.popState();
	                    this.begin('raw');
	                    return 23;

	                    break;
	                case 11:
	                    return 55;
	                    break;
	                case 12:
	                    return 60;
	                    break;
	                case 13:
	                    return 29;
	                    break;
	                case 14:
	                    return 47;
	                    break;
	                case 15:
	                    this.popState();return 44;
	                    break;
	                case 16:
	                    this.popState();return 44;
	                    break;
	                case 17:
	                    return 34;
	                    break;
	                case 18:
	                    return 39;
	                    break;
	                case 19:
	                    return 51;
	                    break;
	                case 20:
	                    return 48;
	                    break;
	                case 21:
	                    this.unput(yy_.yytext);
	                    this.popState();
	                    this.begin('com');

	                    break;
	                case 22:
	                    this.popState();
	                    return 14;

	                    break;
	                case 23:
	                    return 48;
	                    break;
	                case 24:
	                    return 73;
	                    break;
	                case 25:
	                    return 72;
	                    break;
	                case 26:
	                    return 72;
	                    break;
	                case 27:
	                    return 87;
	                    break;
	                case 28:
	                    // ignore whitespace
	                    break;
	                case 29:
	                    this.popState();return 54;
	                    break;
	                case 30:
	                    this.popState();return 33;
	                    break;
	                case 31:
	                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
	                    break;
	                case 32:
	                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
	                    break;
	                case 33:
	                    return 85;
	                    break;
	                case 34:
	                    return 82;
	                    break;
	                case 35:
	                    return 82;
	                    break;
	                case 36:
	                    return 83;
	                    break;
	                case 37:
	                    return 84;
	                    break;
	                case 38:
	                    return 81;
	                    break;
	                case 39:
	                    return 75;
	                    break;
	                case 40:
	                    return 77;
	                    break;
	                case 41:
	                    return 72;
	                    break;
	                case 42:
	                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
	                    break;
	                case 43:
	                    return 'INVALID';
	                    break;
	                case 44:
	                    return 5;
	                    break;
	            }
	        };
	        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
	        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
	        return lexer;
	    })();
	    parser.lexer = lexer;
	    function Parser() {
	        this.yy = {};
	    }Parser.prototype = parser;parser.Parser = Parser;
	    return new Parser();
	})();exports["default"] = handlebars;
	module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __nested_webpack_require_106317__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_106317__(1)['default'];

	exports.__esModule = true;

	var _visitor = __nested_webpack_require_106317__(49);

	var _visitor2 = _interopRequireDefault(_visitor);

	function WhitespaceControl() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  this.options = options;
	}
	WhitespaceControl.prototype = new _visitor2['default']();

	WhitespaceControl.prototype.Program = function (program) {
	  var doStandalone = !this.options.ignoreStandalone;

	  var isRoot = !this.isRootSeen;
	  this.isRootSeen = true;

	  var body = program.body;
	  for (var i = 0, l = body.length; i < l; i++) {
	    var current = body[i],
	        strip = this.accept(current);

	    if (!strip) {
	      continue;
	    }

	    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
	        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
	        openStandalone = strip.openStandalone && _isPrevWhitespace,
	        closeStandalone = strip.closeStandalone && _isNextWhitespace,
	        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

	    if (strip.close) {
	      omitRight(body, i, true);
	    }
	    if (strip.open) {
	      omitLeft(body, i, true);
	    }

	    if (doStandalone && inlineStandalone) {
	      omitRight(body, i);

	      if (omitLeft(body, i)) {
	        // If we are on a standalone node, save the indent info for partials
	        if (current.type === 'PartialStatement') {
	          // Pull out the whitespace from the final line
	          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
	        }
	      }
	    }
	    if (doStandalone && openStandalone) {
	      omitRight((current.program || current.inverse).body);

	      // Strip out the previous content node if it's whitespace only
	      omitLeft(body, i);
	    }
	    if (doStandalone && closeStandalone) {
	      // Always strip the next node
	      omitRight(body, i);

	      omitLeft((current.inverse || current.program).body);
	    }
	  }

	  return program;
	};

	WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
	  this.accept(block.program);
	  this.accept(block.inverse);

	  // Find the inverse program that is involed with whitespace stripping.
	  var program = block.program || block.inverse,
	      inverse = block.program && block.inverse,
	      firstInverse = inverse,
	      lastInverse = inverse;

	  if (inverse && inverse.chained) {
	    firstInverse = inverse.body[0].program;

	    // Walk the inverse chain to find the last inverse that is actually in the chain.
	    while (lastInverse.chained) {
	      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
	    }
	  }

	  var strip = {
	    open: block.openStrip.open,
	    close: block.closeStrip.close,

	    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
	    // so our parent can determine if we actually are standalone
	    openStandalone: isNextWhitespace(program.body),
	    closeStandalone: isPrevWhitespace((firstInverse || program).body)
	  };

	  if (block.openStrip.close) {
	    omitRight(program.body, null, true);
	  }

	  if (inverse) {
	    var inverseStrip = block.inverseStrip;

	    if (inverseStrip.open) {
	      omitLeft(program.body, null, true);
	    }

	    if (inverseStrip.close) {
	      omitRight(firstInverse.body, null, true);
	    }
	    if (block.closeStrip.open) {
	      omitLeft(lastInverse.body, null, true);
	    }

	    // Find standalone else statments
	    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
	      omitLeft(program.body);
	      omitRight(firstInverse.body);
	    }
	  } else if (block.closeStrip.open) {
	    omitLeft(program.body, null, true);
	  }

	  return strip;
	};

	WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
	  return mustache.strip;
	};

	WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
	  /* istanbul ignore next */
	  var strip = node.strip || {};
	  return {
	    inlineStandalone: true,
	    open: strip.open,
	    close: strip.close
	  };
	};

	function isPrevWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = body.length;
	  }

	  // Nodes that end with newlines are considered whitespace (but are special
	  // cased for strip operations)
	  var prev = body[i - 1],
	      sibling = body[i - 2];
	  if (!prev) {
	    return isRoot;
	  }

	  if (prev.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
	  }
	}
	function isNextWhitespace(body, i, isRoot) {
	  if (i === undefined) {
	    i = -1;
	  }

	  var next = body[i + 1],
	      sibling = body[i + 2];
	  if (!next) {
	    return isRoot;
	  }

	  if (next.type === 'ContentStatement') {
	    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
	  }
	}

	// Marks the node to the right of the position as omitted.
	// I.e. {{foo}}' ' will mark the ' ' node as omitted.
	//
	// If i is undefined, then the first child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitRight(body, i, multiple) {
	  var current = body[i == null ? 0 : i + 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
	    return;
	  }

	  var original = current.value;
	  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
	  current.rightStripped = current.value !== original;
	}

	// Marks the node to the left of the position as omitted.
	// I.e. ' '{{foo}} will mark the ' ' node as omitted.
	//
	// If i is undefined then the last child will be marked as such.
	//
	// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
	// content is met.
	function omitLeft(body, i, multiple) {
	  var current = body[i == null ? body.length - 1 : i - 1];
	  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
	    return;
	  }

	  // We omit the last node if it's whitespace only and not preceded by a non-content node.
	  var original = current.value;
	  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
	  current.leftStripped = current.value !== original;
	  return current.leftStripped;
	}

	exports['default'] = WhitespaceControl;
	module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, exports, __nested_webpack_require_113102__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_113102__(1)['default'];

	exports.__esModule = true;

	var _exception = __nested_webpack_require_113102__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function Visitor() {
	  this.parents = [];
	}

	Visitor.prototype = {
	  constructor: Visitor,
	  mutating: false,

	  // Visits a given value. If mutating, will replace the value if necessary.
	  acceptKey: function acceptKey(node, name) {
	    var value = this.accept(node[name]);
	    if (this.mutating) {
	      // Hacky sanity check: This may have a few false positives for type for the helper
	      // methods but will generally do the right thing without a lot of overhead.
	      if (value && !Visitor.prototype[value.type]) {
	        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
	      }
	      node[name] = value;
	    }
	  },

	  // Performs an accept operation with added sanity check to ensure
	  // required keys are not removed.
	  acceptRequired: function acceptRequired(node, name) {
	    this.acceptKey(node, name);

	    if (!node[name]) {
	      throw new _exception2['default'](node.type + ' requires ' + name);
	    }
	  },

	  // Traverses a given array. If mutating, empty respnses will be removed
	  // for child elements.
	  acceptArray: function acceptArray(array) {
	    for (var i = 0, l = array.length; i < l; i++) {
	      this.acceptKey(array, i);

	      if (!array[i]) {
	        array.splice(i, 1);
	        i--;
	        l--;
	      }
	    }
	  },

	  accept: function accept(object) {
	    if (!object) {
	      return;
	    }

	    /* istanbul ignore next: Sanity code */
	    if (!this[object.type]) {
	      throw new _exception2['default']('Unknown type: ' + object.type, object);
	    }

	    if (this.current) {
	      this.parents.unshift(this.current);
	    }
	    this.current = object;

	    var ret = this[object.type](object);

	    this.current = this.parents.shift();

	    if (!this.mutating || ret) {
	      return ret;
	    } else if (ret !== false) {
	      return object;
	    }
	  },

	  Program: function Program(program) {
	    this.acceptArray(program.body);
	  },

	  MustacheStatement: visitSubExpression,
	  Decorator: visitSubExpression,

	  BlockStatement: visitBlock,
	  DecoratorBlock: visitBlock,

	  PartialStatement: visitPartial,
	  PartialBlockStatement: function PartialBlockStatement(partial) {
	    visitPartial.call(this, partial);

	    this.acceptKey(partial, 'program');
	  },

	  ContentStatement: function ContentStatement() /* content */{},
	  CommentStatement: function CommentStatement() /* comment */{},

	  SubExpression: visitSubExpression,

	  PathExpression: function PathExpression() /* path */{},

	  StringLiteral: function StringLiteral() /* string */{},
	  NumberLiteral: function NumberLiteral() /* number */{},
	  BooleanLiteral: function BooleanLiteral() /* bool */{},
	  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
	  NullLiteral: function NullLiteral() /* literal */{},

	  Hash: function Hash(hash) {
	    this.acceptArray(hash.pairs);
	  },
	  HashPair: function HashPair(pair) {
	    this.acceptRequired(pair, 'value');
	  }
	};

	function visitSubExpression(mustache) {
	  this.acceptRequired(mustache, 'path');
	  this.acceptArray(mustache.params);
	  this.acceptKey(mustache, 'hash');
	}
	function visitBlock(block) {
	  visitSubExpression.call(this, block);

	  this.acceptKey(block, 'program');
	  this.acceptKey(block, 'inverse');
	}
	function visitPartial(partial) {
	  this.acceptRequired(partial, 'name');
	  this.acceptArray(partial.params);
	  this.acceptKey(partial, 'hash');
	}

	exports['default'] = Visitor;
	module.exports = exports['default'];

/***/ }),
/* 50 */
/***/ (function(module, exports, __nested_webpack_require_116958__) {

	'use strict';

	var _interopRequireDefault = __nested_webpack_require_116958__(1)['default'];

	exports.__esModule = true;
	exports.SourceLocation = SourceLocation;
	exports.id = id;
	exports.stripFlags = stripFlags;
	exports.stripComment = stripComment;
	exports.preparePath = preparePath;
	exports.prepareMustache = prepareMustache;
	exports.prepareRawBlock = prepareRawBlock;
	exports.prepareBlock = prepareBlock;
	exports.prepareProgram = prepareProgram;
	exports.preparePartialBlock = preparePartialBlock;

	var _exception = __nested_webpack_require_116958__(6);

	var _exception2 = _interopRequireDefault(_exception);

	function validateClose(open, close) {
	  close = close.path ? close.path.original : close;

	  if (open.path.original !== close) {
	    var errorNode = { loc: open.path.loc };

	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
	  }
	}

	function SourceLocation(source, locInfo) {
	  this.source = source;
	  this.start = {
	    line: locInfo.first_line,
	    column: locInfo.first_column
	  };
	  this.end = {
	    line: locInfo.last_line,
	    column: locInfo.last_column
	  };
	}

	function id(token) {
	  if (/^\[.*\]$/.test(token)) {
	    return token.substring(1, token.length - 1);
	  } else {
	    return token;
	  }
	}

	function stripFlags(open, close) {
	  return {
	    open: open.charAt(2) === '~',
	    close: close.charAt(close.length - 3) === '~'
	  };
	}

	function stripComment(comment) {
	  return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
	}

	function preparePath(data, parts, loc) {
	  loc = this.locInfo(loc);

	  var original = data ? '@' : '',
	      dig = [],
	      depth = 0;

	  for (var i = 0, l = parts.length; i < l; i++) {
	    var part = parts[i].part,

	    // If we have [] syntax then we do not treat path references as operators,
	    // i.e. foo.[this] resolves to approximately context.foo['this']
	    isLiteral = parts[i].original !== part;
	    original += (parts[i].separator || '') + part;

	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
	      if (dig.length > 0) {
	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
	      } else if (part === '..') {
	        depth++;
	      }
	    } else {
	      dig.push(part);
	    }
	  }

	  return {
	    type: 'PathExpression',
	    data: data,
	    depth: depth,
	    parts: dig,
	    original: original,
	    loc: loc
	  };
	}

	function prepareMustache(path, params, hash, open, strip, locInfo) {
	  // Must use charAt to support IE pre-10
	  var escapeFlag = open.charAt(3) || open.charAt(2),
	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

	  var decorator = /\*/.test(open);
	  return {
	    type: decorator ? 'Decorator' : 'MustacheStatement',
	    path: path,
	    params: params,
	    hash: hash,
	    escaped: escaped,
	    strip: strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
	  validateClose(openRawBlock, close);

	  locInfo = this.locInfo(locInfo);
	  var program = {
	    type: 'Program',
	    body: contents,
	    strip: {},
	    loc: locInfo
	  };

	  return {
	    type: 'BlockStatement',
	    path: openRawBlock.path,
	    params: openRawBlock.params,
	    hash: openRawBlock.hash,
	    program: program,
	    openStrip: {},
	    inverseStrip: {},
	    closeStrip: {},
	    loc: locInfo
	  };
	}

	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
	  if (close && close.path) {
	    validateClose(openBlock, close);
	  }

	  var decorator = /\*/.test(openBlock.open);

	  program.blockParams = openBlock.blockParams;

	  var inverse = undefined,
	      inverseStrip = undefined;

	  if (inverseAndProgram) {
	    if (decorator) {
	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
	    }

	    if (inverseAndProgram.chain) {
	      inverseAndProgram.program.body[0].closeStrip = close.strip;
	    }

	    inverseStrip = inverseAndProgram.strip;
	    inverse = inverseAndProgram.program;
	  }

	  if (inverted) {
	    inverted = inverse;
	    inverse = program;
	    program = inverted;
	  }

	  return {
	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
	    path: openBlock.path,
	    params: openBlock.params,
	    hash: openBlock.hash,
	    program: program,
	    inverse: inverse,
	    openStrip: openBlock.strip,
	    inverseStrip: inverseStrip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

	function prepareProgram(statements, loc) {
	  if (!loc && statements.length) {
	    var firstLoc = statements[0].loc,
	        lastLoc = statements[statements.length - 1].loc;

	    /* istanbul ignore else */
	    if (firstLoc && lastLoc) {
	      loc = {
	        source: firstLoc.source,
	        start: {
	          line: firstLoc.start.line,
	          column: firstLoc.start.column
	        },
	        end: {
	          line: lastLoc.end.line,
	          column: lastLoc.end.column
	        }
	      };
	    }
	  }

	  return {
	    type: 'Program',
	    body: statements,
	    strip: {},
	    loc: loc
	  };
	}

	function preparePartialBlock(open, program, close, locInfo) {
	  validateClose(open, close);

	  return {
	    type: 'PartialBlockStatement',
	    name: open.path,
	    params: open.params,
	    hash: open.hash,
	    program: program,
	    openStrip: open.strip,
	    closeStrip: close && close.strip,
	    loc: this.locInfo(locInfo)
	  };
	}

/***/ }),
/* 51 */
/***/ (function(module, exports, __nested_webpack_require_122553__) {

	/* eslint-disable new-cap */

	'use strict';

	var _Object$create = __nested_webpack_require_122553__(34)['default'];

	var _interopRequireDefault = __nested_webpack_require_122553__(1)['default'];

	exports.__esModule = true;
	exports.Compiler = Compiler;
	exports.precompile = precompile;
	exports.compile = compile;

	var _exception = __nested_webpack_require_122553__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __nested_webpack_require_122553__(5);

	var _ast = __nested_webpack_require_122553__(45);

	var _ast2 = _interopRequireDefault(_ast);

	var slice = [].slice;

	function Compiler() {}

	// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.

	Compiler.prototype = {
	  compiler: Compiler,

	  equals: function equals(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }

	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
	        return false;
	      }
	    }

	    // We know that length is the same between the two arrays because they are directly tied
	    // to the opcode behavior above.
	    len = this.children.length;
	    for (var i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }

	    return true;
	  },

	  guid: 0,

	  compile: function compile(program, options) {
	    this.sourceNode = [];
	    this.opcodes = [];
	    this.children = [];
	    this.options = options;
	    this.stringParams = options.stringParams;
	    this.trackIds = options.trackIds;

	    options.blockParams = options.blockParams || [];

	    options.knownHelpers = _utils.extend(_Object$create(null), {
	      helperMissing: true,
	      blockHelperMissing: true,
	      each: true,
	      'if': true,
	      unless: true,
	      'with': true,
	      log: true,
	      lookup: true
	    }, options.knownHelpers);

	    return this.accept(program);
	  },

	  compileProgram: function compileProgram(program) {
	    var childCompiler = new this.compiler(),
	        // eslint-disable-line new-cap
	    result = childCompiler.compile(program, this.options),
	        guid = this.guid++;

	    this.usePartial = this.usePartial || result.usePartial;

	    this.children[guid] = result;
	    this.useDepths = this.useDepths || result.useDepths;

	    return guid;
	  },

	  accept: function accept(node) {
	    /* istanbul ignore next: Sanity code */
	    if (!this[node.type]) {
	      throw new _exception2['default']('Unknown type: ' + node.type, node);
	    }

	    this.sourceNode.unshift(node);
	    var ret = this[node.type](node);
	    this.sourceNode.shift();
	    return ret;
	  },

	  Program: function Program(program) {
	    this.options.blockParams.unshift(program.blockParams);

	    var body = program.body,
	        bodyLength = body.length;
	    for (var i = 0; i < bodyLength; i++) {
	      this.accept(body[i]);
	    }

	    this.options.blockParams.shift();

	    this.isSimple = bodyLength === 1;
	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

	    return this;
	  },

	  BlockStatement: function BlockStatement(block) {
	    transformLiteralToPath(block);

	    var program = block.program,
	        inverse = block.inverse;

	    program = program && this.compileProgram(program);
	    inverse = inverse && this.compileProgram(inverse);

	    var type = this.classifySexpr(block);

	    if (type === 'helper') {
	      this.helperSexpr(block, program, inverse);
	    } else if (type === 'simple') {
	      this.simpleSexpr(block);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue', block.path.original);
	    } else {
	      this.ambiguousSexpr(block, program, inverse);

	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }

	    this.opcode('append');
	  },

	  DecoratorBlock: function DecoratorBlock(decorator) {
	    var program = decorator.program && this.compileProgram(decorator.program);
	    var params = this.setupFullMustacheParams(decorator, program, undefined),
	        path = decorator.path;

	    this.useDecorators = true;
	    this.opcode('registerDecorator', params.length, path.original);
	  },

	  PartialStatement: function PartialStatement(partial) {
	    this.usePartial = true;

	    var program = partial.program;
	    if (program) {
	      program = this.compileProgram(partial.program);
	    }

	    var params = partial.params;
	    if (params.length > 1) {
	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
	    } else if (!params.length) {
	      if (this.options.explicitPartialContext) {
	        this.opcode('pushLiteral', 'undefined');
	      } else {
	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
	      }
	    }

	    var partialName = partial.name.original,
	        isDynamic = partial.name.type === 'SubExpression';
	    if (isDynamic) {
	      this.accept(partial.name);
	    }

	    this.setupFullMustacheParams(partial, program, undefined, true);

	    var indent = partial.indent || '';
	    if (this.options.preventIndent && indent) {
	      this.opcode('appendContent', indent);
	      indent = '';
	    }

	    this.opcode('invokePartial', isDynamic, partialName, indent);
	    this.opcode('append');
	  },
	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
	    this.PartialStatement(partialBlock);
	  },

	  MustacheStatement: function MustacheStatement(mustache) {
	    this.SubExpression(mustache);

	    if (mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	  Decorator: function Decorator(decorator) {
	    this.DecoratorBlock(decorator);
	  },

	  ContentStatement: function ContentStatement(content) {
	    if (content.value) {
	      this.opcode('appendContent', content.value);
	    }
	  },

	  CommentStatement: function CommentStatement() {},

	  SubExpression: function SubExpression(sexpr) {
	    transformLiteralToPath(sexpr);
	    var type = this.classifySexpr(sexpr);

	    if (type === 'simple') {
	      this.simpleSexpr(sexpr);
	    } else if (type === 'helper') {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
	    var path = sexpr.path,
	        name = path.parts[0],
	        isBlock = program != null || inverse != null;

	    this.opcode('getContext', path.depth);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    path.strict = true;
	    this.accept(path);

	    this.opcode('invokeAmbiguous', name, isBlock);
	  },

	  simpleSexpr: function simpleSexpr(sexpr) {
	    var path = sexpr.path;
	    path.strict = true;
	    this.accept(path);
	    this.opcode('resolvePossibleLambda');
	  },

	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        path = sexpr.path,
	        name = path.parts[0];

	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
	    } else {
	      path.strict = true;
	      path.falsy = true;

	      this.accept(path);
	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
	    }
	  },

	  PathExpression: function PathExpression(path) {
	    this.addDepth(path.depth);
	    this.opcode('getContext', path.depth);

	    var name = path.parts[0],
	        scoped = _ast2['default'].helpers.scopedId(path),
	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

	    if (blockParamId) {
	      this.opcode('lookupBlockParam', blockParamId, path.parts);
	    } else if (!name) {
	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
	      this.opcode('pushContext');
	    } else if (path.data) {
	      this.options.data = true;
	      this.opcode('lookupData', path.depth, path.parts, path.strict);
	    } else {
	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
	    }
	  },

	  StringLiteral: function StringLiteral(string) {
	    this.opcode('pushString', string.value);
	  },

	  NumberLiteral: function NumberLiteral(number) {
	    this.opcode('pushLiteral', number.value);
	  },

	  BooleanLiteral: function BooleanLiteral(bool) {
	    this.opcode('pushLiteral', bool.value);
	  },

	  UndefinedLiteral: function UndefinedLiteral() {
	    this.opcode('pushLiteral', 'undefined');
	  },

	  NullLiteral: function NullLiteral() {
	    this.opcode('pushLiteral', 'null');
	  },

	  Hash: function Hash(hash) {
	    var pairs = hash.pairs,
	        i = 0,
	        l = pairs.length;

	    this.opcode('pushHash');

	    for (; i < l; i++) {
	      this.pushParam(pairs[i].value);
	    }
	    while (i--) {
	      this.opcode('assignToHash', pairs[i].key);
	    }
	    this.opcode('popHash');
	  },

	  // HELPERS
	  opcode: function opcode(name) {
	    this.opcodes.push({
	      opcode: name,
	      args: slice.call(arguments, 1),
	      loc: this.sourceNode[0].loc
	    });
	  },

	  addDepth: function addDepth(depth) {
	    if (!depth) {
	      return;
	    }

	    this.useDepths = true;
	  },

	  classifySexpr: function classifySexpr(sexpr) {
	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	    var isEligible = !isBlockParam && (isHelper || isSimple);

	    // if ambiguous, we can possibly resolve the ambiguity now
	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
	    if (isEligible && !isHelper) {
	      var _name = sexpr.path.parts[0],
	          options = this.options;
	      if (options.knownHelpers[_name]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }

	    if (isHelper) {
	      return 'helper';
	    } else if (isEligible) {
	      return 'ambiguous';
	    } else {
	      return 'simple';
	    }
	  },

	  pushParams: function pushParams(params) {
	    for (var i = 0, l = params.length; i < l; i++) {
	      this.pushParam(params[i]);
	    }
	  },

	  pushParam: function pushParam(val) {
	    var value = val.value != null ? val.value : val.original || '';

	    if (this.stringParams) {
	      if (value.replace) {
	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
	      }

	      if (val.depth) {
	        this.addDepth(val.depth);
	      }
	      this.opcode('getContext', val.depth || 0);
	      this.opcode('pushStringParam', value, val.type);

	      if (val.type === 'SubExpression') {
	        // SubExpressions get evaluated and passed in
	        // in string params mode.
	        this.accept(val);
	      }
	    } else {
	      if (this.trackIds) {
	        var blockParamIndex = undefined;
	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
	          blockParamIndex = this.blockParamIndex(val.parts[0]);
	        }
	        if (blockParamIndex) {
	          var blockParamChild = val.parts.slice(1).join('.');
	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
	        } else {
	          value = val.original || value;
	          if (value.replace) {
	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
	          }

	          this.opcode('pushId', val.type, value);
	        }
	      }
	      this.accept(val);
	    }
	  },

	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
	    var params = sexpr.params;
	    this.pushParams(params);

	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);

	    if (sexpr.hash) {
	      this.accept(sexpr.hash);
	    } else {
	      this.opcode('emptyHash', omitEmpty);
	    }

	    return params;
	  },

	  blockParamIndex: function blockParamIndex(name) {
	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
	      var blockParams = this.options.blockParams[depth],
	          param = blockParams && _utils.indexOf(blockParams, name);
	      if (blockParams && param >= 0) {
	        return [depth, param];
	      }
	    }
	  }
	};

	function precompile(input, options, env) {
	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
	  }

	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var ast = env.parse(input, options),
	      environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}

	function compile(input, options, env) {
	  if (options === undefined) options = {};

	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
	  }

	  options = _utils.extend({}, options);
	  if (!('data' in options)) {
	    options.data = true;
	  }
	  if (options.compat) {
	    options.useDepths = true;
	  }

	  var compiled = undefined;

	  function compileInput() {
	    var ast = env.parse(input, options),
	        environment = new env.Compiler().compile(ast, options),
	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }

	  // Template is only compiled on first use and cached after that point.
	  function ret(context, execOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, execOptions);
	  }
	  ret._setup = function (setupOptions) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._setup(setupOptions);
	  };
	  ret._child = function (i, data, blockParams, depths) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled._child(i, data, blockParams, depths);
	  };
	  return ret;
	}

	function argEquals(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
	    for (var i = 0; i < a.length; i++) {
	      if (!argEquals(a[i], b[i])) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	function transformLiteralToPath(sexpr) {
	  if (!sexpr.path.parts) {
	    var literal = sexpr.path;
	    // Casting to string here to make false and 0 literal values play nicely with the rest
	    // of the system.
	    sexpr.path = {
	      type: 'PathExpression',
	      data: false,
	      depth: 0,
	      parts: [literal.original + ''],
	      original: literal.original + '',
	      loc: literal.loc
	    };
	  }
	}

/***/ }),
/* 52 */
/***/ (function(module, exports, __nested_webpack_require_138970__) {

	'use strict';

	var _Object$keys = __nested_webpack_require_138970__(13)['default'];

	var _interopRequireDefault = __nested_webpack_require_138970__(1)['default'];

	exports.__esModule = true;

	var _base = __nested_webpack_require_138970__(4);

	var _exception = __nested_webpack_require_138970__(6);

	var _exception2 = _interopRequireDefault(_exception);

	var _utils = __nested_webpack_require_138970__(5);

	var _codeGen = __nested_webpack_require_138970__(53);

	var _codeGen2 = _interopRequireDefault(_codeGen);

	function Literal(value) {
	  this.value = value;
	}

	function JavaScriptCompiler() {}

	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function nameLookup(parent, name /*,  type */) {
	    return this.internalNameLookup(parent, name);
	  },
	  depthedLookup: function depthedLookup(name) {
	    return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(name), ')'];
	  },

	  compilerInfo: function compilerInfo() {
	    var revision = _base.COMPILER_REVISION,
	        versions = _base.REVISION_CHANGES[revision];
	    return [revision, versions];
	  },

	  appendToBuffer: function appendToBuffer(source, location, explicit) {
	    // Force a source as this simplifies the merge logic.
	    if (!_utils.isArray(source)) {
	      source = [source];
	    }
	    source = this.source.wrap(source, location);

	    if (this.environment.isSimple) {
	      return ['return ', source, ';'];
	    } else if (explicit) {
	      // This is a case where the buffer operation occurs as a child of another
	      // construct, generally braces. We have to explicitly output these buffer
	      // operations to ensure that the emitted code goes in the correct location.
	      return ['buffer += ', source, ';'];
	    } else {
	      source.appendToBuffer = true;
	      return source;
	    }
	  },

	  initializeBuffer: function initializeBuffer() {
	    return this.quotedString('');
	  },
	  // END PUBLIC API
	  internalNameLookup: function internalNameLookup(parent, name) {
	    this.lookupPropertyFunctionIsUsed = true;
	    return ['lookupProperty(', parent, ',', JSON.stringify(name), ')'];
	  },

	  lookupPropertyFunctionIsUsed: false,

	  compile: function compile(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options;
	    this.stringParams = this.options.stringParams;
	    this.trackIds = this.options.trackIds;
	    this.precompile = !asObject;

	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      decorators: [],
	      programs: [],
	      environments: []
	    };

	    this.preamble();

	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.aliases = {};
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	    this.blockParams = [];

	    this.compileChildren(environment, options);

	    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
	    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

	    var opcodes = environment.opcodes,
	        opcode = undefined,
	        firstLoc = undefined,
	        i = undefined,
	        l = undefined;

	    for (i = 0, l = opcodes.length; i < l; i++) {
	      opcode = opcodes[i];

	      this.source.currentLocation = opcode.loc;
	      firstLoc = firstLoc || opcode.loc;
	      this[opcode.opcode].apply(this, opcode.args);
	    }

	    // Flush any trailing content that might be pending.
	    this.source.currentLocation = firstLoc;
	    this.pushSource('');

	    /* istanbul ignore next */
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new _exception2['default']('Compile completed with content left on stack');
	    }

	    if (!this.decorators.isEmpty()) {
	      this.useDecorators = true;

	      this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), ';\n']);
	      this.decorators.push('return fn;');

	      if (asObject) {
	        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
	      } else {
	        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
	        this.decorators.push('}\n');
	        this.decorators = this.decorators.merge();
	      }
	    } else {
	      this.decorators = undefined;
	    }

	    var fn = this.createFunctionContext(asObject);
	    if (!this.isChild) {
	      var ret = {
	        compiler: this.compilerInfo(),
	        main: fn
	      };

	      if (this.decorators) {
	        ret.main_d = this.decorators; // eslint-disable-line camelcase
	        ret.useDecorators = true;
	      }

	      var _context = this.context;
	      var programs = _context.programs;
	      var decorators = _context.decorators;

	      for (i = 0, l = programs.length; i < l; i++) {
	        if (programs[i]) {
	          ret[i] = programs[i];
	          if (decorators[i]) {
	            ret[i + '_d'] = decorators[i];
	            ret.useDecorators = true;
	          }
	        }
	      }

	      if (this.environment.usePartial) {
	        ret.usePartial = true;
	      }
	      if (this.options.data) {
	        ret.useData = true;
	      }
	      if (this.useDepths) {
	        ret.useDepths = true;
	      }
	      if (this.useBlockParams) {
	        ret.useBlockParams = true;
	      }
	      if (this.options.compat) {
	        ret.compat = true;
	      }

	      if (!asObject) {
	        ret.compiler = JSON.stringify(ret.compiler);

	        this.source.currentLocation = { start: { line: 1, column: 0 } };
	        ret = this.objectLiteral(ret);

	        if (options.srcName) {
	          ret = ret.toStringWithSourceMap({ file: options.destName });
	          ret.map = ret.map && ret.map.toString();
	        } else {
	          ret = ret.toString();
	        }
	      } else {
	        ret.compilerOptions = this.options;
	      }

	      return ret;
	    } else {
	      return fn;
	    }
	  },

	  preamble: function preamble() {
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = new _codeGen2['default'](this.options.srcName);
	    this.decorators = new _codeGen2['default'](this.options.srcName);
	  },

	  createFunctionContext: function createFunctionContext(asObject) {
	    // istanbul ignore next

	    var _this = this;

	    var varDeclarations = '';

	    var locals = this.stackVars.concat(this.registers.list);
	    if (locals.length > 0) {
	      varDeclarations += ', ' + locals.join(', ');
	    }

	    // Generate minimizer alias mappings
	    //
	    // When using true SourceNodes, this will update all references to the given alias
	    // as the source nodes are reused in situ. For the non-source node compilation mode,
	    // aliases will not be used, but this case is already being run on the client and
	    // we aren't concern about minimizing the template size.
	    var aliasCount = 0;
	    _Object$keys(this.aliases).forEach(function (alias) {
	      var node = _this.aliases[alias];
	      if (node.children && node.referenceCount > 1) {
	        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
	        node.children[0] = 'alias' + aliasCount;
	      }
	    });

	    if (this.lookupPropertyFunctionIsUsed) {
	      varDeclarations += ', ' + this.lookupPropertyFunctionVarDeclaration();
	    }

	    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

	    if (this.useBlockParams || this.useDepths) {
	      params.push('blockParams');
	    }
	    if (this.useDepths) {
	      params.push('depths');
	    }

	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource(varDeclarations);

	    if (asObject) {
	      params.push(source);

	      return Function.apply(this, params);
	    } else {
	      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
	    }
	  },
	  mergeSource: function mergeSource(varDeclarations) {
	    var isSimple = this.environment.isSimple,
	        appendOnly = !this.forceBuffer,
	        appendFirst = undefined,
	        sourceSeen = undefined,
	        bufferStart = undefined,
	        bufferEnd = undefined;
	    this.source.each(function (line) {
	      if (line.appendToBuffer) {
	        if (bufferStart) {
	          line.prepend('  + ');
	        } else {
	          bufferStart = line;
	        }
	        bufferEnd = line;
	      } else {
	        if (bufferStart) {
	          if (!sourceSeen) {
	            appendFirst = true;
	          } else {
	            bufferStart.prepend('buffer += ');
	          }
	          bufferEnd.add(';');
	          bufferStart = bufferEnd = undefined;
	        }

	        sourceSeen = true;
	        if (!isSimple) {
	          appendOnly = false;
	        }
	      }
	    });

	    if (appendOnly) {
	      if (bufferStart) {
	        bufferStart.prepend('return ');
	        bufferEnd.add(';');
	      } else if (!sourceSeen) {
	        this.source.push('return "";');
	      }
	    } else {
	      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

	      if (bufferStart) {
	        bufferStart.prepend('return buffer + ');
	        bufferEnd.add(';');
	      } else {
	        this.source.push('return buffer;');
	      }
	    }

	    if (varDeclarations) {
	      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
	    }

	    return this.source.merge();
	  },

	  lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
	    return '\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    '.trim();
	  },

	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function blockValue(name) {
	    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs(name, 0, params);

	    var blockName = this.popStack();
	    params.splice(1, 0, blockName);

	    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
	  },

	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function ambiguousBlockValue() {
	    // We're being a bit cheeky and reusing the options value from the prior exec
	    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
	        params = [this.contextName(0)];
	    this.setupHelperArgs('', 0, params, true);

	    this.flushInline();

	    var current = this.topStack();
	    params.splice(1, 0, current);

	    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
	  },

	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function appendContent(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    } else {
	      this.pendingLocation = this.source.currentLocation;
	    }

	    this.pendingContent = content;
	  },

	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function append() {
	    if (this.isInline()) {
	      this.replaceStack(function (current) {
	        return [' != null ? ', current, ' : ""'];
	      });

	      this.pushSource(this.appendToBuffer(this.popStack()));
	    } else {
	      var local = this.popStack();
	      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
	      if (this.environment.isSimple) {
	        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
	      }
	    }
	  },

	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function appendEscaped() {
	    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
	  },

	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function getContext(depth) {
	    this.lastContext = depth;
	  },

	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function pushContext() {
	    this.pushStackLiteral(this.contextName(this.lastContext));
	  },

	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
	    var i = 0;

	    if (!scoped && this.options.compat && !this.lastContext) {
	      // The depthed query is expected to handle the undefined logic for the root level that
	      // is implemented below, so we evaluate that directly in compat mode
	      this.push(this.depthedLookup(parts[i++]));
	    } else {
	      this.pushContext();
	    }

	    this.resolvePath('context', parts, i, falsy, strict);
	  },

	  // [lookupBlockParam]
	  //
	  // On stack, before: ...
	  // On stack, after: blockParam[name], ...
	  //
	  // Looks up the value of `parts` on the given block param and pushes
	  // it onto the stack.
	  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
	    this.useBlockParams = true;

	    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
	    this.resolvePath('context', parts, 1);
	  },

	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function lookupData(depth, parts, strict) {
	    if (!depth) {
	      this.pushStackLiteral('data');
	    } else {
	      this.pushStackLiteral('container.data(data, ' + depth + ')');
	    }

	    this.resolvePath('data', parts, 0, true, strict);
	  },

	  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
	    // istanbul ignore next

	    var _this2 = this;

	    if (this.options.strict || this.options.assumeObjects) {
	      this.push(strictLookup(this.options.strict && strict, this, parts, type));
	      return;
	    }

	    var len = parts.length;
	    for (; i < len; i++) {
	      /* eslint-disable no-loop-func */
	      this.replaceStack(function (current) {
	        var lookup = _this2.nameLookup(current, parts[i], type);
	        // We want to ensure that zero and false are handled properly if the context (falsy flag)
	        // needs to have the special handling for these values.
	        if (!falsy) {
	          return [' != null ? ', lookup, ' : ', current];
	        } else {
	          // Otherwise we can use generic falsy handling
	          return [' && ', lookup];
	        }
	      });
	      /* eslint-enable no-loop-func */
	    }
	  },

	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function resolvePossibleLambda() {
	    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
	  },

	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function pushStringParam(string, type) {
	    this.pushContext();
	    this.pushString(type);

	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'SubExpression') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },

	  emptyHash: function emptyHash(omitEmpty) {
	    if (this.trackIds) {
	      this.push('{}'); // hashIds
	    }
	    if (this.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
	  },
	  pushHash: function pushHash() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = { values: {}, types: [], contexts: [], ids: [] };
	  },
	  popHash: function popHash() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();

	    if (this.trackIds) {
	      this.push(this.objectLiteral(hash.ids));
	    }
	    if (this.stringParams) {
	      this.push(this.objectLiteral(hash.contexts));
	      this.push(this.objectLiteral(hash.types));
	    }

	    this.push(this.objectLiteral(hash.values));
	  },

	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function pushString(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },

	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function pushLiteral(value) {
	    this.pushStackLiteral(value);
	  },

	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function pushProgram(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },

	  // [registerDecorator]
	  //
	  // On stack, before: hash, program, params..., ...
	  // On stack, after: ...
	  //
	  // Pops off the decorator's parameters, invokes the decorator,
	  // and inserts the decorator into the decorators list.
	  registerDecorator: function registerDecorator(paramSize, name) {
	    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
	        options = this.setupHelperArgs(name, paramSize);

	    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
	  },

	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
	    var nonHelper = this.popStack(),
	        helper = this.setupHelper(paramSize, name);

	    var possibleFunctionCalls = [];

	    if (isSimple) {
	      // direct call to helper
	      possibleFunctionCalls.push(helper.name);
	    }
	    // call a function from the input object
	    possibleFunctionCalls.push(nonHelper);
	    if (!this.options.strict) {
	      possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
	    }

	    var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
	    var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
	    this.push(functionCall);
	  },

	  itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
	    var result = [];
	    result.push(items[0]);
	    for (var i = 1; i < items.length; i++) {
	      result.push(separator, items[i]);
	    }
	    return result;
	  },
	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
	  },

	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
	    this.useRegister('helper');

	    var nonHelper = this.popStack();

	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);

	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

	    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
	    if (!this.options.strict) {
	      lookup[0] = '(helper = ';
	      lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
	    }

	    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
	  },

	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function invokePartial(isDynamic, name, indent) {
	    var params = [],
	        options = this.setupParams(name, 1, params);

	    if (isDynamic) {
	      name = this.popStack();
	      delete options.name;
	    }

	    if (indent) {
	      options.indent = JSON.stringify(indent);
	    }
	    options.helpers = 'helpers';
	    options.partials = 'partials';
	    options.decorators = 'container.decorators';

	    if (!isDynamic) {
	      params.unshift(this.nameLookup('partials', name, 'partial'));
	    } else {
	      params.unshift(name);
	    }

	    if (this.options.compat) {
	      options.depths = 'depths';
	    }
	    options = this.objectLiteral(options);
	    params.push(options);

	    this.push(this.source.functionCall('container.invokePartial', '', params));
	  },

	  // [assignToHash]
	  //
	  // On stack, before: value, ..., hash, ...
	  // On stack, after: ..., hash, ...
	  //
	  // Pops a value off the stack and assigns it to the current hash
	  assignToHash: function assignToHash(key) {
	    var value = this.popStack(),
	        context = undefined,
	        type = undefined,
	        id = undefined;

	    if (this.trackIds) {
	      id = this.popStack();
	    }
	    if (this.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }

	    var hash = this.hash;
	    if (context) {
	      hash.contexts[key] = context;
	    }
	    if (type) {
	      hash.types[key] = type;
	    }
	    if (id) {
	      hash.ids[key] = id;
	    }
	    hash.values[key] = value;
	  },

	  pushId: function pushId(type, name, child) {
	    if (type === 'BlockParam') {
	      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
	    } else if (type === 'PathExpression') {
	      this.pushString(name);
	    } else if (type === 'SubExpression') {
	      this.pushStackLiteral('true');
	    } else {
	      this.pushStackLiteral('null');
	    }
	  },

	  // HELPERS

	  compiler: JavaScriptCompiler,

	  compileChildren: function compileChildren(environment, options) {
	    var children = environment.children,
	        child = undefined,
	        compiler = undefined;

	    for (var i = 0, l = children.length; i < l; i++) {
	      child = children[i];
	      compiler = new this.compiler(); // eslint-disable-line new-cap

	      var existing = this.matchExistingProgram(child);

	      if (existing == null) {
	        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
	        var index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
	        this.context.decorators[index] = compiler.decorators;
	        this.context.environments[index] = child;

	        this.useDepths = this.useDepths || compiler.useDepths;
	        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
	        child.useDepths = this.useDepths;
	        child.useBlockParams = this.useBlockParams;
	      } else {
	        child.index = existing.index;
	        child.name = 'program' + existing.index;

	        this.useDepths = this.useDepths || existing.useDepths;
	        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
	      }
	    }
	  },
	  matchExistingProgram: function matchExistingProgram(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return environment;
	      }
	    }
	  },

	  programExpression: function programExpression(guid) {
	    var child = this.environment.children[guid],
	        programParams = [child.index, 'data', child.blockParams];

	    if (this.useBlockParams || this.useDepths) {
	      programParams.push('blockParams');
	    }
	    if (this.useDepths) {
	      programParams.push('depths');
	    }

	    return 'container.program(' + programParams.join(', ') + ')';
	  },

	  useRegister: function useRegister(name) {
	    if (!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },

	  push: function push(expr) {
	    if (!(expr instanceof Literal)) {
	      expr = this.source.wrap(expr);
	    }

	    this.inlineStack.push(expr);
	    return expr;
	  },

	  pushStackLiteral: function pushStackLiteral(item) {
	    this.push(new Literal(item));
	  },

	  pushSource: function pushSource(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
	      this.pendingContent = undefined;
	    }

	    if (source) {
	      this.source.push(source);
	    }
	  },

	  replaceStack: function replaceStack(callback) {
	    var prefix = ['('],
	        stack = undefined,
	        createdStack = undefined,
	        usedLiteral = undefined;

	    /* istanbul ignore next */
	    if (!this.isInline()) {
	      throw new _exception2['default']('replaceStack on non-inline');
	    }

	    // We want to merge the inline statement into the replacement statement via ','
	    var top = this.popStack(true);

	    if (top instanceof Literal) {
	      // Literals do not need to be inlined
	      stack = [top.value];
	      prefix = ['(', stack];
	      usedLiteral = true;
	    } else {
	      // Get or create the current stack name for use by the inline
	      createdStack = true;
	      var _name = this.incrStack();

	      prefix = ['((', this.push(_name), ' = ', top, ')'];
	      stack = this.topStack();
	    }

	    var item = callback.call(this, stack);

	    if (!usedLiteral) {
	      this.popStack();
	    }
	    if (createdStack) {
	      this.stackSlot--;
	    }
	    this.push(prefix.concat(item, ')'));
	  },

	  incrStack: function incrStack() {
	    this.stackSlot++;
	    if (this.stackSlot > this.stackVars.length) {
	      this.stackVars.push('stack' + this.stackSlot);
	    }
	    return this.topStackName();
	  },
	  topStackName: function topStackName() {
	    return 'stack' + this.stackSlot;
	  },
	  flushInline: function flushInline() {
	    var inlineStack = this.inlineStack;
	    this.inlineStack = [];
	    for (var i = 0, len = inlineStack.length; i < len; i++) {
	      var entry = inlineStack[i];
	      /* istanbul ignore if */
	      if (entry instanceof Literal) {
	        this.compileStack.push(entry);
	      } else {
	        var stack = this.incrStack();
	        this.pushSource([stack, ' = ', entry, ';']);
	        this.compileStack.push(stack);
	      }
	    }
	  },
	  isInline: function isInline() {
	    return this.inlineStack.length;
	  },

	  popStack: function popStack(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();

	    if (!wrapped && item instanceof Literal) {
	      return item.value;
	    } else {
	      if (!inline) {
	        /* istanbul ignore next */
	        if (!this.stackSlot) {
	          throw new _exception2['default']('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },

	  topStack: function topStack() {
	    var stack = this.isInline() ? this.inlineStack : this.compileStack,
	        item = stack[stack.length - 1];

	    /* istanbul ignore if */
	    if (item instanceof Literal) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },

	  contextName: function contextName(context) {
	    if (this.useDepths && context) {
	      return 'depths[' + context + ']';
	    } else {
	      return 'depth' + context;
	    }
	  },

	  quotedString: function quotedString(str) {
	    return this.source.quotedString(str);
	  },

	  objectLiteral: function objectLiteral(obj) {
	    return this.source.objectLiteral(obj);
	  },

	  aliasable: function aliasable(name) {
	    var ret = this.aliases[name];
	    if (ret) {
	      ret.referenceCount++;
	      return ret;
	    }

	    ret = this.aliases[name] = this.source.wrap(name);
	    ret.aliasable = true;
	    ret.referenceCount = 1;

	    return ret;
	  },

	  setupHelper: function setupHelper(paramSize, name, blockHelper) {
	    var params = [],
	        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
	    var foundHelper = this.nameLookup('helpers', name, 'helper'),
	        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: [callContext].concat(params)
	    };
	  },

	  setupParams: function setupParams(helper, paramSize, params) {
	    var options = {},
	        contexts = [],
	        types = [],
	        ids = [],
	        objectArgs = !params,
	        param = undefined;

	    if (objectArgs) {
	      params = [];
	    }

	    options.name = this.quotedString(helper);
	    options.hash = this.popStack();

	    if (this.trackIds) {
	      options.hashIds = this.popStack();
	    }
	    if (this.stringParams) {
	      options.hashTypes = this.popStack();
	      options.hashContexts = this.popStack();
	    }

	    var inverse = this.popStack(),
	        program = this.popStack();

	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      options.fn = program || 'container.noop';
	      options.inverse = inverse || 'container.noop';
	    }

	    // The parameters go on to the stack in order (making sure that they are evaluated in order)
	    // so we need to pop them off the stack in reverse order
	    var i = paramSize;
	    while (i--) {
	      param = this.popStack();
	      params[i] = param;

	      if (this.trackIds) {
	        ids[i] = this.popStack();
	      }
	      if (this.stringParams) {
	        types[i] = this.popStack();
	        contexts[i] = this.popStack();
	      }
	    }

	    if (objectArgs) {
	      options.args = this.source.generateArray(params);
	    }

	    if (this.trackIds) {
	      options.ids = this.source.generateArray(ids);
	    }
	    if (this.stringParams) {
	      options.types = this.source.generateArray(types);
	      options.contexts = this.source.generateArray(contexts);
	    }

	    if (this.options.data) {
	      options.data = 'data';
	    }
	    if (this.useBlockParams) {
	      options.blockParams = 'blockParams';
	    }
	    return options;
	  },

	  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
	    var options = this.setupParams(helper, paramSize, params);
	    options.loc = JSON.stringify(this.source.currentLocation);
	    options = this.objectLiteral(options);
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return ['options=', options];
	    } else if (params) {
	      params.push(options);
	      return '';
	    } else {
	      return options;
	    }
	  }
	};

	(function () {
	  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

	  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

	  for (var i = 0, l = reservedWords.length; i < l; i++) {
	    compilerWords[reservedWords[i]] = true;
	  }
	})();

	/**
	 * @deprecated May be removed in the next major version
	 */
	JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
	  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
	};

	function strictLookup(requireTerminal, compiler, parts, type) {
	  var stack = compiler.popStack(),
	      i = 0,
	      len = parts.length;
	  if (requireTerminal) {
	    len--;
	  }

	  for (; i < len; i++) {
	    stack = compiler.nameLookup(stack, parts[i], type);
	  }

	  if (requireTerminal) {
	    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
	  } else {
	    return stack;
	  }
	}

	exports['default'] = JavaScriptCompiler;
	module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __nested_webpack_require_174914__) {

	/* global define */
	'use strict';

	var _Object$keys = __nested_webpack_require_174914__(13)['default'];

	exports.__esModule = true;

	var _utils = __nested_webpack_require_174914__(5);

	var SourceNode = undefined;

	try {
	  /* istanbul ignore next */
	  if (false) { var SourceMap; }
	} catch (err) {}
	/* NOP */

	/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
	if (!SourceNode) {
	  SourceNode = function (line, column, srcFile, chunks) {
	    this.src = '';
	    if (chunks) {
	      this.add(chunks);
	    }
	  };
	  /* istanbul ignore next */
	  SourceNode.prototype = {
	    add: function add(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src += chunks;
	    },
	    prepend: function prepend(chunks) {
	      if (_utils.isArray(chunks)) {
	        chunks = chunks.join('');
	      }
	      this.src = chunks + this.src;
	    },
	    toStringWithSourceMap: function toStringWithSourceMap() {
	      return { code: this.toString() };
	    },
	    toString: function toString() {
	      return this.src;
	    }
	  };
	}

	function castChunk(chunk, codeGen, loc) {
	  if (_utils.isArray(chunk)) {
	    var ret = [];

	    for (var i = 0, len = chunk.length; i < len; i++) {
	      ret.push(codeGen.wrap(chunk[i], loc));
	    }
	    return ret;
	  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
	    // Handle primitives that the SourceNode will throw up on
	    return chunk + '';
	  }
	  return chunk;
	}

	function CodeGen(srcFile) {
	  this.srcFile = srcFile;
	  this.source = [];
	}

	CodeGen.prototype = {
	  isEmpty: function isEmpty() {
	    return !this.source.length;
	  },
	  prepend: function prepend(source, loc) {
	    this.source.unshift(this.wrap(source, loc));
	  },
	  push: function push(source, loc) {
	    this.source.push(this.wrap(source, loc));
	  },

	  merge: function merge() {
	    var source = this.empty();
	    this.each(function (line) {
	      source.add(['  ', line, '\n']);
	    });
	    return source;
	  },

	  each: function each(iter) {
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      iter(this.source[i]);
	    }
	  },

	  empty: function empty() {
	    var loc = this.currentLocation || { start: {} };
	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
	  },
	  wrap: function wrap(chunk) {
	    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

	    if (chunk instanceof SourceNode) {
	      return chunk;
	    }

	    chunk = castChunk(chunk, this, loc);

	    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
	  },

	  functionCall: function functionCall(fn, type, params) {
	    params = this.generateList(params);
	    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
	  },

	  quotedString: function quotedString(str) {
	    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
	    .replace(/\u2029/g, '\\u2029') + '"';
	  },

	  objectLiteral: function objectLiteral(obj) {
	    // istanbul ignore next

	    var _this = this;

	    var pairs = [];

	    _Object$keys(obj).forEach(function (key) {
	      var value = castChunk(obj[key], _this);
	      if (value !== 'undefined') {
	        pairs.push([_this.quotedString(key), ':', value]);
	      }
	    });

	    var ret = this.generateList(pairs);
	    ret.prepend('{');
	    ret.add('}');
	    return ret;
	  },

	  generateList: function generateList(entries) {
	    var ret = this.empty();

	    for (var i = 0, len = entries.length; i < len; i++) {
	      if (i) {
	        ret.add(',');
	      }

	      ret.add(castChunk(entries[i], this));
	    }

	    return ret;
	  },

	  generateArray: function generateArray(entries) {
	    var ret = this.generateList(entries);
	    ret.prepend('[');
	    ret.add(']');

	    return ret;
	  }
	};

	exports['default'] = CodeGen;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;

/***/ }),

/***/ "./src/components/radios/radios.hbs":
/*!******************************************!*\
  !*** ./src/components/radios/radios.hbs ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Module
var code = "{{controllerClass 'selected' (concat controller '--is-selected')}}\n<label\n        class=\"{{controller}}__label\"\n>\n    <input\n            id=\"input\"\n            class=\"{{controller}}__input\"\n            type=\"radio\"\n            name=\"{{name}}\"\n            value=\"{{value}}\"\n            {{#if (controllerValue 'checked')}}checked{{/if}}\n            data-action=\"input->{{controller}}#select deselect->{{controller}}#deselect\"\n            data-{{controller}}-selected-class=\"{{controller}}--is-selected\"\n    >\n</label>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/components/radios/radios.scss":
/*!*******************************************!*\
  !*** ./src/components/radios/radios.scss ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_radios_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./radios.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/radios/radios.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_radios_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_radios_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_radios_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_radios_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/components/controller-component.ts":
/*!************************************************!*\
  !*** ./src/components/controller-component.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControllerComponent": function() { return /* binding */ ControllerComponent; }
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! handlebars */ "./node_modules/handlebars/dist/handlebars.js");
/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Utils_camel_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utils/camel-case */ "./src/utils/camel-case.ts");



class ControllerComponent extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.registerHandleBarsHelpers();
        this.startStimulusLocalApplication();
        this.setIdentifierData();
        this.renderInnerHTML();
    }
    registerHandleBarsHelpers() {
        handlebars__WEBPACK_IMPORTED_MODULE_1__.registerHelper('controllerValue', (key) => this.getValueByShortKey(key));
        handlebars__WEBPACK_IMPORTED_MODULE_1__.registerHelper('controllerClass', (key, className) => this.addClassByShortKey(key, className));
        handlebars__WEBPACK_IMPORTED_MODULE_1__.registerHelper('concat', (stringA, stringB) => stringA + stringB);
    }
    startStimulusLocalApplication() {
        const application = _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Application.start(this);
        application.register(this.identifier, this.controller);
    }
    setIdentifierData() {
        this.dataset.controller = this.identifier;
        this.classList.add(this.identifier);
    }
    getValueByShortKey(key) {
        const attributeKey = `${this.identifier}-${key}-value`;
        const camelCaseKey = (0,Utils_camel_case__WEBPACK_IMPORTED_MODULE_2__.toCamelCase)(attributeKey);
        return this.dataset[camelCaseKey];
    }
    addClassByShortKey(key, className) {
        const attributeKey = `${this.identifier}-${key}-class`;
        const camelCaseKey = (0,Utils_camel_case__WEBPACK_IMPORTED_MODULE_2__.toCamelCase)(attributeKey);
        this.dataset[camelCaseKey] = className;
    }
    renderInnerHTML() {
        const template = document.createElement('template');
        template.innerHTML = handlebars__WEBPACK_IMPORTED_MODULE_1__.compile(this.template)(this.dataset);
        setTimeout(() => {
            this.append(template.content.cloneNode(true));
        });
    }
}


/***/ }),

/***/ "./src/components/radios/radios.ts":
/*!*****************************************!*\
  !*** ./src/components/radios/radios.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Radios": function() { return /* binding */ Radios; }
/* harmony export */ });
/* harmony import */ var _radios_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radios.scss */ "./src/components/radios/radios.scss");
/* harmony import */ var _radios_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./radios.hbs */ "./src/components/radios/radios.hbs");
/* harmony import */ var Controllers_inputs_radios_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Controllers/inputs/radios_controller */ "./src/controllers/inputs/radios_controller.ts");
/* harmony import */ var Components_controller_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Components/controller-component */ "./src/components/controller-component.ts");




class Radios extends Components_controller_component__WEBPACK_IMPORTED_MODULE_3__.ControllerComponent {
    constructor() {
        super(...arguments);
        this.identifier = 'ap-input-radios';
        this.template = _radios_hbs__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.controller = Controllers_inputs_radios_controller__WEBPACK_IMPORTED_MODULE_2__["default"];
    }
}


/***/ }),

/***/ "./src/controllers/inputs/radios_controller.ts":
/*!*****************************************************!*\
  !*** ./src/controllers/inputs/radios_controller.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ default_1; }
/* harmony export */ });
/* harmony import */ var _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hotwired/stimulus */ "./node_modules/@hotwired/stimulus/dist/stimulus.js");

class default_1 extends _hotwired_stimulus__WEBPACK_IMPORTED_MODULE_0__.Controller {
    connect() {
    }
    topValueChanged(value) {
        this.element.style.top = value;
    }
    leftValueChanged(value) {
        this.element.style.left = value;
    }
    widthValueChanged(value) {
        this.element.style.width = value;
    }
    heightValueChanged(value) {
        this.element.style.height = value;
    }
    checkedValueChanged(value) {
        if (value) {
            this.element.classList.add(this.selectedClass);
        }
        else {
            this.element.classList.remove(this.selectedClass);
        }
    }
    select(event) {
        const inputElement = event.target;
        document.querySelector(`${this.element.tagName} [name='${inputElement.name}']:not(:checked)`).dispatchEvent(new Event('deselect'));
        this.checkedValue = 'on';
    }
    deselect(event) {
        this.checkedValue = '';
    }
}
default_1.values = {
    top: String,
    left: String,
    width: String,
    height: String,
    checked: String,
};
default_1.classes = ['selected'];


/***/ }),

/***/ "./src/utils/camel-case.ts":
/*!*********************************!*\
  !*** ./src/utils/camel-case.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toCamelCase": function() { return /* binding */ toCamelCase; }
/* harmony export */ });
function toCamelCase(string) {
    return string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Radios": function() { return /* reexport safe */ Components_radios_radios__WEBPACK_IMPORTED_MODULE_0__.Radios; }
/* harmony export */ });
/* harmony import */ var Components_radios_radios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Components/radios/radios */ "./src/components/radios/radios.ts");



}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBdUQsUUFBUTtBQUMvRDtBQUNBLDZEQUE2RCx1REFBdUQ7QUFDcEg7QUFDQTtBQUNBLG9CQUFvQix5Q0FBeUM7QUFDN0QsNkJBQTZCO0FBQzdCLGdFQUFnRSxZQUFZO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELDJDQUEyQztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msd0NBQXdDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0NBQWtDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxLQUFLO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNEJBQTRCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFELG9CQUFvQixrQ0FBa0M7QUFDdEQscUNBQXFDLGlDQUFpQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxnQkFBZ0Isa0NBQWtDO0FBQ2xELGlDQUFpQyxpQ0FBaUM7QUFDbEUscURBQXFELFFBQVE7QUFDN0Q7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQSx1Q0FBdUMsS0FBSztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxtQkFBbUI7QUFDakU7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsS0FBSztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQixHQUFHLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxjQUFjLEtBQUssTUFBTTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnQkFBZ0IsR0FBRyxXQUFXO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBLCtDQUErQyxXQUFXLHFCQUFxQixjQUFjLElBQUksV0FBVyxHQUFHLFdBQVcsU0FBUyxxQkFBcUIsSUFBSSxXQUFXO0FBQ3ZLLHVCQUF1QixlQUFlO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtCQUErQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsS0FBSztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrSUFBa0k7O0FBRWxJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBLGlDQUFpQyxpQ0FBbUI7O0FBRXBEO0FBQ0E7O0FBRUEsb0JBQW9CLGlDQUFtQjs7QUFFdkM7O0FBRUEsY0FBYyxpQ0FBbUI7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQSxPQUFPLEtBQUssRUFBRSxrQkFLVjtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLGdCQUFnQjtBQUNoQixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJOztBQUVKO0FBQ0EsK0NBQStDLFNBQVM7QUFDeEQ7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxJQUFJO0FBQ0o7QUFDQSwrRkFBK0YsWUFBWTs7QUFFM0c7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLG1CQUFtQjtBQUNuQixlQUFlO0FBQ2Y7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUEsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBLENBQUM7QUFDRDs7Ozs7Ozs7Ozs7O0FDemxLQTtBQUNBLGNBQWMsZ0VBQWdFLDRCQUE0QixZQUFZLDBFQUEwRSxZQUFZLDREQUE0RCxNQUFNLDBCQUEwQixPQUFPLGtCQUFrQixpQ0FBaUMsU0FBUyxLQUFLLHFDQUFxQyxZQUFZLG9CQUFvQixZQUFZLGdDQUFnQyxZQUFZLG9CQUFvQixZQUFZO0FBQzdnQjtBQUNBLCtEQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRm5CLE1BQXFHO0FBQ3JHLE1BQTJGO0FBQzNGLE1BQWtHO0FBQ2xHLE1BQXFIO0FBQ3JILE1BQThHO0FBQzlHLE1BQThHO0FBQzlHLE1BQXlKO0FBQ3pKO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsNkhBQU87Ozs7QUFJbUc7QUFDM0gsT0FBTywrREFBZSw2SEFBTyxJQUFJLG9JQUFjLEdBQUcsb0lBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZndFO0FBQy9CO0FBQ007QUFNeEMsTUFBTSxtQkFBb0IsU0FBUSxXQUFXO0lBS2xEO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyx5QkFBeUI7UUFDL0Isc0RBQXlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLHNEQUF5QixDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFHLHNEQUF5QixDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU8sNkJBQTZCO1FBQ25DLE1BQU0sV0FBVyxHQUFHLGlFQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sa0JBQWtCLENBQUMsR0FBVztRQUNwQyxNQUFNLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxRQUFRLENBQUM7UUFDdkQsTUFBTSxZQUFZLEdBQUcsNkRBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEdBQVcsRUFBRSxTQUFnQjtRQUN0RCxNQUFNLFlBQVksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxRQUFRLENBQUM7UUFDdkQsTUFBTSxZQUFZLEdBQUcsNkRBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sZUFBZTtRQUNyQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsQ0FBQyxTQUFTLEdBQUcsK0NBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRSxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEc0I7QUFDUztBQUNvQztBQUNFO0FBRS9ELE1BQU0sTUFBTyxTQUFRLGdGQUFtQjtJQUEvQzs7UUFDVyxlQUFVLEdBQUcsaUJBQWlCLENBQUM7UUFDL0IsYUFBUSxHQUFHLG1EQUFJLENBQUM7UUFDaEIsZUFBVSxHQUFHLDRFQUFnQixDQUFDO0lBQ3pDLENBQUM7Q0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUOEM7QUFFaEMsZUFBTSxTQUFRLDBEQUFVO0lBYXJDLE9BQU87SUFDUCxDQUFDO0lBRUQsZUFBZSxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLE9BQXVCLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLE9BQXVCLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLE9BQXVCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLE9BQXVCLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDckQsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQWE7UUFDL0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFZO1FBQ2pCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUEwQixDQUFDO1FBQ3RELFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sV0FBVyxZQUFZLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25JLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWTtRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDOztBQS9DTSxnQkFBTSxHQUFHO0lBQ2QsR0FBRyxFQUFFLE1BQU07SUFDWCxJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxNQUFNO0lBQ2IsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsTUFBTTtDQUNoQjtBQUVNLGlCQUFPLEdBQUcsQ0FBRSxVQUFVLENBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1gzQixTQUFTLFdBQVcsQ0FBQyxNQUFjO0lBQ3hDLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLENBQUM7Ozs7Ozs7VUNGRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEO0FBRWhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvLi9ub2RlX21vZHVsZXMvQGhvdHdpcmVkL3N0aW11bHVzL2Rpc3Qvc3RpbXVsdXMuanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vc3JjL2NvbXBvbmVudHMvcmFkaW9zL3JhZGlvcy5zY3NzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9oYW5kbGViYXJzLmpzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL3NyYy9jb21wb25lbnRzL3JhZGlvcy9yYWRpb3MuaGJzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL3NyYy9jb21wb25lbnRzL3JhZGlvcy9yYWRpb3Muc2Nzcz9iYTAzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vc3JjL2NvbXBvbmVudHMvY29udHJvbGxlci1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0Ly4vc3JjL2NvbXBvbmVudHMvcmFkaW9zL3JhZGlvcy50cyIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvLi9zcmMvY29udHJvbGxlcnMvaW5wdXRzL3JhZGlvc19jb250cm9sbGVyLnRzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC8uL3NyYy91dGlscy9jYW1lbC1jYXNlLnRzIiwid2VicGFjazovL0FQUXVlc3Rpb25JbnB1dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQVBRdWVzdGlvbklucHV0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9BUFF1ZXN0aW9uSW5wdXQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJBUFF1ZXN0aW9uSW5wdXRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQVBRdWVzdGlvbklucHV0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkFQUXVlc3Rpb25JbnB1dFwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIi8qXG5TdGltdWx1cyAzLjAuMVxuQ29weXJpZ2h0IMKpIDIwMjEgQmFzZWNhbXAsIExMQ1xuICovXG5jbGFzcyBFdmVudExpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5ldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnM7XG4gICAgICAgIHRoaXMudW5vcmRlcmVkQmluZGluZ3MgPSBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcywgdGhpcy5ldmVudE9wdGlvbnMpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMsIHRoaXMuZXZlbnRPcHRpb25zKTtcbiAgICB9XG4gICAgYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMudW5vcmRlcmVkQmluZGluZ3MuYWRkKGJpbmRpbmcpO1xuICAgIH1cbiAgICBiaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy51bm9yZGVyZWRCaW5kaW5ncy5kZWxldGUoYmluZGluZyk7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZlbnQgPSBleHRlbmRFdmVudChldmVudCk7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZyBvZiB0aGlzLmJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoZXh0ZW5kZWRFdmVudC5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbmRpbmcuaGFuZGxlRXZlbnQoZXh0ZW5kZWRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGJpbmRpbmdzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnVub3JkZXJlZEJpbmRpbmdzKS5zb3J0KChsZWZ0LCByaWdodCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGVmdEluZGV4ID0gbGVmdC5pbmRleCwgcmlnaHRJbmRleCA9IHJpZ2h0LmluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRJbmRleCA8IHJpZ2h0SW5kZXggPyAtMSA6IGxlZnRJbmRleCA+IHJpZ2h0SW5kZXggPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXh0ZW5kRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoXCJpbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcIiBpbiBldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB7IHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiB9ID0gZXZlbnQ7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGV2ZW50LCB7XG4gICAgICAgICAgICBpbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBEaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lck1hcHMgPSBuZXcgTWFwO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5mb3JFYWNoKGV2ZW50TGlzdGVuZXIgPT4gZXZlbnRMaXN0ZW5lci5jb25uZWN0KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycy5mb3JFYWNoKGV2ZW50TGlzdGVuZXIgPT4gZXZlbnRMaXN0ZW5lci5kaXNjb25uZWN0KCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBldmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5ldmVudExpc3RlbmVyTWFwcy52YWx1ZXMoKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKGxpc3RlbmVycywgbWFwKSA9PiBsaXN0ZW5lcnMuY29uY2F0KEFycmF5LmZyb20obWFwLnZhbHVlcygpKSksIFtdKTtcbiAgICB9XG4gICAgYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyRm9yQmluZGluZyhiaW5kaW5nKS5iaW5kaW5nQ29ubmVjdGVkKGJpbmRpbmcpO1xuICAgIH1cbiAgICBiaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy5mZXRjaEV2ZW50TGlzdGVuZXJGb3JCaW5kaW5nKGJpbmRpbmcpLmJpbmRpbmdEaXNjb25uZWN0ZWQoYmluZGluZyk7XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwgPSB7fSkge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmhhbmRsZUVycm9yKGVycm9yLCBgRXJyb3IgJHttZXNzYWdlfWAsIGRldGFpbCk7XG4gICAgfVxuICAgIGZldGNoRXZlbnRMaXN0ZW5lckZvckJpbmRpbmcoYmluZGluZykge1xuICAgICAgICBjb25zdCB7IGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyB9ID0gYmluZGluZztcbiAgICAgICAgcmV0dXJuIHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyk7XG4gICAgfVxuICAgIGZldGNoRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZXZlbnRMaXN0ZW5lck1hcCA9IHRoaXMuZmV0Y2hFdmVudExpc3RlbmVyTWFwRm9yRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuY2FjaGVLZXkoZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgICAgICBsZXQgZXZlbnRMaXN0ZW5lciA9IGV2ZW50TGlzdGVuZXJNYXAuZ2V0KGNhY2hlS2V5KTtcbiAgICAgICAgaWYgKCFldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyID0gdGhpcy5jcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyTWFwLnNldChjYWNoZUtleSwgZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG4gICAgfVxuICAgIGNyZWF0ZUV2ZW50TGlzdGVuZXIoZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSBuZXcgRXZlbnRMaXN0ZW5lcihldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudE9wdGlvbnMpO1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbiAgICB9XG4gICAgZmV0Y2hFdmVudExpc3RlbmVyTWFwRm9yRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgbGV0IGV2ZW50TGlzdGVuZXJNYXAgPSB0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLmdldChldmVudFRhcmdldCk7XG4gICAgICAgIGlmICghZXZlbnRMaXN0ZW5lck1hcCkge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lck1hcCA9IG5ldyBNYXA7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJNYXBzLnNldChldmVudFRhcmdldCwgZXZlbnRMaXN0ZW5lck1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXJNYXA7XG4gICAgfVxuICAgIGNhY2hlS2V5KGV2ZW50TmFtZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gW2V2ZW50TmFtZV07XG4gICAgICAgIE9iamVjdC5rZXlzKGV2ZW50T3B0aW9ucykuc29ydCgpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goYCR7ZXZlbnRPcHRpb25zW2tleV0gPyBcIlwiIDogXCIhXCJ9JHtrZXl9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIjpcIik7XG4gICAgfVxufVxuXG5jb25zdCBkZXNjcmlwdG9yUGF0dGVybiA9IC9eKCguKz8pKEAod2luZG93fGRvY3VtZW50KSk/LT4pPyguKz8pKCMoW146XSs/KSkoOiguKykpPyQvO1xuZnVuY3Rpb24gcGFyc2VBY3Rpb25EZXNjcmlwdG9yU3RyaW5nKGRlc2NyaXB0b3JTdHJpbmcpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBkZXNjcmlwdG9yU3RyaW5nLnRyaW0oKTtcbiAgICBjb25zdCBtYXRjaGVzID0gc291cmNlLm1hdGNoKGRlc2NyaXB0b3JQYXR0ZXJuKSB8fCBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgICBldmVudFRhcmdldDogcGFyc2VFdmVudFRhcmdldChtYXRjaGVzWzRdKSxcbiAgICAgICAgZXZlbnROYW1lOiBtYXRjaGVzWzJdLFxuICAgICAgICBldmVudE9wdGlvbnM6IG1hdGNoZXNbOV0gPyBwYXJzZUV2ZW50T3B0aW9ucyhtYXRjaGVzWzldKSA6IHt9LFxuICAgICAgICBpZGVudGlmaWVyOiBtYXRjaGVzWzVdLFxuICAgICAgICBtZXRob2ROYW1lOiBtYXRjaGVzWzddXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlRXZlbnRUYXJnZXQoZXZlbnRUYXJnZXROYW1lKSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0TmFtZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0TmFtZSA9PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcnNlRXZlbnRPcHRpb25zKGV2ZW50T3B0aW9ucykge1xuICAgIHJldHVybiBldmVudE9wdGlvbnMuc3BsaXQoXCI6XCIpLnJlZHVjZSgob3B0aW9ucywgdG9rZW4pID0+IE9iamVjdC5hc3NpZ24ob3B0aW9ucywgeyBbdG9rZW4ucmVwbGFjZSgvXiEvLCBcIlwiKV06ICEvXiEvLnRlc3QodG9rZW4pIH0pLCB7fSk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnlFdmVudFRhcmdldChldmVudFRhcmdldCkge1xuICAgIGlmIChldmVudFRhcmdldCA9PSB3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIFwid2luZG93XCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0ID09IGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiBcImRvY3VtZW50XCI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjYW1lbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oPzpbXy1dKShbYS16MC05XSkvZywgKF8sIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBjYXBpdGFsaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59XG5mdW5jdGlvbiBkYXNoZXJpemUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFtBLVpdKS9nLCAoXywgY2hhcikgPT4gYC0ke2NoYXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cbmZ1bmN0aW9uIHRva2VuaXplKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hdGNoKC9bXlxcc10rL2cpIHx8IFtdO1xufVxuXG5jbGFzcyBBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGluZGV4LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5ldmVudFRhcmdldCA9IGRlc2NyaXB0b3IuZXZlbnRUYXJnZXQgfHwgZWxlbWVudDtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBkZXNjcmlwdG9yLmV2ZW50TmFtZSB8fCBnZXREZWZhdWx0RXZlbnROYW1lRm9yRWxlbWVudChlbGVtZW50KSB8fCBlcnJvcihcIm1pc3NpbmcgZXZlbnQgbmFtZVwiKTtcbiAgICAgICAgdGhpcy5ldmVudE9wdGlvbnMgPSBkZXNjcmlwdG9yLmV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5pZGVudGlmaWVyID0gZGVzY3JpcHRvci5pZGVudGlmaWVyIHx8IGVycm9yKFwibWlzc2luZyBpZGVudGlmaWVyXCIpO1xuICAgICAgICB0aGlzLm1ldGhvZE5hbWUgPSBkZXNjcmlwdG9yLm1ldGhvZE5hbWUgfHwgZXJyb3IoXCJtaXNzaW5nIG1ldGhvZCBuYW1lXCIpO1xuICAgIH1cbiAgICBzdGF0aWMgZm9yVG9rZW4odG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHRva2VuLmVsZW1lbnQsIHRva2VuLmluZGV4LCBwYXJzZUFjdGlvbkRlc2NyaXB0b3JTdHJpbmcodG9rZW4uY29udGVudCkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lU3VmZml4ID0gdGhpcy5ldmVudFRhcmdldE5hbWUgPyBgQCR7dGhpcy5ldmVudFRhcmdldE5hbWV9YCA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmV2ZW50TmFtZX0ke2V2ZW50TmFtZVN1ZmZpeH0tPiR7dGhpcy5pZGVudGlmaWVyfSMke3RoaXMubWV0aG9kTmFtZX1gO1xuICAgIH1cbiAgICBnZXQgcGFyYW1zKCkge1xuICAgICAgICBpZiAodGhpcy5ldmVudFRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtc0Zyb21FdmVudFRhcmdldEF0dHJpYnV0ZXModGhpcy5ldmVudFRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0UGFyYW1zRnJvbUV2ZW50VGFyZ2V0QXR0cmlidXRlcyhldmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYF5kYXRhLSR7dGhpcy5pZGVudGlmaWVyfS0oLispLXBhcmFtJGApO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShldmVudFRhcmdldC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKCh7IG5hbWUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbmFtZS5tYXRjaChwYXR0ZXJuKTtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7IFtjYW1lbGl6ZShrZXkpXTogdHlwZWNhc3QodmFsdWUpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgZ2V0IGV2ZW50VGFyZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeUV2ZW50VGFyZ2V0KHRoaXMuZXZlbnRUYXJnZXQpO1xuICAgIH1cbn1cbmNvbnN0IGRlZmF1bHRFdmVudE5hbWVzID0ge1xuICAgIFwiYVwiOiBlID0+IFwiY2xpY2tcIixcbiAgICBcImJ1dHRvblwiOiBlID0+IFwiY2xpY2tcIixcbiAgICBcImZvcm1cIjogZSA9PiBcInN1Ym1pdFwiLFxuICAgIFwiZGV0YWlsc1wiOiBlID0+IFwidG9nZ2xlXCIsXG4gICAgXCJpbnB1dFwiOiBlID0+IGUuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PSBcInN1Ym1pdFwiID8gXCJjbGlja1wiIDogXCJpbnB1dFwiLFxuICAgIFwic2VsZWN0XCI6IGUgPT4gXCJjaGFuZ2VcIixcbiAgICBcInRleHRhcmVhXCI6IGUgPT4gXCJpbnB1dFwiXG59O1xuZnVuY3Rpb24gZ2V0RGVmYXVsdEV2ZW50TmFtZUZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGFnTmFtZSBpbiBkZWZhdWx0RXZlbnROYW1lcykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdEV2ZW50TmFtZXNbdGFnTmFtZV0oZWxlbWVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cbmZ1bmN0aW9uIHR5cGVjYXN0KHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAob19PKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmNsYXNzIEJpbmRpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGFjdGlvbikge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB9XG4gICAgZ2V0IGluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uaW5kZXg7XG4gICAgfVxuICAgIGdldCBldmVudFRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uLmV2ZW50VGFyZ2V0O1xuICAgIH1cbiAgICBnZXQgZXZlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uZXZlbnRPcHRpb25zO1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBpZiAodGhpcy53aWxsQmVJbnZva2VkQnlFdmVudChldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW52b2tlV2l0aEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZXZlbnROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb24uZXZlbnROYW1lO1xuICAgIH1cbiAgICBnZXQgbWV0aG9kKCkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzLmNvbnRyb2xsZXJbdGhpcy5tZXRob2ROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWN0aW9uIFwiJHt0aGlzLmFjdGlvbn1cIiByZWZlcmVuY2VzIHVuZGVmaW5lZCBtZXRob2QgXCIke3RoaXMubWV0aG9kTmFtZX1cImApO1xuICAgIH1cbiAgICBpbnZva2VXaXRoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQsIGN1cnJlbnRUYXJnZXQgfSA9IGV2ZW50O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBwYXJhbXMgfSA9IHRoaXMuYWN0aW9uO1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uRXZlbnQgPSBPYmplY3QuYXNzaWduKGV2ZW50LCB7IHBhcmFtcyB9KTtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kLmNhbGwodGhpcy5jb250cm9sbGVyLCBhY3Rpb25FdmVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubG9nRGVidWdBY3Rpdml0eSh0aGlzLm1ldGhvZE5hbWUsIHsgZXZlbnQsIHRhcmdldCwgY3VycmVudFRhcmdldCwgYWN0aW9uOiB0aGlzLm1ldGhvZE5hbWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXIsIGVsZW1lbnQsIGluZGV4IH0gPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgZGV0YWlsID0geyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50LCBpbmRleCwgZXZlbnQgfTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5oYW5kbGVFcnJvcihlcnJvciwgYGludm9raW5nIGFjdGlvbiBcIiR7dGhpcy5hY3Rpb259XCJgLCBkZXRhaWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdpbGxCZUludm9rZWRCeUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSBldmVudFRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnRUYXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ICYmIHRoaXMuZWxlbWVudC5jb250YWlucyhldmVudFRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmNvbnRhaW5zRWxlbWVudChldmVudFRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5jb250YWluc0VsZW1lbnQodGhpcy5hY3Rpb24uZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gICAgZ2V0IG1ldGhvZE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbi5tZXRob2ROYW1lO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHNjb3BlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjb3BlO1xuICAgIH1cbn1cblxuY2xhc3MgRWxlbWVudE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0ID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IG5ldyBTZXQ7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHRoaXMucHJvY2Vzc011dGF0aW9ucyhtdXRhdGlvbnMpKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0KTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50LCB0aGlzLm11dGF0aW9uT2JzZXJ2ZXJJbml0KTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLnRha2VSZWNvcmRzKCk7XG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IG5ldyBTZXQodGhpcy5tYXRjaEVsZW1lbnRzSW5UcmVlKCkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIEFycmF5LmZyb20odGhpcy5lbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbShtYXRjaGVzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzTXV0YXRpb25zKG11dGF0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc011dGF0aW9uKG11dGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzTXV0YXRpb24obXV0YXRpb24pIHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0F0dHJpYnV0ZUNoYW5nZShtdXRhdGlvbi50YXJnZXQsIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG11dGF0aW9uLnR5cGUgPT0gXCJjaGlsZExpc3RcIikge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzUmVtb3ZlZE5vZGVzKG11dGF0aW9uLnJlbW92ZWROb2Rlcyk7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NBZGRlZE5vZGVzKG11dGF0aW9uLmFkZGVkTm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb2Nlc3NBdHRyaWJ1dGVDaGFuZ2Uobm9kZSwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gbm9kZTtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXR0cmlidXRlQ2hhbmdlZCAmJiB0aGlzLm1hdGNoRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudEF0dHJpYnV0ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5tYXRjaEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm9jZXNzUmVtb3ZlZE5vZGVzKG5vZGVzKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBBcnJheS5mcm9tKG5vZGVzKSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudEZyb21Ob2RlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlKGVsZW1lbnQsIHRoaXMucmVtb3ZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc0FkZGVkTm9kZXMobm9kZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIEFycmF5LmZyb20obm9kZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50RnJvbU5vZGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAmJiB0aGlzLmVsZW1lbnRJc0FjdGl2ZShlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1RyZWUoZWxlbWVudCwgdGhpcy5hZGRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRjaEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5tYXRjaEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICAgIG1hdGNoRWxlbWVudHNJblRyZWUodHJlZSA9IHRoaXMuZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5tYXRjaEVsZW1lbnRzSW5UcmVlKHRyZWUpO1xuICAgIH1cbiAgICBwcm9jZXNzVHJlZSh0cmVlLCBwcm9jZXNzb3IpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHRoaXMubWF0Y2hFbGVtZW50c0luVHJlZSh0cmVlKSkge1xuICAgICAgICAgICAgcHJvY2Vzc29yLmNhbGwodGhpcywgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudEZyb21Ob2RlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRJc0FjdGl2ZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmlzQ29ubmVjdGVkICE9IHRoaXMuZWxlbWVudC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jb250YWlucyhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudElzQWN0aXZlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5hZGQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50TWF0Y2hlZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5kZWxldGUoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBBdHRyaWJ1dGVPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlTmFtZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlciA9IG5ldyBFbGVtZW50T2JzZXJ2ZXIoZWxlbWVudCwgdGhpcyk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gYFske3RoaXMuYXR0cmlidXRlTmFtZX1dYDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudE9ic2VydmVyLnBhdXNlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBzdGFydGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50T2JzZXJ2ZXIuc3RhcnRlZDtcbiAgICB9XG4gICAgbWF0Y2hFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKHRoaXMuYXR0cmlidXRlTmFtZSk7XG4gICAgfVxuICAgIG1hdGNoRWxlbWVudHNJblRyZWUodHJlZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMubWF0Y2hFbGVtZW50KHRyZWUpID8gW3RyZWVdIDogW107XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBBcnJheS5mcm9tKHRyZWUucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKSk7XG4gICAgICAgIHJldHVybiBtYXRjaC5jb25jYXQobWF0Y2hlcyk7XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZWxlbWVudFVubWF0Y2hlZEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5lbGVtZW50VW5tYXRjaGVkQXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxlbWVudEF0dHJpYnV0ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbGVtZW50QXR0cmlidXRlVmFsdWVDaGFuZ2VkICYmIHRoaXMuYXR0cmlidXRlTmFtZSA9PSBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRBdHRyaWJ1dGVWYWx1ZUNoYW5nZWQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFN0cmluZ01hcE9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0cmluZ01hcCA9IG5ldyBNYXA7XG4gICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB0aGlzLnByb2Nlc3NNdXRhdGlvbnMobXV0YXRpb25zKSk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25PYnNlcnZlci50YWtlUmVjb3JkcygpO1xuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0cmlidXRlTmFtZSBvZiB0aGlzLmtub3duQXR0cmlidXRlTmFtZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc011dGF0aW9ucyhtdXRhdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvY2Vzc011dGF0aW9uKG11dGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lO1xuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG11dGF0aW9uLm9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZGVsZWdhdGUuZ2V0U3RyaW5nTWFwS2V5Rm9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdHJpbmdNYXAuaGFzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXBLZXlBZGRlZChrZXksIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RyaW5nTWFwLmdldChhdHRyaWJ1dGVOYW1lKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKHZhbHVlLCBrZXksIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLnN0cmluZ01hcC5nZXQoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXAuZGVsZXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXBLZXlSZW1vdmVkKGtleSwgYXR0cmlidXRlTmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmdNYXAuc2V0KGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmdNYXBLZXlBZGRlZChrZXksIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5QWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5QWRkZWQoa2V5LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmdNYXBWYWx1ZUNoYW5nZWQodmFsdWUsIGtleSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnN0cmluZ01hcFZhbHVlQ2hhbmdlZCh2YWx1ZSwga2V5LCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLnN0cmluZ01hcEtleVJlbW92ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQga25vd25BdHRyaWJ1dGVOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldCh0aGlzLmN1cnJlbnRBdHRyaWJ1dGVOYW1lcy5jb25jYXQodGhpcy5yZWNvcmRlZEF0dHJpYnV0ZU5hbWVzKSkpO1xuICAgIH1cbiAgICBnZXQgY3VycmVudEF0dHJpYnV0ZU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQuYXR0cmlidXRlcykubWFwKGF0dHJpYnV0ZSA9PiBhdHRyaWJ1dGUubmFtZSk7XG4gICAgfVxuICAgIGdldCByZWNvcmRlZEF0dHJpYnV0ZU5hbWVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN0cmluZ01hcC5rZXlzKCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkKG1hcCwga2V5LCB2YWx1ZSkge1xuICAgIGZldGNoKG1hcCwga2V5KS5hZGQodmFsdWUpO1xufVxuZnVuY3Rpb24gZGVsKG1hcCwga2V5LCB2YWx1ZSkge1xuICAgIGZldGNoKG1hcCwga2V5KS5kZWxldGUodmFsdWUpO1xuICAgIHBydW5lKG1hcCwga2V5KTtcbn1cbmZ1bmN0aW9uIGZldGNoKG1hcCwga2V5KSB7XG4gICAgbGV0IHZhbHVlcyA9IG1hcC5nZXQoa2V5KTtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgICB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xufVxuZnVuY3Rpb24gcHJ1bmUobWFwLCBrZXkpIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBtYXAuZ2V0KGtleSk7XG4gICAgaWYgKHZhbHVlcyAhPSBudWxsICYmIHZhbHVlcy5zaXplID09IDApIHtcbiAgICAgICAgbWFwLmRlbGV0ZShrZXkpO1xuICAgIH1cbn1cblxuY2xhc3MgTXVsdGltYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZhbHVlc0J5S2V5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBnZXQga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleS5rZXlzKCkpO1xuICAgIH1cbiAgICBnZXQgdmFsdWVzKCkge1xuICAgICAgICBjb25zdCBzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5LnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIHNldHMucmVkdWNlKCh2YWx1ZXMsIHNldCkgPT4gdmFsdWVzLmNvbmNhdChBcnJheS5mcm9tKHNldCkpLCBbXSk7XG4gICAgfVxuICAgIGdldCBzaXplKCkge1xuICAgICAgICBjb25zdCBzZXRzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlc0J5S2V5LnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIHNldHMucmVkdWNlKChzaXplLCBzZXQpID0+IHNpemUgKyBzZXQuc2l6ZSwgMCk7XG4gICAgfVxuICAgIGFkZChrZXksIHZhbHVlKSB7XG4gICAgICAgIGFkZCh0aGlzLnZhbHVlc0J5S2V5LCBrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgZGVsKHRoaXMudmFsdWVzQnlLZXksIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBoYXMoa2V5LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZhbHVlc0J5S2V5LmdldChrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzICE9IG51bGwgJiYgdmFsdWVzLmhhcyh2YWx1ZSk7XG4gICAgfVxuICAgIGhhc0tleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzQnlLZXkuaGFzKGtleSk7XG4gICAgfVxuICAgIGhhc1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHNldHMgPSBBcnJheS5mcm9tKHRoaXMudmFsdWVzQnlLZXkudmFsdWVzKCkpO1xuICAgICAgICByZXR1cm4gc2V0cy5zb21lKHNldCA9PiBzZXQuaGFzKHZhbHVlKSk7XG4gICAgfVxuICAgIGdldFZhbHVlc0ZvcktleShrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZXNCeUtleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcyA/IEFycmF5LmZyb20odmFsdWVzKSA6IFtdO1xuICAgIH1cbiAgICBnZXRLZXlzRm9yVmFsdWUodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy52YWx1ZXNCeUtleSlcbiAgICAgICAgICAgIC5maWx0ZXIoKFtrZXksIHZhbHVlc10pID0+IHZhbHVlcy5oYXModmFsdWUpKVxuICAgICAgICAgICAgLm1hcCgoW2tleSwgdmFsdWVzXSkgPT4ga2V5KTtcbiAgICB9XG59XG5cbmNsYXNzIEluZGV4ZWRNdWx0aW1hcCBleHRlbmRzIE11bHRpbWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5rZXlzQnlWYWx1ZSA9IG5ldyBNYXA7XG4gICAgfVxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMua2V5c0J5VmFsdWUua2V5cygpKTtcbiAgICB9XG4gICAgYWRkKGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3VwZXIuYWRkKGtleSwgdmFsdWUpO1xuICAgICAgICBhZGQodGhpcy5rZXlzQnlWYWx1ZSwgdmFsdWUsIGtleSk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXksIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyLmRlbGV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgZGVsKHRoaXMua2V5c0J5VmFsdWUsIHZhbHVlLCBrZXkpO1xuICAgIH1cbiAgICBoYXNWYWx1ZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzQnlWYWx1ZS5oYXModmFsdWUpO1xuICAgIH1cbiAgICBnZXRLZXlzRm9yVmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc2V0ID0gdGhpcy5rZXlzQnlWYWx1ZS5nZXQodmFsdWUpO1xuICAgICAgICByZXR1cm4gc2V0ID8gQXJyYXkuZnJvbShzZXQpIDogW107XG4gICAgfVxufVxuXG5jbGFzcyBUb2tlbkxpc3RPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPYnNlcnZlciA9IG5ldyBBdHRyaWJ1dGVPYnNlcnZlcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnRva2Vuc0J5RWxlbWVudCA9IG5ldyBNdWx0aW1hcDtcbiAgICB9XG4gICAgZ2V0IHN0YXJ0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0YXJ0ZWQ7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHBhdXNlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIucGF1c2UoY2FsbGJhY2spO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZU9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVPYnNlcnZlci5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlT2JzZXJ2ZXIuYXR0cmlidXRlTmFtZTtcbiAgICB9XG4gICAgZWxlbWVudE1hdGNoZWRBdHRyaWJ1dGUoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnRva2Vuc01hdGNoZWQodGhpcy5yZWFkVG9rZW5zRm9yRWxlbWVudChlbGVtZW50KSk7XG4gICAgfVxuICAgIGVsZW1lbnRBdHRyaWJ1dGVWYWx1ZUNoYW5nZWQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBbdW5tYXRjaGVkVG9rZW5zLCBtYXRjaGVkVG9rZW5zXSA9IHRoaXMucmVmcmVzaFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIHRoaXMudG9rZW5zVW5tYXRjaGVkKHVubWF0Y2hlZFRva2Vucyk7XG4gICAgICAgIHRoaXMudG9rZW5zTWF0Y2hlZChtYXRjaGVkVG9rZW5zKTtcbiAgICB9XG4gICAgZWxlbWVudFVubWF0Y2hlZEF0dHJpYnV0ZShlbGVtZW50KSB7XG4gICAgICAgIHRoaXMudG9rZW5zVW5tYXRjaGVkKHRoaXMudG9rZW5zQnlFbGVtZW50LmdldFZhbHVlc0ZvcktleShlbGVtZW50KSk7XG4gICAgfVxuICAgIHRva2Vuc01hdGNoZWQodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHRoaXMudG9rZW5NYXRjaGVkKHRva2VuKSk7XG4gICAgfVxuICAgIHRva2Vuc1VubWF0Y2hlZCh0b2tlbnMpIHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2godG9rZW4gPT4gdGhpcy50b2tlblVubWF0Y2hlZCh0b2tlbikpO1xuICAgIH1cbiAgICB0b2tlbk1hdGNoZWQodG9rZW4pIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS50b2tlbk1hdGNoZWQodG9rZW4pO1xuICAgICAgICB0aGlzLnRva2Vuc0J5RWxlbWVudC5hZGQodG9rZW4uZWxlbWVudCwgdG9rZW4pO1xuICAgIH1cbiAgICB0b2tlblVubWF0Y2hlZCh0b2tlbikge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnRva2VuVW5tYXRjaGVkKHRva2VuKTtcbiAgICAgICAgdGhpcy50b2tlbnNCeUVsZW1lbnQuZGVsZXRlKHRva2VuLmVsZW1lbnQsIHRva2VuKTtcbiAgICB9XG4gICAgcmVmcmVzaFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1Rva2VucyA9IHRoaXMudG9rZW5zQnlFbGVtZW50LmdldFZhbHVlc0ZvcktleShlbGVtZW50KTtcbiAgICAgICAgY29uc3QgY3VycmVudFRva2VucyA9IHRoaXMucmVhZFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGlmZmVyaW5nSW5kZXggPSB6aXAocHJldmlvdXNUb2tlbnMsIGN1cnJlbnRUb2tlbnMpXG4gICAgICAgICAgICAuZmluZEluZGV4KChbcHJldmlvdXNUb2tlbiwgY3VycmVudFRva2VuXSkgPT4gIXRva2Vuc0FyZUVxdWFsKHByZXZpb3VzVG9rZW4sIGN1cnJlbnRUb2tlbikpO1xuICAgICAgICBpZiAoZmlyc3REaWZmZXJpbmdJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIFtbXSwgW11dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtwcmV2aW91c1Rva2Vucy5zbGljZShmaXJzdERpZmZlcmluZ0luZGV4KSwgY3VycmVudFRva2Vucy5zbGljZShmaXJzdERpZmZlcmluZ0luZGV4KV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVhZFRva2Vuc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gdGhpcy5hdHRyaWJ1dGVOYW1lO1xuICAgICAgICBjb25zdCB0b2tlblN0cmluZyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpIHx8IFwiXCI7XG4gICAgICAgIHJldHVybiBwYXJzZVRva2VuU3RyaW5nKHRva2VuU3RyaW5nLCBlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKTtcbiAgICB9XG59XG5mdW5jdGlvbiBwYXJzZVRva2VuU3RyaW5nKHRva2VuU3RyaW5nLCBlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIHRva2VuU3RyaW5nLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmZpbHRlcihjb250ZW50ID0+IGNvbnRlbnQubGVuZ3RoKVxuICAgICAgICAubWFwKChjb250ZW50LCBpbmRleCkgPT4gKHsgZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgY29udGVudCwgaW5kZXggfSkpO1xufVxuZnVuY3Rpb24gemlwKGxlZnQsIHJpZ2h0KSB7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgobGVmdC5sZW5ndGgsIHJpZ2h0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGggfSwgKF8sIGluZGV4KSA9PiBbbGVmdFtpbmRleF0sIHJpZ2h0W2luZGV4XV0pO1xufVxuZnVuY3Rpb24gdG9rZW5zQXJlRXF1YWwobGVmdCwgcmlnaHQpIHtcbiAgICByZXR1cm4gbGVmdCAmJiByaWdodCAmJiBsZWZ0LmluZGV4ID09IHJpZ2h0LmluZGV4ICYmIGxlZnQuY29udGVudCA9PSByaWdodC5jb250ZW50O1xufVxuXG5jbGFzcyBWYWx1ZUxpc3RPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgZGVsZWdhdGUpIHtcbiAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlciA9IG5ldyBUb2tlbkxpc3RPYnNlcnZlcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB0aGlzLnBhcnNlUmVzdWx0c0J5VG9rZW4gPSBuZXcgV2Vha01hcDtcbiAgICAgICAgdGhpcy52YWx1ZXNCeVRva2VuQnlFbGVtZW50ID0gbmV3IFdlYWtNYXA7XG4gICAgfVxuICAgIGdldCBzdGFydGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkxpc3RPYnNlcnZlci5zdGFydGVkO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlci5zdGFydCgpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlci5yZWZyZXNoKCk7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkxpc3RPYnNlcnZlci5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuYXR0cmlidXRlTmFtZTtcbiAgICB9XG4gICAgdG9rZW5NYXRjaGVkKHRva2VuKSB7XG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdG9rZW47XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuZmV0Y2hQYXJzZVJlc3VsdEZvclRva2VuKHRva2VuKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoVmFsdWVzQnlUb2tlbkZvckVsZW1lbnQoZWxlbWVudCkuc2V0KHRva2VuLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLmVsZW1lbnRNYXRjaGVkVmFsdWUoZWxlbWVudCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRva2VuVW5tYXRjaGVkKHRva2VuKSB7XG4gICAgICAgIGNvbnN0IHsgZWxlbWVudCB9ID0gdG9rZW47XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuZmV0Y2hQYXJzZVJlc3VsdEZvclRva2VuKHRva2VuKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoVmFsdWVzQnlUb2tlbkZvckVsZW1lbnQoZWxlbWVudCkuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuZWxlbWVudFVubWF0Y2hlZFZhbHVlKGVsZW1lbnQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmZXRjaFBhcnNlUmVzdWx0Rm9yVG9rZW4odG9rZW4pIHtcbiAgICAgICAgbGV0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZVJlc3VsdHNCeVRva2VuLmdldCh0b2tlbik7XG4gICAgICAgIGlmICghcGFyc2VSZXN1bHQpIHtcbiAgICAgICAgICAgIHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZVRva2VuKHRva2VuKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VSZXN1bHRzQnlUb2tlbi5zZXQodG9rZW4sIHBhcnNlUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VSZXN1bHQ7XG4gICAgfVxuICAgIGZldGNoVmFsdWVzQnlUb2tlbkZvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBsZXQgdmFsdWVzQnlUb2tlbiA9IHRoaXMudmFsdWVzQnlUb2tlbkJ5RWxlbWVudC5nZXQoZWxlbWVudCk7XG4gICAgICAgIGlmICghdmFsdWVzQnlUb2tlbikge1xuICAgICAgICAgICAgdmFsdWVzQnlUb2tlbiA9IG5ldyBNYXA7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc0J5VG9rZW5CeUVsZW1lbnQuc2V0KGVsZW1lbnQsIHZhbHVlc0J5VG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXNCeVRva2VuO1xuICAgIH1cbiAgICBwYXJzZVRva2VuKHRva2VuKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGVsZWdhdGUucGFyc2VWYWx1ZUZvclRva2VuKHRva2VuKTtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBCaW5kaW5nT2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc0J5QWN0aW9uID0gbmV3IE1hcDtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZUxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlciA9IG5ldyBWYWx1ZUxpc3RPYnNlcnZlcih0aGlzLmVsZW1lbnQsIHRoaXMuYWN0aW9uQXR0cmlidXRlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZUxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUxpc3RPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZUxpc3RPYnNlcnZlcjtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdEFsbEFjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgYWN0aW9uQXR0cmlidXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2hlbWEuYWN0aW9uQXR0cmlidXRlO1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGJpbmRpbmdzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmJpbmRpbmdzQnlBY3Rpb24udmFsdWVzKCkpO1xuICAgIH1cbiAgICBjb25uZWN0QWN0aW9uKGFjdGlvbikge1xuICAgICAgICBjb25zdCBiaW5kaW5nID0gbmV3IEJpbmRpbmcodGhpcy5jb250ZXh0LCBhY3Rpb24pO1xuICAgICAgICB0aGlzLmJpbmRpbmdzQnlBY3Rpb24uc2V0KGFjdGlvbiwgYmluZGluZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUuYmluZGluZ0Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgY29uc3QgYmluZGluZyA9IHRoaXMuYmluZGluZ3NCeUFjdGlvbi5nZXQoYWN0aW9uKTtcbiAgICAgICAgaWYgKGJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NCeUFjdGlvbi5kZWxldGUoYWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuYmluZGluZ0Rpc2Nvbm5lY3RlZChiaW5kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0QWxsQWN0aW9ucygpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4gdGhpcy5kZWxlZ2F0ZS5iaW5kaW5nRGlzY29ubmVjdGVkKGJpbmRpbmcpKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc0J5QWN0aW9uLmNsZWFyKCk7XG4gICAgfVxuICAgIHBhcnNlVmFsdWVGb3JUb2tlbih0b2tlbikge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBBY3Rpb24uZm9yVG9rZW4odG9rZW4pO1xuICAgICAgICBpZiAoYWN0aW9uLmlkZW50aWZpZXIgPT0gdGhpcy5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkVmFsdWUoZWxlbWVudCwgYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdEFjdGlvbihhY3Rpb24pO1xuICAgIH1cbiAgICBlbGVtZW50VW5tYXRjaGVkVmFsdWUoZWxlbWVudCwgYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdEFjdGlvbihhY3Rpb24pO1xuICAgIH1cbn1cblxuY2xhc3MgVmFsdWVPYnNlcnZlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICB0aGlzLnN0cmluZ01hcE9ic2VydmVyID0gbmV3IFN0cmluZ01hcE9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVEZXNjcmlwdG9yTWFwID0gdGhpcy5jb250cm9sbGVyLnZhbHVlRGVzY3JpcHRvck1hcDtcbiAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2tzRm9yRGVmYXVsdFZhbHVlcygpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdNYXBPYnNlcnZlci5zdGFydCgpO1xuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLnN0cmluZ01hcE9ic2VydmVyLnN0b3AoKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY29udHJvbGxlcjtcbiAgICB9XG4gICAgZ2V0U3RyaW5nTWFwS2V5Rm9yQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgaW4gdGhpcy52YWx1ZURlc2NyaXB0b3JNYXApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlRGVzY3JpcHRvck1hcFthdHRyaWJ1dGVOYW1lXS5uYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0cmluZ01hcEtleUFkZGVkKGtleSwgYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JNYXBbYXR0cmlidXRlTmFtZV07XG4gICAgICAgIGlmICghdGhpcy5oYXNWYWx1ZShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhrZXksIGRlc2NyaXB0b3Iud3JpdGVyKHRoaXMucmVjZWl2ZXJba2V5XSksIGRlc2NyaXB0b3Iud3JpdGVyKGRlc2NyaXB0b3IuZGVmYXVsdFZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nTWFwVmFsdWVDaGFuZ2VkKHZhbHVlLCBuYW1lLCBvbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JOYW1lTWFwW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgb2xkVmFsdWUgPSBkZXNjcmlwdG9yLndyaXRlcihkZXNjcmlwdG9yLmRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgdmFsdWUsIG9sZFZhbHVlKTtcbiAgICB9XG4gICAgc3RyaW5nTWFwS2V5UmVtb3ZlZChrZXksIGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLnZhbHVlRGVzY3JpcHRvck5hbWVNYXBba2V5XTtcbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2soa2V5LCBkZXNjcmlwdG9yLndyaXRlcih0aGlzLnJlY2VpdmVyW2tleV0pLCBvbGRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmludm9rZUNoYW5nZWRDYWxsYmFjayhrZXksIGRlc2NyaXB0b3Iud3JpdGVyKGRlc2NyaXB0b3IuZGVmYXVsdFZhbHVlKSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZUNoYW5nZWRDYWxsYmFja3NGb3JEZWZhdWx0VmFsdWVzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHsga2V5LCBuYW1lLCBkZWZhdWx0VmFsdWUsIHdyaXRlciB9IG9mIHRoaXMudmFsdWVEZXNjcmlwdG9ycykge1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPSB1bmRlZmluZWQgJiYgIXRoaXMuY29udHJvbGxlci5kYXRhLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZva2VDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgd3JpdGVyKGRlZmF1bHRWYWx1ZSksIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIHJhd1ZhbHVlLCByYXdPbGRWYWx1ZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkTWV0aG9kTmFtZSA9IGAke25hbWV9Q2hhbmdlZGA7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRNZXRob2QgPSB0aGlzLnJlY2VpdmVyW2NoYW5nZWRNZXRob2ROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBjaGFuZ2VkTWV0aG9kID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHRoaXMudmFsdWVEZXNjcmlwdG9yTmFtZU1hcFtuYW1lXTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGVzY3JpcHRvci5yZWFkZXIocmF3VmFsdWUpO1xuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gcmF3T2xkVmFsdWU7XG4gICAgICAgICAgICBpZiAocmF3T2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IGRlc2NyaXB0b3IucmVhZGVyKHJhd09sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYW5nZWRNZXRob2QuY2FsbCh0aGlzLnJlY2VpdmVyLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCB2YWx1ZURlc2NyaXB0b3JzKCkge1xuICAgICAgICBjb25zdCB7IHZhbHVlRGVzY3JpcHRvck1hcCB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlRGVzY3JpcHRvck1hcCkubWFwKGtleSA9PiB2YWx1ZURlc2NyaXB0b3JNYXBba2V5XSk7XG4gICAgfVxuICAgIGdldCB2YWx1ZURlc2NyaXB0b3JOYW1lTWFwKCkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnZhbHVlRGVzY3JpcHRvck1hcCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHRoaXMudmFsdWVEZXNjcmlwdG9yTWFwW2tleV07XG4gICAgICAgICAgICBkZXNjcmlwdG9yc1tkZXNjcmlwdG9yLm5hbWVdID0gZGVzY3JpcHRvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgICB9XG4gICAgaGFzVmFsdWUoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy52YWx1ZURlc2NyaXB0b3JOYW1lTWFwW2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgICBjb25zdCBoYXNNZXRob2ROYW1lID0gYGhhcyR7Y2FwaXRhbGl6ZShkZXNjcmlwdG9yLm5hbWUpfWA7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VpdmVyW2hhc01ldGhvZE5hbWVdO1xuICAgIH1cbn1cblxuY2xhc3MgVGFyZ2V0T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy50YXJnZXRzQnlOYW1lID0gbmV3IE11bHRpbWFwO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRva2VuTGlzdE9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuTGlzdE9ic2VydmVyID0gbmV3IFRva2VuTGlzdE9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcy5hdHRyaWJ1dGVOYW1lLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudG9rZW5MaXN0T2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAodGhpcy50b2tlbkxpc3RPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0QWxsVGFyZ2V0cygpO1xuICAgICAgICAgICAgdGhpcy50b2tlbkxpc3RPYnNlcnZlci5zdG9wKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50b2tlbkxpc3RPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2tlbk1hdGNoZWQoeyBlbGVtZW50LCBjb250ZW50OiBuYW1lIH0pIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcGUuY29udGFpbnNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUYXJnZXQoZWxlbWVudCwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9rZW5Vbm1hdGNoZWQoeyBlbGVtZW50LCBjb250ZW50OiBuYW1lIH0pIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0VGFyZ2V0KGVsZW1lbnQsIG5hbWUpO1xuICAgIH1cbiAgICBjb25uZWN0VGFyZ2V0KGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0c0J5TmFtZS5oYXMobmFtZSwgZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0c0J5TmFtZS5hZGQobmFtZSwgZWxlbWVudCk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLnRva2VuTGlzdE9ic2VydmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF1c2UoKCkgPT4gdGhpcy5kZWxlZ2F0ZS50YXJnZXRDb25uZWN0ZWQoZWxlbWVudCwgbmFtZSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc2Nvbm5lY3RUYXJnZXQoZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldHNCeU5hbWUuaGFzKG5hbWUsIGVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldHNCeU5hbWUuZGVsZXRlKG5hbWUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy50b2tlbkxpc3RPYnNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhdXNlKCgpID0+IHRoaXMuZGVsZWdhdGUudGFyZ2V0RGlzY29ubmVjdGVkKGVsZW1lbnQsIG5hbWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0QWxsVGFyZ2V0cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMudGFyZ2V0c0J5TmFtZS5rZXlzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdGhpcy50YXJnZXRzQnlOYW1lLmdldFZhbHVlc0ZvcktleShuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdFRhcmdldChlbGVtZW50LCBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgYXR0cmlidXRlTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIGBkYXRhLSR7dGhpcy5jb250ZXh0LmlkZW50aWZpZXJ9LXRhcmdldGA7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBzY29wZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5zY29wZTtcbiAgICB9XG59XG5cbmNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG1vZHVsZSwgc2NvcGUpIHtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5ID0gKGZ1bmN0aW9uTmFtZSwgZGV0YWlsID0ge30pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgICAgIGRldGFpbCA9IE9iamVjdC5hc3NpZ24oeyBpZGVudGlmaWVyLCBjb250cm9sbGVyLCBlbGVtZW50IH0sIGRldGFpbCk7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLmxvZ0RlYnVnQWN0aXZpdHkodGhpcy5pZGVudGlmaWVyLCBmdW5jdGlvbk5hbWUsIGRldGFpbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBtb2R1bGUuY29udHJvbGxlckNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICB0aGlzLmJpbmRpbmdPYnNlcnZlciA9IG5ldyBCaW5kaW5nT2JzZXJ2ZXIodGhpcywgdGhpcy5kaXNwYXRjaGVyKTtcbiAgICAgICAgdGhpcy52YWx1ZU9ic2VydmVyID0gbmV3IFZhbHVlT2JzZXJ2ZXIodGhpcywgdGhpcy5jb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy50YXJnZXRPYnNlcnZlciA9IG5ldyBUYXJnZXRPYnNlcnZlcih0aGlzLCB0aGlzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJpbml0aWFsaXplXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgXCJpbml0aWFsaXppbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy50YXJnZXRPYnNlcnZlci5zdGFydCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmNvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImNvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBcImNvbm5lY3RpbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMubG9nRGVidWdBY3Rpdml0eShcImRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBcImRpc2Nvbm5lY3RpbmcgY29udHJvbGxlclwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhcmdldE9ic2VydmVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy52YWx1ZU9ic2VydmVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nT2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICBnZXQgYXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZS5hcHBsaWNhdGlvbjtcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgc2NoZW1hKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5zY2hlbWE7XG4gICAgfVxuICAgIGdldCBkaXNwYXRjaGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbi5kaXNwYXRjaGVyO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IHBhcmVudEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgaGFuZGxlRXJyb3IoZXJyb3IsIG1lc3NhZ2UsIGRldGFpbCA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciwgY29udHJvbGxlciwgZWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgZGV0YWlsID0gT2JqZWN0LmFzc2lnbih7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXIsIGVsZW1lbnQgfSwgZGV0YWlsKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5oYW5kbGVFcnJvcihlcnJvciwgYEVycm9yICR7bWVzc2FnZX1gLCBkZXRhaWwpO1xuICAgIH1cbiAgICB0YXJnZXRDb25uZWN0ZWQoZWxlbWVudCwgbmFtZSkge1xuICAgICAgICB0aGlzLmludm9rZUNvbnRyb2xsZXJNZXRob2QoYCR7bmFtZX1UYXJnZXRDb25uZWN0ZWRgLCBlbGVtZW50KTtcbiAgICB9XG4gICAgdGFyZ2V0RGlzY29ubmVjdGVkKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5pbnZva2VDb250cm9sbGVyTWV0aG9kKGAke25hbWV9VGFyZ2V0RGlzY29ubmVjdGVkYCwgZWxlbWVudCk7XG4gICAgfVxuICAgIGludm9rZUNvbnRyb2xsZXJNZXRob2QobWV0aG9kTmFtZSwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5jb250cm9sbGVyO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2xsZXJbbWV0aG9kTmFtZV0gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyW21ldGhvZE5hbWVdKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZWFkSW5oZXJpdGFibGVTdGF0aWNBcnJheVZhbHVlcyhjb25zdHJ1Y3RvciwgcHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gZ2V0QW5jZXN0b3JzRm9yQ29uc3RydWN0b3IoY29uc3RydWN0b3IpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFuY2VzdG9ycy5yZWR1Y2UoKHZhbHVlcywgY29uc3RydWN0b3IpID0+IHtcbiAgICAgICAgZ2V0T3duU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIHByb3BlcnR5TmFtZSkuZm9yRWFjaChuYW1lID0+IHZhbHVlcy5hZGQobmFtZSkpO1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sIG5ldyBTZXQpKTtcbn1cbmZ1bmN0aW9uIHJlYWRJbmhlcml0YWJsZVN0YXRpY09iamVjdFBhaXJzKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICBjb25zdCBhbmNlc3RvcnMgPSBnZXRBbmNlc3RvcnNGb3JDb25zdHJ1Y3Rvcihjb25zdHJ1Y3Rvcik7XG4gICAgcmV0dXJuIGFuY2VzdG9ycy5yZWR1Y2UoKHBhaXJzLCBjb25zdHJ1Y3RvcikgPT4ge1xuICAgICAgICBwYWlycy5wdXNoKC4uLmdldE93blN0YXRpY09iamVjdFBhaXJzKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUpKTtcbiAgICAgICAgcmV0dXJuIHBhaXJzO1xuICAgIH0sIFtdKTtcbn1cbmZ1bmN0aW9uIGdldEFuY2VzdG9yc0ZvckNvbnN0cnVjdG9yKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgYW5jZXN0b3JzID0gW107XG4gICAgd2hpbGUgKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGFuY2VzdG9ycy5wdXNoKGNvbnN0cnVjdG9yKTtcbiAgICAgICAgY29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gYW5jZXN0b3JzLnJldmVyc2UoKTtcbn1cbmZ1bmN0aW9uIGdldE93blN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICBjb25zdCBkZWZpbml0aW9uID0gY29uc3RydWN0b3JbcHJvcGVydHlOYW1lXTtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSA/IGRlZmluaXRpb24gOiBbXTtcbn1cbmZ1bmN0aW9uIGdldE93blN0YXRpY09iamVjdFBhaXJzKGNvbnN0cnVjdG9yLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICBjb25zdCBkZWZpbml0aW9uID0gY29uc3RydWN0b3JbcHJvcGVydHlOYW1lXTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbiA/IE9iamVjdC5rZXlzKGRlZmluaXRpb24pLm1hcChrZXkgPT4gW2tleSwgZGVmaW5pdGlvbltrZXldXSkgOiBbXTtcbn1cblxuZnVuY3Rpb24gYmxlc3MoY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gc2hhZG93KGNvbnN0cnVjdG9yLCBnZXRCbGVzc2VkUHJvcGVydGllcyhjb25zdHJ1Y3RvcikpO1xufVxuZnVuY3Rpb24gc2hhZG93KGNvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3Qgc2hhZG93Q29uc3RydWN0b3IgPSBleHRlbmQoY29uc3RydWN0b3IpO1xuICAgIGNvbnN0IHNoYWRvd1Byb3BlcnRpZXMgPSBnZXRTaGFkb3dQcm9wZXJ0aWVzKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcGVydGllcyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc2hhZG93Q29uc3RydWN0b3IucHJvdG90eXBlLCBzaGFkb3dQcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gc2hhZG93Q29uc3RydWN0b3I7XG59XG5mdW5jdGlvbiBnZXRCbGVzc2VkUHJvcGVydGllcyhjb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGJsZXNzaW5ncyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcImJsZXNzaW5nc1wiKTtcbiAgICByZXR1cm4gYmxlc3NpbmdzLnJlZHVjZSgoYmxlc3NlZFByb3BlcnRpZXMsIGJsZXNzaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBibGVzc2luZyhjb25zdHJ1Y3Rvcik7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBibGVzc2VkUHJvcGVydGllc1trZXldIHx8IHt9O1xuICAgICAgICAgICAgYmxlc3NlZFByb3BlcnRpZXNba2V5XSA9IE9iamVjdC5hc3NpZ24oZGVzY3JpcHRvciwgcHJvcGVydGllc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmxlc3NlZFByb3BlcnRpZXM7XG4gICAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0U2hhZG93UHJvcGVydGllcyhwcm90b3R5cGUsIHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gZ2V0T3duS2V5cyhwcm9wZXJ0aWVzKS5yZWR1Y2UoKHNoYWRvd1Byb3BlcnRpZXMsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZ2V0U2hhZG93ZWREZXNjcmlwdG9yKHByb3RvdHlwZSwgcHJvcGVydGllcywga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2hhZG93UHJvcGVydGllcywgeyBba2V5XTogZGVzY3JpcHRvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhZG93UHJvcGVydGllcztcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBnZXRTaGFkb3dlZERlc2NyaXB0b3IocHJvdG90eXBlLCBwcm9wZXJ0aWVzLCBrZXkpIHtcbiAgICBjb25zdCBzaGFkb3dpbmdEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIGtleSk7XG4gICAgY29uc3Qgc2hhZG93ZWRCeVZhbHVlID0gc2hhZG93aW5nRGVzY3JpcHRvciAmJiBcInZhbHVlXCIgaW4gc2hhZG93aW5nRGVzY3JpcHRvcjtcbiAgICBpZiAoIXNoYWRvd2VkQnlWYWx1ZSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0aWVzLCBrZXkpLnZhbHVlO1xuICAgICAgICBpZiAoc2hhZG93aW5nRGVzY3JpcHRvcikge1xuICAgICAgICAgICAgZGVzY3JpcHRvci5nZXQgPSBzaGFkb3dpbmdEZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLmdldDtcbiAgICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gc2hhZG93aW5nRGVzY3JpcHRvci5zZXQgfHwgZGVzY3JpcHRvci5zZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfVxufVxuY29uc3QgZ2V0T3duS2V5cyA9ICgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gKG9iamVjdCkgPT4gW1xuICAgICAgICAgICAgLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KSxcbiAgICAgICAgICAgIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KVxuICAgICAgICBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICAgIH1cbn0pKCk7XG5jb25zdCBleHRlbmQgPSAoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGV4dGVuZFdpdGhSZWZsZWN0KGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuY29uc3RydWN0KGNvbnN0cnVjdG9yLCBhcmd1bWVudHMsIG5ldy50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuZGVkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoY29uc3RydWN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogZXh0ZW5kZWQgfVxuICAgICAgICB9KTtcbiAgICAgICAgUmVmbGVjdC5zZXRQcm90b3R5cGVPZihleHRlbmRlZCwgY29uc3RydWN0b3IpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRlc3RSZWZsZWN0RXh0ZW5zaW9uKCkge1xuICAgICAgICBjb25zdCBhID0gZnVuY3Rpb24gKCkgeyB0aGlzLmEuY2FsbCh0aGlzKTsgfTtcbiAgICAgICAgY29uc3QgYiA9IGV4dGVuZFdpdGhSZWZsZWN0KGEpO1xuICAgICAgICBiLnByb3RvdHlwZS5hID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICByZXR1cm4gbmV3IGI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHRlc3RSZWZsZWN0RXh0ZW5zaW9uKCk7XG4gICAgICAgIHJldHVybiBleHRlbmRXaXRoUmVmbGVjdDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiAoY29uc3RydWN0b3IpID0+IGNsYXNzIGV4dGVuZGVkIGV4dGVuZHMgY29uc3RydWN0b3Ige1xuICAgICAgICB9O1xuICAgIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIGJsZXNzRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWRlbnRpZmllcjogZGVmaW5pdGlvbi5pZGVudGlmaWVyLFxuICAgICAgICBjb250cm9sbGVyQ29uc3RydWN0b3I6IGJsZXNzKGRlZmluaXRpb24uY29udHJvbGxlckNvbnN0cnVjdG9yKVxuICAgIH07XG59XG5cbmNsYXNzIE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoYXBwbGljYXRpb24sIGRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uO1xuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSBibGVzc0RlZmluaXRpb24oZGVmaW5pdGlvbik7XG4gICAgICAgIHRoaXMuY29udGV4dHNCeVNjb3BlID0gbmV3IFdlYWtNYXA7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMgPSBuZXcgU2V0O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmaW5pdGlvbi5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZpbml0aW9uLmNvbnRyb2xsZXJDb25zdHJ1Y3RvcjtcbiAgICB9XG4gICAgZ2V0IGNvbnRleHRzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNvbm5lY3RlZENvbnRleHRzKTtcbiAgICB9XG4gICAgY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5mZXRjaENvbnRleHRGb3JTY29wZShzY29wZSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMuYWRkKGNvbnRleHQpO1xuICAgICAgICBjb250ZXh0LmNvbm5lY3QoKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0c0J5U2NvcGUuZ2V0KHNjb3BlKTtcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQ29udGV4dHMuZGVsZXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2hDb250ZXh0Rm9yU2NvcGUoc2NvcGUpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRzQnlTY29wZS5nZXQoc2NvcGUpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0aGlzLCBzY29wZSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRzQnlTY29wZS5zZXQoc2NvcGUsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cblxuY2xhc3MgQ2xhc3NNYXAge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgaGFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXModGhpcy5nZXREYXRhS2V5KG5hbWUpKTtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsKG5hbWUpWzBdO1xuICAgIH1cbiAgICBnZXRBbGwobmFtZSkge1xuICAgICAgICBjb25zdCB0b2tlblN0cmluZyA9IHRoaXMuZGF0YS5nZXQodGhpcy5nZXREYXRhS2V5KG5hbWUpKSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gdG9rZW5pemUodG9rZW5TdHJpbmcpO1xuICAgIH1cbiAgICBnZXRBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXRBdHRyaWJ1dGVOYW1lRm9yS2V5KHRoaXMuZ2V0RGF0YUtleShuYW1lKSk7XG4gICAgfVxuICAgIGdldERhdGFLZXkobmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7bmFtZX0tY2xhc3NgO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZGF0YTtcbiAgICB9XG59XG5cbmNsYXNzIERhdGFNYXAge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBpZGVudGlmaWVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5pZGVudGlmaWVyO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChrZXkpO1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldEF0dHJpYnV0ZU5hbWVGb3JLZXkoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBdHRyaWJ1dGVOYW1lRm9yS2V5KGtleSkge1xuICAgICAgICByZXR1cm4gYGRhdGEtJHt0aGlzLmlkZW50aWZpZXJ9LSR7ZGFzaGVyaXplKGtleSl9YDtcbiAgICB9XG59XG5cbmNsYXNzIEd1aWRlIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2dnZXIpIHtcbiAgICAgICAgdGhpcy53YXJuZWRLZXlzQnlPYmplY3QgPSBuZXcgV2Vha01hcDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuICAgIHdhcm4ob2JqZWN0LCBrZXksIG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IHdhcm5lZEtleXMgPSB0aGlzLndhcm5lZEtleXNCeU9iamVjdC5nZXQob2JqZWN0KTtcbiAgICAgICAgaWYgKCF3YXJuZWRLZXlzKSB7XG4gICAgICAgICAgICB3YXJuZWRLZXlzID0gbmV3IFNldDtcbiAgICAgICAgICAgIHRoaXMud2FybmVkS2V5c0J5T2JqZWN0LnNldChvYmplY3QsIHdhcm5lZEtleXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghd2FybmVkS2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgd2FybmVkS2V5cy5hZGQoa2V5KTtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4obWVzc2FnZSwgb2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKGF0dHJpYnV0ZU5hbWUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGBbJHthdHRyaWJ1dGVOYW1lfX49XCIke3Rva2VufVwiXWA7XG59XG5cbmNsYXNzIFRhcmdldFNldCB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZSA9IHNjb3BlO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGlkZW50aWZpZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLnNjaGVtYTtcbiAgICB9XG4gICAgaGFzKHRhcmdldE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZCh0YXJnZXROYW1lKSAhPSBudWxsO1xuICAgIH1cbiAgICBmaW5kKC4uLnRhcmdldE5hbWVzKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXROYW1lcy5yZWR1Y2UoKHRhcmdldCwgdGFyZ2V0TmFtZSkgPT4gdGFyZ2V0XG4gICAgICAgICAgICB8fCB0aGlzLmZpbmRUYXJnZXQodGFyZ2V0TmFtZSlcbiAgICAgICAgICAgIHx8IHRoaXMuZmluZExlZ2FjeVRhcmdldCh0YXJnZXROYW1lKSwgdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgZmluZEFsbCguLi50YXJnZXROYW1lcykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0TmFtZXMucmVkdWNlKCh0YXJnZXRzLCB0YXJnZXROYW1lKSA9PiBbXG4gICAgICAgICAgICAuLi50YXJnZXRzLFxuICAgICAgICAgICAgLi4udGhpcy5maW5kQWxsVGFyZ2V0cyh0YXJnZXROYW1lKSxcbiAgICAgICAgICAgIC4uLnRoaXMuZmluZEFsbExlZ2FjeVRhcmdldHModGFyZ2V0TmFtZSlcbiAgICAgICAgXSwgW10pO1xuICAgIH1cbiAgICBmaW5kVGFyZ2V0KHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldFNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZmluZEVsZW1lbnQoc2VsZWN0b3IpO1xuICAgIH1cbiAgICBmaW5kQWxsVGFyZ2V0cyh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvckZvclRhcmdldE5hbWUodGFyZ2V0TmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLmZpbmRBbGxFbGVtZW50cyhzZWxlY3Rvcik7XG4gICAgfVxuICAgIGdldFNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnNjaGVtYS50YXJnZXRBdHRyaWJ1dGVGb3JTY29wZSh0aGlzLmlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKGF0dHJpYnV0ZU5hbWUsIHRhcmdldE5hbWUpO1xuICAgIH1cbiAgICBmaW5kTGVnYWN5VGFyZ2V0KHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSB0aGlzLmdldExlZ2FjeVNlbGVjdG9yRm9yVGFyZ2V0TmFtZSh0YXJnZXROYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVwcmVjYXRlKHRoaXMuc2NvcGUuZmluZEVsZW1lbnQoc2VsZWN0b3IpLCB0YXJnZXROYW1lKTtcbiAgICB9XG4gICAgZmluZEFsbExlZ2FjeVRhcmdldHModGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IHRoaXMuZ2V0TGVnYWN5U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5maW5kQWxsRWxlbWVudHMoc2VsZWN0b3IpLm1hcChlbGVtZW50ID0+IHRoaXMuZGVwcmVjYXRlKGVsZW1lbnQsIHRhcmdldE5hbWUpKTtcbiAgICB9XG4gICAgZ2V0TGVnYWN5U2VsZWN0b3JGb3JUYXJnZXROYW1lKHRhcmdldE5hbWUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RGVzY3JpcHRvciA9IGAke3RoaXMuaWRlbnRpZmllcn0uJHt0YXJnZXROYW1lfWA7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVWYWx1ZUNvbnRhaW5zVG9rZW4odGhpcy5zY2hlbWEudGFyZ2V0QXR0cmlidXRlLCB0YXJnZXREZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgZGVwcmVjYXRlKGVsZW1lbnQsIHRhcmdldE5hbWUpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWRlbnRpZmllciB9ID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnNjaGVtYS50YXJnZXRBdHRyaWJ1dGU7XG4gICAgICAgICAgICBjb25zdCByZXZpc2VkQXR0cmlidXRlTmFtZSA9IHRoaXMuc2NoZW1hLnRhcmdldEF0dHJpYnV0ZUZvclNjb3BlKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgdGhpcy5ndWlkZS53YXJuKGVsZW1lbnQsIGB0YXJnZXQ6JHt0YXJnZXROYW1lfWAsIGBQbGVhc2UgcmVwbGFjZSAke2F0dHJpYnV0ZU5hbWV9PVwiJHtpZGVudGlmaWVyfS4ke3RhcmdldE5hbWV9XCIgd2l0aCAke3JldmlzZWRBdHRyaWJ1dGVOYW1lfT1cIiR7dGFyZ2V0TmFtZX1cIi4gYCArXG4gICAgICAgICAgICAgICAgYFRoZSAke2F0dHJpYnV0ZU5hbWV9IGF0dHJpYnV0ZSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbiBvZiBTdGltdWx1cy5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGd1aWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5ndWlkZTtcbiAgICB9XG59XG5cbmNsYXNzIFNjb3BlIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlbWEsIGVsZW1lbnQsIGlkZW50aWZpZXIsIGxvZ2dlcikge1xuICAgICAgICB0aGlzLnRhcmdldHMgPSBuZXcgVGFyZ2V0U2V0KHRoaXMpO1xuICAgICAgICB0aGlzLmNsYXNzZXMgPSBuZXcgQ2xhc3NNYXAodGhpcyk7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBEYXRhTWFwKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRhaW5zRWxlbWVudCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KHRoaXMuY29udHJvbGxlclNlbGVjdG9yKSA9PT0gdGhpcy5lbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcbiAgICAgICAgdGhpcy5ndWlkZSA9IG5ldyBHdWlkZShsb2dnZXIpO1xuICAgIH1cbiAgICBmaW5kRWxlbWVudChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpXG4gICAgICAgICAgICA/IHRoaXMuZWxlbWVudFxuICAgICAgICAgICAgOiB0aGlzLnF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpLmZpbmQodGhpcy5jb250YWluc0VsZW1lbnQpO1xuICAgIH1cbiAgICBmaW5kQWxsRWxlbWVudHMoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLnRoaXMuZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSA/IFt0aGlzLmVsZW1lbnRdIDogW10sXG4gICAgICAgICAgICAuLi50aGlzLnF1ZXJ5RWxlbWVudHMoc2VsZWN0b3IpLmZpbHRlcih0aGlzLmNvbnRhaW5zRWxlbWVudClcbiAgICAgICAgXTtcbiAgICB9XG4gICAgcXVlcnlFbGVtZW50cyhzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlclNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWVDb250YWluc1Rva2VuKHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGUsIHRoaXMuaWRlbnRpZmllcik7XG4gICAgfVxufVxuXG5jbGFzcyBTY29wZU9ic2VydmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzY2hlbWEsIGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIgPSBuZXcgVmFsdWVMaXN0T2JzZXJ2ZXIodGhpcy5lbGVtZW50LCB0aGlzLmNvbnRyb2xsZXJBdHRyaWJ1dGUsIHRoaXMpO1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllckJ5RWxlbWVudCA9IG5ldyBXZWFrTWFwO1xuICAgICAgICB0aGlzLnNjb3BlUmVmZXJlbmNlQ291bnRzID0gbmV3IFdlYWtNYXA7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnZhbHVlTGlzdE9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMudmFsdWVMaXN0T2JzZXJ2ZXIuc3RvcCgpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckF0dHJpYnV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGU7XG4gICAgfVxuICAgIHBhcnNlVmFsdWVGb3JUb2tlbih0b2tlbikge1xuICAgICAgICBjb25zdCB7IGVsZW1lbnQsIGNvbnRlbnQ6IGlkZW50aWZpZXIgfSA9IHRva2VuO1xuICAgICAgICBjb25zdCBzY29wZXNCeUlkZW50aWZpZXIgPSB0aGlzLmZldGNoU2NvcGVzQnlJZGVudGlmaWVyRm9yRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbGV0IHNjb3BlID0gc2NvcGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUgPSB0aGlzLmRlbGVnYXRlLmNyZWF0ZVNjb3BlRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcik7XG4gICAgICAgICAgICBzY29wZXNCeUlkZW50aWZpZXIuc2V0KGlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2NvcGU7XG4gICAgfVxuICAgIGVsZW1lbnRNYXRjaGVkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQ291bnQgPSAodGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cy5nZXQodmFsdWUpIHx8IDApICsgMTtcbiAgICAgICAgdGhpcy5zY29wZVJlZmVyZW5jZUNvdW50cy5zZXQodmFsdWUsIHJlZmVyZW5jZUNvdW50KTtcbiAgICAgICAgaWYgKHJlZmVyZW5jZUNvdW50ID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc2NvcGVDb25uZWN0ZWQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsZW1lbnRVbm1hdGNoZWRWYWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICBjb25zdCByZWZlcmVuY2VDb3VudCA9IHRoaXMuc2NvcGVSZWZlcmVuY2VDb3VudHMuZ2V0KHZhbHVlKTtcbiAgICAgICAgaWYgKHJlZmVyZW5jZUNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlUmVmZXJlbmNlQ291bnRzLnNldCh2YWx1ZSwgcmVmZXJlbmNlQ291bnQgLSAxKTtcbiAgICAgICAgICAgIGlmIChyZWZlcmVuY2VDb3VudCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zY29wZURpc2Nvbm5lY3RlZCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmV0Y2hTY29wZXNCeUlkZW50aWZpZXJGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHNjb3Blc0J5SWRlbnRpZmllciA9IHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyQnlFbGVtZW50LmdldChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFzY29wZXNCeUlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIHNjb3Blc0J5SWRlbnRpZmllciA9IG5ldyBNYXA7XG4gICAgICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllckJ5RWxlbWVudC5zZXQoZWxlbWVudCwgc2NvcGVzQnlJZGVudGlmaWVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2NvcGVzQnlJZGVudGlmaWVyO1xuICAgIH1cbn1cblxuY2xhc3MgUm91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHBsaWNhdGlvbikge1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuc2NvcGVPYnNlcnZlciA9IG5ldyBTY29wZU9ic2VydmVyKHRoaXMuZWxlbWVudCwgdGhpcy5zY2hlbWEsIHRoaXMpO1xuICAgICAgICB0aGlzLnNjb3Blc0J5SWRlbnRpZmllciA9IG5ldyBNdWx0aW1hcDtcbiAgICAgICAgdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyID0gbmV3IE1hcDtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBzY2hlbWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uLnNjaGVtYTtcbiAgICB9XG4gICAgZ2V0IGxvZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb24ubG9nZ2VyO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlckF0dHJpYnV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hLmNvbnRyb2xsZXJBdHRyaWJ1dGU7XG4gICAgfVxuICAgIGdldCBtb2R1bGVzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIudmFsdWVzKCkpO1xuICAgIH1cbiAgICBnZXQgY29udGV4dHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXMucmVkdWNlKChjb250ZXh0cywgbW9kdWxlKSA9PiBjb250ZXh0cy5jb25jYXQobW9kdWxlLmNvbnRleHRzKSwgW10pO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zY29wZU9ic2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuc2NvcGVPYnNlcnZlci5zdG9wKCk7XG4gICAgfVxuICAgIGxvYWREZWZpbml0aW9uKGRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy51bmxvYWRJZGVudGlmaWVyKGRlZmluaXRpb24uaWRlbnRpZmllcik7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IG5ldyBNb2R1bGUodGhpcy5hcHBsaWNhdGlvbiwgZGVmaW5pdGlvbik7XG4gICAgICAgIHRoaXMuY29ubmVjdE1vZHVsZShtb2R1bGUpO1xuICAgIH1cbiAgICB1bmxvYWRJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0TW9kdWxlKG1vZHVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q29udGV4dEZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5jb250ZXh0cy5maW5kKGNvbnRleHQgPT4gY29udGV4dC5lbGVtZW50ID09IGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwpIHtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5oYW5kbGVFcnJvcihlcnJvciwgbWVzc2FnZSwgZGV0YWlsKTtcbiAgICB9XG4gICAgY3JlYXRlU2NvcGVGb3JFbGVtZW50QW5kSWRlbnRpZmllcihlbGVtZW50LCBpZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2NvcGUodGhpcy5zY2hlbWEsIGVsZW1lbnQsIGlkZW50aWZpZXIsIHRoaXMubG9nZ2VyKTtcbiAgICB9XG4gICAgc2NvcGVDb25uZWN0ZWQoc2NvcGUpIHtcbiAgICAgICAgdGhpcy5zY29wZXNCeUlkZW50aWZpZXIuYWRkKHNjb3BlLmlkZW50aWZpZXIsIHNjb3BlKTtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gdGhpcy5tb2R1bGVzQnlJZGVudGlmaWVyLmdldChzY29wZS5pZGVudGlmaWVyKTtcbiAgICAgICAgaWYgKG1vZHVsZSkge1xuICAgICAgICAgICAgbW9kdWxlLmNvbm5lY3RDb250ZXh0Rm9yU2NvcGUoc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNjb3BlRGlzY29ubmVjdGVkKHNjb3BlKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzQnlJZGVudGlmaWVyLmRlbGV0ZShzY29wZS5pZGVudGlmaWVyLCBzY29wZSk7XG4gICAgICAgIGNvbnN0IG1vZHVsZSA9IHRoaXMubW9kdWxlc0J5SWRlbnRpZmllci5nZXQoc2NvcGUuaWRlbnRpZmllcik7XG4gICAgICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgICAgIG1vZHVsZS5kaXNjb25uZWN0Q29udGV4dEZvclNjb3BlKHNjb3BlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0TW9kdWxlKG1vZHVsZSkge1xuICAgICAgICB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuc2V0KG1vZHVsZS5pZGVudGlmaWVyLCBtb2R1bGUpO1xuICAgICAgICBjb25zdCBzY29wZXMgPSB0aGlzLnNjb3Blc0J5SWRlbnRpZmllci5nZXRWYWx1ZXNGb3JLZXkobW9kdWxlLmlkZW50aWZpZXIpO1xuICAgICAgICBzY29wZXMuZm9yRWFjaChzY29wZSA9PiBtb2R1bGUuY29ubmVjdENvbnRleHRGb3JTY29wZShzY29wZSkpO1xuICAgIH1cbiAgICBkaXNjb25uZWN0TW9kdWxlKG1vZHVsZSkge1xuICAgICAgICB0aGlzLm1vZHVsZXNCeUlkZW50aWZpZXIuZGVsZXRlKG1vZHVsZS5pZGVudGlmaWVyKTtcbiAgICAgICAgY29uc3Qgc2NvcGVzID0gdGhpcy5zY29wZXNCeUlkZW50aWZpZXIuZ2V0VmFsdWVzRm9yS2V5KG1vZHVsZS5pZGVudGlmaWVyKTtcbiAgICAgICAgc2NvcGVzLmZvckVhY2goc2NvcGUgPT4gbW9kdWxlLmRpc2Nvbm5lY3RDb250ZXh0Rm9yU2NvcGUoc2NvcGUpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRlZmF1bHRTY2hlbWEgPSB7XG4gICAgY29udHJvbGxlckF0dHJpYnV0ZTogXCJkYXRhLWNvbnRyb2xsZXJcIixcbiAgICBhY3Rpb25BdHRyaWJ1dGU6IFwiZGF0YS1hY3Rpb25cIixcbiAgICB0YXJnZXRBdHRyaWJ1dGU6IFwiZGF0YS10YXJnZXRcIixcbiAgICB0YXJnZXRBdHRyaWJ1dGVGb3JTY29wZTogaWRlbnRpZmllciA9PiBgZGF0YS0ke2lkZW50aWZpZXJ9LXRhcmdldGBcbn07XG5cbmNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBzY2hlbWEgPSBkZWZhdWx0U2NoZW1hKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gY29uc29sZTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkgPSAoaWRlbnRpZmllciwgZnVuY3Rpb25OYW1lLCBkZXRhaWwgPSB7fSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ0Zvcm1hdHRlZE1lc3NhZ2UoaWRlbnRpZmllciwgZnVuY3Rpb25OYW1lLCBkZXRhaWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIodGhpcyk7XG4gICAgICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcih0aGlzKTtcbiAgICB9XG4gICAgc3RhdGljIHN0YXJ0KGVsZW1lbnQsIHNjaGVtYSkge1xuICAgICAgICBjb25zdCBhcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbihlbGVtZW50LCBzY2hlbWEpO1xuICAgICAgICBhcHBsaWNhdGlvbi5zdGFydCgpO1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb247XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICBhd2FpdCBkb21SZWFkeSgpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJhcHBsaWNhdGlvblwiLCBcInN0YXJ0aW5nXCIpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdGFydFwiKTtcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z0FjdGl2aXR5KFwiYXBwbGljYXRpb25cIiwgXCJzdG9wcGluZ1wiKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIuc3RvcCgpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnQWN0aXZpdHkoXCJhcHBsaWNhdGlvblwiLCBcInN0b3BcIik7XG4gICAgfVxuICAgIHJlZ2lzdGVyKGlkZW50aWZpZXIsIGNvbnRyb2xsZXJDb25zdHJ1Y3Rvcikge1xuICAgICAgICBpZiAoY29udHJvbGxlckNvbnN0cnVjdG9yLnNob3VsZExvYWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZCh7IGlkZW50aWZpZXIsIGNvbnRyb2xsZXJDb25zdHJ1Y3RvciB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkKGhlYWQsIC4uLnJlc3QpIHtcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBBcnJheS5pc0FycmF5KGhlYWQpID8gaGVhZCA6IFtoZWFkLCAuLi5yZXN0XTtcbiAgICAgICAgZGVmaW5pdGlvbnMuZm9yRWFjaChkZWZpbml0aW9uID0+IHRoaXMucm91dGVyLmxvYWREZWZpbml0aW9uKGRlZmluaXRpb24pKTtcbiAgICB9XG4gICAgdW5sb2FkKGhlYWQsIC4uLnJlc3QpIHtcbiAgICAgICAgY29uc3QgaWRlbnRpZmllcnMgPSBBcnJheS5pc0FycmF5KGhlYWQpID8gaGVhZCA6IFtoZWFkLCAuLi5yZXN0XTtcbiAgICAgICAgaWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHRoaXMucm91dGVyLnVubG9hZElkZW50aWZpZXIoaWRlbnRpZmllcikpO1xuICAgIH1cbiAgICBnZXQgY29udHJvbGxlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5jb250ZXh0cy5tYXAoY29udGV4dCA9PiBjb250ZXh0LmNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBnZXRDb250cm9sbGVyRm9yRWxlbWVudEFuZElkZW50aWZpZXIoZWxlbWVudCwgaWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5yb3V0ZXIuZ2V0Q29udGV4dEZvckVsZW1lbnRBbmRJZGVudGlmaWVyKGVsZW1lbnQsIGlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQuY29udHJvbGxlciA6IG51bGw7XG4gICAgfVxuICAgIGhhbmRsZUVycm9yKGVycm9yLCBtZXNzYWdlLCBkZXRhaWwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgJXNcXG5cXG4lb1xcblxcbiVvYCwgbWVzc2FnZSwgZXJyb3IsIGRldGFpbCk7XG4gICAgICAgIChfYSA9IHdpbmRvdy5vbmVycm9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh3aW5kb3csIG1lc3NhZ2UsIFwiXCIsIDAsIDAsIGVycm9yKTtcbiAgICB9XG4gICAgbG9nRm9ybWF0dGVkTWVzc2FnZShpZGVudGlmaWVyLCBmdW5jdGlvbk5hbWUsIGRldGFpbCA9IHt9KSB7XG4gICAgICAgIGRldGFpbCA9IE9iamVjdC5hc3NpZ24oeyBhcHBsaWNhdGlvbjogdGhpcyB9LCBkZXRhaWwpO1xuICAgICAgICB0aGlzLmxvZ2dlci5ncm91cENvbGxhcHNlZChgJHtpZGVudGlmaWVyfSAjJHtmdW5jdGlvbk5hbWV9YCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhcImRldGFpbHM6XCIsIE9iamVjdC5hc3NpZ24oe30sIGRldGFpbCkpO1xuICAgICAgICB0aGlzLmxvZ2dlci5ncm91cEVuZCgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRvbVJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gQ2xhc3NQcm9wZXJ0aWVzQmxlc3NpbmcoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gcmVhZEluaGVyaXRhYmxlU3RhdGljQXJyYXlWYWx1ZXMoY29uc3RydWN0b3IsIFwiY2xhc3Nlc1wiKTtcbiAgICByZXR1cm4gY2xhc3Nlcy5yZWR1Y2UoKHByb3BlcnRpZXMsIGNsYXNzRGVmaW5pdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzRm9yQ2xhc3NEZWZpbml0aW9uKGNsYXNzRGVmaW5pdGlvbikpO1xuICAgIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIHByb3BlcnRpZXNGb3JDbGFzc0RlZmluaXRpb24oa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2Ake2tleX1DbGFzc2BdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gY2xhc3Nlcy5nZXRBdHRyaWJ1dGVOYW1lKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBhdHRyaWJ1dGUgXCIke2F0dHJpYnV0ZX1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2Ake2tleX1DbGFzc2VzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmdldEFsbChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShrZXkpfUNsYXNzYF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmhhcyhrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gVGFyZ2V0UHJvcGVydGllc0JsZXNzaW5nKGNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY0FycmF5VmFsdWVzKGNvbnN0cnVjdG9yLCBcInRhcmdldHNcIik7XG4gICAgcmV0dXJuIHRhcmdldHMucmVkdWNlKChwcm9wZXJ0aWVzLCB0YXJnZXREZWZpbml0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIHByb3BlcnRpZXNGb3JUYXJnZXREZWZpbml0aW9uKHRhcmdldERlZmluaXRpb24pKTtcbiAgICB9LCB7fSk7XG59XG5mdW5jdGlvbiBwcm9wZXJ0aWVzRm9yVGFyZ2V0RGVmaW5pdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgW2Ake25hbWV9VGFyZ2V0YF06IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldHMuZmluZChuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgdGFyZ2V0IGVsZW1lbnQgXCIke25hbWV9XCIgZm9yIFwiJHt0aGlzLmlkZW50aWZpZXJ9XCIgY29udHJvbGxlcmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2Ake25hbWV9VGFyZ2V0c2BdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0cy5maW5kQWxsKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShuYW1lKX1UYXJnZXRgXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhcmdldHMuaGFzKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gVmFsdWVQcm9wZXJ0aWVzQmxlc3NpbmcoY29uc3RydWN0b3IpIHtcbiAgICBjb25zdCB2YWx1ZURlZmluaXRpb25QYWlycyA9IHJlYWRJbmhlcml0YWJsZVN0YXRpY09iamVjdFBhaXJzKGNvbnN0cnVjdG9yLCBcInZhbHVlc1wiKTtcbiAgICBjb25zdCBwcm9wZXJ0eURlc2NyaXB0b3JNYXAgPSB7XG4gICAgICAgIHZhbHVlRGVzY3JpcHRvck1hcDoge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZURlZmluaXRpb25QYWlycy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWVEZWZpbml0aW9uUGFpcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZURlc2NyaXB0b3IgPSBwYXJzZVZhbHVlRGVmaW5pdGlvblBhaXIodmFsdWVEZWZpbml0aW9uUGFpcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLmRhdGEuZ2V0QXR0cmlidXRlTmFtZUZvcktleSh2YWx1ZURlc2NyaXB0b3Iua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFthdHRyaWJ1dGVOYW1lXTogdmFsdWVEZXNjcmlwdG9yIH0pO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHZhbHVlRGVmaW5pdGlvblBhaXJzLnJlZHVjZSgocHJvcGVydGllcywgdmFsdWVEZWZpbml0aW9uUGFpcikgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzRm9yVmFsdWVEZWZpbml0aW9uUGFpcih2YWx1ZURlZmluaXRpb25QYWlyKSk7XG4gICAgfSwgcHJvcGVydHlEZXNjcmlwdG9yTWFwKTtcbn1cbmZ1bmN0aW9uIHByb3BlcnRpZXNGb3JWYWx1ZURlZmluaXRpb25QYWlyKHZhbHVlRGVmaW5pdGlvblBhaXIpIHtcbiAgICBjb25zdCBkZWZpbml0aW9uID0gcGFyc2VWYWx1ZURlZmluaXRpb25QYWlyKHZhbHVlRGVmaW5pdGlvblBhaXIpO1xuICAgIGNvbnN0IHsga2V5LCBuYW1lLCByZWFkZXI6IHJlYWQsIHdyaXRlcjogd3JpdGUgfSA9IGRlZmluaXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRhdGEuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZpbml0aW9uLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIHdyaXRlKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbYGhhcyR7Y2FwaXRhbGl6ZShuYW1lKX1gXToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFzKGtleSkgfHwgZGVmaW5pdGlvbi5oYXNDdXN0b21EZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZURlZmluaXRpb25QYWlyKFt0b2tlbiwgdHlwZURlZmluaXRpb25dKSB7XG4gICAgcmV0dXJuIHZhbHVlRGVzY3JpcHRvckZvclRva2VuQW5kVHlwZURlZmluaXRpb24odG9rZW4sIHR5cGVEZWZpbml0aW9uKTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVUeXBlQ29uc3RhbnQoY29uc3RhbnQpIHtcbiAgICBzd2l0Y2ggKGNvbnN0YW50KSB7XG4gICAgICAgIGNhc2UgQXJyYXk6IHJldHVybiBcImFycmF5XCI7XG4gICAgICAgIGNhc2UgQm9vbGVhbjogcmV0dXJuIFwiYm9vbGVhblwiO1xuICAgICAgICBjYXNlIE51bWJlcjogcmV0dXJuIFwibnVtYmVyXCI7XG4gICAgICAgIGNhc2UgT2JqZWN0OiByZXR1cm4gXCJvYmplY3RcIjtcbiAgICAgICAgY2FzZSBTdHJpbmc6IHJldHVybiBcInN0cmluZ1wiO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcnNlVmFsdWVUeXBlRGVmYXVsdChkZWZhdWx0VmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY2FzZSBcImJvb2xlYW5cIjogcmV0dXJuIFwiYm9vbGVhblwiO1xuICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiBcIm51bWJlclwiO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHJldHVybiBcInN0cmluZ1wiO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZWZhdWx0VmFsdWUpKVxuICAgICAgICByZXR1cm4gXCJhcnJheVwiO1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGVmYXVsdFZhbHVlKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIilcbiAgICAgICAgcmV0dXJuIFwib2JqZWN0XCI7XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlVHlwZU9iamVjdCh0eXBlT2JqZWN0KSB7XG4gICAgY29uc3QgdHlwZUZyb21PYmplY3QgPSBwYXJzZVZhbHVlVHlwZUNvbnN0YW50KHR5cGVPYmplY3QudHlwZSk7XG4gICAgaWYgKHR5cGVGcm9tT2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZVR5cGUgPSBwYXJzZVZhbHVlVHlwZURlZmF1bHQodHlwZU9iamVjdC5kZWZhdWx0KTtcbiAgICAgICAgaWYgKHR5cGVGcm9tT2JqZWN0ICE9PSBkZWZhdWx0VmFsdWVUeXBlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgXCIke3R5cGVGcm9tT2JqZWN0fVwiIG11c3QgbWF0Y2ggdGhlIHR5cGUgb2YgdGhlIGRlZmF1bHQgdmFsdWUuIEdpdmVuIGRlZmF1bHQgdmFsdWU6IFwiJHt0eXBlT2JqZWN0LmRlZmF1bHR9XCIgYXMgXCIke2RlZmF1bHRWYWx1ZVR5cGV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZUZyb21PYmplY3Q7XG4gICAgfVxufVxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGVEZWZpbml0aW9uKHR5cGVEZWZpbml0aW9uKSB7XG4gICAgY29uc3QgdHlwZUZyb21PYmplY3QgPSBwYXJzZVZhbHVlVHlwZU9iamVjdCh0eXBlRGVmaW5pdGlvbik7XG4gICAgY29uc3QgdHlwZUZyb21EZWZhdWx0VmFsdWUgPSBwYXJzZVZhbHVlVHlwZURlZmF1bHQodHlwZURlZmluaXRpb24pO1xuICAgIGNvbnN0IHR5cGVGcm9tQ29uc3RhbnQgPSBwYXJzZVZhbHVlVHlwZUNvbnN0YW50KHR5cGVEZWZpbml0aW9uKTtcbiAgICBjb25zdCB0eXBlID0gdHlwZUZyb21PYmplY3QgfHwgdHlwZUZyb21EZWZhdWx0VmFsdWUgfHwgdHlwZUZyb21Db25zdGFudDtcbiAgICBpZiAodHlwZSlcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHZhbHVlIHR5cGUgXCIke3R5cGVEZWZpbml0aW9ufVwiYCk7XG59XG5mdW5jdGlvbiBkZWZhdWx0VmFsdWVGb3JEZWZpbml0aW9uKHR5cGVEZWZpbml0aW9uKSB7XG4gICAgY29uc3QgY29uc3RhbnQgPSBwYXJzZVZhbHVlVHlwZUNvbnN0YW50KHR5cGVEZWZpbml0aW9uKTtcbiAgICBpZiAoY29uc3RhbnQpXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVzQnlUeXBlW2NvbnN0YW50XTtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0eXBlRGVmaW5pdGlvbi5kZWZhdWx0O1xuICAgIGlmIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICByZXR1cm4gdHlwZURlZmluaXRpb247XG59XG5mdW5jdGlvbiB2YWx1ZURlc2NyaXB0b3JGb3JUb2tlbkFuZFR5cGVEZWZpbml0aW9uKHRva2VuLCB0eXBlRGVmaW5pdGlvbikge1xuICAgIGNvbnN0IGtleSA9IGAke2Rhc2hlcml6ZSh0b2tlbil9LXZhbHVlYDtcbiAgICBjb25zdCB0eXBlID0gcGFyc2VWYWx1ZVR5cGVEZWZpbml0aW9uKHR5cGVEZWZpbml0aW9uKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBrZXksXG4gICAgICAgIG5hbWU6IGNhbWVsaXplKGtleSksXG4gICAgICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7IHJldHVybiBkZWZhdWx0VmFsdWVGb3JEZWZpbml0aW9uKHR5cGVEZWZpbml0aW9uKTsgfSxcbiAgICAgICAgZ2V0IGhhc0N1c3RvbURlZmF1bHRWYWx1ZSgpIHsgcmV0dXJuIHBhcnNlVmFsdWVUeXBlRGVmYXVsdCh0eXBlRGVmaW5pdGlvbikgIT09IHVuZGVmaW5lZDsgfSxcbiAgICAgICAgcmVhZGVyOiByZWFkZXJzW3R5cGVdLFxuICAgICAgICB3cml0ZXI6IHdyaXRlcnNbdHlwZV0gfHwgd3JpdGVycy5kZWZhdWx0XG4gICAgfTtcbn1cbmNvbnN0IGRlZmF1bHRWYWx1ZXNCeVR5cGUgPSB7XG4gICAgZ2V0IGFycmF5KCkgeyByZXR1cm4gW107IH0sXG4gICAgYm9vbGVhbjogZmFsc2UsXG4gICAgbnVtYmVyOiAwLFxuICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB7fTsgfSxcbiAgICBzdHJpbmc6IFwiXCJcbn07XG5jb25zdCByZWFkZXJzID0ge1xuICAgIGFycmF5KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhcnJheVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfSxcbiAgICBib29sZWFuKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAhKHZhbHVlID09IFwiMFwiIHx8IHZhbHVlID09IFwiZmFsc2VcIik7XG4gICAgfSxcbiAgICBudW1iZXIodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfSxcbiAgICBvYmplY3QodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIGlmIChvYmplY3QgPT09IG51bGwgfHwgdHlwZW9mIG9iamVjdCAhPSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH0sXG4gICAgc3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xuY29uc3Qgd3JpdGVycyA9IHtcbiAgICBkZWZhdWx0OiB3cml0ZVN0cmluZyxcbiAgICBhcnJheTogd3JpdGVKU09OLFxuICAgIG9iamVjdDogd3JpdGVKU09OXG59O1xuZnVuY3Rpb24gd3JpdGVKU09OKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHdyaXRlU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIGAke3ZhbHVlfWA7XG59XG5cbmNsYXNzIENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBzaG91bGRMb2FkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFwcGxpY2F0aW9uO1xuICAgIH1cbiAgICBnZXQgc2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuc2NvcGU7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5lbGVtZW50O1xuICAgIH1cbiAgICBnZXQgaWRlbnRpZmllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZ2V0IHRhcmdldHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjb3BlLnRhcmdldHM7XG4gICAgfVxuICAgIGdldCBjbGFzc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29wZS5jbGFzc2VzO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcGUuZGF0YTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICB9XG4gICAgZGlzcGF0Y2goZXZlbnROYW1lLCB7IHRhcmdldCA9IHRoaXMuZWxlbWVudCwgZGV0YWlsID0ge30sIHByZWZpeCA9IHRoaXMuaWRlbnRpZmllciwgYnViYmxlcyA9IHRydWUsIGNhbmNlbGFibGUgPSB0cnVlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCB0eXBlID0gcHJlZml4ID8gYCR7cHJlZml4fToke2V2ZW50TmFtZX1gIDogZXZlbnROYW1lO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbCwgYnViYmxlcywgY2FuY2VsYWJsZSB9KTtcbiAgICAgICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxufVxuQ29udHJvbGxlci5ibGVzc2luZ3MgPSBbQ2xhc3NQcm9wZXJ0aWVzQmxlc3NpbmcsIFRhcmdldFByb3BlcnRpZXNCbGVzc2luZywgVmFsdWVQcm9wZXJ0aWVzQmxlc3NpbmddO1xuQ29udHJvbGxlci50YXJnZXRzID0gW107XG5Db250cm9sbGVyLnZhbHVlcyA9IHt9O1xuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgQXR0cmlidXRlT2JzZXJ2ZXIsIENvbnRleHQsIENvbnRyb2xsZXIsIEVsZW1lbnRPYnNlcnZlciwgSW5kZXhlZE11bHRpbWFwLCBNdWx0aW1hcCwgU3RyaW5nTWFwT2JzZXJ2ZXIsIFRva2VuTGlzdE9ic2VydmVyLCBWYWx1ZUxpc3RPYnNlcnZlciwgYWRkLCBkZWZhdWx0U2NoZW1hLCBkZWwsIGZldGNoLCBwcnVuZSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJhcC1pbnB1dC1yYWRpb3Mge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcbmFwLWlucHV0LXJhZGlvcyAuYXAtaW5wdXQtcmFkaW9zX19sYWJlbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcbmFwLWlucHV0LXJhZGlvcyAuYXAtaW5wdXQtcmFkaW9zX19pbnB1dCB7XFxuICBtYXJnaW46IDA7XFxufVxcbmFwLWlucHV0LXJhZGlvcy5hcC1pbnB1dC1yYWRpb3MtLWlzLXNlbGVjdGVkIC5hcC1pbnB1dC1yYWRpb3NfX2xhYmVsIHtcXG4gIGJvcmRlci13aWR0aDogNXB4O1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY29tcG9uZW50cy9yYWRpb3MvcmFkaW9zLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7QUFDSjtBQUVRO0VBQ0ksYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7QUFBWjtBQUdRO0VBQ0ksU0FBQTtBQURaO0FBTVE7RUFDSSxpQkFBQTtBQUpaXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImFwLWlucHV0LXJhZGlvcyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFxuICAgIC5hcC1pbnB1dC1yYWRpb3Mge1xcbiAgICAgICAgJl9fbGFiZWwge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgICAgIH1cXG5cXG4gICAgICAgICZfX2lucHV0IHtcXG4gICAgICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICB9XFxuICAgIH1cXG5cXG4gICAgJi5hcC1pbnB1dC1yYWRpb3MtLWlzLXNlbGVjdGVkIHtcXG4gICAgICAgIC5hcC1pbnB1dC1yYWRpb3NfX2xhYmVsIHtcXG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IDVweDtcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLyoqIVxuXG4gQGxpY2Vuc2VcbiBoYW5kbGViYXJzIHY0LjcuN1xuXG5Db3B5cmlnaHQgKEMpIDIwMTEtMjAxOSBieSBZZWh1ZGEgS2F0elxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJIYW5kbGViYXJzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkhhbmRsZWJhcnNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cdHZhciBfaGFuZGxlYmFyc1J1bnRpbWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBfaGFuZGxlYmFyc1J1bnRpbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc1J1bnRpbWUpO1xuXG5cdC8vIENvbXBpbGVyIGltcG9ydHNcblxuXHR2YXIgX2hhbmRsZWJhcnNDb21waWxlckFzdCA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXG5cdHZhciBfaGFuZGxlYmFyc0NvbXBpbGVyQXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNDb21waWxlckFzdCk7XG5cblx0dmFyIF9oYW5kbGViYXJzQ29tcGlsZXJCYXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nik7XG5cblx0dmFyIF9oYW5kbGViYXJzQ29tcGlsZXJDb21waWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpO1xuXG5cdHZhciBfaGFuZGxlYmFyc0NvbXBpbGVySmF2YXNjcmlwdENvbXBpbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Mik7XG5cblx0dmFyIF9oYW5kbGViYXJzQ29tcGlsZXJKYXZhc2NyaXB0Q29tcGlsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc0NvbXBpbGVySmF2YXNjcmlwdENvbXBpbGVyKTtcblxuXHR2YXIgX2hhbmRsZWJhcnNDb21waWxlclZpc2l0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KTtcblxuXHR2YXIgX2hhbmRsZWJhcnNDb21waWxlclZpc2l0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc0NvbXBpbGVyVmlzaXRvcik7XG5cblx0dmFyIF9oYW5kbGViYXJzTm9Db25mbGljdCA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpO1xuXG5cdHZhciBfaGFuZGxlYmFyc05vQ29uZmxpY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc05vQ29uZmxpY3QpO1xuXG5cdHZhciBfY3JlYXRlID0gX2hhbmRsZWJhcnNSdW50aW1lMlsnZGVmYXVsdCddLmNyZWF0ZTtcblx0ZnVuY3Rpb24gY3JlYXRlKCkge1xuXHQgIHZhciBoYiA9IF9jcmVhdGUoKTtcblxuXHQgIGhiLmNvbXBpbGUgPSBmdW5jdGlvbiAoaW5wdXQsIG9wdGlvbnMpIHtcblx0ICAgIHJldHVybiBfaGFuZGxlYmFyc0NvbXBpbGVyQ29tcGlsZXIuY29tcGlsZShpbnB1dCwgb3B0aW9ucywgaGIpO1xuXHQgIH07XG5cdCAgaGIucHJlY29tcGlsZSA9IGZ1bmN0aW9uIChpbnB1dCwgb3B0aW9ucykge1xuXHQgICAgcmV0dXJuIF9oYW5kbGViYXJzQ29tcGlsZXJDb21waWxlci5wcmVjb21waWxlKGlucHV0LCBvcHRpb25zLCBoYik7XG5cdCAgfTtcblxuXHQgIGhiLkFTVCA9IF9oYW5kbGViYXJzQ29tcGlsZXJBc3QyWydkZWZhdWx0J107XG5cdCAgaGIuQ29tcGlsZXIgPSBfaGFuZGxlYmFyc0NvbXBpbGVyQ29tcGlsZXIuQ29tcGlsZXI7XG5cdCAgaGIuSmF2YVNjcmlwdENvbXBpbGVyID0gX2hhbmRsZWJhcnNDb21waWxlckphdmFzY3JpcHRDb21waWxlcjJbJ2RlZmF1bHQnXTtcblx0ICBoYi5QYXJzZXIgPSBfaGFuZGxlYmFyc0NvbXBpbGVyQmFzZS5wYXJzZXI7XG5cdCAgaGIucGFyc2UgPSBfaGFuZGxlYmFyc0NvbXBpbGVyQmFzZS5wYXJzZTtcblx0ICBoYi5wYXJzZVdpdGhvdXRQcm9jZXNzaW5nID0gX2hhbmRsZWJhcnNDb21waWxlckJhc2UucGFyc2VXaXRob3V0UHJvY2Vzc2luZztcblxuXHQgIHJldHVybiBoYjtcblx0fVxuXG5cdHZhciBpbnN0ID0gY3JlYXRlKCk7XG5cdGluc3QuY3JlYXRlID0gY3JlYXRlO1xuXG5cdF9oYW5kbGViYXJzTm9Db25mbGljdDJbJ2RlZmF1bHQnXShpbnN0KTtcblxuXHRpbnN0LlZpc2l0b3IgPSBfaGFuZGxlYmFyc0NvbXBpbGVyVmlzaXRvcjJbJ2RlZmF1bHQnXTtcblxuXHRpbnN0WydkZWZhdWx0J10gPSBpbnN0O1xuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHQgICAgXCJkZWZhdWx0XCI6IG9ialxuXHQgIH07XG5cdH07XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IF9fd2VicGFja19yZXF1aXJlX18oMylbJ2RlZmF1bHQnXTtcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cdHZhciBfaGFuZGxlYmFyc0Jhc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG5cdHZhciBiYXNlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2hhbmRsZWJhcnNCYXNlKTtcblxuXHQvLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG5cdC8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG5cblx0dmFyIF9oYW5kbGViYXJzU2FmZVN0cmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpO1xuXG5cdHZhciBfaGFuZGxlYmFyc1NhZmVTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGFuZGxlYmFyc1NhZmVTdHJpbmcpO1xuXG5cdHZhciBfaGFuZGxlYmFyc0V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9oYW5kbGViYXJzRXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNFeGNlcHRpb24pO1xuXG5cdHZhciBfaGFuZGxlYmFyc1V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgVXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaGFuZGxlYmFyc1V0aWxzKTtcblxuXHR2YXIgX2hhbmRsZWJhcnNSdW50aW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCk7XG5cblx0dmFyIHJ1bnRpbWUgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaGFuZGxlYmFyc1J1bnRpbWUpO1xuXG5cdHZhciBfaGFuZGxlYmFyc05vQ29uZmxpY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KTtcblxuXHR2YXIgX2hhbmRsZWJhcnNOb0NvbmZsaWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNOb0NvbmZsaWN0KTtcblxuXHQvLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2Vcblx0ZnVuY3Rpb24gY3JlYXRlKCkge1xuXHQgIHZhciBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG5cdCAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcblx0ICBoYi5TYWZlU3RyaW5nID0gX2hhbmRsZWJhcnNTYWZlU3RyaW5nMlsnZGVmYXVsdCddO1xuXHQgIGhiLkV4Y2VwdGlvbiA9IF9oYW5kbGViYXJzRXhjZXB0aW9uMlsnZGVmYXVsdCddO1xuXHQgIGhiLlV0aWxzID0gVXRpbHM7XG5cdCAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cblx0ICBoYi5WTSA9IHJ1bnRpbWU7XG5cdCAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbiAoc3BlYykge1xuXHQgICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuXHQgIH07XG5cblx0ICByZXR1cm4gaGI7XG5cdH1cblxuXHR2YXIgaW5zdCA9IGNyZWF0ZSgpO1xuXHRpbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxuXHRfaGFuZGxlYmFyc05vQ29uZmxpY3QyWydkZWZhdWx0J10oaW5zdCk7XG5cblx0aW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBpbnN0O1xuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuXHQgICAgcmV0dXJuIG9iajtcblx0ICB9IGVsc2Uge1xuXHQgICAgdmFyIG5ld09iaiA9IHt9O1xuXG5cdCAgICBpZiAob2JqICE9IG51bGwpIHtcblx0ICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7XG5cdCAgICByZXR1cm4gbmV3T2JqO1xuXHQgIH1cblx0fTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG4vKioqLyB9KSxcbi8qIDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZXhwb3J0cy5IYW5kbGViYXJzRW52aXJvbm1lbnQgPSBIYW5kbGViYXJzRW52aXJvbm1lbnQ7XG5cblx0dmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIF9leGNlcHRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfZXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4Y2VwdGlvbik7XG5cblx0dmFyIF9oZWxwZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0dmFyIF9kZWNvcmF0b3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMCk7XG5cblx0dmFyIF9sb2dnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcblxuXHR2YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG5cdHZhciBfaW50ZXJuYWxQcm90b0FjY2VzcyA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpO1xuXG5cdHZhciBWRVJTSU9OID0gJzQuNy43Jztcblx0ZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjtcblx0dmFyIENPTVBJTEVSX1JFVklTSU9OID0gODtcblx0ZXhwb3J0cy5DT01QSUxFUl9SRVZJU0lPTiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXHR2YXIgTEFTVF9DT01QQVRJQkxFX0NPTVBJTEVSX1JFVklTSU9OID0gNztcblxuXHRleHBvcnRzLkxBU1RfQ09NUEFUSUJMRV9DT01QSUxFUl9SRVZJU0lPTiA9IExBU1RfQ09NUEFUSUJMRV9DT01QSUxFUl9SRVZJU0lPTjtcblx0dmFyIFJFVklTSU9OX0NIQU5HRVMgPSB7XG5cdCAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcblx0ICAyOiAnPT0gMS4wLjAtcmMuMycsXG5cdCAgMzogJz09IDEuMC4wLXJjLjQnLFxuXHQgIDQ6ICc9PSAxLngueCcsXG5cdCAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuXHQgIDY6ICc+PSAyLjAuMC1iZXRhLjEnLFxuXHQgIDc6ICc+PSA0LjAuMCA8NC4zLjAnLFxuXHQgIDg6ICc+PSA0LjMuMCdcblx0fTtcblxuXHRleHBvcnRzLlJFVklTSU9OX0NIQU5HRVMgPSBSRVZJU0lPTl9DSEFOR0VTO1xuXHR2YXIgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5cdGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuXHQgIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG5cdCAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuXHQgIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cblx0ICBfaGVscGVycy5yZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuXHQgIF9kZWNvcmF0b3JzLnJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnModGhpcyk7XG5cdH1cblxuXHRIYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuXHQgIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cblx0ICBsb2dnZXI6IF9sb2dnZXIyWydkZWZhdWx0J10sXG5cdCAgbG9nOiBfbG9nZ2VyMlsnZGVmYXVsdCddLmxvZyxcblxuXHQgIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbiByZWdpc3RlckhlbHBlcihuYW1lLCBmbikge1xuXHQgICAgaWYgKF91dGlscy50b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG5cdCAgICAgIGlmIChmbikge1xuXHQgICAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTtcblx0ICAgICAgfVxuXHQgICAgICBfdXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcblx0ICAgIH1cblx0ICB9LFxuXHQgIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uIHVucmVnaXN0ZXJIZWxwZXIobmFtZSkge1xuXHQgICAgZGVsZXRlIHRoaXMuaGVscGVyc1tuYW1lXTtcblx0ICB9LFxuXG5cdCAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbiByZWdpc3RlclBhcnRpYWwobmFtZSwgcGFydGlhbCkge1xuXHQgICAgaWYgKF91dGlscy50b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG5cdCAgICAgIF91dGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAodHlwZW9mIHBhcnRpYWwgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ0F0dGVtcHRpbmcgdG8gcmVnaXN0ZXIgYSBwYXJ0aWFsIGNhbGxlZCBcIicgKyBuYW1lICsgJ1wiIGFzIHVuZGVmaW5lZCcpO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSBwYXJ0aWFsO1xuXHQgICAgfVxuXHQgIH0sXG5cdCAgdW5yZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uIHVucmVnaXN0ZXJQYXJ0aWFsKG5hbWUpIHtcblx0ICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuXHQgIH0sXG5cblx0ICByZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24gcmVnaXN0ZXJEZWNvcmF0b3IobmFtZSwgZm4pIHtcblx0ICAgIGlmIChfdXRpbHMudG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuXHQgICAgICBpZiAoZm4pIHtcblx0ICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7XG5cdCAgICAgIH1cblx0ICAgICAgX3V0aWxzLmV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5kZWNvcmF0b3JzW25hbWVdID0gZm47XG5cdCAgICB9XG5cdCAgfSxcblx0ICB1bnJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbiB1bnJlZ2lzdGVyRGVjb3JhdG9yKG5hbWUpIHtcblx0ICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG5cdCAgfSxcblx0ICAvKipcblx0ICAgKiBSZXNldCB0aGUgbWVtb3J5IG9mIGlsbGVnYWwgcHJvcGVydHkgYWNjZXNzZXMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBsb2dnZWQuXG5cdCAgICogQGRlcHJlY2F0ZWQgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiBoYW5kbGViYXJzIHRlc3QtY2FzZXNcblx0ICAgKi9cblx0ICByZXNldExvZ2dlZFByb3BlcnR5QWNjZXNzZXM6IGZ1bmN0aW9uIHJlc2V0TG9nZ2VkUHJvcGVydHlBY2Nlc3NlcygpIHtcblx0ICAgIF9pbnRlcm5hbFByb3RvQWNjZXNzLnJlc2V0TG9nZ2VkUHJvcGVydGllcygpO1xuXHQgIH1cblx0fTtcblxuXHR2YXIgbG9nID0gX2xvZ2dlcjJbJ2RlZmF1bHQnXS5sb2c7XG5cblx0ZXhwb3J0cy5sb2cgPSBsb2c7XG5cdGV4cG9ydHMuY3JlYXRlRnJhbWUgPSBfdXRpbHMuY3JlYXRlRnJhbWU7XG5cdGV4cG9ydHMubG9nZ2VyID0gX2xvZ2dlcjJbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuXHRleHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xuXHRleHBvcnRzLmVzY2FwZUV4cHJlc3Npb24gPSBlc2NhcGVFeHByZXNzaW9uO1xuXHRleHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuXHRleHBvcnRzLmNyZWF0ZUZyYW1lID0gY3JlYXRlRnJhbWU7XG5cdGV4cG9ydHMuYmxvY2tQYXJhbXMgPSBibG9ja1BhcmFtcztcblx0ZXhwb3J0cy5hcHBlbmRDb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoO1xuXHR2YXIgZXNjYXBlID0ge1xuXHQgICcmJzogJyZhbXA7Jyxcblx0ICAnPCc6ICcmbHQ7Jyxcblx0ICAnPic6ICcmZ3Q7Jyxcblx0ICAnXCInOiAnJnF1b3Q7Jyxcblx0ICBcIidcIjogJyYjeDI3OycsXG5cdCAgJ2AnOiAnJiN4NjA7Jyxcblx0ICAnPSc6ICcmI3gzRDsnXG5cdH07XG5cblx0dmFyIGJhZENoYXJzID0gL1smPD5cIidgPV0vZyxcblx0ICAgIHBvc3NpYmxlID0gL1smPD5cIidgPV0vO1xuXG5cdGZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG5cdCAgcmV0dXJuIGVzY2FwZVtjaHJdO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuXHQgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG5cdCAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG5cdCAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHQgIHJldHVybiBvYmo7XG5cdH1cblxuXHR2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5cdGV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcblx0Ly8gU291cmNlZCBmcm9tIGxvZGFzaFxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG5cdC8qIGVzbGludC1kaXNhYmxlIGZ1bmMtc3R5bGUgKi9cblx0dmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG5cdCAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcblx0fTtcblx0Ly8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmIChpc0Z1bmN0aW9uKC94LykpIHtcblx0ICBleHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHQgIH07XG5cdH1cblx0ZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuXHQvKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHR2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xuXHR9O1xuXG5cdGV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cdC8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5cblx0ZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcblx0ICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcblx0ICAgICAgcmV0dXJuIGk7XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiAtMTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG5cdCAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdCAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG5cdCAgICBpZiAoc3RyaW5nICYmIHN0cmluZy50b0hUTUwpIHtcblx0ICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcblx0ICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcblx0ICAgICAgcmV0dXJuICcnO1xuXHQgICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG5cdCAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcblx0ICAgIH1cblxuXHQgICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG5cdCAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcblx0ICAgIC8vIGFuIG9iamVjdCdzIHRvIHN0cmluZyBoYXMgZXNjYXBlZCBjaGFyYWN0ZXJzIGluIGl0LlxuXHQgICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG5cdCAgfVxuXG5cdCAgaWYgKCFwb3NzaWJsZS50ZXN0KHN0cmluZykpIHtcblx0ICAgIHJldHVybiBzdHJpbmc7XG5cdCAgfVxuXHQgIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG5cdH1cblxuXHRmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG5cdCAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlRnJhbWUob2JqZWN0KSB7XG5cdCAgdmFyIGZyYW1lID0gZXh0ZW5kKHt9LCBvYmplY3QpO1xuXHQgIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG5cdCAgcmV0dXJuIGZyYW1lO1xuXHR9XG5cblx0ZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcblx0ICBwYXJhbXMucGF0aCA9IGlkcztcblx0ICByZXR1cm4gcGFyYW1zO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG5cdCAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG5cdH1cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVsnZGVmYXVsdCddO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdHZhciBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ2VuZExpbmVOdW1iZXInLCAnbWVzc2FnZScsICduYW1lJywgJ251bWJlcicsICdzdGFjayddO1xuXG5cdGZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG5cdCAgdmFyIGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG5cdCAgICAgIGxpbmUgPSB1bmRlZmluZWQsXG5cdCAgICAgIGVuZExpbmVOdW1iZXIgPSB1bmRlZmluZWQsXG5cdCAgICAgIGNvbHVtbiA9IHVuZGVmaW5lZCxcblx0ICAgICAgZW5kQ29sdW1uID0gdW5kZWZpbmVkO1xuXG5cdCAgaWYgKGxvYykge1xuXHQgICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuXHQgICAgZW5kTGluZU51bWJlciA9IGxvYy5lbmQubGluZTtcblx0ICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cdCAgICBlbmRDb2x1bW4gPSBsb2MuZW5kLmNvbHVtbjtcblxuXHQgICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG5cdCAgfVxuXG5cdCAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG5cdCAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG5cdCAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG5cdCAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcblx0ICB9XG5cblx0ICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuXHQgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuXHQgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcblx0ICB9XG5cblx0ICB0cnkge1xuXHQgICAgaWYgKGxvYykge1xuXHQgICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXHQgICAgICB0aGlzLmVuZExpbmVOdW1iZXIgPSBlbmRMaW5lTnVtYmVyO1xuXG5cdCAgICAgIC8vIFdvcmsgYXJvdW5kIGlzc3VlIHVuZGVyIHNhZmFyaSB3aGVyZSB3ZSBjYW4ndCBkaXJlY3RseSBzZXQgdGhlIGNvbHVtbiB2YWx1ZVxuXHQgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgICBpZiAoX09iamVjdCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuXHQgICAgICAgICAgdmFsdWU6IGNvbHVtbixcblx0ICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcblx0ICAgICAgICB9KTtcblx0ICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2VuZENvbHVtbicsIHtcblx0ICAgICAgICAgIHZhbHVlOiBlbmRDb2x1bW4sXG5cdCAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG5cdCAgICAgICAgfSk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG5cdCAgICAgICAgdGhpcy5lbmRDb2x1bW4gPSBlbmRDb2x1bW47XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9IGNhdGNoIChub3ApIHtcblx0ICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cblx0ICB9XG5cdH1cblxuXHRFeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gRXhjZXB0aW9uO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciAkID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcblx0ICByZXR1cm4gJC5zZXREZXNjKGl0LCBrZXksIGRlc2MpO1xuXHR9O1xuXG4vKioqLyB9KSxcbi8qIDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgJE9iamVjdCA9IE9iamVjdDtcblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG5cdCAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcblx0ICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcblx0ICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcblx0ICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuXHQgIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcblx0ICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG5cdCAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuXHQgIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuXHQgIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLnJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMgPSByZWdpc3RlckRlZmF1bHRIZWxwZXJzO1xuXHRleHBvcnRzLm1vdmVIZWxwZXJUb0hvb2tzID0gbW92ZUhlbHBlclRvSG9va3M7XG5cblx0dmFyIF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cblx0dmFyIF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNCbG9ja0hlbHBlck1pc3NpbmcpO1xuXG5cdHZhciBfaGVscGVyc0VhY2ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxuXHR2YXIgX2hlbHBlcnNFYWNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNFYWNoKTtcblxuXHR2YXIgX2hlbHBlcnNIZWxwZXJNaXNzaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIF9oZWxwZXJzSGVscGVyTWlzc2luZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzSGVscGVyTWlzc2luZyk7XG5cblx0dmFyIF9oZWxwZXJzSWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KTtcblxuXHR2YXIgX2hlbHBlcnNJZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzSWYpO1xuXG5cdHZhciBfaGVscGVyc0xvZyA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpO1xuXG5cdHZhciBfaGVscGVyc0xvZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzTG9nKTtcblxuXHR2YXIgX2hlbHBlcnNMb29rdXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KTtcblxuXHR2YXIgX2hlbHBlcnNMb29rdXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc0xvb2t1cCk7XG5cblx0dmFyIF9oZWxwZXJzV2l0aCA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xuXG5cdHZhciBfaGVscGVyc1dpdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc1dpdGgpO1xuXG5cdGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcblx0ICBfaGVscGVyc0Jsb2NrSGVscGVyTWlzc2luZzJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG5cdCAgX2hlbHBlcnNFYWNoMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcblx0ICBfaGVscGVyc0hlbHBlck1pc3NpbmcyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xuXHQgIF9oZWxwZXJzSWYyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xuXHQgIF9oZWxwZXJzTG9nMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcblx0ICBfaGVscGVyc0xvb2t1cDJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG5cdCAgX2hlbHBlcnNXaXRoMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1vdmVIZWxwZXJUb0hvb2tzKGluc3RhbmNlLCBoZWxwZXJOYW1lLCBrZWVwSGVscGVyKSB7XG5cdCAgaWYgKGluc3RhbmNlLmhlbHBlcnNbaGVscGVyTmFtZV0pIHtcblx0ICAgIGluc3RhbmNlLmhvb2tzW2hlbHBlck5hbWVdID0gaW5zdGFuY2UuaGVscGVyc1toZWxwZXJOYW1lXTtcblx0ICAgIGlmICgha2VlcEhlbHBlcikge1xuXHQgICAgICBkZWxldGUgaW5zdGFuY2UuaGVscGVyc1toZWxwZXJOYW1lXTtcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuLyoqKi8gfSksXG4vKiAxMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cdHZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuXHQgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuXHQgICAgdmFyIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG5cdCAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG5cdCAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuXHQgICAgICByZXR1cm4gZm4odGhpcyk7XG5cdCAgICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuXHQgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcblx0ICAgIH0gZWxzZSBpZiAoX3V0aWxzLmlzQXJyYXkoY29udGV4dCkpIHtcblx0ICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuXHQgICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuXHQgICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG5cdCAgICAgICAgdmFyIGRhdGEgPSBfdXRpbHMuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcblx0ICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gX3V0aWxzLmFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcblx0ICAgICAgICBvcHRpb25zID0geyBkYXRhOiBkYXRhIH07XG5cdCAgICAgIH1cblxuXHQgICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG5cdCAgICB9XG5cdCAgfSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfT2JqZWN0JGtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVsnZGVmYXVsdCddO1xuXG5cdHZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVsnZGVmYXVsdCddO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblx0dmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIF9leGNlcHRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfZXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4Y2VwdGlvbik7XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG5cdCAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuXHQgICAgaWYgKCFvcHRpb25zKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdNdXN0IHBhc3MgaXRlcmF0b3IgdG8gI2VhY2gnKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGZuID0gb3B0aW9ucy5mbixcblx0ICAgICAgICBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuXHQgICAgICAgIGkgPSAwLFxuXHQgICAgICAgIHJldCA9ICcnLFxuXHQgICAgICAgIGRhdGEgPSB1bmRlZmluZWQsXG5cdCAgICAgICAgY29udGV4dFBhdGggPSB1bmRlZmluZWQ7XG5cblx0ICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcblx0ICAgICAgY29udGV4dFBhdGggPSBfdXRpbHMuYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG5cdCAgICB9XG5cblx0ICAgIGlmIChfdXRpbHMuaXNGdW5jdGlvbihjb250ZXh0KSkge1xuXHQgICAgICBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG5cdCAgICAgIGRhdGEgPSBfdXRpbHMuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZXhlY0l0ZXJhdGlvbihmaWVsZCwgaW5kZXgsIGxhc3QpIHtcblx0ICAgICAgaWYgKGRhdGEpIHtcblx0ICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuXHQgICAgICAgIGRhdGEuaW5kZXggPSBpbmRleDtcblx0ICAgICAgICBkYXRhLmZpcnN0ID0gaW5kZXggPT09IDA7XG5cdCAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG5cdCAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG5cdCAgICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gY29udGV4dFBhdGggKyBmaWVsZDtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblxuXHQgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ZpZWxkXSwge1xuXHQgICAgICAgIGRhdGE6IGRhdGEsXG5cdCAgICAgICAgYmxvY2tQYXJhbXM6IF91dGlscy5ibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuXHQgICAgICB9KTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgIGlmIChfdXRpbHMuaXNBcnJheShjb250ZXh0KSkge1xuXHQgICAgICAgIGZvciAodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgICAgICAgaWYgKGkgaW4gY29udGV4dCkge1xuXHQgICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICB9IGVsc2UgaWYgKGdsb2JhbC5TeW1ib2wgJiYgY29udGV4dFtnbG9iYWwuU3ltYm9sLml0ZXJhdG9yXSkge1xuXHQgICAgICAgIHZhciBuZXdDb250ZXh0ID0gW107XG5cdCAgICAgICAgdmFyIGl0ZXJhdG9yID0gY29udGV4dFtnbG9iYWwuU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHQgICAgICAgIGZvciAodmFyIGl0ID0gaXRlcmF0b3IubmV4dCgpOyAhaXQuZG9uZTsgaXQgPSBpdGVyYXRvci5uZXh0KCkpIHtcblx0ICAgICAgICAgIG5ld0NvbnRleHQucHVzaChpdC52YWx1ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGNvbnRleHQgPSBuZXdDb250ZXh0O1xuXHQgICAgICAgIGZvciAodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHQgICAgICAgICAgZXhlY0l0ZXJhdGlvbihpLCBpLCBpID09PSBjb250ZXh0Lmxlbmd0aCAtIDEpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgdmFyIHByaW9yS2V5ID0gdW5kZWZpbmVkO1xuXG5cdCAgICAgICAgICBfT2JqZWN0JGtleXMoY29udGV4dCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuXHQgICAgICAgICAgICAvLyB0aGUgbGFzdCBpdGVyYXRpb24gd2l0aG91dCBoYXZlIHRvIHNjYW4gdGhlIG9iamVjdCB0d2ljZSBhbmQgY3JlYXRlXG5cdCAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG5cdCAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgZXhlY0l0ZXJhdGlvbihwcmlvcktleSwgaSAtIDEpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuXHQgICAgICAgICAgICBpKys7XG5cdCAgICAgICAgICB9KTtcblx0ICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9KSgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmIChpID09PSAwKSB7XG5cdCAgICAgIHJldCA9IGludmVyc2UodGhpcyk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiByZXQ7XG5cdCAgfSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSksXG4vKiAxMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogX193ZWJwYWNrX3JlcXVpcmVfXygxNCksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuLyoqKi8gfSksXG4vKiAxNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpLk9iamVjdC5rZXlzO1xuXG4vKioqLyB9KSxcbi8qIDE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG5cdHZhciB0b09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuXG5cdF9fd2VicGFja19yZXF1aXJlX18oMTgpKCdrZXlzJywgZnVuY3Rpb24oJGtleXMpe1xuXHQgIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcblx0ICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuXHQgIH07XG5cdH0pO1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxuXHR2YXIgZGVmaW5lZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcblx0ICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuXHQgIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG5cdCAgcmV0dXJuIGl0O1xuXHR9O1xuXG4vKioqLyB9KSxcbi8qIDE4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG5cdHZhciAkZXhwb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSlcblx0ICAsIGNvcmUgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuXHQgICwgZmFpbHMgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG5cdCAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuXHQgICAgLCBleHAgPSB7fTtcblx0ICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuXHQgICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcblx0fTtcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBnbG9iYWwgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXHQgICwgY29yZSAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0ICAsIGN0eCAgICAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG5cdCAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxuXHR2YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG5cdCAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcblx0ICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuXHQgICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG5cdCAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcblx0ICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuXHQgICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG5cdCAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG5cdCAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cblx0ICAgICwga2V5LCBvd24sIG91dDtcblx0ICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcblx0ICBmb3Ioa2V5IGluIHNvdXJjZSl7XG5cdCAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcblx0ICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG5cdCAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG5cdCAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuXHQgICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcblx0ICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuXHQgICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cblx0ICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG5cdCAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuXHQgICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcblx0ICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG5cdCAgICAgIHZhciBGID0gZnVuY3Rpb24ocGFyYW0pe1xuXHQgICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuXHQgICAgICB9O1xuXHQgICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG5cdCAgICAgIHJldHVybiBGO1xuXHQgICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG5cdCAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG5cdCAgICBpZihJU19QUk9UTykoZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSkpW2tleV0gPSBvdXQ7XG5cdCAgfVxuXHR9O1xuXHQvLyB0eXBlIGJpdG1hcFxuXHQkZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG5cdCRleHBvcnQuRyA9IDI7ICAvLyBnbG9iYWxcblx0JGV4cG9ydC5TID0gNDsgIC8vIHN0YXRpY1xuXHQkZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cblx0JGV4cG9ydC5CID0gMTY7IC8vIGJpbmRcblx0JGV4cG9ydC5XID0gMzI7IC8vIHdyYXBcblx0bW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcblx0dmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG5cdCAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHRpZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4vKioqLyB9KSxcbi8qIDIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMS4yLjYnfTtcblx0aWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbi8qKiovIH0pLFxuLyogMjIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcblx0dmFyIGFGdW5jdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuXHQgIGFGdW5jdGlvbihmbik7XG5cdCAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcblx0ICBzd2l0Y2gobGVuZ3RoKXtcblx0ICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuXHQgICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcblx0ICAgIH07XG5cdCAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcblx0ICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG5cdCAgICB9O1xuXHQgICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG5cdCAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuXHQgICAgfTtcblx0ICB9XG5cdCAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuXHQgICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG5cdCAgfTtcblx0fTtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuXHQgIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG5cdCAgcmV0dXJuIGl0O1xuXHR9O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcblx0ICB0cnkge1xuXHQgICAgcmV0dXJuICEhZXhlYygpO1xuXHQgIH0gY2F0Y2goZSl7XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9XG5cdH07XG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX2V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uICgpIC8qIFthcmdzLCBdb3B0aW9ucyAqL3tcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuXHQgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdNaXNzaW5nIGhlbHBlcjogXCInICsgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXS5uYW1lICsgJ1wiJyk7XG5cdCAgICB9XG5cdCAgfSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogMjYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgX2V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbiAoY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDIpIHtcblx0ICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJyNpZiByZXF1aXJlcyBleGFjdGx5IG9uZSBhcmd1bWVudCcpO1xuXHQgICAgfVxuXHQgICAgaWYgKF91dGlscy5pc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkge1xuXHQgICAgICBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7XG5cdCAgICB9XG5cblx0ICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cblx0ICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG5cdCAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuXHQgICAgaWYgKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsIHx8IF91dGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuXHQgICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG5cdCAgICB9XG5cdCAgfSk7XG5cblx0ICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24gKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAyKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCcjdW5sZXNzIHJlcXVpcmVzIGV4YWN0bHkgb25lIGFyZ3VtZW50Jyk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7XG5cdCAgICAgIGZuOiBvcHRpb25zLmludmVyc2UsXG5cdCAgICAgIGludmVyc2U6IG9wdGlvbnMuZm4sXG5cdCAgICAgIGhhc2g6IG9wdGlvbnMuaGFzaFxuXHQgICAgfSk7XG5cdCAgfSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogMjcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24gKCkgLyogbWVzc2FnZSwgb3B0aW9ucyAqL3tcblx0ICAgIHZhciBhcmdzID0gW3VuZGVmaW5lZF0sXG5cdCAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcblx0ICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBsZXZlbCA9IDE7XG5cdCAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcblx0ICAgICAgbGV2ZWwgPSBvcHRpb25zLmhhc2gubGV2ZWw7XG5cdCAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuXHQgICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcblx0ICAgIH1cblx0ICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuXHQgICAgaW5zdGFuY2UubG9nLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcblx0ICB9KTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiAyOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuXHQgIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb29rdXAnLCBmdW5jdGlvbiAob2JqLCBmaWVsZCwgb3B0aW9ucykge1xuXHQgICAgaWYgKCFvYmopIHtcblx0ICAgICAgLy8gTm90ZSBmb3IgNS4wOiBDaGFuZ2UgdG8gXCJvYmogPT0gbnVsbFwiIGluIDUuMFxuXHQgICAgICByZXR1cm4gb2JqO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIG9wdGlvbnMubG9va3VwUHJvcGVydHkob2JqLCBmaWVsZCk7XG5cdCAgfSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogMjkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgX2V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignd2l0aCcsIGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAyKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCcjd2l0aCByZXF1aXJlcyBleGFjdGx5IG9uZSBhcmd1bWVudCcpO1xuXHQgICAgfVxuXHQgICAgaWYgKF91dGlscy5pc0Z1bmN0aW9uKGNvbnRleHQpKSB7XG5cdCAgICAgIGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG5cblx0ICAgIGlmICghX3V0aWxzLmlzRW1wdHkoY29udGV4dCkpIHtcblx0ICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG5cdCAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcblx0ICAgICAgICBkYXRhID0gX3V0aWxzLmNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG5cdCAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IF91dGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG5cdCAgICAgICAgZGF0YTogZGF0YSxcblx0ICAgICAgICBibG9ja1BhcmFtczogX3V0aWxzLmJsb2NrUGFyYW1zKFtjb250ZXh0XSwgW2RhdGEgJiYgZGF0YS5jb250ZXh0UGF0aF0pXG5cdCAgICAgIH0pO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcblx0ICAgIH1cblx0ICB9KTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiAzMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLnJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMgPSByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzO1xuXG5cdHZhciBfZGVjb3JhdG9yc0lubGluZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpO1xuXG5cdHZhciBfZGVjb3JhdG9yc0lubGluZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWNvcmF0b3JzSW5saW5lKTtcblxuXHRmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG5cdCAgX2RlY29yYXRvcnNJbmxpbmUyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xuXHR9XG5cbi8qKiovIH0pLFxuLyogMzEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcblx0ICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24gKGZuLCBwcm9wcywgY29udGFpbmVyLCBvcHRpb25zKSB7XG5cdCAgICB2YXIgcmV0ID0gZm47XG5cdCAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG5cdCAgICAgIHByb3BzLnBhcnRpYWxzID0ge307XG5cdCAgICAgIHJldCA9IGZ1bmN0aW9uIChjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG5cdCAgICAgICAgdmFyIG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuXHQgICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IF91dGlscy5leHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG5cdCAgICAgICAgdmFyIHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuXHQgICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuXHQgICAgICAgIHJldHVybiByZXQ7XG5cdCAgICAgIH07XG5cdCAgICB9XG5cblx0ICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG5cdCAgICByZXR1cm4gcmV0O1xuXHQgIH0pO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9KSxcbi8qIDMyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblx0dmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGxvZ2dlciA9IHtcblx0ICBtZXRob2RNYXA6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG5cdCAgbGV2ZWw6ICdpbmZvJyxcblxuXHQgIC8vIE1hcHMgYSBnaXZlbiBsZXZlbCB2YWx1ZSB0byB0aGUgYG1ldGhvZE1hcGAgaW5kZXhlcyBhYm92ZS5cblx0ICBsb29rdXBMZXZlbDogZnVuY3Rpb24gbG9va3VwTGV2ZWwobGV2ZWwpIHtcblx0ICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgIHZhciBsZXZlbE1hcCA9IF91dGlscy5pbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuXHQgICAgICBpZiAobGV2ZWxNYXAgPj0gMCkge1xuXHQgICAgICAgIGxldmVsID0gbGV2ZWxNYXA7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgbGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBsZXZlbDtcblx0ICB9LFxuXG5cdCAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcblx0ICBsb2c6IGZ1bmN0aW9uIGxvZyhsZXZlbCkge1xuXHQgICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG5cdCAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGxvZ2dlci5sb29rdXBMZXZlbChsb2dnZXIubGV2ZWwpIDw9IGxldmVsKSB7XG5cdCAgICAgIHZhciBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcblx0ICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0ICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHtcblx0ICAgICAgICBtZXRob2QgPSAnbG9nJztcblx0ICAgICAgfVxuXG5cdCAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtZXNzYWdlID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHQgICAgICAgIG1lc3NhZ2VbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuXHQgICAgICB9XG5cblx0ICAgICAgY29uc29sZVttZXRob2RdLmFwcGx5KGNvbnNvbGUsIG1lc3NhZ2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0ICAgIH1cblx0ICB9XG5cdH07XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gbG9nZ2VyO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiAzMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX09iamVjdCRjcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVsnZGVmYXVsdCddO1xuXG5cdHZhciBfT2JqZWN0JGtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVsnZGVmYXVsdCddO1xuXG5cdHZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IF9fd2VicGFja19yZXF1aXJlX18oMylbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLmNyZWF0ZVByb3RvQWNjZXNzQ29udHJvbCA9IGNyZWF0ZVByb3RvQWNjZXNzQ29udHJvbDtcblx0ZXhwb3J0cy5yZXN1bHRJc0FsbG93ZWQgPSByZXN1bHRJc0FsbG93ZWQ7XG5cdGV4cG9ydHMucmVzZXRMb2dnZWRQcm9wZXJ0aWVzID0gcmVzZXRMb2dnZWRQcm9wZXJ0aWVzO1xuXG5cdHZhciBfY3JlYXRlTmV3TG9va3VwT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNik7XG5cblx0dmFyIF9sb2dnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcblxuXHR2YXIgbG9nZ2VyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2xvZ2dlcik7XG5cblx0dmFyIGxvZ2dlZFByb3BlcnRpZXMgPSBfT2JqZWN0JGNyZWF0ZShudWxsKTtcblxuXHRmdW5jdGlvbiBjcmVhdGVQcm90b0FjY2Vzc0NvbnRyb2wocnVudGltZU9wdGlvbnMpIHtcblx0ICB2YXIgZGVmYXVsdE1ldGhvZFdoaXRlTGlzdCA9IF9PYmplY3QkY3JlYXRlKG51bGwpO1xuXHQgIGRlZmF1bHRNZXRob2RXaGl0ZUxpc3RbJ2NvbnN0cnVjdG9yJ10gPSBmYWxzZTtcblx0ICBkZWZhdWx0TWV0aG9kV2hpdGVMaXN0WydfX2RlZmluZUdldHRlcl9fJ10gPSBmYWxzZTtcblx0ICBkZWZhdWx0TWV0aG9kV2hpdGVMaXN0WydfX2RlZmluZVNldHRlcl9fJ10gPSBmYWxzZTtcblx0ICBkZWZhdWx0TWV0aG9kV2hpdGVMaXN0WydfX2xvb2t1cEdldHRlcl9fJ10gPSBmYWxzZTtcblxuXHQgIHZhciBkZWZhdWx0UHJvcGVydHlXaGl0ZUxpc3QgPSBfT2JqZWN0JGNyZWF0ZShudWxsKTtcblx0ICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG9cblx0ICBkZWZhdWx0UHJvcGVydHlXaGl0ZUxpc3RbJ19fcHJvdG9fXyddID0gZmFsc2U7XG5cblx0ICByZXR1cm4ge1xuXHQgICAgcHJvcGVydGllczoge1xuXHQgICAgICB3aGl0ZWxpc3Q6IF9jcmVhdGVOZXdMb29rdXBPYmplY3QuY3JlYXRlTmV3TG9va3VwT2JqZWN0KGRlZmF1bHRQcm9wZXJ0eVdoaXRlTGlzdCwgcnVudGltZU9wdGlvbnMuYWxsb3dlZFByb3RvUHJvcGVydGllcyksXG5cdCAgICAgIGRlZmF1bHRWYWx1ZTogcnVudGltZU9wdGlvbnMuYWxsb3dQcm90b1Byb3BlcnRpZXNCeURlZmF1bHRcblx0ICAgIH0sXG5cdCAgICBtZXRob2RzOiB7XG5cdCAgICAgIHdoaXRlbGlzdDogX2NyZWF0ZU5ld0xvb2t1cE9iamVjdC5jcmVhdGVOZXdMb29rdXBPYmplY3QoZGVmYXVsdE1ldGhvZFdoaXRlTGlzdCwgcnVudGltZU9wdGlvbnMuYWxsb3dlZFByb3RvTWV0aG9kcyksXG5cdCAgICAgIGRlZmF1bHRWYWx1ZTogcnVudGltZU9wdGlvbnMuYWxsb3dQcm90b01ldGhvZHNCeURlZmF1bHRcblx0ICAgIH1cblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzdWx0SXNBbGxvd2VkKHJlc3VsdCwgcHJvdG9BY2Nlc3NDb250cm9sLCBwcm9wZXJ0eU5hbWUpIHtcblx0ICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcmV0dXJuIGNoZWNrV2hpdGVMaXN0KHByb3RvQWNjZXNzQ29udHJvbC5tZXRob2RzLCBwcm9wZXJ0eU5hbWUpO1xuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gY2hlY2tXaGl0ZUxpc3QocHJvdG9BY2Nlc3NDb250cm9sLnByb3BlcnRpZXMsIHByb3BlcnR5TmFtZSk7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tXaGl0ZUxpc3QocHJvdG9BY2Nlc3NDb250cm9sRm9yVHlwZSwgcHJvcGVydHlOYW1lKSB7XG5cdCAgaWYgKHByb3RvQWNjZXNzQ29udHJvbEZvclR5cGUud2hpdGVsaXN0W3Byb3BlcnR5TmFtZV0gIT09IHVuZGVmaW5lZCkge1xuXHQgICAgcmV0dXJuIHByb3RvQWNjZXNzQ29udHJvbEZvclR5cGUud2hpdGVsaXN0W3Byb3BlcnR5TmFtZV0gPT09IHRydWU7XG5cdCAgfVxuXHQgIGlmIChwcm90b0FjY2Vzc0NvbnRyb2xGb3JUeXBlLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICByZXR1cm4gcHJvdG9BY2Nlc3NDb250cm9sRm9yVHlwZS5kZWZhdWx0VmFsdWU7XG5cdCAgfVxuXHQgIGxvZ1VuZXhwZWNlZFByb3BlcnR5QWNjZXNzT25jZShwcm9wZXJ0eU5hbWUpO1xuXHQgIHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGxvZ1VuZXhwZWNlZFByb3BlcnR5QWNjZXNzT25jZShwcm9wZXJ0eU5hbWUpIHtcblx0ICBpZiAobG9nZ2VkUHJvcGVydGllc1twcm9wZXJ0eU5hbWVdICE9PSB0cnVlKSB7XG5cdCAgICBsb2dnZWRQcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB0cnVlO1xuXHQgICAgbG9nZ2VyLmxvZygnZXJyb3InLCAnSGFuZGxlYmFyczogQWNjZXNzIGhhcyBiZWVuIGRlbmllZCB0byByZXNvbHZlIHRoZSBwcm9wZXJ0eSBcIicgKyBwcm9wZXJ0eU5hbWUgKyAnXCIgYmVjYXVzZSBpdCBpcyBub3QgYW4gXCJvd24gcHJvcGVydHlcIiBvZiBpdHMgcGFyZW50LlxcbicgKyAnWW91IGNhbiBhZGQgYSBydW50aW1lIG9wdGlvbiB0byBkaXNhYmxlIHRoZSBjaGVjayBvciB0aGlzIHdhcm5pbmc6XFxuJyArICdTZWUgaHR0cHM6Ly9oYW5kbGViYXJzanMuY29tL2FwaS1yZWZlcmVuY2UvcnVudGltZS1vcHRpb25zLmh0bWwjb3B0aW9ucy10by1jb250cm9sLXByb3RvdHlwZS1hY2Nlc3MgZm9yIGRldGFpbHMnKTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiByZXNldExvZ2dlZFByb3BlcnRpZXMoKSB7XG5cdCAgX09iamVjdCRrZXlzKGxvZ2dlZFByb3BlcnRpZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuXHQgICAgZGVsZXRlIGxvZ2dlZFByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICB9KTtcblx0fVxuXG4vKioqLyB9KSxcbi8qIDM0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDM1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyICQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcblx0ICByZXR1cm4gJC5jcmVhdGUoUCwgRCk7XG5cdH07XG5cbi8qKiovIH0pLFxuLyogMzYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9PYmplY3QkY3JlYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNClbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLmNyZWF0ZU5ld0xvb2t1cE9iamVjdCA9IGNyZWF0ZU5ld0xvb2t1cE9iamVjdDtcblxuXHR2YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIFwibnVsbFwiLXByb3RvdHlwZSB0byBhdm9pZCB0cnV0aHkgcmVzdWx0cyBvbiBwcm90b3R5cGUgcHJvcGVydGllcy5cblx0ICogVGhlIHJlc3VsdGluZyBvYmplY3QgY2FuIGJlIHVzZWQgd2l0aCBcIm9iamVjdFtwcm9wZXJ0eV1cIiB0byBjaGVjayBpZiBhIHByb3BlcnR5IGV4aXN0c1xuXHQgKiBAcGFyYW0gey4uLm9iamVjdH0gc291cmNlcyBhIHZhcmFyZ3MgcGFyYW1ldGVyIG9mIHNvdXJjZSBvYmplY3RzIHRoYXQgd2lsbCBiZSBtZXJnZWRcblx0ICogQHJldHVybnMge29iamVjdH1cblx0ICovXG5cblx0ZnVuY3Rpb24gY3JlYXRlTmV3TG9va3VwT2JqZWN0KCkge1xuXHQgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzb3VyY2VzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdCAgICBzb3VyY2VzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHQgIH1cblxuXHQgIHJldHVybiBfdXRpbHMuZXh0ZW5kLmFwcGx5KHVuZGVmaW5lZCwgW19PYmplY3QkY3JlYXRlKG51bGwpXS5jb25jYXQoc291cmNlcykpO1xuXHR9XG5cbi8qKiovIH0pLFxuLyogMzcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0ZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcblx0ICB0aGlzLnN0cmluZyA9IHN0cmluZztcblx0fVxuXG5cdFNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xuXHR9O1xuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNhZmVTdHJpbmc7XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG4vKioqLyB9KSxcbi8qIDM4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfT2JqZWN0JHNlYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVsnZGVmYXVsdCddO1xuXG5cdHZhciBfT2JqZWN0JGtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVsnZGVmYXVsdCddO1xuXG5cdHZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IF9fd2VicGFja19yZXF1aXJlX18oMylbJ2RlZmF1bHQnXTtcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uO1xuXHRleHBvcnRzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG5cdGV4cG9ydHMud3JhcFByb2dyYW0gPSB3cmFwUHJvZ3JhbTtcblx0ZXhwb3J0cy5yZXNvbHZlUGFydGlhbCA9IHJlc29sdmVQYXJ0aWFsO1xuXHRleHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO1xuXHRleHBvcnRzLm5vb3AgPSBub29wO1xuXG5cdHZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlscyk7XG5cblx0dmFyIF9leGNlcHRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfZXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4Y2VwdGlvbik7XG5cblx0dmFyIF9iYXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgX2hlbHBlcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHR2YXIgX2ludGVybmFsV3JhcEhlbHBlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpO1xuXG5cdHZhciBfaW50ZXJuYWxQcm90b0FjY2VzcyA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpO1xuXG5cdGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG5cdCAgdmFyIGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG5cdCAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IF9iYXNlLkNPTVBJTEVSX1JFVklTSU9OO1xuXG5cdCAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPj0gX2Jhc2UuTEFTVF9DT01QQVRJQkxFX0NPTVBJTEVSX1JFVklTSU9OICYmIGNvbXBpbGVyUmV2aXNpb24gPD0gX2Jhc2UuQ09NUElMRVJfUkVWSVNJT04pIHtcblx0ICAgIHJldHVybjtcblx0ICB9XG5cblx0ICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IF9iYXNlLkxBU1RfQ09NUEFUSUJMRV9DT01QSUxFUl9SRVZJU0lPTikge1xuXHQgICAgdmFyIHJ1bnRpbWVWZXJzaW9ucyA9IF9iYXNlLlJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcblx0ICAgICAgICBjb21waWxlclZlcnNpb25zID0gX2Jhc2UuUkVWSVNJT05fQ0hBTkdFU1tjb21waWxlclJldmlzaW9uXTtcblx0ICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICsgJ1BsZWFzZSB1cGRhdGUgeW91ciBwcmVjb21waWxlciB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBydW50aW1lVmVyc2lvbnMgKyAnKSBvciBkb3duZ3JhZGUgeW91ciBydW50aW1lIHRvIGFuIG9sZGVyIHZlcnNpb24gKCcgKyBjb21waWxlclZlcnNpb25zICsgJykuJyk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIC8vIFVzZSB0aGUgZW1iZWRkZWQgdmVyc2lvbiBpbmZvIHNpbmNlIHRoZSBydW50aW1lIGRvZXNuJ3Qga25vdyBhYm91dCB0aGlzIHJldmlzaW9uIHlldFxuXHQgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArICdQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKCcgKyBjb21waWxlckluZm9bMV0gKyAnKS4nKTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuXHQgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdCAgaWYgKCFlbnYpIHtcblx0ICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcblx0ICB9XG5cdCAgaWYgKCF0ZW1wbGF0ZVNwZWMgfHwgIXRlbXBsYXRlU3BlYy5tYWluKSB7XG5cdCAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcblx0ICB9XG5cblx0ICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG5cdCAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcblx0ICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHNldWRvLXN1cHBvcnRlZCBBUElzLlxuXHQgIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cblx0ICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBmb3IgcHJlY29tcGlsZWQgdGVtcGxhdGVzIHdpdGggY29tcGlsZXItdmVyc2lvbiA3ICg8NC4zLjApXG5cdCAgdmFyIHRlbXBsYXRlV2FzUHJlY29tcGlsZWRXaXRoQ29tcGlsZXJWNyA9IHRlbXBsYXRlU3BlYy5jb21waWxlciAmJiB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJbMF0gPT09IDc7XG5cblx0ICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG5cdCAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG5cdCAgICAgIGlmIChvcHRpb25zLmlkcykge1xuXHQgICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG5cdCAgICB2YXIgZXh0ZW5kZWRPcHRpb25zID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLCB7XG5cdCAgICAgIGhvb2tzOiB0aGlzLmhvb2tzLFxuXHQgICAgICBwcm90b0FjY2Vzc0NvbnRyb2w6IHRoaXMucHJvdG9BY2Nlc3NDb250cm9sXG5cdCAgICB9KTtcblxuXHQgICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgZXh0ZW5kZWRPcHRpb25zKTtcblxuXHQgICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG5cdCAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG5cdCAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBleHRlbmRlZE9wdGlvbnMpO1xuXHQgICAgfVxuXHQgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG5cdCAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuXHQgICAgICAgIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcblx0ICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICB9XG5cblx0ICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgLy8gSnVzdCBhZGQgd2F0ZXJcblx0ICB2YXIgY29udGFpbmVyID0ge1xuXHQgICAgc3RyaWN0OiBmdW5jdGlvbiBzdHJpY3Qob2JqLCBuYW1lLCBsb2MpIHtcblx0ICAgICAgaWYgKCFvYmogfHwgIShuYW1lIGluIG9iaikpIHtcblx0ICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqLCB7XG5cdCAgICAgICAgICBsb2M6IGxvY1xuXHQgICAgICAgIH0pO1xuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBjb250YWluZXIubG9va3VwUHJvcGVydHkob2JqLCBuYW1lKTtcblx0ICAgIH0sXG5cdCAgICBsb29rdXBQcm9wZXJ0eTogZnVuY3Rpb24gbG9va3VwUHJvcGVydHkocGFyZW50LCBwcm9wZXJ0eU5hbWUpIHtcblx0ICAgICAgdmFyIHJlc3VsdCA9IHBhcmVudFtwcm9wZXJ0eU5hbWVdO1xuXHQgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcblx0ICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgICB9XG5cdCAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocGFyZW50LCBwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgICAgfVxuXG5cdCAgICAgIGlmIChfaW50ZXJuYWxQcm90b0FjY2Vzcy5yZXN1bHRJc0FsbG93ZWQocmVzdWx0LCBjb250YWluZXIucHJvdG9BY2Nlc3NDb250cm9sLCBwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXHQgICAgfSxcblx0ICAgIGxvb2t1cDogZnVuY3Rpb24gbG9va3VwKGRlcHRocywgbmFtZSkge1xuXHQgICAgICB2YXIgbGVuID0gZGVwdGhzLmxlbmd0aDtcblx0ICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBkZXB0aHNbaV0gJiYgY29udGFpbmVyLmxvb2t1cFByb3BlcnR5KGRlcHRoc1tpXSwgbmFtZSk7XG5cdCAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG5cdCAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGxhbWJkYTogZnVuY3Rpb24gbGFtYmRhKGN1cnJlbnQsIGNvbnRleHQpIHtcblx0ICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcblx0ICAgIH0sXG5cblx0ICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG5cdCAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuXHQgICAgZm46IGZ1bmN0aW9uIGZuKGkpIHtcblx0ICAgICAgdmFyIHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcblx0ICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG5cdCAgICAgIHJldHVybiByZXQ7XG5cdCAgICB9LFxuXG5cdCAgICBwcm9ncmFtczogW10sXG5cdCAgICBwcm9ncmFtOiBmdW5jdGlvbiBwcm9ncmFtKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcblx0ICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSxcblx0ICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcblx0ICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcblx0ICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHdyYXBQcm9ncmFtKHRoaXMsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcblx0ICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcblx0ICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuXHQgICAgfSxcblxuXHQgICAgZGF0YTogZnVuY3Rpb24gZGF0YSh2YWx1ZSwgZGVwdGgpIHtcblx0ICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcblx0ICAgICAgICB2YWx1ZSA9IHZhbHVlLl9wYXJlbnQ7XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHZhbHVlO1xuXHQgICAgfSxcblx0ICAgIG1lcmdlSWZOZWVkZWQ6IGZ1bmN0aW9uIG1lcmdlSWZOZWVkZWQocGFyYW0sIGNvbW1vbikge1xuXHQgICAgICB2YXIgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG5cdCAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgcGFyYW0gIT09IGNvbW1vbikge1xuXHQgICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG5cdCAgICAgIH1cblxuXHQgICAgICByZXR1cm4gb2JqO1xuXHQgICAgfSxcblx0ICAgIC8vIEFuIGVtcHR5IG9iamVjdCB0byB1c2UgYXMgcmVwbGFjZW1lbnQgZm9yIG51bGwtY29udGV4dHNcblx0ICAgIG51bGxDb250ZXh0OiBfT2JqZWN0JHNlYWwoe30pLFxuXG5cdCAgICBub29wOiBlbnYuVk0ubm9vcCxcblx0ICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG5cdCAgfTtcblxuXHQgIGZ1bmN0aW9uIHJldChjb250ZXh0KSB7XG5cdCAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuXHQgICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcblx0ICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsICYmIHRlbXBsYXRlU3BlYy51c2VEYXRhKSB7XG5cdCAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcblx0ICAgIH1cblx0ICAgIHZhciBkZXB0aHMgPSB1bmRlZmluZWQsXG5cdCAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcblx0ICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG5cdCAgICAgIGlmIChvcHRpb25zLmRlcHRocykge1xuXHQgICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGRlcHRocyA9IFtjb250ZXh0XTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBtYWluKGNvbnRleHQgLyosIG9wdGlvbnMqLykge1xuXHQgICAgICByZXR1cm4gJycgKyB0ZW1wbGF0ZVNwZWMubWFpbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuXHQgICAgfVxuXG5cdCAgICBtYWluID0gZXhlY3V0ZURlY29yYXRvcnModGVtcGxhdGVTcGVjLm1haW4sIG1haW4sIGNvbnRhaW5lciwgb3B0aW9ucy5kZXB0aHMgfHwgW10sIGRhdGEsIGJsb2NrUGFyYW1zKTtcblx0ICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuXHQgIH1cblxuXHQgIHJldC5pc1RvcCA9IHRydWU7XG5cblx0ICByZXQuX3NldHVwID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0ICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG5cdCAgICAgIHZhciBtZXJnZWRIZWxwZXJzID0gVXRpbHMuZXh0ZW5kKHt9LCBlbnYuaGVscGVycywgb3B0aW9ucy5oZWxwZXJzKTtcblx0ICAgICAgd3JhcEhlbHBlcnNUb1Bhc3NMb29rdXBQcm9wZXJ0eShtZXJnZWRIZWxwZXJzLCBjb250YWluZXIpO1xuXHQgICAgICBjb250YWluZXIuaGVscGVycyA9IG1lcmdlZEhlbHBlcnM7XG5cblx0ICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG5cdCAgICAgICAgLy8gVXNlIG1lcmdlSWZOZWVkZWQgaGVyZSB0byBwcmV2ZW50IGNvbXBpbGluZyBnbG9iYWwgcGFydGlhbHMgbXVsdGlwbGUgdGltZXNcblx0ICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2VJZk5lZWRlZChvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuXHQgICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gVXRpbHMuZXh0ZW5kKHt9LCBlbnYuZGVjb3JhdG9ycywgb3B0aW9ucy5kZWNvcmF0b3JzKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGNvbnRhaW5lci5ob29rcyA9IHt9O1xuXHQgICAgICBjb250YWluZXIucHJvdG9BY2Nlc3NDb250cm9sID0gX2ludGVybmFsUHJvdG9BY2Nlc3MuY3JlYXRlUHJvdG9BY2Nlc3NDb250cm9sKG9wdGlvbnMpO1xuXG5cdCAgICAgIHZhciBrZWVwSGVscGVySW5IZWxwZXJzID0gb3B0aW9ucy5hbGxvd0NhbGxzVG9IZWxwZXJNaXNzaW5nIHx8IHRlbXBsYXRlV2FzUHJlY29tcGlsZWRXaXRoQ29tcGlsZXJWNztcblx0ICAgICAgX2hlbHBlcnMubW92ZUhlbHBlclRvSG9va3MoY29udGFpbmVyLCAnaGVscGVyTWlzc2luZycsIGtlZXBIZWxwZXJJbkhlbHBlcnMpO1xuXHQgICAgICBfaGVscGVycy5tb3ZlSGVscGVyVG9Ib29rcyhjb250YWluZXIsICdibG9ja0hlbHBlck1pc3NpbmcnLCBrZWVwSGVscGVySW5IZWxwZXJzKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGNvbnRhaW5lci5wcm90b0FjY2Vzc0NvbnRyb2wgPSBvcHRpb25zLnByb3RvQWNjZXNzQ29udHJvbDsgLy8gaW50ZXJuYWwgb3B0aW9uXG5cdCAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuXHQgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuXHQgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcblx0ICAgICAgY29udGFpbmVyLmhvb2tzID0gb3B0aW9ucy5ob29rcztcblx0ICAgIH1cblx0ICB9O1xuXG5cdCAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uIChpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG5cdCAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuXHQgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuXHQgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcblx0ICB9O1xuXHQgIHJldHVybiByZXQ7XG5cdH1cblxuXHRmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG5cdCAgZnVuY3Rpb24gcHJvZyhjb250ZXh0KSB7XG5cdCAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdCAgICB2YXIgY3VycmVudERlcHRocyA9IGRlcHRocztcblx0ICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuXHQgICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gZm4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBvcHRpb25zLmRhdGEgfHwgZGF0YSwgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksIGN1cnJlbnREZXB0aHMpO1xuXHQgIH1cblxuXHQgIHByb2cgPSBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKTtcblxuXHQgIHByb2cucHJvZ3JhbSA9IGk7XG5cdCAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuXHQgIHByb2cuYmxvY2tQYXJhbXMgPSBkZWNsYXJlZEJsb2NrUGFyYW1zIHx8IDA7XG5cdCAgcmV0dXJuIHByb2c7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBpcyBjdXJyZW50bHkgcGFydCBvZiB0aGUgb2ZmaWNpYWwgQVBJLCB0aGVyZWZvcmUgaW1wbGVtZW50YXRpb24gZGV0YWlscyBzaG91bGQgbm90IGJlIGNoYW5nZWQuXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcblx0ICBpZiAoIXBhcnRpYWwpIHtcblx0ICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcblx0ICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcblx0ICAgIH1cblx0ICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuXHQgICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG5cdCAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuXHQgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG5cdCAgfVxuXHQgIHJldHVybiBwYXJ0aWFsO1xuXHR9XG5cblx0ZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG5cdCAgLy8gVXNlIHRoZSBjdXJyZW50IGNsb3N1cmUgY29udGV4dCB0byBzYXZlIHRoZSBwYXJ0aWFsLWJsb2NrIGlmIHRoaXMgcGFydGlhbFxuXHQgIHZhciBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuXHQgIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG5cdCAgaWYgKG9wdGlvbnMuaWRzKSB7XG5cdCAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG5cdCAgfVxuXG5cdCAgdmFyIHBhcnRpYWxCbG9jayA9IHVuZGVmaW5lZDtcblx0ICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICBvcHRpb25zLmRhdGEgPSBfYmFzZS5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuXHQgICAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG5cdCAgICAgIHZhciBmbiA9IG9wdGlvbnMuZm47XG5cdCAgICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0KSB7XG5cdCAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgICAgICAgIC8vIFJlc3RvcmUgdGhlIHBhcnRpYWwtYmxvY2sgZnJvbSB0aGUgY2xvc3VyZSBmb3IgdGhlIGV4ZWN1dGlvbiBvZiB0aGUgYmxvY2tcblx0ICAgICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cblx0ICAgICAgICBvcHRpb25zLmRhdGEgPSBfYmFzZS5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuXHQgICAgICAgIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gY3VycmVudFBhcnRpYWxCbG9jaztcblx0ICAgICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG5cdCAgICAgIH07XG5cdCAgICAgIGlmIChmbi5wYXJ0aWFscykge1xuXHQgICAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcblx0ICAgICAgfVxuXHQgICAgfSkoKTtcblx0ICB9XG5cblx0ICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuXHQgICAgcGFydGlhbCA9IHBhcnRpYWxCbG9jaztcblx0ICB9XG5cblx0ICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG5cdCAgfSBlbHNlIGlmIChwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcblx0ICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIG5vb3AoKSB7XG5cdCAgcmV0dXJuICcnO1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuXHQgIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuXHQgICAgZGF0YSA9IGRhdGEgPyBfYmFzZS5jcmVhdGVGcmFtZShkYXRhKSA6IHt9O1xuXHQgICAgZGF0YS5yb290ID0gY29udGV4dDtcblx0ICB9XG5cdCAgcmV0dXJuIGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG5cdCAgaWYgKGZuLmRlY29yYXRvcikge1xuXHQgICAgdmFyIHByb3BzID0ge307XG5cdCAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuXHQgICAgVXRpbHMuZXh0ZW5kKHByb2csIHByb3BzKTtcblx0ICB9XG5cdCAgcmV0dXJuIHByb2c7XG5cdH1cblxuXHRmdW5jdGlvbiB3cmFwSGVscGVyc1RvUGFzc0xvb2t1cFByb3BlcnR5KG1lcmdlZEhlbHBlcnMsIGNvbnRhaW5lcikge1xuXHQgIF9PYmplY3Qka2V5cyhtZXJnZWRIZWxwZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChoZWxwZXJOYW1lKSB7XG5cdCAgICB2YXIgaGVscGVyID0gbWVyZ2VkSGVscGVyc1toZWxwZXJOYW1lXTtcblx0ICAgIG1lcmdlZEhlbHBlcnNbaGVscGVyTmFtZV0gPSBwYXNzTG9va3VwUHJvcGVydHlPcHRpb24oaGVscGVyLCBjb250YWluZXIpO1xuXHQgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFzc0xvb2t1cFByb3BlcnR5T3B0aW9uKGhlbHBlciwgY29udGFpbmVyKSB7XG5cdCAgdmFyIGxvb2t1cFByb3BlcnR5ID0gY29udGFpbmVyLmxvb2t1cFByb3BlcnR5O1xuXHQgIHJldHVybiBfaW50ZXJuYWxXcmFwSGVscGVyLndyYXBIZWxwZXIoaGVscGVyLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHQgICAgcmV0dXJuIFV0aWxzLmV4dGVuZCh7IGxvb2t1cFByb3BlcnR5OiBsb29rdXBQcm9wZXJ0eSB9LCBvcHRpb25zKTtcblx0ICB9KTtcblx0fVxuXG4vKioqLyB9KSxcbi8qIDM5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG4vKioqLyB9KSxcbi8qIDQwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0MSk7XG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSkuT2JqZWN0LnNlYWw7XG5cbi8qKiovIH0pLFxuLyogNDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyAxOS4xLjIuMTcgT2JqZWN0LnNlYWwoTylcblx0dmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cblx0X193ZWJwYWNrX3JlcXVpcmVfXygxOCkoJ3NlYWwnLCBmdW5jdGlvbigkc2VhbCl7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIHNlYWwoaXQpe1xuXHQgICAgcmV0dXJuICRzZWFsICYmIGlzT2JqZWN0KGl0KSA/ICRzZWFsKGl0KSA6IGl0O1xuXHQgIH07XG5cdH0pO1xuXG4vKioqLyB9KSxcbi8qIDQyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG5cdCAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcblx0fTtcblxuLyoqKi8gfSksXG4vKiA0MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLndyYXBIZWxwZXIgPSB3cmFwSGVscGVyO1xuXG5cdGZ1bmN0aW9uIHdyYXBIZWxwZXIoaGVscGVyLCB0cmFuc2Zvcm1PcHRpb25zRm4pIHtcblx0ICBpZiAodHlwZW9mIGhlbHBlciAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgLy8gVGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IGFwcGFyZW50bHkgaXQgZG9lcyBpbiBodHRwczovL2dpdGh1Yi5jb20vd3ljYXRzL2hhbmRsZWJhcnMuanMvaXNzdWVzLzE2Mzlcblx0ICAgIC8vIFdlIHRyeSB0byBtYWtlIHRoZSB3cmFwcGVyIGxlYXN0LWludmFzaXZlIGJ5IG5vdCB3cmFwcGluZyBpdCwgaWYgdGhlIGhlbHBlciBpcyBub3QgYSBmdW5jdGlvbi5cblx0ICAgIHJldHVybiBoZWxwZXI7XG5cdCAgfVxuXHQgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24gd3JhcHBlcigpIC8qIGR5bmFtaWMgYXJndW1lbnRzICove1xuXHQgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuXHQgICAgYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXSA9IHRyYW5zZm9ybU9wdGlvbnNGbihvcHRpb25zKTtcblx0ICAgIHJldHVybiBoZWxwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICB9O1xuXHQgIHJldHVybiB3cmFwcGVyO1xuXHR9XG5cbi8qKiovIH0pLFxuLyogNDQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKEhhbmRsZWJhcnMpIHtcblx0ICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG5cdCAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuXHQgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdCAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuXHQgICAgICByb290LkhhbmRsZWJhcnMgPSAkSGFuZGxlYmFycztcblx0ICAgIH1cblx0ICAgIHJldHVybiBIYW5kbGViYXJzO1xuXHQgIH07XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSksXG4vKiA0NSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHR2YXIgQVNUID0ge1xuXHQgIC8vIFB1YmxpYyBBUEkgdXNlZCB0byBldmFsdWF0ZSBkZXJpdmVkIGF0dHJpYnV0ZXMgcmVnYXJkaW5nIEFTVCBub2Rlc1xuXHQgIGhlbHBlcnM6IHtcblx0ICAgIC8vIGEgbXVzdGFjaGUgaXMgZGVmaW5pdGVseSBhIGhlbHBlciBpZjpcblx0ICAgIC8vICogaXQgaXMgYW4gZWxpZ2libGUgaGVscGVyLCBhbmRcblx0ICAgIC8vICogaXQgaGFzIGF0IGxlYXN0IG9uZSBwYXJhbWV0ZXIgb3IgaGFzaCBzZWdtZW50XG5cdCAgICBoZWxwZXJFeHByZXNzaW9uOiBmdW5jdGlvbiBoZWxwZXJFeHByZXNzaW9uKG5vZGUpIHtcblx0ICAgICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ1N1YkV4cHJlc3Npb24nIHx8IChub2RlLnR5cGUgPT09ICdNdXN0YWNoZVN0YXRlbWVudCcgfHwgbm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSAmJiAhIShub2RlLnBhcmFtcyAmJiBub2RlLnBhcmFtcy5sZW5ndGggfHwgbm9kZS5oYXNoKTtcblx0ICAgIH0sXG5cblx0ICAgIHNjb3BlZElkOiBmdW5jdGlvbiBzY29wZWRJZChwYXRoKSB7XG5cdCAgICAgIHJldHVybiAoL15cXC58dGhpc1xcYi8udGVzdChwYXRoLm9yaWdpbmFsKVxuXHQgICAgICApO1xuXHQgICAgfSxcblxuXHQgICAgLy8gYW4gSUQgaXMgc2ltcGxlIGlmIGl0IG9ubHkgaGFzIG9uZSBwYXJ0LCBhbmQgdGhhdCBwYXJ0IGlzIG5vdFxuXHQgICAgLy8gYC4uYCBvciBgdGhpc2AuXG5cdCAgICBzaW1wbGVJZDogZnVuY3Rpb24gc2ltcGxlSWQocGF0aCkge1xuXHQgICAgICByZXR1cm4gcGF0aC5wYXJ0cy5sZW5ndGggPT09IDEgJiYgIUFTVC5oZWxwZXJzLnNjb3BlZElkKHBhdGgpICYmICFwYXRoLmRlcHRoO1xuXHQgICAgfVxuXHQgIH1cblx0fTtcblxuXHQvLyBNdXN0IGJlIGV4cG9ydGVkIGFzIGFuIG9iamVjdCByYXRoZXIgdGhhbiB0aGUgcm9vdCBvZiB0aGUgbW9kdWxlIGFzIHRoZSBqaXNvbiBsZXhlclxuXHQvLyBtdXN0IG1vZGlmeSB0aGUgb2JqZWN0IHRvIG9wZXJhdGUgcHJvcGVybHkuXG5cdGV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFTVDtcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogNDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKVsnZGVmYXVsdCddO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHMucGFyc2VXaXRob3V0UHJvY2Vzc2luZyA9IHBhcnNlV2l0aG91dFByb2Nlc3Npbmc7XG5cdGV4cG9ydHMucGFyc2UgPSBwYXJzZTtcblxuXHR2YXIgX3BhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oNDcpO1xuXG5cdHZhciBfcGFyc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlcik7XG5cblx0dmFyIF93aGl0ZXNwYWNlQ29udHJvbCA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpO1xuXG5cdHZhciBfd2hpdGVzcGFjZUNvbnRyb2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2hpdGVzcGFjZUNvbnRyb2wpO1xuXG5cdHZhciBfaGVscGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oNTApO1xuXG5cdHZhciBIZWxwZXJzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2hlbHBlcnMpO1xuXG5cdHZhciBfdXRpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdGV4cG9ydHMucGFyc2VyID0gX3BhcnNlcjJbJ2RlZmF1bHQnXTtcblxuXHR2YXIgeXkgPSB7fTtcblx0X3V0aWxzLmV4dGVuZCh5eSwgSGVscGVycyk7XG5cblx0ZnVuY3Rpb24gcGFyc2VXaXRob3V0UHJvY2Vzc2luZyhpbnB1dCwgb3B0aW9ucykge1xuXHQgIC8vIEp1c3QgcmV0dXJuIGlmIGFuIGFscmVhZHktY29tcGlsZWQgQVNUIHdhcyBwYXNzZWQgaW4uXG5cdCAgaWYgKGlucHV0LnR5cGUgPT09ICdQcm9ncmFtJykge1xuXHQgICAgcmV0dXJuIGlucHV0O1xuXHQgIH1cblxuXHQgIF9wYXJzZXIyWydkZWZhdWx0J10ueXkgPSB5eTtcblxuXHQgIC8vIEFsdGVyaW5nIHRoZSBzaGFyZWQgb2JqZWN0IGhlcmUsIGJ1dCB0aGlzIGlzIG9rIGFzIHBhcnNlciBpcyBhIHN5bmMgb3BlcmF0aW9uXG5cdCAgeXkubG9jSW5mbyA9IGZ1bmN0aW9uIChsb2NJbmZvKSB7XG5cdCAgICByZXR1cm4gbmV3IHl5LlNvdXJjZUxvY2F0aW9uKG9wdGlvbnMgJiYgb3B0aW9ucy5zcmNOYW1lLCBsb2NJbmZvKTtcblx0ICB9O1xuXG5cdCAgdmFyIGFzdCA9IF9wYXJzZXIyWydkZWZhdWx0J10ucGFyc2UoaW5wdXQpO1xuXG5cdCAgcmV0dXJuIGFzdDtcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlKGlucHV0LCBvcHRpb25zKSB7XG5cdCAgdmFyIGFzdCA9IHBhcnNlV2l0aG91dFByb2Nlc3NpbmcoaW5wdXQsIG9wdGlvbnMpO1xuXHQgIHZhciBzdHJpcCA9IG5ldyBfd2hpdGVzcGFjZUNvbnRyb2wyWydkZWZhdWx0J10ob3B0aW9ucyk7XG5cblx0ICByZXR1cm4gc3RyaXAuYWNjZXB0KGFzdCk7XG5cdH1cblxuLyoqKi8gfSksXG4vKiA0NyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIEZpbGUgaWdub3JlZCBpbiBjb3ZlcmFnZSB0ZXN0cyB2aWEgc2V0dGluZyBpbiAuaXN0YW5idWwueW1sXG5cdC8qIEppc29uIGdlbmVyYXRlZCBwYXJzZXIgKi9cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0dmFyIGhhbmRsZWJhcnMgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIHBhcnNlciA9IHsgdHJhY2U6IGZ1bmN0aW9uIHRyYWNlKCkge30sXG5cdCAgICAgICAgeXk6IHt9LFxuXHQgICAgICAgIHN5bWJvbHNfOiB7IFwiZXJyb3JcIjogMiwgXCJyb290XCI6IDMsIFwicHJvZ3JhbVwiOiA0LCBcIkVPRlwiOiA1LCBcInByb2dyYW1fcmVwZXRpdGlvbjBcIjogNiwgXCJzdGF0ZW1lbnRcIjogNywgXCJtdXN0YWNoZVwiOiA4LCBcImJsb2NrXCI6IDksIFwicmF3QmxvY2tcIjogMTAsIFwicGFydGlhbFwiOiAxMSwgXCJwYXJ0aWFsQmxvY2tcIjogMTIsIFwiY29udGVudFwiOiAxMywgXCJDT01NRU5UXCI6IDE0LCBcIkNPTlRFTlRcIjogMTUsIFwib3BlblJhd0Jsb2NrXCI6IDE2LCBcInJhd0Jsb2NrX3JlcGV0aXRpb24wXCI6IDE3LCBcIkVORF9SQVdfQkxPQ0tcIjogMTgsIFwiT1BFTl9SQVdfQkxPQ0tcIjogMTksIFwiaGVscGVyTmFtZVwiOiAyMCwgXCJvcGVuUmF3QmxvY2tfcmVwZXRpdGlvbjBcIjogMjEsIFwib3BlblJhd0Jsb2NrX29wdGlvbjBcIjogMjIsIFwiQ0xPU0VfUkFXX0JMT0NLXCI6IDIzLCBcIm9wZW5CbG9ja1wiOiAyNCwgXCJibG9ja19vcHRpb24wXCI6IDI1LCBcImNsb3NlQmxvY2tcIjogMjYsIFwib3BlbkludmVyc2VcIjogMjcsIFwiYmxvY2tfb3B0aW9uMVwiOiAyOCwgXCJPUEVOX0JMT0NLXCI6IDI5LCBcIm9wZW5CbG9ja19yZXBldGl0aW9uMFwiOiAzMCwgXCJvcGVuQmxvY2tfb3B0aW9uMFwiOiAzMSwgXCJvcGVuQmxvY2tfb3B0aW9uMVwiOiAzMiwgXCJDTE9TRVwiOiAzMywgXCJPUEVOX0lOVkVSU0VcIjogMzQsIFwib3BlbkludmVyc2VfcmVwZXRpdGlvbjBcIjogMzUsIFwib3BlbkludmVyc2Vfb3B0aW9uMFwiOiAzNiwgXCJvcGVuSW52ZXJzZV9vcHRpb24xXCI6IDM3LCBcIm9wZW5JbnZlcnNlQ2hhaW5cIjogMzgsIFwiT1BFTl9JTlZFUlNFX0NIQUlOXCI6IDM5LCBcIm9wZW5JbnZlcnNlQ2hhaW5fcmVwZXRpdGlvbjBcIjogNDAsIFwib3BlbkludmVyc2VDaGFpbl9vcHRpb24wXCI6IDQxLCBcIm9wZW5JbnZlcnNlQ2hhaW5fb3B0aW9uMVwiOiA0MiwgXCJpbnZlcnNlQW5kUHJvZ3JhbVwiOiA0MywgXCJJTlZFUlNFXCI6IDQ0LCBcImludmVyc2VDaGFpblwiOiA0NSwgXCJpbnZlcnNlQ2hhaW5fb3B0aW9uMFwiOiA0NiwgXCJPUEVOX0VOREJMT0NLXCI6IDQ3LCBcIk9QRU5cIjogNDgsIFwibXVzdGFjaGVfcmVwZXRpdGlvbjBcIjogNDksIFwibXVzdGFjaGVfb3B0aW9uMFwiOiA1MCwgXCJPUEVOX1VORVNDQVBFRFwiOiA1MSwgXCJtdXN0YWNoZV9yZXBldGl0aW9uMVwiOiA1MiwgXCJtdXN0YWNoZV9vcHRpb24xXCI6IDUzLCBcIkNMT1NFX1VORVNDQVBFRFwiOiA1NCwgXCJPUEVOX1BBUlRJQUxcIjogNTUsIFwicGFydGlhbE5hbWVcIjogNTYsIFwicGFydGlhbF9yZXBldGl0aW9uMFwiOiA1NywgXCJwYXJ0aWFsX29wdGlvbjBcIjogNTgsIFwib3BlblBhcnRpYWxCbG9ja1wiOiA1OSwgXCJPUEVOX1BBUlRJQUxfQkxPQ0tcIjogNjAsIFwib3BlblBhcnRpYWxCbG9ja19yZXBldGl0aW9uMFwiOiA2MSwgXCJvcGVuUGFydGlhbEJsb2NrX29wdGlvbjBcIjogNjIsIFwicGFyYW1cIjogNjMsIFwic2V4cHJcIjogNjQsIFwiT1BFTl9TRVhQUlwiOiA2NSwgXCJzZXhwcl9yZXBldGl0aW9uMFwiOiA2NiwgXCJzZXhwcl9vcHRpb24wXCI6IDY3LCBcIkNMT1NFX1NFWFBSXCI6IDY4LCBcImhhc2hcIjogNjksIFwiaGFzaF9yZXBldGl0aW9uX3BsdXMwXCI6IDcwLCBcImhhc2hTZWdtZW50XCI6IDcxLCBcIklEXCI6IDcyLCBcIkVRVUFMU1wiOiA3MywgXCJibG9ja1BhcmFtc1wiOiA3NCwgXCJPUEVOX0JMT0NLX1BBUkFNU1wiOiA3NSwgXCJibG9ja1BhcmFtc19yZXBldGl0aW9uX3BsdXMwXCI6IDc2LCBcIkNMT1NFX0JMT0NLX1BBUkFNU1wiOiA3NywgXCJwYXRoXCI6IDc4LCBcImRhdGFOYW1lXCI6IDc5LCBcIlNUUklOR1wiOiA4MCwgXCJOVU1CRVJcIjogODEsIFwiQk9PTEVBTlwiOiA4MiwgXCJVTkRFRklORURcIjogODMsIFwiTlVMTFwiOiA4NCwgXCJEQVRBXCI6IDg1LCBcInBhdGhTZWdtZW50c1wiOiA4NiwgXCJTRVBcIjogODcsIFwiJGFjY2VwdFwiOiAwLCBcIiRlbmRcIjogMSB9LFxuXHQgICAgICAgIHRlcm1pbmFsc186IHsgMjogXCJlcnJvclwiLCA1OiBcIkVPRlwiLCAxNDogXCJDT01NRU5UXCIsIDE1OiBcIkNPTlRFTlRcIiwgMTg6IFwiRU5EX1JBV19CTE9DS1wiLCAxOTogXCJPUEVOX1JBV19CTE9DS1wiLCAyMzogXCJDTE9TRV9SQVdfQkxPQ0tcIiwgMjk6IFwiT1BFTl9CTE9DS1wiLCAzMzogXCJDTE9TRVwiLCAzNDogXCJPUEVOX0lOVkVSU0VcIiwgMzk6IFwiT1BFTl9JTlZFUlNFX0NIQUlOXCIsIDQ0OiBcIklOVkVSU0VcIiwgNDc6IFwiT1BFTl9FTkRCTE9DS1wiLCA0ODogXCJPUEVOXCIsIDUxOiBcIk9QRU5fVU5FU0NBUEVEXCIsIDU0OiBcIkNMT1NFX1VORVNDQVBFRFwiLCA1NTogXCJPUEVOX1BBUlRJQUxcIiwgNjA6IFwiT1BFTl9QQVJUSUFMX0JMT0NLXCIsIDY1OiBcIk9QRU5fU0VYUFJcIiwgNjg6IFwiQ0xPU0VfU0VYUFJcIiwgNzI6IFwiSURcIiwgNzM6IFwiRVFVQUxTXCIsIDc1OiBcIk9QRU5fQkxPQ0tfUEFSQU1TXCIsIDc3OiBcIkNMT1NFX0JMT0NLX1BBUkFNU1wiLCA4MDogXCJTVFJJTkdcIiwgODE6IFwiTlVNQkVSXCIsIDgyOiBcIkJPT0xFQU5cIiwgODM6IFwiVU5ERUZJTkVEXCIsIDg0OiBcIk5VTExcIiwgODU6IFwiREFUQVwiLCA4NzogXCJTRVBcIiB9LFxuXHQgICAgICAgIHByb2R1Y3Rpb25zXzogWzAsIFszLCAyXSwgWzQsIDFdLCBbNywgMV0sIFs3LCAxXSwgWzcsIDFdLCBbNywgMV0sIFs3LCAxXSwgWzcsIDFdLCBbNywgMV0sIFsxMywgMV0sIFsxMCwgM10sIFsxNiwgNV0sIFs5LCA0XSwgWzksIDRdLCBbMjQsIDZdLCBbMjcsIDZdLCBbMzgsIDZdLCBbNDMsIDJdLCBbNDUsIDNdLCBbNDUsIDFdLCBbMjYsIDNdLCBbOCwgNV0sIFs4LCA1XSwgWzExLCA1XSwgWzEyLCAzXSwgWzU5LCA1XSwgWzYzLCAxXSwgWzYzLCAxXSwgWzY0LCA1XSwgWzY5LCAxXSwgWzcxLCAzXSwgWzc0LCAzXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzIwLCAxXSwgWzU2LCAxXSwgWzU2LCAxXSwgWzc5LCAyXSwgWzc4LCAxXSwgWzg2LCAzXSwgWzg2LCAxXSwgWzYsIDBdLCBbNiwgMl0sIFsxNywgMF0sIFsxNywgMl0sIFsyMSwgMF0sIFsyMSwgMl0sIFsyMiwgMF0sIFsyMiwgMV0sIFsyNSwgMF0sIFsyNSwgMV0sIFsyOCwgMF0sIFsyOCwgMV0sIFszMCwgMF0sIFszMCwgMl0sIFszMSwgMF0sIFszMSwgMV0sIFszMiwgMF0sIFszMiwgMV0sIFszNSwgMF0sIFszNSwgMl0sIFszNiwgMF0sIFszNiwgMV0sIFszNywgMF0sIFszNywgMV0sIFs0MCwgMF0sIFs0MCwgMl0sIFs0MSwgMF0sIFs0MSwgMV0sIFs0MiwgMF0sIFs0MiwgMV0sIFs0NiwgMF0sIFs0NiwgMV0sIFs0OSwgMF0sIFs0OSwgMl0sIFs1MCwgMF0sIFs1MCwgMV0sIFs1MiwgMF0sIFs1MiwgMl0sIFs1MywgMF0sIFs1MywgMV0sIFs1NywgMF0sIFs1NywgMl0sIFs1OCwgMF0sIFs1OCwgMV0sIFs2MSwgMF0sIFs2MSwgMl0sIFs2MiwgMF0sIFs2MiwgMV0sIFs2NiwgMF0sIFs2NiwgMl0sIFs2NywgMF0sIFs2NywgMV0sIFs3MCwgMV0sIFs3MCwgMl0sIFs3NiwgMV0sIFs3NiwgMl1dLFxuXHQgICAgICAgIHBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uIGFub255bW91cyh5eXRleHQsIHl5bGVuZywgeXlsaW5lbm8sIHl5LCB5eXN0YXRlLCAkJCwgXyQpIHtcblxuXHQgICAgICAgICAgICB2YXIgJDAgPSAkJC5sZW5ndGggLSAxO1xuXHQgICAgICAgICAgICBzd2l0Y2ggKHl5c3RhdGUpIHtcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCRbJDAgLSAxXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlUHJvZ3JhbSgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9ICQkWyQwXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSAkJFskMF07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDU6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gJCRbJDBdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA2OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9ICQkWyQwXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSAkJFskMF07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gJCRbJDBdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA5OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0NvbW1lbnRTdGF0ZW1lbnQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogeXkuc3RyaXBDb21tZW50KCQkWyQwXSksXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwOiB5eS5zdHJpcEZsYWdzKCQkWyQwXSwgJCRbJDBdKSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxMDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdDb250ZW50U3RhdGVtZW50Jyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6ICQkWyQwXSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICQkWyQwXSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxMTpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlUmF3QmxvY2soJCRbJDAgLSAyXSwgJCRbJDAgLSAxXSwgJCRbJDBdLCB0aGlzLl8kKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTI6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyBwYXRoOiAkJFskMCAtIDNdLCBwYXJhbXM6ICQkWyQwIC0gMl0sIGhhc2g6ICQkWyQwIC0gMV0gfTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTM6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geXkucHJlcGFyZUJsb2NrKCQkWyQwIC0gM10sICQkWyQwIC0gMl0sICQkWyQwIC0gMV0sICQkWyQwXSwgZmFsc2UsIHRoaXMuXyQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxNDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlQmxvY2soJCRbJDAgLSAzXSwgJCRbJDAgLSAyXSwgJCRbJDAgLSAxXSwgJCRbJDBdLCB0cnVlLCB0aGlzLl8kKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTU6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyBvcGVuOiAkJFskMCAtIDVdLCBwYXRoOiAkJFskMCAtIDRdLCBwYXJhbXM6ICQkWyQwIC0gM10sIGhhc2g6ICQkWyQwIC0gMl0sIGJsb2NrUGFyYW1zOiAkJFskMCAtIDFdLCBzdHJpcDogeXkuc3RyaXBGbGFncygkJFskMCAtIDVdLCAkJFskMF0pIH07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDE2OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHsgcGF0aDogJCRbJDAgLSA0XSwgcGFyYW1zOiAkJFskMCAtIDNdLCBoYXNoOiAkJFskMCAtIDJdLCBibG9ja1BhcmFtczogJCRbJDAgLSAxXSwgc3RyaXA6IHl5LnN0cmlwRmxhZ3MoJCRbJDAgLSA1XSwgJCRbJDBdKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxNzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHBhdGg6ICQkWyQwIC0gNF0sIHBhcmFtczogJCRbJDAgLSAzXSwgaGFzaDogJCRbJDAgLSAyXSwgYmxvY2tQYXJhbXM6ICQkWyQwIC0gMV0sIHN0cmlwOiB5eS5zdHJpcEZsYWdzKCQkWyQwIC0gNV0sICQkWyQwXSkgfTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTg6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyBzdHJpcDogeXkuc3RyaXBGbGFncygkJFskMCAtIDFdLCAkJFskMCAtIDFdKSwgcHJvZ3JhbTogJCRbJDBdIH07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDE5OlxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBpbnZlcnNlID0geXkucHJlcGFyZUJsb2NrKCQkWyQwIC0gMl0sICQkWyQwIC0gMV0sICQkWyQwXSwgJCRbJDBdLCBmYWxzZSwgdGhpcy5fJCksXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW0gPSB5eS5wcmVwYXJlUHJvZ3JhbShbaW52ZXJzZV0sICQkWyQwIC0gMV0ubG9jKTtcblx0ICAgICAgICAgICAgICAgICAgICBwcm9ncmFtLmNoYWluZWQgPSB0cnVlO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyBzdHJpcDogJCRbJDAgLSAyXS5zdHJpcCwgcHJvZ3JhbTogcHJvZ3JhbSwgY2hhaW46IHRydWUgfTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyMDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSAkJFskMF07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDIxOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHsgcGF0aDogJCRbJDAgLSAxXSwgc3RyaXA6IHl5LnN0cmlwRmxhZ3MoJCRbJDAgLSAyXSwgJCRbJDBdKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyMjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlTXVzdGFjaGUoJCRbJDAgLSAzXSwgJCRbJDAgLSAyXSwgJCRbJDAgLSAxXSwgJCRbJDAgLSA0XSwgeXkuc3RyaXBGbGFncygkJFskMCAtIDRdLCAkJFskMF0pLCB0aGlzLl8kKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjM6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geXkucHJlcGFyZU11c3RhY2hlKCQkWyQwIC0gM10sICQkWyQwIC0gMl0sICQkWyQwIC0gMV0sICQkWyQwIC0gNF0sIHl5LnN0cmlwRmxhZ3MoJCRbJDAgLSA0XSwgJCRbJDBdKSwgdGhpcy5fJCk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDI0OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BhcnRpYWxTdGF0ZW1lbnQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAkJFskMCAtIDNdLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6ICQkWyQwIC0gMl0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6ICQkWyQwIC0gMV0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudDogJycsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwOiB5eS5zdHJpcEZsYWdzKCQkWyQwIC0gNF0sICQkWyQwXSksXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxvYzogeXkubG9jSW5mbyh0aGlzLl8kKVxuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjU6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geXkucHJlcGFyZVBhcnRpYWxCbG9jaygkJFskMCAtIDJdLCAkJFskMCAtIDFdLCAkJFskMF0sIHRoaXMuXyQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyNjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHBhdGg6ICQkWyQwIC0gM10sIHBhcmFtczogJCRbJDAgLSAyXSwgaGFzaDogJCRbJDAgLSAxXSwgc3RyaXA6IHl5LnN0cmlwRmxhZ3MoJCRbJDAgLSA0XSwgJCRbJDBdKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyNzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSAkJFskMF07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDI4OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9ICQkWyQwXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjk6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU3ViRXhwcmVzc2lvbicsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICQkWyQwIC0gM10sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogJCRbJDAgLSAyXSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogJCRbJDAgLSAxXSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpXG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzMDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHR5cGU6ICdIYXNoJywgcGFpcnM6ICQkWyQwXSwgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpIH07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDMxOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHsgdHlwZTogJ0hhc2hQYWlyJywga2V5OiB5eS5pZCgkJFskMCAtIDJdKSwgdmFsdWU6ICQkWyQwXSwgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpIH07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDMyOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IHl5LmlkKCQkWyQwIC0gMV0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzMzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSAkJFskMF07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDM0OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9ICQkWyQwXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzU6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyB0eXBlOiAnU3RyaW5nTGl0ZXJhbCcsIHZhbHVlOiAkJFskMF0sIG9yaWdpbmFsOiAkJFskMF0sIGxvYzogeXkubG9jSW5mbyh0aGlzLl8kKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzNjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHR5cGU6ICdOdW1iZXJMaXRlcmFsJywgdmFsdWU6IE51bWJlcigkJFskMF0pLCBvcmlnaW5hbDogTnVtYmVyKCQkWyQwXSksIGxvYzogeXkubG9jSW5mbyh0aGlzLl8kKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzNzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHR5cGU6ICdCb29sZWFuTGl0ZXJhbCcsIHZhbHVlOiAkJFskMF0gPT09ICd0cnVlJywgb3JpZ2luYWw6ICQkWyQwXSA9PT0gJ3RydWUnLCBsb2M6IHl5LmxvY0luZm8odGhpcy5fJCkgfTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzg6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0geyB0eXBlOiAnVW5kZWZpbmVkTGl0ZXJhbCcsIG9yaWdpbmFsOiB1bmRlZmluZWQsIHZhbHVlOiB1bmRlZmluZWQsIGxvYzogeXkubG9jSW5mbyh0aGlzLl8kKSB9O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzOTpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB7IHR5cGU6ICdOdWxsTGl0ZXJhbCcsIG9yaWdpbmFsOiBudWxsLCB2YWx1ZTogbnVsbCwgbG9jOiB5eS5sb2NJbmZvKHRoaXMuXyQpIH07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDQwOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9ICQkWyQwXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNDE6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gJCRbJDBdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0Mjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlUGF0aCh0cnVlLCAkJFskMF0sIHRoaXMuXyQpO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0Mzpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSB5eS5wcmVwYXJlUGF0aChmYWxzZSwgJCRbJDBdLCB0aGlzLl8kKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNDQ6XG5cdCAgICAgICAgICAgICAgICAgICAgJCRbJDAgLSAyXS5wdXNoKHsgcGFydDogeXkuaWQoJCRbJDBdKSwgb3JpZ2luYWw6ICQkWyQwXSwgc2VwYXJhdG9yOiAkJFskMCAtIDFdIH0pO3RoaXMuJCA9ICQkWyQwIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IFt7IHBhcnQ6IHl5LmlkKCQkWyQwXSksIG9yaWdpbmFsOiAkJFskMF0gfV07XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDQ2OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0Nzpcblx0ICAgICAgICAgICAgICAgICAgICAkJFskMCAtIDFdLnB1c2goJCRbJDBdKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNDg6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDQ5OlxuXHQgICAgICAgICAgICAgICAgICAgICQkWyQwIC0gMV0ucHVzaCgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA1MDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNTE6XG5cdCAgICAgICAgICAgICAgICAgICAgJCRbJDAgLSAxXS5wdXNoKCQkWyQwXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDU4OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA1OTpcblx0ICAgICAgICAgICAgICAgICAgICAkJFskMCAtIDFdLnB1c2goJCRbJDBdKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNjQ6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDY1OlxuXHQgICAgICAgICAgICAgICAgICAgICQkWyQwIC0gMV0ucHVzaCgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA3MDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNzE6XG5cdCAgICAgICAgICAgICAgICAgICAgJCRbJDAgLSAxXS5wdXNoKCQkWyQwXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDc4OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA3OTpcblx0ICAgICAgICAgICAgICAgICAgICAkJFskMCAtIDFdLnB1c2goJCRbJDBdKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgODI6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDgzOlxuXHQgICAgICAgICAgICAgICAgICAgICQkWyQwIC0gMV0ucHVzaCgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA4Njpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSBbXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgODc6XG5cdCAgICAgICAgICAgICAgICAgICAgJCRbJDAgLSAxXS5wdXNoKCQkWyQwXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDkwOlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuJCA9IFtdO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA5MTpcblx0ICAgICAgICAgICAgICAgICAgICAkJFskMCAtIDFdLnB1c2goJCRbJDBdKTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgOTQ6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy4kID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDk1OlxuXHQgICAgICAgICAgICAgICAgICAgICQkWyQwIC0gMV0ucHVzaCgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA5ODpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSBbJCRbJDBdXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgOTk6XG5cdCAgICAgICAgICAgICAgICAgICAgJCRbJDAgLSAxXS5wdXNoKCQkWyQwXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDEwMDpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLiQgPSBbJCRbJDBdXTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTAxOlxuXHQgICAgICAgICAgICAgICAgICAgICQkWyQwIC0gMV0ucHVzaCgkJFskMF0pO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICB0YWJsZTogW3sgMzogMSwgNDogMiwgNTogWzIsIDQ2XSwgNjogMywgMTQ6IFsyLCA0Nl0sIDE1OiBbMiwgNDZdLCAxOTogWzIsIDQ2XSwgMjk6IFsyLCA0Nl0sIDM0OiBbMiwgNDZdLCA0ODogWzIsIDQ2XSwgNTE6IFsyLCA0Nl0sIDU1OiBbMiwgNDZdLCA2MDogWzIsIDQ2XSB9LCB7IDE6IFszXSB9LCB7IDU6IFsxLCA0XSB9LCB7IDU6IFsyLCAyXSwgNzogNSwgODogNiwgOTogNywgMTA6IDgsIDExOiA5LCAxMjogMTAsIDEzOiAxMSwgMTQ6IFsxLCAxMl0sIDE1OiBbMSwgMjBdLCAxNjogMTcsIDE5OiBbMSwgMjNdLCAyNDogMTUsIDI3OiAxNiwgMjk6IFsxLCAyMV0sIDM0OiBbMSwgMjJdLCAzOTogWzIsIDJdLCA0NDogWzIsIDJdLCA0NzogWzIsIDJdLCA0ODogWzEsIDEzXSwgNTE6IFsxLCAxNF0sIDU1OiBbMSwgMThdLCA1OTogMTksIDYwOiBbMSwgMjRdIH0sIHsgMTogWzIsIDFdIH0sIHsgNTogWzIsIDQ3XSwgMTQ6IFsyLCA0N10sIDE1OiBbMiwgNDddLCAxOTogWzIsIDQ3XSwgMjk6IFsyLCA0N10sIDM0OiBbMiwgNDddLCAzOTogWzIsIDQ3XSwgNDQ6IFsyLCA0N10sIDQ3OiBbMiwgNDddLCA0ODogWzIsIDQ3XSwgNTE6IFsyLCA0N10sIDU1OiBbMiwgNDddLCA2MDogWzIsIDQ3XSB9LCB7IDU6IFsyLCAzXSwgMTQ6IFsyLCAzXSwgMTU6IFsyLCAzXSwgMTk6IFsyLCAzXSwgMjk6IFsyLCAzXSwgMzQ6IFsyLCAzXSwgMzk6IFsyLCAzXSwgNDQ6IFsyLCAzXSwgNDc6IFsyLCAzXSwgNDg6IFsyLCAzXSwgNTE6IFsyLCAzXSwgNTU6IFsyLCAzXSwgNjA6IFsyLCAzXSB9LCB7IDU6IFsyLCA0XSwgMTQ6IFsyLCA0XSwgMTU6IFsyLCA0XSwgMTk6IFsyLCA0XSwgMjk6IFsyLCA0XSwgMzQ6IFsyLCA0XSwgMzk6IFsyLCA0XSwgNDQ6IFsyLCA0XSwgNDc6IFsyLCA0XSwgNDg6IFsyLCA0XSwgNTE6IFsyLCA0XSwgNTU6IFsyLCA0XSwgNjA6IFsyLCA0XSB9LCB7IDU6IFsyLCA1XSwgMTQ6IFsyLCA1XSwgMTU6IFsyLCA1XSwgMTk6IFsyLCA1XSwgMjk6IFsyLCA1XSwgMzQ6IFsyLCA1XSwgMzk6IFsyLCA1XSwgNDQ6IFsyLCA1XSwgNDc6IFsyLCA1XSwgNDg6IFsyLCA1XSwgNTE6IFsyLCA1XSwgNTU6IFsyLCA1XSwgNjA6IFsyLCA1XSB9LCB7IDU6IFsyLCA2XSwgMTQ6IFsyLCA2XSwgMTU6IFsyLCA2XSwgMTk6IFsyLCA2XSwgMjk6IFsyLCA2XSwgMzQ6IFsyLCA2XSwgMzk6IFsyLCA2XSwgNDQ6IFsyLCA2XSwgNDc6IFsyLCA2XSwgNDg6IFsyLCA2XSwgNTE6IFsyLCA2XSwgNTU6IFsyLCA2XSwgNjA6IFsyLCA2XSB9LCB7IDU6IFsyLCA3XSwgMTQ6IFsyLCA3XSwgMTU6IFsyLCA3XSwgMTk6IFsyLCA3XSwgMjk6IFsyLCA3XSwgMzQ6IFsyLCA3XSwgMzk6IFsyLCA3XSwgNDQ6IFsyLCA3XSwgNDc6IFsyLCA3XSwgNDg6IFsyLCA3XSwgNTE6IFsyLCA3XSwgNTU6IFsyLCA3XSwgNjA6IFsyLCA3XSB9LCB7IDU6IFsyLCA4XSwgMTQ6IFsyLCA4XSwgMTU6IFsyLCA4XSwgMTk6IFsyLCA4XSwgMjk6IFsyLCA4XSwgMzQ6IFsyLCA4XSwgMzk6IFsyLCA4XSwgNDQ6IFsyLCA4XSwgNDc6IFsyLCA4XSwgNDg6IFsyLCA4XSwgNTE6IFsyLCA4XSwgNTU6IFsyLCA4XSwgNjA6IFsyLCA4XSB9LCB7IDU6IFsyLCA5XSwgMTQ6IFsyLCA5XSwgMTU6IFsyLCA5XSwgMTk6IFsyLCA5XSwgMjk6IFsyLCA5XSwgMzQ6IFsyLCA5XSwgMzk6IFsyLCA5XSwgNDQ6IFsyLCA5XSwgNDc6IFsyLCA5XSwgNDg6IFsyLCA5XSwgNTE6IFsyLCA5XSwgNTU6IFsyLCA5XSwgNjA6IFsyLCA5XSB9LCB7IDIwOiAyNSwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyAyMDogMzYsIDcyOiBbMSwgMzVdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgNDogMzcsIDY6IDMsIDE0OiBbMiwgNDZdLCAxNTogWzIsIDQ2XSwgMTk6IFsyLCA0Nl0sIDI5OiBbMiwgNDZdLCAzNDogWzIsIDQ2XSwgMzk6IFsyLCA0Nl0sIDQ0OiBbMiwgNDZdLCA0NzogWzIsIDQ2XSwgNDg6IFsyLCA0Nl0sIDUxOiBbMiwgNDZdLCA1NTogWzIsIDQ2XSwgNjA6IFsyLCA0Nl0gfSwgeyA0OiAzOCwgNjogMywgMTQ6IFsyLCA0Nl0sIDE1OiBbMiwgNDZdLCAxOTogWzIsIDQ2XSwgMjk6IFsyLCA0Nl0sIDM0OiBbMiwgNDZdLCA0NDogWzIsIDQ2XSwgNDc6IFsyLCA0Nl0sIDQ4OiBbMiwgNDZdLCA1MTogWzIsIDQ2XSwgNTU6IFsyLCA0Nl0sIDYwOiBbMiwgNDZdIH0sIHsgMTU6IFsyLCA0OF0sIDE3OiAzOSwgMTg6IFsyLCA0OF0gfSwgeyAyMDogNDEsIDU2OiA0MCwgNjQ6IDQyLCA2NTogWzEsIDQzXSwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyA0OiA0NCwgNjogMywgMTQ6IFsyLCA0Nl0sIDE1OiBbMiwgNDZdLCAxOTogWzIsIDQ2XSwgMjk6IFsyLCA0Nl0sIDM0OiBbMiwgNDZdLCA0NzogWzIsIDQ2XSwgNDg6IFsyLCA0Nl0sIDUxOiBbMiwgNDZdLCA1NTogWzIsIDQ2XSwgNjA6IFsyLCA0Nl0gfSwgeyA1OiBbMiwgMTBdLCAxNDogWzIsIDEwXSwgMTU6IFsyLCAxMF0sIDE4OiBbMiwgMTBdLCAxOTogWzIsIDEwXSwgMjk6IFsyLCAxMF0sIDM0OiBbMiwgMTBdLCAzOTogWzIsIDEwXSwgNDQ6IFsyLCAxMF0sIDQ3OiBbMiwgMTBdLCA0ODogWzIsIDEwXSwgNTE6IFsyLCAxMF0sIDU1OiBbMiwgMTBdLCA2MDogWzIsIDEwXSB9LCB7IDIwOiA0NSwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyAyMDogNDYsIDcyOiBbMSwgMzVdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgMjA6IDQ3LCA3MjogWzEsIDM1XSwgNzg6IDI2LCA3OTogMjcsIDgwOiBbMSwgMjhdLCA4MTogWzEsIDI5XSwgODI6IFsxLCAzMF0sIDgzOiBbMSwgMzFdLCA4NDogWzEsIDMyXSwgODU6IFsxLCAzNF0sIDg2OiAzMyB9LCB7IDIwOiA0MSwgNTY6IDQ4LCA2NDogNDIsIDY1OiBbMSwgNDNdLCA3MjogWzEsIDM1XSwgNzg6IDI2LCA3OTogMjcsIDgwOiBbMSwgMjhdLCA4MTogWzEsIDI5XSwgODI6IFsxLCAzMF0sIDgzOiBbMSwgMzFdLCA4NDogWzEsIDMyXSwgODU6IFsxLCAzNF0sIDg2OiAzMyB9LCB7IDMzOiBbMiwgNzhdLCA0OTogNDksIDY1OiBbMiwgNzhdLCA3MjogWzIsIDc4XSwgODA6IFsyLCA3OF0sIDgxOiBbMiwgNzhdLCA4MjogWzIsIDc4XSwgODM6IFsyLCA3OF0sIDg0OiBbMiwgNzhdLCA4NTogWzIsIDc4XSB9LCB7IDIzOiBbMiwgMzNdLCAzMzogWzIsIDMzXSwgNTQ6IFsyLCAzM10sIDY1OiBbMiwgMzNdLCA2ODogWzIsIDMzXSwgNzI6IFsyLCAzM10sIDc1OiBbMiwgMzNdLCA4MDogWzIsIDMzXSwgODE6IFsyLCAzM10sIDgyOiBbMiwgMzNdLCA4MzogWzIsIDMzXSwgODQ6IFsyLCAzM10sIDg1OiBbMiwgMzNdIH0sIHsgMjM6IFsyLCAzNF0sIDMzOiBbMiwgMzRdLCA1NDogWzIsIDM0XSwgNjU6IFsyLCAzNF0sIDY4OiBbMiwgMzRdLCA3MjogWzIsIDM0XSwgNzU6IFsyLCAzNF0sIDgwOiBbMiwgMzRdLCA4MTogWzIsIDM0XSwgODI6IFsyLCAzNF0sIDgzOiBbMiwgMzRdLCA4NDogWzIsIDM0XSwgODU6IFsyLCAzNF0gfSwgeyAyMzogWzIsIDM1XSwgMzM6IFsyLCAzNV0sIDU0OiBbMiwgMzVdLCA2NTogWzIsIDM1XSwgNjg6IFsyLCAzNV0sIDcyOiBbMiwgMzVdLCA3NTogWzIsIDM1XSwgODA6IFsyLCAzNV0sIDgxOiBbMiwgMzVdLCA4MjogWzIsIDM1XSwgODM6IFsyLCAzNV0sIDg0OiBbMiwgMzVdLCA4NTogWzIsIDM1XSB9LCB7IDIzOiBbMiwgMzZdLCAzMzogWzIsIDM2XSwgNTQ6IFsyLCAzNl0sIDY1OiBbMiwgMzZdLCA2ODogWzIsIDM2XSwgNzI6IFsyLCAzNl0sIDc1OiBbMiwgMzZdLCA4MDogWzIsIDM2XSwgODE6IFsyLCAzNl0sIDgyOiBbMiwgMzZdLCA4MzogWzIsIDM2XSwgODQ6IFsyLCAzNl0sIDg1OiBbMiwgMzZdIH0sIHsgMjM6IFsyLCAzN10sIDMzOiBbMiwgMzddLCA1NDogWzIsIDM3XSwgNjU6IFsyLCAzN10sIDY4OiBbMiwgMzddLCA3MjogWzIsIDM3XSwgNzU6IFsyLCAzN10sIDgwOiBbMiwgMzddLCA4MTogWzIsIDM3XSwgODI6IFsyLCAzN10sIDgzOiBbMiwgMzddLCA4NDogWzIsIDM3XSwgODU6IFsyLCAzN10gfSwgeyAyMzogWzIsIDM4XSwgMzM6IFsyLCAzOF0sIDU0OiBbMiwgMzhdLCA2NTogWzIsIDM4XSwgNjg6IFsyLCAzOF0sIDcyOiBbMiwgMzhdLCA3NTogWzIsIDM4XSwgODA6IFsyLCAzOF0sIDgxOiBbMiwgMzhdLCA4MjogWzIsIDM4XSwgODM6IFsyLCAzOF0sIDg0OiBbMiwgMzhdLCA4NTogWzIsIDM4XSB9LCB7IDIzOiBbMiwgMzldLCAzMzogWzIsIDM5XSwgNTQ6IFsyLCAzOV0sIDY1OiBbMiwgMzldLCA2ODogWzIsIDM5XSwgNzI6IFsyLCAzOV0sIDc1OiBbMiwgMzldLCA4MDogWzIsIDM5XSwgODE6IFsyLCAzOV0sIDgyOiBbMiwgMzldLCA4MzogWzIsIDM5XSwgODQ6IFsyLCAzOV0sIDg1OiBbMiwgMzldIH0sIHsgMjM6IFsyLCA0M10sIDMzOiBbMiwgNDNdLCA1NDogWzIsIDQzXSwgNjU6IFsyLCA0M10sIDY4OiBbMiwgNDNdLCA3MjogWzIsIDQzXSwgNzU6IFsyLCA0M10sIDgwOiBbMiwgNDNdLCA4MTogWzIsIDQzXSwgODI6IFsyLCA0M10sIDgzOiBbMiwgNDNdLCA4NDogWzIsIDQzXSwgODU6IFsyLCA0M10sIDg3OiBbMSwgNTBdIH0sIHsgNzI6IFsxLCAzNV0sIDg2OiA1MSB9LCB7IDIzOiBbMiwgNDVdLCAzMzogWzIsIDQ1XSwgNTQ6IFsyLCA0NV0sIDY1OiBbMiwgNDVdLCA2ODogWzIsIDQ1XSwgNzI6IFsyLCA0NV0sIDc1OiBbMiwgNDVdLCA4MDogWzIsIDQ1XSwgODE6IFsyLCA0NV0sIDgyOiBbMiwgNDVdLCA4MzogWzIsIDQ1XSwgODQ6IFsyLCA0NV0sIDg1OiBbMiwgNDVdLCA4NzogWzIsIDQ1XSB9LCB7IDUyOiA1MiwgNTQ6IFsyLCA4Ml0sIDY1OiBbMiwgODJdLCA3MjogWzIsIDgyXSwgODA6IFsyLCA4Ml0sIDgxOiBbMiwgODJdLCA4MjogWzIsIDgyXSwgODM6IFsyLCA4Ml0sIDg0OiBbMiwgODJdLCA4NTogWzIsIDgyXSB9LCB7IDI1OiA1MywgMzg6IDU1LCAzOTogWzEsIDU3XSwgNDM6IDU2LCA0NDogWzEsIDU4XSwgNDU6IDU0LCA0NzogWzIsIDU0XSB9LCB7IDI4OiA1OSwgNDM6IDYwLCA0NDogWzEsIDU4XSwgNDc6IFsyLCA1Nl0gfSwgeyAxMzogNjIsIDE1OiBbMSwgMjBdLCAxODogWzEsIDYxXSB9LCB7IDMzOiBbMiwgODZdLCA1NzogNjMsIDY1OiBbMiwgODZdLCA3MjogWzIsIDg2XSwgODA6IFsyLCA4Nl0sIDgxOiBbMiwgODZdLCA4MjogWzIsIDg2XSwgODM6IFsyLCA4Nl0sIDg0OiBbMiwgODZdLCA4NTogWzIsIDg2XSB9LCB7IDMzOiBbMiwgNDBdLCA2NTogWzIsIDQwXSwgNzI6IFsyLCA0MF0sIDgwOiBbMiwgNDBdLCA4MTogWzIsIDQwXSwgODI6IFsyLCA0MF0sIDgzOiBbMiwgNDBdLCA4NDogWzIsIDQwXSwgODU6IFsyLCA0MF0gfSwgeyAzMzogWzIsIDQxXSwgNjU6IFsyLCA0MV0sIDcyOiBbMiwgNDFdLCA4MDogWzIsIDQxXSwgODE6IFsyLCA0MV0sIDgyOiBbMiwgNDFdLCA4MzogWzIsIDQxXSwgODQ6IFsyLCA0MV0sIDg1OiBbMiwgNDFdIH0sIHsgMjA6IDY0LCA3MjogWzEsIDM1XSwgNzg6IDI2LCA3OTogMjcsIDgwOiBbMSwgMjhdLCA4MTogWzEsIDI5XSwgODI6IFsxLCAzMF0sIDgzOiBbMSwgMzFdLCA4NDogWzEsIDMyXSwgODU6IFsxLCAzNF0sIDg2OiAzMyB9LCB7IDI2OiA2NSwgNDc6IFsxLCA2Nl0gfSwgeyAzMDogNjcsIDMzOiBbMiwgNThdLCA2NTogWzIsIDU4XSwgNzI6IFsyLCA1OF0sIDc1OiBbMiwgNThdLCA4MDogWzIsIDU4XSwgODE6IFsyLCA1OF0sIDgyOiBbMiwgNThdLCA4MzogWzIsIDU4XSwgODQ6IFsyLCA1OF0sIDg1OiBbMiwgNThdIH0sIHsgMzM6IFsyLCA2NF0sIDM1OiA2OCwgNjU6IFsyLCA2NF0sIDcyOiBbMiwgNjRdLCA3NTogWzIsIDY0XSwgODA6IFsyLCA2NF0sIDgxOiBbMiwgNjRdLCA4MjogWzIsIDY0XSwgODM6IFsyLCA2NF0sIDg0OiBbMiwgNjRdLCA4NTogWzIsIDY0XSB9LCB7IDIxOiA2OSwgMjM6IFsyLCA1MF0sIDY1OiBbMiwgNTBdLCA3MjogWzIsIDUwXSwgODA6IFsyLCA1MF0sIDgxOiBbMiwgNTBdLCA4MjogWzIsIDUwXSwgODM6IFsyLCA1MF0sIDg0OiBbMiwgNTBdLCA4NTogWzIsIDUwXSB9LCB7IDMzOiBbMiwgOTBdLCA2MTogNzAsIDY1OiBbMiwgOTBdLCA3MjogWzIsIDkwXSwgODA6IFsyLCA5MF0sIDgxOiBbMiwgOTBdLCA4MjogWzIsIDkwXSwgODM6IFsyLCA5MF0sIDg0OiBbMiwgOTBdLCA4NTogWzIsIDkwXSB9LCB7IDIwOiA3NCwgMzM6IFsyLCA4MF0sIDUwOiA3MSwgNjM6IDcyLCA2NDogNzUsIDY1OiBbMSwgNDNdLCA2OTogNzMsIDcwOiA3NiwgNzE6IDc3LCA3MjogWzEsIDc4XSwgNzg6IDI2LCA3OTogMjcsIDgwOiBbMSwgMjhdLCA4MTogWzEsIDI5XSwgODI6IFsxLCAzMF0sIDgzOiBbMSwgMzFdLCA4NDogWzEsIDMyXSwgODU6IFsxLCAzNF0sIDg2OiAzMyB9LCB7IDcyOiBbMSwgNzldIH0sIHsgMjM6IFsyLCA0Ml0sIDMzOiBbMiwgNDJdLCA1NDogWzIsIDQyXSwgNjU6IFsyLCA0Ml0sIDY4OiBbMiwgNDJdLCA3MjogWzIsIDQyXSwgNzU6IFsyLCA0Ml0sIDgwOiBbMiwgNDJdLCA4MTogWzIsIDQyXSwgODI6IFsyLCA0Ml0sIDgzOiBbMiwgNDJdLCA4NDogWzIsIDQyXSwgODU6IFsyLCA0Ml0sIDg3OiBbMSwgNTBdIH0sIHsgMjA6IDc0LCA1MzogODAsIDU0OiBbMiwgODRdLCA2MzogODEsIDY0OiA3NSwgNjU6IFsxLCA0M10sIDY5OiA4MiwgNzA6IDc2LCA3MTogNzcsIDcyOiBbMSwgNzhdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgMjY6IDgzLCA0NzogWzEsIDY2XSB9LCB7IDQ3OiBbMiwgNTVdIH0sIHsgNDogODQsIDY6IDMsIDE0OiBbMiwgNDZdLCAxNTogWzIsIDQ2XSwgMTk6IFsyLCA0Nl0sIDI5OiBbMiwgNDZdLCAzNDogWzIsIDQ2XSwgMzk6IFsyLCA0Nl0sIDQ0OiBbMiwgNDZdLCA0NzogWzIsIDQ2XSwgNDg6IFsyLCA0Nl0sIDUxOiBbMiwgNDZdLCA1NTogWzIsIDQ2XSwgNjA6IFsyLCA0Nl0gfSwgeyA0NzogWzIsIDIwXSB9LCB7IDIwOiA4NSwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyA0OiA4NiwgNjogMywgMTQ6IFsyLCA0Nl0sIDE1OiBbMiwgNDZdLCAxOTogWzIsIDQ2XSwgMjk6IFsyLCA0Nl0sIDM0OiBbMiwgNDZdLCA0NzogWzIsIDQ2XSwgNDg6IFsyLCA0Nl0sIDUxOiBbMiwgNDZdLCA1NTogWzIsIDQ2XSwgNjA6IFsyLCA0Nl0gfSwgeyAyNjogODcsIDQ3OiBbMSwgNjZdIH0sIHsgNDc6IFsyLCA1N10gfSwgeyA1OiBbMiwgMTFdLCAxNDogWzIsIDExXSwgMTU6IFsyLCAxMV0sIDE5OiBbMiwgMTFdLCAyOTogWzIsIDExXSwgMzQ6IFsyLCAxMV0sIDM5OiBbMiwgMTFdLCA0NDogWzIsIDExXSwgNDc6IFsyLCAxMV0sIDQ4OiBbMiwgMTFdLCA1MTogWzIsIDExXSwgNTU6IFsyLCAxMV0sIDYwOiBbMiwgMTFdIH0sIHsgMTU6IFsyLCA0OV0sIDE4OiBbMiwgNDldIH0sIHsgMjA6IDc0LCAzMzogWzIsIDg4XSwgNTg6IDg4LCA2MzogODksIDY0OiA3NSwgNjU6IFsxLCA0M10sIDY5OiA5MCwgNzA6IDc2LCA3MTogNzcsIDcyOiBbMSwgNzhdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgNjU6IFsyLCA5NF0sIDY2OiA5MSwgNjg6IFsyLCA5NF0sIDcyOiBbMiwgOTRdLCA4MDogWzIsIDk0XSwgODE6IFsyLCA5NF0sIDgyOiBbMiwgOTRdLCA4MzogWzIsIDk0XSwgODQ6IFsyLCA5NF0sIDg1OiBbMiwgOTRdIH0sIHsgNTogWzIsIDI1XSwgMTQ6IFsyLCAyNV0sIDE1OiBbMiwgMjVdLCAxOTogWzIsIDI1XSwgMjk6IFsyLCAyNV0sIDM0OiBbMiwgMjVdLCAzOTogWzIsIDI1XSwgNDQ6IFsyLCAyNV0sIDQ3OiBbMiwgMjVdLCA0ODogWzIsIDI1XSwgNTE6IFsyLCAyNV0sIDU1OiBbMiwgMjVdLCA2MDogWzIsIDI1XSB9LCB7IDIwOiA5MiwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyAyMDogNzQsIDMxOiA5MywgMzM6IFsyLCA2MF0sIDYzOiA5NCwgNjQ6IDc1LCA2NTogWzEsIDQzXSwgNjk6IDk1LCA3MDogNzYsIDcxOiA3NywgNzI6IFsxLCA3OF0sIDc1OiBbMiwgNjBdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgMjA6IDc0LCAzMzogWzIsIDY2XSwgMzY6IDk2LCA2MzogOTcsIDY0OiA3NSwgNjU6IFsxLCA0M10sIDY5OiA5OCwgNzA6IDc2LCA3MTogNzcsIDcyOiBbMSwgNzhdLCA3NTogWzIsIDY2XSwgNzg6IDI2LCA3OTogMjcsIDgwOiBbMSwgMjhdLCA4MTogWzEsIDI5XSwgODI6IFsxLCAzMF0sIDgzOiBbMSwgMzFdLCA4NDogWzEsIDMyXSwgODU6IFsxLCAzNF0sIDg2OiAzMyB9LCB7IDIwOiA3NCwgMjI6IDk5LCAyMzogWzIsIDUyXSwgNjM6IDEwMCwgNjQ6IDc1LCA2NTogWzEsIDQzXSwgNjk6IDEwMSwgNzA6IDc2LCA3MTogNzcsIDcyOiBbMSwgNzhdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgMjA6IDc0LCAzMzogWzIsIDkyXSwgNjI6IDEwMiwgNjM6IDEwMywgNjQ6IDc1LCA2NTogWzEsIDQzXSwgNjk6IDEwNCwgNzA6IDc2LCA3MTogNzcsIDcyOiBbMSwgNzhdLCA3ODogMjYsIDc5OiAyNywgODA6IFsxLCAyOF0sIDgxOiBbMSwgMjldLCA4MjogWzEsIDMwXSwgODM6IFsxLCAzMV0sIDg0OiBbMSwgMzJdLCA4NTogWzEsIDM0XSwgODY6IDMzIH0sIHsgMzM6IFsxLCAxMDVdIH0sIHsgMzM6IFsyLCA3OV0sIDY1OiBbMiwgNzldLCA3MjogWzIsIDc5XSwgODA6IFsyLCA3OV0sIDgxOiBbMiwgNzldLCA4MjogWzIsIDc5XSwgODM6IFsyLCA3OV0sIDg0OiBbMiwgNzldLCA4NTogWzIsIDc5XSB9LCB7IDMzOiBbMiwgODFdIH0sIHsgMjM6IFsyLCAyN10sIDMzOiBbMiwgMjddLCA1NDogWzIsIDI3XSwgNjU6IFsyLCAyN10sIDY4OiBbMiwgMjddLCA3MjogWzIsIDI3XSwgNzU6IFsyLCAyN10sIDgwOiBbMiwgMjddLCA4MTogWzIsIDI3XSwgODI6IFsyLCAyN10sIDgzOiBbMiwgMjddLCA4NDogWzIsIDI3XSwgODU6IFsyLCAyN10gfSwgeyAyMzogWzIsIDI4XSwgMzM6IFsyLCAyOF0sIDU0OiBbMiwgMjhdLCA2NTogWzIsIDI4XSwgNjg6IFsyLCAyOF0sIDcyOiBbMiwgMjhdLCA3NTogWzIsIDI4XSwgODA6IFsyLCAyOF0sIDgxOiBbMiwgMjhdLCA4MjogWzIsIDI4XSwgODM6IFsyLCAyOF0sIDg0OiBbMiwgMjhdLCA4NTogWzIsIDI4XSB9LCB7IDIzOiBbMiwgMzBdLCAzMzogWzIsIDMwXSwgNTQ6IFsyLCAzMF0sIDY4OiBbMiwgMzBdLCA3MTogMTA2LCA3MjogWzEsIDEwN10sIDc1OiBbMiwgMzBdIH0sIHsgMjM6IFsyLCA5OF0sIDMzOiBbMiwgOThdLCA1NDogWzIsIDk4XSwgNjg6IFsyLCA5OF0sIDcyOiBbMiwgOThdLCA3NTogWzIsIDk4XSB9LCB7IDIzOiBbMiwgNDVdLCAzMzogWzIsIDQ1XSwgNTQ6IFsyLCA0NV0sIDY1OiBbMiwgNDVdLCA2ODogWzIsIDQ1XSwgNzI6IFsyLCA0NV0sIDczOiBbMSwgMTA4XSwgNzU6IFsyLCA0NV0sIDgwOiBbMiwgNDVdLCA4MTogWzIsIDQ1XSwgODI6IFsyLCA0NV0sIDgzOiBbMiwgNDVdLCA4NDogWzIsIDQ1XSwgODU6IFsyLCA0NV0sIDg3OiBbMiwgNDVdIH0sIHsgMjM6IFsyLCA0NF0sIDMzOiBbMiwgNDRdLCA1NDogWzIsIDQ0XSwgNjU6IFsyLCA0NF0sIDY4OiBbMiwgNDRdLCA3MjogWzIsIDQ0XSwgNzU6IFsyLCA0NF0sIDgwOiBbMiwgNDRdLCA4MTogWzIsIDQ0XSwgODI6IFsyLCA0NF0sIDgzOiBbMiwgNDRdLCA4NDogWzIsIDQ0XSwgODU6IFsyLCA0NF0sIDg3OiBbMiwgNDRdIH0sIHsgNTQ6IFsxLCAxMDldIH0sIHsgNTQ6IFsyLCA4M10sIDY1OiBbMiwgODNdLCA3MjogWzIsIDgzXSwgODA6IFsyLCA4M10sIDgxOiBbMiwgODNdLCA4MjogWzIsIDgzXSwgODM6IFsyLCA4M10sIDg0OiBbMiwgODNdLCA4NTogWzIsIDgzXSB9LCB7IDU0OiBbMiwgODVdIH0sIHsgNTogWzIsIDEzXSwgMTQ6IFsyLCAxM10sIDE1OiBbMiwgMTNdLCAxOTogWzIsIDEzXSwgMjk6IFsyLCAxM10sIDM0OiBbMiwgMTNdLCAzOTogWzIsIDEzXSwgNDQ6IFsyLCAxM10sIDQ3OiBbMiwgMTNdLCA0ODogWzIsIDEzXSwgNTE6IFsyLCAxM10sIDU1OiBbMiwgMTNdLCA2MDogWzIsIDEzXSB9LCB7IDM4OiA1NSwgMzk6IFsxLCA1N10sIDQzOiA1NiwgNDQ6IFsxLCA1OF0sIDQ1OiAxMTEsIDQ2OiAxMTAsIDQ3OiBbMiwgNzZdIH0sIHsgMzM6IFsyLCA3MF0sIDQwOiAxMTIsIDY1OiBbMiwgNzBdLCA3MjogWzIsIDcwXSwgNzU6IFsyLCA3MF0sIDgwOiBbMiwgNzBdLCA4MTogWzIsIDcwXSwgODI6IFsyLCA3MF0sIDgzOiBbMiwgNzBdLCA4NDogWzIsIDcwXSwgODU6IFsyLCA3MF0gfSwgeyA0NzogWzIsIDE4XSB9LCB7IDU6IFsyLCAxNF0sIDE0OiBbMiwgMTRdLCAxNTogWzIsIDE0XSwgMTk6IFsyLCAxNF0sIDI5OiBbMiwgMTRdLCAzNDogWzIsIDE0XSwgMzk6IFsyLCAxNF0sIDQ0OiBbMiwgMTRdLCA0NzogWzIsIDE0XSwgNDg6IFsyLCAxNF0sIDUxOiBbMiwgMTRdLCA1NTogWzIsIDE0XSwgNjA6IFsyLCAxNF0gfSwgeyAzMzogWzEsIDExM10gfSwgeyAzMzogWzIsIDg3XSwgNjU6IFsyLCA4N10sIDcyOiBbMiwgODddLCA4MDogWzIsIDg3XSwgODE6IFsyLCA4N10sIDgyOiBbMiwgODddLCA4MzogWzIsIDg3XSwgODQ6IFsyLCA4N10sIDg1OiBbMiwgODddIH0sIHsgMzM6IFsyLCA4OV0gfSwgeyAyMDogNzQsIDYzOiAxMTUsIDY0OiA3NSwgNjU6IFsxLCA0M10sIDY3OiAxMTQsIDY4OiBbMiwgOTZdLCA2OTogMTE2LCA3MDogNzYsIDcxOiA3NywgNzI6IFsxLCA3OF0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyAzMzogWzEsIDExN10gfSwgeyAzMjogMTE4LCAzMzogWzIsIDYyXSwgNzQ6IDExOSwgNzU6IFsxLCAxMjBdIH0sIHsgMzM6IFsyLCA1OV0sIDY1OiBbMiwgNTldLCA3MjogWzIsIDU5XSwgNzU6IFsyLCA1OV0sIDgwOiBbMiwgNTldLCA4MTogWzIsIDU5XSwgODI6IFsyLCA1OV0sIDgzOiBbMiwgNTldLCA4NDogWzIsIDU5XSwgODU6IFsyLCA1OV0gfSwgeyAzMzogWzIsIDYxXSwgNzU6IFsyLCA2MV0gfSwgeyAzMzogWzIsIDY4XSwgMzc6IDEyMSwgNzQ6IDEyMiwgNzU6IFsxLCAxMjBdIH0sIHsgMzM6IFsyLCA2NV0sIDY1OiBbMiwgNjVdLCA3MjogWzIsIDY1XSwgNzU6IFsyLCA2NV0sIDgwOiBbMiwgNjVdLCA4MTogWzIsIDY1XSwgODI6IFsyLCA2NV0sIDgzOiBbMiwgNjVdLCA4NDogWzIsIDY1XSwgODU6IFsyLCA2NV0gfSwgeyAzMzogWzIsIDY3XSwgNzU6IFsyLCA2N10gfSwgeyAyMzogWzEsIDEyM10gfSwgeyAyMzogWzIsIDUxXSwgNjU6IFsyLCA1MV0sIDcyOiBbMiwgNTFdLCA4MDogWzIsIDUxXSwgODE6IFsyLCA1MV0sIDgyOiBbMiwgNTFdLCA4MzogWzIsIDUxXSwgODQ6IFsyLCA1MV0sIDg1OiBbMiwgNTFdIH0sIHsgMjM6IFsyLCA1M10gfSwgeyAzMzogWzEsIDEyNF0gfSwgeyAzMzogWzIsIDkxXSwgNjU6IFsyLCA5MV0sIDcyOiBbMiwgOTFdLCA4MDogWzIsIDkxXSwgODE6IFsyLCA5MV0sIDgyOiBbMiwgOTFdLCA4MzogWzIsIDkxXSwgODQ6IFsyLCA5MV0sIDg1OiBbMiwgOTFdIH0sIHsgMzM6IFsyLCA5M10gfSwgeyA1OiBbMiwgMjJdLCAxNDogWzIsIDIyXSwgMTU6IFsyLCAyMl0sIDE5OiBbMiwgMjJdLCAyOTogWzIsIDIyXSwgMzQ6IFsyLCAyMl0sIDM5OiBbMiwgMjJdLCA0NDogWzIsIDIyXSwgNDc6IFsyLCAyMl0sIDQ4OiBbMiwgMjJdLCA1MTogWzIsIDIyXSwgNTU6IFsyLCAyMl0sIDYwOiBbMiwgMjJdIH0sIHsgMjM6IFsyLCA5OV0sIDMzOiBbMiwgOTldLCA1NDogWzIsIDk5XSwgNjg6IFsyLCA5OV0sIDcyOiBbMiwgOTldLCA3NTogWzIsIDk5XSB9LCB7IDczOiBbMSwgMTA4XSB9LCB7IDIwOiA3NCwgNjM6IDEyNSwgNjQ6IDc1LCA2NTogWzEsIDQzXSwgNzI6IFsxLCAzNV0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyA1OiBbMiwgMjNdLCAxNDogWzIsIDIzXSwgMTU6IFsyLCAyM10sIDE5OiBbMiwgMjNdLCAyOTogWzIsIDIzXSwgMzQ6IFsyLCAyM10sIDM5OiBbMiwgMjNdLCA0NDogWzIsIDIzXSwgNDc6IFsyLCAyM10sIDQ4OiBbMiwgMjNdLCA1MTogWzIsIDIzXSwgNTU6IFsyLCAyM10sIDYwOiBbMiwgMjNdIH0sIHsgNDc6IFsyLCAxOV0gfSwgeyA0NzogWzIsIDc3XSB9LCB7IDIwOiA3NCwgMzM6IFsyLCA3Ml0sIDQxOiAxMjYsIDYzOiAxMjcsIDY0OiA3NSwgNjU6IFsxLCA0M10sIDY5OiAxMjgsIDcwOiA3NiwgNzE6IDc3LCA3MjogWzEsIDc4XSwgNzU6IFsyLCA3Ml0sIDc4OiAyNiwgNzk6IDI3LCA4MDogWzEsIDI4XSwgODE6IFsxLCAyOV0sIDgyOiBbMSwgMzBdLCA4MzogWzEsIDMxXSwgODQ6IFsxLCAzMl0sIDg1OiBbMSwgMzRdLCA4NjogMzMgfSwgeyA1OiBbMiwgMjRdLCAxNDogWzIsIDI0XSwgMTU6IFsyLCAyNF0sIDE5OiBbMiwgMjRdLCAyOTogWzIsIDI0XSwgMzQ6IFsyLCAyNF0sIDM5OiBbMiwgMjRdLCA0NDogWzIsIDI0XSwgNDc6IFsyLCAyNF0sIDQ4OiBbMiwgMjRdLCA1MTogWzIsIDI0XSwgNTU6IFsyLCAyNF0sIDYwOiBbMiwgMjRdIH0sIHsgNjg6IFsxLCAxMjldIH0sIHsgNjU6IFsyLCA5NV0sIDY4OiBbMiwgOTVdLCA3MjogWzIsIDk1XSwgODA6IFsyLCA5NV0sIDgxOiBbMiwgOTVdLCA4MjogWzIsIDk1XSwgODM6IFsyLCA5NV0sIDg0OiBbMiwgOTVdLCA4NTogWzIsIDk1XSB9LCB7IDY4OiBbMiwgOTddIH0sIHsgNTogWzIsIDIxXSwgMTQ6IFsyLCAyMV0sIDE1OiBbMiwgMjFdLCAxOTogWzIsIDIxXSwgMjk6IFsyLCAyMV0sIDM0OiBbMiwgMjFdLCAzOTogWzIsIDIxXSwgNDQ6IFsyLCAyMV0sIDQ3OiBbMiwgMjFdLCA0ODogWzIsIDIxXSwgNTE6IFsyLCAyMV0sIDU1OiBbMiwgMjFdLCA2MDogWzIsIDIxXSB9LCB7IDMzOiBbMSwgMTMwXSB9LCB7IDMzOiBbMiwgNjNdIH0sIHsgNzI6IFsxLCAxMzJdLCA3NjogMTMxIH0sIHsgMzM6IFsxLCAxMzNdIH0sIHsgMzM6IFsyLCA2OV0gfSwgeyAxNTogWzIsIDEyXSwgMTg6IFsyLCAxMl0gfSwgeyAxNDogWzIsIDI2XSwgMTU6IFsyLCAyNl0sIDE5OiBbMiwgMjZdLCAyOTogWzIsIDI2XSwgMzQ6IFsyLCAyNl0sIDQ3OiBbMiwgMjZdLCA0ODogWzIsIDI2XSwgNTE6IFsyLCAyNl0sIDU1OiBbMiwgMjZdLCA2MDogWzIsIDI2XSB9LCB7IDIzOiBbMiwgMzFdLCAzMzogWzIsIDMxXSwgNTQ6IFsyLCAzMV0sIDY4OiBbMiwgMzFdLCA3MjogWzIsIDMxXSwgNzU6IFsyLCAzMV0gfSwgeyAzMzogWzIsIDc0XSwgNDI6IDEzNCwgNzQ6IDEzNSwgNzU6IFsxLCAxMjBdIH0sIHsgMzM6IFsyLCA3MV0sIDY1OiBbMiwgNzFdLCA3MjogWzIsIDcxXSwgNzU6IFsyLCA3MV0sIDgwOiBbMiwgNzFdLCA4MTogWzIsIDcxXSwgODI6IFsyLCA3MV0sIDgzOiBbMiwgNzFdLCA4NDogWzIsIDcxXSwgODU6IFsyLCA3MV0gfSwgeyAzMzogWzIsIDczXSwgNzU6IFsyLCA3M10gfSwgeyAyMzogWzIsIDI5XSwgMzM6IFsyLCAyOV0sIDU0OiBbMiwgMjldLCA2NTogWzIsIDI5XSwgNjg6IFsyLCAyOV0sIDcyOiBbMiwgMjldLCA3NTogWzIsIDI5XSwgODA6IFsyLCAyOV0sIDgxOiBbMiwgMjldLCA4MjogWzIsIDI5XSwgODM6IFsyLCAyOV0sIDg0OiBbMiwgMjldLCA4NTogWzIsIDI5XSB9LCB7IDE0OiBbMiwgMTVdLCAxNTogWzIsIDE1XSwgMTk6IFsyLCAxNV0sIDI5OiBbMiwgMTVdLCAzNDogWzIsIDE1XSwgMzk6IFsyLCAxNV0sIDQ0OiBbMiwgMTVdLCA0NzogWzIsIDE1XSwgNDg6IFsyLCAxNV0sIDUxOiBbMiwgMTVdLCA1NTogWzIsIDE1XSwgNjA6IFsyLCAxNV0gfSwgeyA3MjogWzEsIDEzN10sIDc3OiBbMSwgMTM2XSB9LCB7IDcyOiBbMiwgMTAwXSwgNzc6IFsyLCAxMDBdIH0sIHsgMTQ6IFsyLCAxNl0sIDE1OiBbMiwgMTZdLCAxOTogWzIsIDE2XSwgMjk6IFsyLCAxNl0sIDM0OiBbMiwgMTZdLCA0NDogWzIsIDE2XSwgNDc6IFsyLCAxNl0sIDQ4OiBbMiwgMTZdLCA1MTogWzIsIDE2XSwgNTU6IFsyLCAxNl0sIDYwOiBbMiwgMTZdIH0sIHsgMzM6IFsxLCAxMzhdIH0sIHsgMzM6IFsyLCA3NV0gfSwgeyAzMzogWzIsIDMyXSB9LCB7IDcyOiBbMiwgMTAxXSwgNzc6IFsyLCAxMDFdIH0sIHsgMTQ6IFsyLCAxN10sIDE1OiBbMiwgMTddLCAxOTogWzIsIDE3XSwgMjk6IFsyLCAxN10sIDM0OiBbMiwgMTddLCAzOTogWzIsIDE3XSwgNDQ6IFsyLCAxN10sIDQ3OiBbMiwgMTddLCA0ODogWzIsIDE3XSwgNTE6IFsyLCAxN10sIDU1OiBbMiwgMTddLCA2MDogWzIsIDE3XSB9XSxcblx0ICAgICAgICBkZWZhdWx0QWN0aW9uczogeyA0OiBbMiwgMV0sIDU0OiBbMiwgNTVdLCA1NjogWzIsIDIwXSwgNjA6IFsyLCA1N10sIDczOiBbMiwgODFdLCA4MjogWzIsIDg1XSwgODY6IFsyLCAxOF0sIDkwOiBbMiwgODldLCAxMDE6IFsyLCA1M10sIDEwNDogWzIsIDkzXSwgMTEwOiBbMiwgMTldLCAxMTE6IFsyLCA3N10sIDExNjogWzIsIDk3XSwgMTE5OiBbMiwgNjNdLCAxMjI6IFsyLCA2OV0sIDEzNTogWzIsIDc1XSwgMTM2OiBbMiwgMzJdIH0sXG5cdCAgICAgICAgcGFyc2VFcnJvcjogZnVuY3Rpb24gcGFyc2VFcnJvcihzdHIsIGhhc2gpIHtcblx0ICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UoaW5wdXQpIHtcblx0ICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuXHQgICAgICAgICAgICAgICAgc3RhY2sgPSBbMF0sXG5cdCAgICAgICAgICAgICAgICB2c3RhY2sgPSBbbnVsbF0sXG5cdCAgICAgICAgICAgICAgICBsc3RhY2sgPSBbXSxcblx0ICAgICAgICAgICAgICAgIHRhYmxlID0gdGhpcy50YWJsZSxcblx0ICAgICAgICAgICAgICAgIHl5dGV4dCA9IFwiXCIsXG5cdCAgICAgICAgICAgICAgICB5eWxpbmVubyA9IDAsXG5cdCAgICAgICAgICAgICAgICB5eWxlbmcgPSAwLFxuXHQgICAgICAgICAgICAgICAgcmVjb3ZlcmluZyA9IDAsXG5cdCAgICAgICAgICAgICAgICBURVJST1IgPSAyLFxuXHQgICAgICAgICAgICAgICAgRU9GID0gMTtcblx0ICAgICAgICAgICAgdGhpcy5sZXhlci5zZXRJbnB1dChpbnB1dCk7XG5cdCAgICAgICAgICAgIHRoaXMubGV4ZXIueXkgPSB0aGlzLnl5O1xuXHQgICAgICAgICAgICB0aGlzLnl5LmxleGVyID0gdGhpcy5sZXhlcjtcblx0ICAgICAgICAgICAgdGhpcy55eS5wYXJzZXIgPSB0aGlzO1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGV4ZXIueXlsbG9jID09IFwidW5kZWZpbmVkXCIpIHRoaXMubGV4ZXIueXlsbG9jID0ge307XG5cdCAgICAgICAgICAgIHZhciB5eWxvYyA9IHRoaXMubGV4ZXIueXlsbG9jO1xuXHQgICAgICAgICAgICBsc3RhY2sucHVzaCh5eWxvYyk7XG5cdCAgICAgICAgICAgIHZhciByYW5nZXMgPSB0aGlzLmxleGVyLm9wdGlvbnMgJiYgdGhpcy5sZXhlci5vcHRpb25zLnJhbmdlcztcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnl5LnBhcnNlRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5wYXJzZUVycm9yID0gdGhpcy55eS5wYXJzZUVycm9yO1xuXHQgICAgICAgICAgICBmdW5jdGlvbiBwb3BTdGFjayhuKSB7XG5cdCAgICAgICAgICAgICAgICBzdGFjay5sZW5ndGggPSBzdGFjay5sZW5ndGggLSAyICogbjtcblx0ICAgICAgICAgICAgICAgIHZzdGFjay5sZW5ndGggPSB2c3RhY2subGVuZ3RoIC0gbjtcblx0ICAgICAgICAgICAgICAgIGxzdGFjay5sZW5ndGggPSBsc3RhY2subGVuZ3RoIC0gbjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBmdW5jdGlvbiBsZXgoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdG9rZW47XG5cdCAgICAgICAgICAgICAgICB0b2tlbiA9IHNlbGYubGV4ZXIubGV4KCkgfHwgMTtcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gIT09IFwibnVtYmVyXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHNlbGYuc3ltYm9sc19bdG9rZW5dIHx8IHRva2VuO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBzeW1ib2wsXG5cdCAgICAgICAgICAgICAgICBwcmVFcnJvclN5bWJvbCxcblx0ICAgICAgICAgICAgICAgIHN0YXRlLFxuXHQgICAgICAgICAgICAgICAgYWN0aW9uLFxuXHQgICAgICAgICAgICAgICAgYSxcblx0ICAgICAgICAgICAgICAgIHIsXG5cdCAgICAgICAgICAgICAgICB5eXZhbCA9IHt9LFxuXHQgICAgICAgICAgICAgICAgcCxcblx0ICAgICAgICAgICAgICAgIGxlbixcblx0ICAgICAgICAgICAgICAgIG5ld1N0YXRlLFxuXHQgICAgICAgICAgICAgICAgZXhwZWN0ZWQ7XG5cdCAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEFjdGlvbnNbc3RhdGVdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gdGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV07XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChzeW1ib2wgPT09IG51bGwgfHwgdHlwZW9mIHN5bWJvbCA9PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbCA9IGxleCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBhY3Rpb24gPSB0YWJsZVtzdGF0ZV0gJiYgdGFibGVbc3RhdGVdW3N5bWJvbF07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhYWN0aW9uLmxlbmd0aCB8fCAhYWN0aW9uWzBdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGVyclN0ciA9IFwiXCI7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWNvdmVyaW5nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkID0gW107XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocCBpbiB0YWJsZVtzdGF0ZV0pIGlmICh0aGlzLnRlcm1pbmFsc19bcF0gJiYgcCA+IDIpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkLnB1c2goXCInXCIgKyB0aGlzLnRlcm1pbmFsc19bcF0gKyBcIidcIik7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGV4ZXIuc2hvd1Bvc2l0aW9uKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSBcIlBhcnNlIGVycm9yIG9uIGxpbmUgXCIgKyAoeXlsaW5lbm8gKyAxKSArIFwiOlxcblwiICsgdGhpcy5sZXhlci5zaG93UG9zaXRpb24oKSArIFwiXFxuRXhwZWN0aW5nIFwiICsgZXhwZWN0ZWQuam9pbihcIiwgXCIpICsgXCIsIGdvdCAnXCIgKyAodGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sKSArIFwiJ1wiO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyU3RyID0gXCJQYXJzZSBlcnJvciBvbiBsaW5lIFwiICsgKHl5bGluZW5vICsgMSkgKyBcIjogVW5leHBlY3RlZCBcIiArIChzeW1ib2wgPT0gMSA/IFwiZW5kIG9mIGlucHV0XCIgOiBcIidcIiArICh0aGlzLnRlcm1pbmFsc19bc3ltYm9sXSB8fCBzeW1ib2wpICsgXCInXCIpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VFcnJvcihlcnJTdHIsIHsgdGV4dDogdGhpcy5sZXhlci5tYXRjaCwgdG9rZW46IHRoaXMudGVybWluYWxzX1tzeW1ib2xdIHx8IHN5bWJvbCwgbGluZTogdGhpcy5sZXhlci55eWxpbmVubywgbG9jOiB5eWxvYywgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChhY3Rpb25bMF0gaW5zdGFuY2VvZiBBcnJheSAmJiBhY3Rpb24ubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlIEVycm9yOiBtdWx0aXBsZSBhY3Rpb25zIHBvc3NpYmxlIGF0IHN0YXRlOiBcIiArIHN0YXRlICsgXCIsIHRva2VuOiBcIiArIHN5bWJvbCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvblswXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChzeW1ib2wpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2c3RhY2sucHVzaCh0aGlzLmxleGVyLnl5dGV4dCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxzdGFjay5wdXNoKHRoaXMubGV4ZXIueXlsbG9jKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChhY3Rpb25bMV0pO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzeW1ib2wgPSBudWxsO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByZUVycm9yU3ltYm9sKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB5eWxlbmcgPSB0aGlzLmxleGVyLnl5bGVuZztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHl5dGV4dCA9IHRoaXMubGV4ZXIueXl0ZXh0O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXlsaW5lbm8gPSB0aGlzLmxleGVyLnl5bGluZW5vO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXlsb2MgPSB0aGlzLmxleGVyLnl5bGxvYztcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvdmVyaW5nID4gMCkgcmVjb3ZlcmluZy0tO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sID0gcHJlRXJyb3JTeW1ib2w7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVFcnJvclN5bWJvbCA9IG51bGw7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSB0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzFdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB5eXZhbC4kID0gdnN0YWNrW3ZzdGFjay5sZW5ndGggLSBsZW5dO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB5eXZhbC5fJCA9IHsgZmlyc3RfbGluZTogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAobGVuIHx8IDEpXS5maXJzdF9saW5lLCBsYXN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9saW5lLCBmaXJzdF9jb2x1bW46IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0uZmlyc3RfY29sdW1uLCBsYXN0X2NvbHVtbjogbHN0YWNrW2xzdGFjay5sZW5ndGggLSAxXS5sYXN0X2NvbHVtbiB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2VzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB5eXZhbC5fJC5yYW5nZSA9IFtsc3RhY2tbbHN0YWNrLmxlbmd0aCAtIChsZW4gfHwgMSldLnJhbmdlWzBdLCBsc3RhY2tbbHN0YWNrLmxlbmd0aCAtIDFdLnJhbmdlWzFdXTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICByID0gdGhpcy5wZXJmb3JtQWN0aW9uLmNhbGwoeXl2YWwsIHl5dGV4dCwgeXlsZW5nLCB5eWxpbmVubywgdGhpcy55eSwgYWN0aW9uWzFdLCB2c3RhY2ssIGxzdGFjayk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgciAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZSgwLCAtMSAqIGxlbiAqIDIpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0YWNrID0gdnN0YWNrLnNsaWNlKDAsIC0xICogbGVuKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxzdGFjayA9IGxzdGFjay5zbGljZSgwLCAtMSAqIGxlbik7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzBdKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdnN0YWNrLnB1c2goeXl2YWwuJCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGxzdGFjay5wdXNoKHl5dmFsLl8kKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGUgPSB0YWJsZVtzdGFja1tzdGFjay5sZW5ndGggLSAyXV1bc3RhY2tbc3RhY2subGVuZ3RoIC0gMV1dO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5ld1N0YXRlKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyogSmlzb24gZ2VuZXJhdGVkIGxleGVyICovXG5cdCAgICB2YXIgbGV4ZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBsZXhlciA9IHsgRU9GOiAxLFxuXHQgICAgICAgICAgICBwYXJzZUVycm9yOiBmdW5jdGlvbiBwYXJzZUVycm9yKHN0ciwgaGFzaCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMueXkucGFyc2VyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy55eS5wYXJzZXIucGFyc2VFcnJvcihzdHIsIGhhc2gpO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3RyKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgc2V0SW5wdXQ6IGZ1bmN0aW9uIHNldElucHV0KGlucHV0KSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dCA9IGlucHV0O1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fbW9yZSA9IHRoaXMuX2xlc3MgPSB0aGlzLmRvbmUgPSBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIHRoaXMueXlsaW5lbm8gPSB0aGlzLnl5bGVuZyA9IDA7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnl5dGV4dCA9IHRoaXMubWF0Y2hlZCA9IHRoaXMubWF0Y2ggPSAnJztcblx0ICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uU3RhY2sgPSBbJ0lOSVRJQUwnXTtcblx0ICAgICAgICAgICAgICAgIHRoaXMueXlsbG9jID0geyBmaXJzdF9saW5lOiAxLCBmaXJzdF9jb2x1bW46IDAsIGxhc3RfbGluZTogMSwgbGFzdF9jb2x1bW46IDAgfTtcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmFuZ2VzKSB0aGlzLnl5bGxvYy5yYW5nZSA9IFswLCAwXTtcblx0ICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24gaW5wdXQoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggPSB0aGlzLl9pbnB1dFswXTtcblx0ICAgICAgICAgICAgICAgIHRoaXMueXl0ZXh0ICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgdGhpcy55eWxlbmcrKztcblx0ICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0Kys7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm1hdGNoICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkICs9IGNoO1xuXHQgICAgICAgICAgICAgICAgdmFyIGxpbmVzID0gY2gubWF0Y2goLyg/Olxcclxcbj98XFxuKS4qL2cpO1xuXHQgICAgICAgICAgICAgICAgaWYgKGxpbmVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy55eWxpbmVubysrO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMueXlsbG9jLmxhc3RfbGluZSsrO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnl5bGxvYy5sYXN0X2NvbHVtbisrO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHRoaXMueXlsbG9jLnJhbmdlWzFdKys7XG5cblx0ICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UoMSk7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gY2g7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHVucHV0OiBmdW5jdGlvbiB1bnB1dChjaCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGxlbiA9IGNoLmxlbmd0aDtcblx0ICAgICAgICAgICAgICAgIHZhciBsaW5lcyA9IGNoLnNwbGl0KC8oPzpcXHJcXG4/fFxcbikvZyk7XG5cblx0ICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gY2ggKyB0aGlzLl9pbnB1dDtcblx0ICAgICAgICAgICAgICAgIHRoaXMueXl0ZXh0ID0gdGhpcy55eXRleHQuc3Vic3RyKDAsIHRoaXMueXl0ZXh0Lmxlbmd0aCAtIGxlbiAtIDEpO1xuXHQgICAgICAgICAgICAgICAgLy90aGlzLnl5bGVuZyAtPSBsZW47XG5cdCAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCAtPSBsZW47XG5cdCAgICAgICAgICAgICAgICB2YXIgb2xkTGluZXMgPSB0aGlzLm1hdGNoLnNwbGl0KC8oPzpcXHJcXG4/fFxcbikvZyk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLm1hdGNoID0gdGhpcy5tYXRjaC5zdWJzdHIoMCwgdGhpcy5tYXRjaC5sZW5ndGggLSAxKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZCA9IHRoaXMubWF0Y2hlZC5zdWJzdHIoMCwgdGhpcy5tYXRjaGVkLmxlbmd0aCAtIDEpO1xuXG5cdCAgICAgICAgICAgICAgICBpZiAobGluZXMubGVuZ3RoIC0gMSkgdGhpcy55eWxpbmVubyAtPSBsaW5lcy5sZW5ndGggLSAxO1xuXHQgICAgICAgICAgICAgICAgdmFyIHIgPSB0aGlzLnl5bGxvYy5yYW5nZTtcblxuXHQgICAgICAgICAgICAgICAgdGhpcy55eWxsb2MgPSB7IGZpcnN0X2xpbmU6IHRoaXMueXlsbG9jLmZpcnN0X2xpbmUsXG5cdCAgICAgICAgICAgICAgICAgICAgbGFzdF9saW5lOiB0aGlzLnl5bGluZW5vICsgMSxcblx0ICAgICAgICAgICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmZpcnN0X2NvbHVtbixcblx0ICAgICAgICAgICAgICAgICAgICBsYXN0X2NvbHVtbjogbGluZXMgPyAobGluZXMubGVuZ3RoID09PSBvbGRMaW5lcy5sZW5ndGggPyB0aGlzLnl5bGxvYy5maXJzdF9jb2x1bW4gOiAwKSArIG9sZExpbmVzW29sZExpbmVzLmxlbmd0aCAtIGxpbmVzLmxlbmd0aF0ubGVuZ3RoIC0gbGluZXNbMF0ubGVuZ3RoIDogdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uIC0gbGVuXG5cdCAgICAgICAgICAgICAgICB9O1xuXG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJhbmdlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMueXlsbG9jLnJhbmdlID0gW3JbMF0sIHJbMF0gKyB0aGlzLnl5bGVuZyAtIGxlbl07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgbW9yZTogZnVuY3Rpb24gbW9yZSgpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX21vcmUgPSB0cnVlO1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIGxlc3M6IGZ1bmN0aW9uIGxlc3Mobikge1xuXHQgICAgICAgICAgICAgICAgdGhpcy51bnB1dCh0aGlzLm1hdGNoLnNsaWNlKG4pKTtcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgcGFzdElucHV0OiBmdW5jdGlvbiBwYXN0SW5wdXQoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGFzdCA9IHRoaXMubWF0Y2hlZC5zdWJzdHIoMCwgdGhpcy5tYXRjaGVkLmxlbmd0aCAtIHRoaXMubWF0Y2gubGVuZ3RoKTtcblx0ICAgICAgICAgICAgICAgIHJldHVybiAocGFzdC5sZW5ndGggPiAyMCA/ICcuLi4nIDogJycpICsgcGFzdC5zdWJzdHIoLTIwKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHVwY29taW5nSW5wdXQ6IGZ1bmN0aW9uIHVwY29taW5nSW5wdXQoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHRoaXMubWF0Y2g7XG5cdCAgICAgICAgICAgICAgICBpZiAobmV4dC5sZW5ndGggPCAyMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIG5leHQgKz0gdGhpcy5faW5wdXQuc3Vic3RyKDAsIDIwIC0gbmV4dC5sZW5ndGgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChuZXh0LnN1YnN0cigwLCAyMCkgKyAobmV4dC5sZW5ndGggPiAyMCA/ICcuLi4nIDogJycpKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHNob3dQb3NpdGlvbjogZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHByZSA9IHRoaXMucGFzdElucHV0KCk7XG5cdCAgICAgICAgICAgICAgICB2YXIgYyA9IG5ldyBBcnJheShwcmUubGVuZ3RoICsgMSkuam9pbihcIi1cIik7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gcHJlICsgdGhpcy51cGNvbWluZ0lucHV0KCkgKyBcIlxcblwiICsgYyArIFwiXlwiO1xuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5faW5wdXQpIHRoaXMuZG9uZSA9IHRydWU7XG5cblx0ICAgICAgICAgICAgICAgIHZhciB0b2tlbiwgbWF0Y2gsIHRlbXBNYXRjaCwgaW5kZXgsIGNvbCwgbGluZXM7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX21vcmUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnl5dGV4dCA9ICcnO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2ggPSAnJztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhciBydWxlcyA9IHRoaXMuX2N1cnJlbnRSdWxlcygpO1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRlbXBNYXRjaCA9IHRoaXMuX2lucHV0Lm1hdGNoKHRoaXMucnVsZXNbcnVsZXNbaV1dKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGVtcE1hdGNoICYmICghbWF0Y2ggfHwgdGVtcE1hdGNoWzBdLmxlbmd0aCA+IG1hdGNoWzBdLmxlbmd0aCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0ZW1wTWF0Y2g7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZmxleCkgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbGluZXMgPSBtYXRjaFswXS5tYXRjaCgvKD86XFxyXFxuP3xcXG4pLiovZyk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVzKSB0aGlzLnl5bGluZW5vICs9IGxpbmVzLmxlbmd0aDtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnl5bGxvYyA9IHsgZmlyc3RfbGluZTogdGhpcy55eWxsb2MubGFzdF9saW5lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IHRoaXMueXlsaW5lbm8gKyAxLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9jb2x1bW46IHRoaXMueXlsbG9jLmxhc3RfY29sdW1uLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2NvbHVtbjogbGluZXMgPyBsaW5lc1tsaW5lcy5sZW5ndGggLSAxXS5sZW5ndGggLSBsaW5lc1tsaW5lcy5sZW5ndGggLSAxXS5tYXRjaCgvXFxyP1xcbj8vKVswXS5sZW5ndGggOiB0aGlzLnl5bGxvYy5sYXN0X2NvbHVtbiArIG1hdGNoWzBdLmxlbmd0aCB9O1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMueXl0ZXh0ICs9IG1hdGNoWzBdO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2ggKz0gbWF0Y2hbMF07XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVzID0gbWF0Y2g7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy55eWxlbmcgPSB0aGlzLnl5dGV4dC5sZW5ndGg7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55eWxsb2MucmFuZ2UgPSBbdGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICs9IHRoaXMueXlsZW5nXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9yZSA9IGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0ID0gdGhpcy5faW5wdXQuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWQgKz0gbWF0Y2hbMF07XG5cdCAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnBlcmZvcm1BY3Rpb24uY2FsbCh0aGlzLCB0aGlzLnl5LCB0aGlzLCBydWxlc1tpbmRleF0sIHRoaXMuY29uZGl0aW9uU3RhY2tbdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggLSAxXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSAmJiB0aGlzLl9pbnB1dCkgdGhpcy5kb25lID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSByZXR1cm4gdG9rZW47ZWxzZSByZXR1cm47XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5wdXQgPT09IFwiXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5FT0Y7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlRXJyb3IoJ0xleGljYWwgZXJyb3Igb24gbGluZSAnICsgKHRoaXMueXlsaW5lbm8gKyAxKSArICcuIFVucmVjb2duaXplZCB0ZXh0LlxcbicgKyB0aGlzLnNob3dQb3NpdGlvbigpLCB7IHRleHQ6IFwiXCIsIHRva2VuOiBudWxsLCBsaW5lOiB0aGlzLnl5bGluZW5vIH0pO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBsZXg6IGZ1bmN0aW9uIGxleCgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciByID0gdGhpcy5uZXh0KCk7XG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHIgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxleCgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICBiZWdpbjogZnVuY3Rpb24gYmVnaW4oY29uZGl0aW9uKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvblN0YWNrLnB1c2goY29uZGl0aW9uKTtcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgcG9wU3RhdGU6IGZ1bmN0aW9uIHBvcFN0YXRlKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2sucG9wKCk7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIF9jdXJyZW50UnVsZXM6IGZ1bmN0aW9uIF9jdXJyZW50UnVsZXMoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25zW3RoaXMuY29uZGl0aW9uU3RhY2tbdGhpcy5jb25kaXRpb25TdGFjay5sZW5ndGggLSAxXV0ucnVsZXM7XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHRvcFN0YXRlOiBmdW5jdGlvbiB0b3BTdGF0ZSgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmRpdGlvblN0YWNrW3RoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoIC0gMl07XG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHB1c2hTdGF0ZTogZnVuY3Rpb24gYmVnaW4oY29uZGl0aW9uKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLmJlZ2luKGNvbmRpdGlvbik7XG5cdCAgICAgICAgICAgIH0gfTtcblx0ICAgICAgICBsZXhlci5vcHRpb25zID0ge307XG5cdCAgICAgICAgbGV4ZXIucGVyZm9ybUFjdGlvbiA9IGZ1bmN0aW9uIGFub255bW91cyh5eSwgeXlfLCAkYXZvaWRpbmdfbmFtZV9jb2xsaXNpb25zLCBZWV9TVEFSVCkge1xuXG5cdCAgICAgICAgICAgIGZ1bmN0aW9uIHN0cmlwKHN0YXJ0LCBlbmQpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB5eV8ueXl0ZXh0ID0geXlfLnl5dGV4dC5zdWJzdHJpbmcoc3RhcnQsIHl5Xy55eWxlbmcgLSBlbmQgKyBzdGFydCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB2YXIgWVlTVEFURSA9IFlZX1NUQVJUO1xuXHQgICAgICAgICAgICBzd2l0Y2ggKCRhdm9pZGluZ19uYW1lX2NvbGxpc2lvbnMpIHtcblx0ICAgICAgICAgICAgICAgIGNhc2UgMDpcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoeXlfLnl5dGV4dC5zbGljZSgtMikgPT09IFwiXFxcXFxcXFxcIikge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdHJpcCgwLCAxKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbihcIm11XCIpO1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeXlfLnl5dGV4dC5zbGljZSgtMSkgPT09IFwiXFxcXFwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwKDAsIDEpO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luKFwiZW11XCIpO1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW4oXCJtdVwiKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHl5Xy55eXRleHQpIHJldHVybiAxNTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxOlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAxNTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjpcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcFN0YXRlKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE1O1xuXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbigncmF3Jyk7cmV0dXJuIDE1O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wU3RhdGUoKTtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBTaG91bGQgYmUgdXNpbmcgYHRoaXMudG9wU3RhdGUoKWAgYmVsb3csIGJ1dCBpdCBjdXJyZW50bHlcblx0ICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5zIHRoZSBzZWNvbmQgdG9wIGluc3RlYWQgb2YgdGhlIGZpcnN0IHRvcC4gT3BlbmVkIGFuXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gaXNzdWUgYWJvdXQgaXQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3phYWNoL2ppc29uL2lzc3Vlcy8yOTFcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aCAtIDFdID09PSAncmF3Jykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTU7XG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RyaXAoNSwgOSk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnRU5EX1JBV19CTE9DSyc7XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDU6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE1O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA2OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wU3RhdGUoKTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTQ7XG5cblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNzpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNjU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDY4O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA5OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAxOTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTA6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BTdGF0ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW4oJ3JhdycpO1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAyMztcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxMTpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNTU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDEyOlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA2MDtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTM6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDI5O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxNDpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDc7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDE1OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wU3RhdGUoKTtyZXR1cm4gNDQ7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDE2OlxuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wU3RhdGUoKTtyZXR1cm4gNDQ7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDE3OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAzNDtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMTg6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDM5O1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAxOTpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNTE7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDIwOlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA0ODtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjE6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy51bnB1dCh5eV8ueXl0ZXh0KTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcFN0YXRlKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbignY29tJyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjI6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BTdGF0ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiAxNDtcblxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyMzpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDg7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDI0OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA3Mztcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjU6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDcyO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAyNjpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNzI7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDI3OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA4Nztcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjg6XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIHdoaXRlc3BhY2Vcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMjk6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BTdGF0ZSgpO3JldHVybiA1NDtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzA6XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BTdGF0ZSgpO3JldHVybiAzMztcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzE6XG5cdCAgICAgICAgICAgICAgICAgICAgeXlfLnl5dGV4dCA9IHN0cmlwKDEsIDIpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKTtyZXR1cm4gODA7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDMyOlxuXHQgICAgICAgICAgICAgICAgICAgIHl5Xy55eXRleHQgPSBzdHJpcCgxLCAyKS5yZXBsYWNlKC9cXFxcJy9nLCBcIidcIik7cmV0dXJuIDgwO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzMzpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gODU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDM0OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA4Mjtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzU6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDgyO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzNjpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gODM7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDM3OlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA4NDtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgMzg6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDgxO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSAzOTpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNzU7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBjYXNlIDQwOlxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiA3Nztcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgICAgIGNhc2UgNDE6XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDcyO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0Mjpcblx0ICAgICAgICAgICAgICAgICAgICB5eV8ueXl0ZXh0ID0geXlfLnl5dGV4dC5yZXBsYWNlKC9cXFxcKFtcXFxcXFxdXSkvZywgJyQxJyk7cmV0dXJuIDcyO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0Mzpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0lOVkFMSUQnO1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgY2FzZSA0NDpcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gNTtcblx0ICAgICAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICAgICAgbGV4ZXIucnVsZXMgPSBbL14oPzpbXlxceDAwXSo/KD89KFxce1xceykpKS8sIC9eKD86W15cXHgwMF0rKS8sIC9eKD86W15cXHgwMF17Mix9Pyg/PShcXHtcXHt8XFxcXFxce1xce3xcXFxcXFxcXFxce1xce3wkKSkpLywgL14oPzpcXHtcXHtcXHtcXHsoPz1bXlxcL10pKS8sIC9eKD86XFx7XFx7XFx7XFx7XFwvW15cXHMhXCIjJS0sXFwuXFwvOy0+QFxcWy1cXF5gXFx7LX5dKyg/PVs9fVxcc1xcLy5dKVxcfVxcfVxcfVxcfSkvLCAvXig/OlteXFx4MDBdKz8oPz0oXFx7XFx7XFx7XFx7KSkpLywgL14oPzpbXFxzXFxTXSo/LS0ofik/XFx9XFx9KS8sIC9eKD86XFwoKS8sIC9eKD86XFwpKS8sIC9eKD86XFx7XFx7XFx7XFx7KS8sIC9eKD86XFx9XFx9XFx9XFx9KS8sIC9eKD86XFx7XFx7KH4pPz4pLywgL14oPzpcXHtcXHsofik/Iz4pLywgL14oPzpcXHtcXHsofik/I1xcKj8pLywgL14oPzpcXHtcXHsofik/XFwvKS8sIC9eKD86XFx7XFx7KH4pP1xcXlxccyoofik/XFx9XFx9KS8sIC9eKD86XFx7XFx7KH4pP1xccyplbHNlXFxzKih+KT9cXH1cXH0pLywgL14oPzpcXHtcXHsofik/XFxeKS8sIC9eKD86XFx7XFx7KH4pP1xccyplbHNlXFxiKS8sIC9eKD86XFx7XFx7KH4pP1xceykvLCAvXig/Olxce1xceyh+KT8mKS8sIC9eKD86XFx7XFx7KH4pPyEtLSkvLCAvXig/Olxce1xceyh+KT8hW1xcc1xcU10qP1xcfVxcfSkvLCAvXig/Olxce1xceyh+KT9cXCo/KS8sIC9eKD86PSkvLCAvXig/OlxcLlxcLikvLCAvXig/OlxcLig/PShbPX59XFxzXFwvLil8XSkpKS8sIC9eKD86W1xcLy5dKS8sIC9eKD86XFxzKykvLCAvXig/OlxcfSh+KT9cXH1cXH0pLywgL14oPzoofik/XFx9XFx9KS8sIC9eKD86XCIoXFxcXFtcIl18W15cIl0pKlwiKS8sIC9eKD86JyhcXFxcWyddfFteJ10pKicpLywgL14oPzpAKS8sIC9eKD86dHJ1ZSg/PShbfn1cXHMpXSkpKS8sIC9eKD86ZmFsc2UoPz0oW359XFxzKV0pKSkvLCAvXig/OnVuZGVmaW5lZCg/PShbfn1cXHMpXSkpKS8sIC9eKD86bnVsbCg/PShbfn1cXHMpXSkpKS8sIC9eKD86LT9bMC05XSsoPzpcXC5bMC05XSspPyg/PShbfn1cXHMpXSkpKS8sIC9eKD86YXNcXHMrXFx8KS8sIC9eKD86XFx8KS8sIC9eKD86KFteXFxzIVwiIyUtLFxcLlxcLzstPkBcXFstXFxeYFxcey1+XSsoPz0oWz1+fVxcc1xcLy4pfF0pKSkpLywgL14oPzpcXFsoXFxcXFxcXXxbXlxcXV0pKlxcXSkvLCAvXig/Oi4pLywgL14oPzokKS9dO1xuXHQgICAgICAgIGxleGVyLmNvbmRpdGlvbnMgPSB7IFwibXVcIjogeyBcInJ1bGVzXCI6IFs3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMjksIDMwLCAzMSwgMzIsIDMzLCAzNCwgMzUsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDEsIDQyLCA0MywgNDRdLCBcImluY2x1c2l2ZVwiOiBmYWxzZSB9LCBcImVtdVwiOiB7IFwicnVsZXNcIjogWzJdLCBcImluY2x1c2l2ZVwiOiBmYWxzZSB9LCBcImNvbVwiOiB7IFwicnVsZXNcIjogWzZdLCBcImluY2x1c2l2ZVwiOiBmYWxzZSB9LCBcInJhd1wiOiB7IFwicnVsZXNcIjogWzMsIDQsIDVdLCBcImluY2x1c2l2ZVwiOiBmYWxzZSB9LCBcIklOSVRJQUxcIjogeyBcInJ1bGVzXCI6IFswLCAxLCA0NF0sIFwiaW5jbHVzaXZlXCI6IHRydWUgfSB9O1xuXHQgICAgICAgIHJldHVybiBsZXhlcjtcblx0ICAgIH0pKCk7XG5cdCAgICBwYXJzZXIubGV4ZXIgPSBsZXhlcjtcblx0ICAgIGZ1bmN0aW9uIFBhcnNlcigpIHtcblx0ICAgICAgICB0aGlzLnl5ID0ge307XG5cdCAgICB9UGFyc2VyLnByb3RvdHlwZSA9IHBhcnNlcjtwYXJzZXIuUGFyc2VyID0gUGFyc2VyO1xuXHQgICAgcmV0dXJuIG5ldyBQYXJzZXIoKTtcblx0fSkoKTtleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGhhbmRsZWJhcnM7XG5cdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cbi8qKiovIH0pLFxuLyogNDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX3Zpc2l0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KTtcblxuXHR2YXIgX3Zpc2l0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmlzaXRvcik7XG5cblx0ZnVuY3Rpb24gV2hpdGVzcGFjZUNvbnRyb2woKSB7XG5cdCAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHQgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblx0V2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlID0gbmV3IF92aXNpdG9yMlsnZGVmYXVsdCddKCk7XG5cblx0V2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlLlByb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xuXHQgIHZhciBkb1N0YW5kYWxvbmUgPSAhdGhpcy5vcHRpb25zLmlnbm9yZVN0YW5kYWxvbmU7XG5cblx0ICB2YXIgaXNSb290ID0gIXRoaXMuaXNSb290U2Vlbjtcblx0ICB0aGlzLmlzUm9vdFNlZW4gPSB0cnVlO1xuXG5cdCAgdmFyIGJvZHkgPSBwcm9ncmFtLmJvZHk7XG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBib2R5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgdmFyIGN1cnJlbnQgPSBib2R5W2ldLFxuXHQgICAgICAgIHN0cmlwID0gdGhpcy5hY2NlcHQoY3VycmVudCk7XG5cblx0ICAgIGlmICghc3RyaXApIHtcblx0ICAgICAgY29udGludWU7XG5cdCAgICB9XG5cblx0ICAgIHZhciBfaXNQcmV2V2hpdGVzcGFjZSA9IGlzUHJldldoaXRlc3BhY2UoYm9keSwgaSwgaXNSb290KSxcblx0ICAgICAgICBfaXNOZXh0V2hpdGVzcGFjZSA9IGlzTmV4dFdoaXRlc3BhY2UoYm9keSwgaSwgaXNSb290KSxcblx0ICAgICAgICBvcGVuU3RhbmRhbG9uZSA9IHN0cmlwLm9wZW5TdGFuZGFsb25lICYmIF9pc1ByZXZXaGl0ZXNwYWNlLFxuXHQgICAgICAgIGNsb3NlU3RhbmRhbG9uZSA9IHN0cmlwLmNsb3NlU3RhbmRhbG9uZSAmJiBfaXNOZXh0V2hpdGVzcGFjZSxcblx0ICAgICAgICBpbmxpbmVTdGFuZGFsb25lID0gc3RyaXAuaW5saW5lU3RhbmRhbG9uZSAmJiBfaXNQcmV2V2hpdGVzcGFjZSAmJiBfaXNOZXh0V2hpdGVzcGFjZTtcblxuXHQgICAgaWYgKHN0cmlwLmNsb3NlKSB7XG5cdCAgICAgIG9taXRSaWdodChib2R5LCBpLCB0cnVlKTtcblx0ICAgIH1cblx0ICAgIGlmIChzdHJpcC5vcGVuKSB7XG5cdCAgICAgIG9taXRMZWZ0KGJvZHksIGksIHRydWUpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoZG9TdGFuZGFsb25lICYmIGlubGluZVN0YW5kYWxvbmUpIHtcblx0ICAgICAgb21pdFJpZ2h0KGJvZHksIGkpO1xuXG5cdCAgICAgIGlmIChvbWl0TGVmdChib2R5LCBpKSkge1xuXHQgICAgICAgIC8vIElmIHdlIGFyZSBvbiBhIHN0YW5kYWxvbmUgbm9kZSwgc2F2ZSB0aGUgaW5kZW50IGluZm8gZm9yIHBhcnRpYWxzXG5cdCAgICAgICAgaWYgKGN1cnJlbnQudHlwZSA9PT0gJ1BhcnRpYWxTdGF0ZW1lbnQnKSB7XG5cdCAgICAgICAgICAvLyBQdWxsIG91dCB0aGUgd2hpdGVzcGFjZSBmcm9tIHRoZSBmaW5hbCBsaW5lXG5cdCAgICAgICAgICBjdXJyZW50LmluZGVudCA9IC8oWyBcXHRdKyQpLy5leGVjKGJvZHlbaSAtIDFdLm9yaWdpbmFsKVsxXTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmIChkb1N0YW5kYWxvbmUgJiYgb3BlblN0YW5kYWxvbmUpIHtcblx0ICAgICAgb21pdFJpZ2h0KChjdXJyZW50LnByb2dyYW0gfHwgY3VycmVudC5pbnZlcnNlKS5ib2R5KTtcblxuXHQgICAgICAvLyBTdHJpcCBvdXQgdGhlIHByZXZpb3VzIGNvbnRlbnQgbm9kZSBpZiBpdCdzIHdoaXRlc3BhY2Ugb25seVxuXHQgICAgICBvbWl0TGVmdChib2R5LCBpKTtcblx0ICAgIH1cblx0ICAgIGlmIChkb1N0YW5kYWxvbmUgJiYgY2xvc2VTdGFuZGFsb25lKSB7XG5cdCAgICAgIC8vIEFsd2F5cyBzdHJpcCB0aGUgbmV4dCBub2RlXG5cdCAgICAgIG9taXRSaWdodChib2R5LCBpKTtcblxuXHQgICAgICBvbWl0TGVmdCgoY3VycmVudC5pbnZlcnNlIHx8IGN1cnJlbnQucHJvZ3JhbSkuYm9keSk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHByb2dyYW07XG5cdH07XG5cblx0V2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlLkJsb2NrU3RhdGVtZW50ID0gV2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlLkRlY29yYXRvckJsb2NrID0gV2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlLlBhcnRpYWxCbG9ja1N0YXRlbWVudCA9IGZ1bmN0aW9uIChibG9jaykge1xuXHQgIHRoaXMuYWNjZXB0KGJsb2NrLnByb2dyYW0pO1xuXHQgIHRoaXMuYWNjZXB0KGJsb2NrLmludmVyc2UpO1xuXG5cdCAgLy8gRmluZCB0aGUgaW52ZXJzZSBwcm9ncmFtIHRoYXQgaXMgaW52b2xlZCB3aXRoIHdoaXRlc3BhY2Ugc3RyaXBwaW5nLlxuXHQgIHZhciBwcm9ncmFtID0gYmxvY2sucHJvZ3JhbSB8fCBibG9jay5pbnZlcnNlLFxuXHQgICAgICBpbnZlcnNlID0gYmxvY2sucHJvZ3JhbSAmJiBibG9jay5pbnZlcnNlLFxuXHQgICAgICBmaXJzdEludmVyc2UgPSBpbnZlcnNlLFxuXHQgICAgICBsYXN0SW52ZXJzZSA9IGludmVyc2U7XG5cblx0ICBpZiAoaW52ZXJzZSAmJiBpbnZlcnNlLmNoYWluZWQpIHtcblx0ICAgIGZpcnN0SW52ZXJzZSA9IGludmVyc2UuYm9keVswXS5wcm9ncmFtO1xuXG5cdCAgICAvLyBXYWxrIHRoZSBpbnZlcnNlIGNoYWluIHRvIGZpbmQgdGhlIGxhc3QgaW52ZXJzZSB0aGF0IGlzIGFjdHVhbGx5IGluIHRoZSBjaGFpbi5cblx0ICAgIHdoaWxlIChsYXN0SW52ZXJzZS5jaGFpbmVkKSB7XG5cdCAgICAgIGxhc3RJbnZlcnNlID0gbGFzdEludmVyc2UuYm9keVtsYXN0SW52ZXJzZS5ib2R5Lmxlbmd0aCAtIDFdLnByb2dyYW07XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgdmFyIHN0cmlwID0ge1xuXHQgICAgb3BlbjogYmxvY2sub3BlblN0cmlwLm9wZW4sXG5cdCAgICBjbG9zZTogYmxvY2suY2xvc2VTdHJpcC5jbG9zZSxcblxuXHQgICAgLy8gRGV0ZXJtaW5lIHRoZSBzdGFuZGFsb25lIGNhbmRpYWN5LiBCYXNpY2FsbHkgZmxhZyBvdXIgY29udGVudCBhcyBiZWluZyBwb3NzaWJseSBzdGFuZGFsb25lXG5cdCAgICAvLyBzbyBvdXIgcGFyZW50IGNhbiBkZXRlcm1pbmUgaWYgd2UgYWN0dWFsbHkgYXJlIHN0YW5kYWxvbmVcblx0ICAgIG9wZW5TdGFuZGFsb25lOiBpc05leHRXaGl0ZXNwYWNlKHByb2dyYW0uYm9keSksXG5cdCAgICBjbG9zZVN0YW5kYWxvbmU6IGlzUHJldldoaXRlc3BhY2UoKGZpcnN0SW52ZXJzZSB8fCBwcm9ncmFtKS5ib2R5KVxuXHQgIH07XG5cblx0ICBpZiAoYmxvY2sub3BlblN0cmlwLmNsb3NlKSB7XG5cdCAgICBvbWl0UmlnaHQocHJvZ3JhbS5ib2R5LCBudWxsLCB0cnVlKTtcblx0ICB9XG5cblx0ICBpZiAoaW52ZXJzZSkge1xuXHQgICAgdmFyIGludmVyc2VTdHJpcCA9IGJsb2NrLmludmVyc2VTdHJpcDtcblxuXHQgICAgaWYgKGludmVyc2VTdHJpcC5vcGVuKSB7XG5cdCAgICAgIG9taXRMZWZ0KHByb2dyYW0uYm9keSwgbnVsbCwgdHJ1ZSk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChpbnZlcnNlU3RyaXAuY2xvc2UpIHtcblx0ICAgICAgb21pdFJpZ2h0KGZpcnN0SW52ZXJzZS5ib2R5LCBudWxsLCB0cnVlKTtcblx0ICAgIH1cblx0ICAgIGlmIChibG9jay5jbG9zZVN0cmlwLm9wZW4pIHtcblx0ICAgICAgb21pdExlZnQobGFzdEludmVyc2UuYm9keSwgbnVsbCwgdHJ1ZSk7XG5cdCAgICB9XG5cblx0ICAgIC8vIEZpbmQgc3RhbmRhbG9uZSBlbHNlIHN0YXRtZW50c1xuXHQgICAgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlU3RhbmRhbG9uZSAmJiBpc1ByZXZXaGl0ZXNwYWNlKHByb2dyYW0uYm9keSkgJiYgaXNOZXh0V2hpdGVzcGFjZShmaXJzdEludmVyc2UuYm9keSkpIHtcblx0ICAgICAgb21pdExlZnQocHJvZ3JhbS5ib2R5KTtcblx0ICAgICAgb21pdFJpZ2h0KGZpcnN0SW52ZXJzZS5ib2R5KTtcblx0ICAgIH1cblx0ICB9IGVsc2UgaWYgKGJsb2NrLmNsb3NlU3RyaXAub3Blbikge1xuXHQgICAgb21pdExlZnQocHJvZ3JhbS5ib2R5LCBudWxsLCB0cnVlKTtcblx0ICB9XG5cblx0ICByZXR1cm4gc3RyaXA7XG5cdH07XG5cblx0V2hpdGVzcGFjZUNvbnRyb2wucHJvdG90eXBlLkRlY29yYXRvciA9IFdoaXRlc3BhY2VDb250cm9sLnByb3RvdHlwZS5NdXN0YWNoZVN0YXRlbWVudCA9IGZ1bmN0aW9uIChtdXN0YWNoZSkge1xuXHQgIHJldHVybiBtdXN0YWNoZS5zdHJpcDtcblx0fTtcblxuXHRXaGl0ZXNwYWNlQ29udHJvbC5wcm90b3R5cGUuUGFydGlhbFN0YXRlbWVudCA9IFdoaXRlc3BhY2VDb250cm9sLnByb3RvdHlwZS5Db21tZW50U3RhdGVtZW50ID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgIHZhciBzdHJpcCA9IG5vZGUuc3RyaXAgfHwge307XG5cdCAgcmV0dXJuIHtcblx0ICAgIGlubGluZVN0YW5kYWxvbmU6IHRydWUsXG5cdCAgICBvcGVuOiBzdHJpcC5vcGVuLFxuXHQgICAgY2xvc2U6IHN0cmlwLmNsb3NlXG5cdCAgfTtcblx0fTtcblxuXHRmdW5jdGlvbiBpc1ByZXZXaGl0ZXNwYWNlKGJvZHksIGksIGlzUm9vdCkge1xuXHQgIGlmIChpID09PSB1bmRlZmluZWQpIHtcblx0ICAgIGkgPSBib2R5Lmxlbmd0aDtcblx0ICB9XG5cblx0ICAvLyBOb2RlcyB0aGF0IGVuZCB3aXRoIG5ld2xpbmVzIGFyZSBjb25zaWRlcmVkIHdoaXRlc3BhY2UgKGJ1dCBhcmUgc3BlY2lhbFxuXHQgIC8vIGNhc2VkIGZvciBzdHJpcCBvcGVyYXRpb25zKVxuXHQgIHZhciBwcmV2ID0gYm9keVtpIC0gMV0sXG5cdCAgICAgIHNpYmxpbmcgPSBib2R5W2kgLSAyXTtcblx0ICBpZiAoIXByZXYpIHtcblx0ICAgIHJldHVybiBpc1Jvb3Q7XG5cdCAgfVxuXG5cdCAgaWYgKHByZXYudHlwZSA9PT0gJ0NvbnRlbnRTdGF0ZW1lbnQnKSB7XG5cdCAgICByZXR1cm4gKHNpYmxpbmcgfHwgIWlzUm9vdCA/IC9cXHI/XFxuXFxzKj8kLyA6IC8oXnxcXHI/XFxuKVxccyo/JC8pLnRlc3QocHJldi5vcmlnaW5hbCk7XG5cdCAgfVxuXHR9XG5cdGZ1bmN0aW9uIGlzTmV4dFdoaXRlc3BhY2UoYm9keSwgaSwgaXNSb290KSB7XG5cdCAgaWYgKGkgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgaSA9IC0xO1xuXHQgIH1cblxuXHQgIHZhciBuZXh0ID0gYm9keVtpICsgMV0sXG5cdCAgICAgIHNpYmxpbmcgPSBib2R5W2kgKyAyXTtcblx0ICBpZiAoIW5leHQpIHtcblx0ICAgIHJldHVybiBpc1Jvb3Q7XG5cdCAgfVxuXG5cdCAgaWYgKG5leHQudHlwZSA9PT0gJ0NvbnRlbnRTdGF0ZW1lbnQnKSB7XG5cdCAgICByZXR1cm4gKHNpYmxpbmcgfHwgIWlzUm9vdCA/IC9eXFxzKj9cXHI/XFxuLyA6IC9eXFxzKj8oXFxyP1xcbnwkKS8pLnRlc3QobmV4dC5vcmlnaW5hbCk7XG5cdCAgfVxuXHR9XG5cblx0Ly8gTWFya3MgdGhlIG5vZGUgdG8gdGhlIHJpZ2h0IG9mIHRoZSBwb3NpdGlvbiBhcyBvbWl0dGVkLlxuXHQvLyBJLmUuIHt7Zm9vfX0nICcgd2lsbCBtYXJrIHRoZSAnICcgbm9kZSBhcyBvbWl0dGVkLlxuXHQvL1xuXHQvLyBJZiBpIGlzIHVuZGVmaW5lZCwgdGhlbiB0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSBtYXJrZWQgYXMgc3VjaC5cblx0Ly9cblx0Ly8gSWYgbXVsaXRwbGUgaXMgdHJ1dGh5IHRoZW4gYWxsIHdoaXRlc3BhY2Ugd2lsbCBiZSBzdHJpcHBlZCBvdXQgdW50aWwgbm9uLXdoaXRlc3BhY2Vcblx0Ly8gY29udGVudCBpcyBtZXQuXG5cdGZ1bmN0aW9uIG9taXRSaWdodChib2R5LCBpLCBtdWx0aXBsZSkge1xuXHQgIHZhciBjdXJyZW50ID0gYm9keVtpID09IG51bGwgPyAwIDogaSArIDFdO1xuXHQgIGlmICghY3VycmVudCB8fCBjdXJyZW50LnR5cGUgIT09ICdDb250ZW50U3RhdGVtZW50JyB8fCAhbXVsdGlwbGUgJiYgY3VycmVudC5yaWdodFN0cmlwcGVkKSB7XG5cdCAgICByZXR1cm47XG5cdCAgfVxuXG5cdCAgdmFyIG9yaWdpbmFsID0gY3VycmVudC52YWx1ZTtcblx0ICBjdXJyZW50LnZhbHVlID0gY3VycmVudC52YWx1ZS5yZXBsYWNlKG11bHRpcGxlID8gL15cXHMrLyA6IC9eWyBcXHRdKlxccj9cXG4/LywgJycpO1xuXHQgIGN1cnJlbnQucmlnaHRTdHJpcHBlZCA9IGN1cnJlbnQudmFsdWUgIT09IG9yaWdpbmFsO1xuXHR9XG5cblx0Ly8gTWFya3MgdGhlIG5vZGUgdG8gdGhlIGxlZnQgb2YgdGhlIHBvc2l0aW9uIGFzIG9taXR0ZWQuXG5cdC8vIEkuZS4gJyAne3tmb299fSB3aWxsIG1hcmsgdGhlICcgJyBub2RlIGFzIG9taXR0ZWQuXG5cdC8vXG5cdC8vIElmIGkgaXMgdW5kZWZpbmVkIHRoZW4gdGhlIGxhc3QgY2hpbGQgd2lsbCBiZSBtYXJrZWQgYXMgc3VjaC5cblx0Ly9cblx0Ly8gSWYgbXVsaXRwbGUgaXMgdHJ1dGh5IHRoZW4gYWxsIHdoaXRlc3BhY2Ugd2lsbCBiZSBzdHJpcHBlZCBvdXQgdW50aWwgbm9uLXdoaXRlc3BhY2Vcblx0Ly8gY29udGVudCBpcyBtZXQuXG5cdGZ1bmN0aW9uIG9taXRMZWZ0KGJvZHksIGksIG11bHRpcGxlKSB7XG5cdCAgdmFyIGN1cnJlbnQgPSBib2R5W2kgPT0gbnVsbCA/IGJvZHkubGVuZ3RoIC0gMSA6IGkgLSAxXTtcblx0ICBpZiAoIWN1cnJlbnQgfHwgY3VycmVudC50eXBlICE9PSAnQ29udGVudFN0YXRlbWVudCcgfHwgIW11bHRpcGxlICYmIGN1cnJlbnQubGVmdFN0cmlwcGVkKSB7XG5cdCAgICByZXR1cm47XG5cdCAgfVxuXG5cdCAgLy8gV2Ugb21pdCB0aGUgbGFzdCBub2RlIGlmIGl0J3Mgd2hpdGVzcGFjZSBvbmx5IGFuZCBub3QgcHJlY2VkZWQgYnkgYSBub24tY29udGVudCBub2RlLlxuXHQgIHZhciBvcmlnaW5hbCA9IGN1cnJlbnQudmFsdWU7XG5cdCAgY3VycmVudC52YWx1ZSA9IGN1cnJlbnQudmFsdWUucmVwbGFjZShtdWx0aXBsZSA/IC9cXHMrJC8gOiAvWyBcXHRdKyQvLCAnJyk7XG5cdCAgY3VycmVudC5sZWZ0U3RyaXBwZWQgPSBjdXJyZW50LnZhbHVlICE9PSBvcmlnaW5hbDtcblx0ICByZXR1cm4gY3VycmVudC5sZWZ0U3RyaXBwZWQ7XG5cdH1cblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBXaGl0ZXNwYWNlQ29udHJvbDtcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pLFxuLyogNDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpWydkZWZhdWx0J107XG5cblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuXHR2YXIgX2V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuXHRmdW5jdGlvbiBWaXNpdG9yKCkge1xuXHQgIHRoaXMucGFyZW50cyA9IFtdO1xuXHR9XG5cblx0VmlzaXRvci5wcm90b3R5cGUgPSB7XG5cdCAgY29uc3RydWN0b3I6IFZpc2l0b3IsXG5cdCAgbXV0YXRpbmc6IGZhbHNlLFxuXG5cdCAgLy8gVmlzaXRzIGEgZ2l2ZW4gdmFsdWUuIElmIG11dGF0aW5nLCB3aWxsIHJlcGxhY2UgdGhlIHZhbHVlIGlmIG5lY2Vzc2FyeS5cblx0ICBhY2NlcHRLZXk6IGZ1bmN0aW9uIGFjY2VwdEtleShub2RlLCBuYW1lKSB7XG5cdCAgICB2YXIgdmFsdWUgPSB0aGlzLmFjY2VwdChub2RlW25hbWVdKTtcblx0ICAgIGlmICh0aGlzLm11dGF0aW5nKSB7XG5cdCAgICAgIC8vIEhhY2t5IHNhbml0eSBjaGVjazogVGhpcyBtYXkgaGF2ZSBhIGZldyBmYWxzZSBwb3NpdGl2ZXMgZm9yIHR5cGUgZm9yIHRoZSBoZWxwZXJcblx0ICAgICAgLy8gbWV0aG9kcyBidXQgd2lsbCBnZW5lcmFsbHkgZG8gdGhlIHJpZ2h0IHRoaW5nIHdpdGhvdXQgYSBsb3Qgb2Ygb3ZlcmhlYWQuXG5cdCAgICAgIGlmICh2YWx1ZSAmJiAhVmlzaXRvci5wcm90b3R5cGVbdmFsdWUudHlwZV0pIHtcblx0ICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVW5leHBlY3RlZCBub2RlIHR5cGUgXCInICsgdmFsdWUudHlwZSArICdcIiBmb3VuZCB3aGVuIGFjY2VwdGluZyAnICsgbmFtZSArICcgb24gJyArIG5vZGUudHlwZSk7XG5cdCAgICAgIH1cblx0ICAgICAgbm9kZVtuYW1lXSA9IHZhbHVlO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvLyBQZXJmb3JtcyBhbiBhY2NlcHQgb3BlcmF0aW9uIHdpdGggYWRkZWQgc2FuaXR5IGNoZWNrIHRvIGVuc3VyZVxuXHQgIC8vIHJlcXVpcmVkIGtleXMgYXJlIG5vdCByZW1vdmVkLlxuXHQgIGFjY2VwdFJlcXVpcmVkOiBmdW5jdGlvbiBhY2NlcHRSZXF1aXJlZChub2RlLCBuYW1lKSB7XG5cdCAgICB0aGlzLmFjY2VwdEtleShub2RlLCBuYW1lKTtcblxuXHQgICAgaWYgKCFub2RlW25hbWVdKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKG5vZGUudHlwZSArICcgcmVxdWlyZXMgJyArIG5hbWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvLyBUcmF2ZXJzZXMgYSBnaXZlbiBhcnJheS4gSWYgbXV0YXRpbmcsIGVtcHR5IHJlc3Buc2VzIHdpbGwgYmUgcmVtb3ZlZFxuXHQgIC8vIGZvciBjaGlsZCBlbGVtZW50cy5cblx0ICBhY2NlcHRBcnJheTogZnVuY3Rpb24gYWNjZXB0QXJyYXkoYXJyYXkpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuYWNjZXB0S2V5KGFycmF5LCBpKTtcblxuXHQgICAgICBpZiAoIWFycmF5W2ldKSB7XG5cdCAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuXHQgICAgICAgIGktLTtcblx0ICAgICAgICBsLS07XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgYWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQob2JqZWN0KSB7XG5cdCAgICBpZiAoIW9iamVjdCkge1xuXHQgICAgICByZXR1cm47XG5cdCAgICB9XG5cblx0ICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBTYW5pdHkgY29kZSAqL1xuXHQgICAgaWYgKCF0aGlzW29iamVjdC50eXBlXSkge1xuXHQgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVW5rbm93biB0eXBlOiAnICsgb2JqZWN0LnR5cGUsIG9iamVjdCk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcblx0ICAgICAgdGhpcy5wYXJlbnRzLnVuc2hpZnQodGhpcy5jdXJyZW50KTtcblx0ICAgIH1cblx0ICAgIHRoaXMuY3VycmVudCA9IG9iamVjdDtcblxuXHQgICAgdmFyIHJldCA9IHRoaXNbb2JqZWN0LnR5cGVdKG9iamVjdCk7XG5cblx0ICAgIHRoaXMuY3VycmVudCA9IHRoaXMucGFyZW50cy5zaGlmdCgpO1xuXG5cdCAgICBpZiAoIXRoaXMubXV0YXRpbmcgfHwgcmV0KSB7XG5cdCAgICAgIHJldHVybiByZXQ7XG5cdCAgICB9IGVsc2UgaWYgKHJldCAhPT0gZmFsc2UpIHtcblx0ICAgICAgcmV0dXJuIG9iamVjdDtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgUHJvZ3JhbTogZnVuY3Rpb24gUHJvZ3JhbShwcm9ncmFtKSB7XG5cdCAgICB0aGlzLmFjY2VwdEFycmF5KHByb2dyYW0uYm9keSk7XG5cdCAgfSxcblxuXHQgIE11c3RhY2hlU3RhdGVtZW50OiB2aXNpdFN1YkV4cHJlc3Npb24sXG5cdCAgRGVjb3JhdG9yOiB2aXNpdFN1YkV4cHJlc3Npb24sXG5cblx0ICBCbG9ja1N0YXRlbWVudDogdmlzaXRCbG9jayxcblx0ICBEZWNvcmF0b3JCbG9jazogdmlzaXRCbG9jayxcblxuXHQgIFBhcnRpYWxTdGF0ZW1lbnQ6IHZpc2l0UGFydGlhbCxcblx0ICBQYXJ0aWFsQmxvY2tTdGF0ZW1lbnQ6IGZ1bmN0aW9uIFBhcnRpYWxCbG9ja1N0YXRlbWVudChwYXJ0aWFsKSB7XG5cdCAgICB2aXNpdFBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsKTtcblxuXHQgICAgdGhpcy5hY2NlcHRLZXkocGFydGlhbCwgJ3Byb2dyYW0nKTtcblx0ICB9LFxuXG5cdCAgQ29udGVudFN0YXRlbWVudDogZnVuY3Rpb24gQ29udGVudFN0YXRlbWVudCgpIC8qIGNvbnRlbnQgKi97fSxcblx0ICBDb21tZW50U3RhdGVtZW50OiBmdW5jdGlvbiBDb21tZW50U3RhdGVtZW50KCkgLyogY29tbWVudCAqL3t9LFxuXG5cdCAgU3ViRXhwcmVzc2lvbjogdmlzaXRTdWJFeHByZXNzaW9uLFxuXG5cdCAgUGF0aEV4cHJlc3Npb246IGZ1bmN0aW9uIFBhdGhFeHByZXNzaW9uKCkgLyogcGF0aCAqL3t9LFxuXG5cdCAgU3RyaW5nTGl0ZXJhbDogZnVuY3Rpb24gU3RyaW5nTGl0ZXJhbCgpIC8qIHN0cmluZyAqL3t9LFxuXHQgIE51bWJlckxpdGVyYWw6IGZ1bmN0aW9uIE51bWJlckxpdGVyYWwoKSAvKiBudW1iZXIgKi97fSxcblx0ICBCb29sZWFuTGl0ZXJhbDogZnVuY3Rpb24gQm9vbGVhbkxpdGVyYWwoKSAvKiBib29sICove30sXG5cdCAgVW5kZWZpbmVkTGl0ZXJhbDogZnVuY3Rpb24gVW5kZWZpbmVkTGl0ZXJhbCgpIC8qIGxpdGVyYWwgKi97fSxcblx0ICBOdWxsTGl0ZXJhbDogZnVuY3Rpb24gTnVsbExpdGVyYWwoKSAvKiBsaXRlcmFsICove30sXG5cblx0ICBIYXNoOiBmdW5jdGlvbiBIYXNoKGhhc2gpIHtcblx0ICAgIHRoaXMuYWNjZXB0QXJyYXkoaGFzaC5wYWlycyk7XG5cdCAgfSxcblx0ICBIYXNoUGFpcjogZnVuY3Rpb24gSGFzaFBhaXIocGFpcikge1xuXHQgICAgdGhpcy5hY2NlcHRSZXF1aXJlZChwYWlyLCAndmFsdWUnKTtcblx0ICB9XG5cdH07XG5cblx0ZnVuY3Rpb24gdmlzaXRTdWJFeHByZXNzaW9uKG11c3RhY2hlKSB7XG5cdCAgdGhpcy5hY2NlcHRSZXF1aXJlZChtdXN0YWNoZSwgJ3BhdGgnKTtcblx0ICB0aGlzLmFjY2VwdEFycmF5KG11c3RhY2hlLnBhcmFtcyk7XG5cdCAgdGhpcy5hY2NlcHRLZXkobXVzdGFjaGUsICdoYXNoJyk7XG5cdH1cblx0ZnVuY3Rpb24gdmlzaXRCbG9jayhibG9jaykge1xuXHQgIHZpc2l0U3ViRXhwcmVzc2lvbi5jYWxsKHRoaXMsIGJsb2NrKTtcblxuXHQgIHRoaXMuYWNjZXB0S2V5KGJsb2NrLCAncHJvZ3JhbScpO1xuXHQgIHRoaXMuYWNjZXB0S2V5KGJsb2NrLCAnaW52ZXJzZScpO1xuXHR9XG5cdGZ1bmN0aW9uIHZpc2l0UGFydGlhbChwYXJ0aWFsKSB7XG5cdCAgdGhpcy5hY2NlcHRSZXF1aXJlZChwYXJ0aWFsLCAnbmFtZScpO1xuXHQgIHRoaXMuYWNjZXB0QXJyYXkocGFydGlhbC5wYXJhbXMpO1xuXHQgIHRoaXMuYWNjZXB0S2V5KHBhcnRpYWwsICdoYXNoJyk7XG5cdH1cblxuXHRleHBvcnRzWydkZWZhdWx0J10gPSBWaXNpdG9yO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiA1MCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRleHBvcnRzLlNvdXJjZUxvY2F0aW9uID0gU291cmNlTG9jYXRpb247XG5cdGV4cG9ydHMuaWQgPSBpZDtcblx0ZXhwb3J0cy5zdHJpcEZsYWdzID0gc3RyaXBGbGFncztcblx0ZXhwb3J0cy5zdHJpcENvbW1lbnQgPSBzdHJpcENvbW1lbnQ7XG5cdGV4cG9ydHMucHJlcGFyZVBhdGggPSBwcmVwYXJlUGF0aDtcblx0ZXhwb3J0cy5wcmVwYXJlTXVzdGFjaGUgPSBwcmVwYXJlTXVzdGFjaGU7XG5cdGV4cG9ydHMucHJlcGFyZVJhd0Jsb2NrID0gcHJlcGFyZVJhd0Jsb2NrO1xuXHRleHBvcnRzLnByZXBhcmVCbG9jayA9IHByZXBhcmVCbG9jaztcblx0ZXhwb3J0cy5wcmVwYXJlUHJvZ3JhbSA9IHByZXBhcmVQcm9ncmFtO1xuXHRleHBvcnRzLnByZXBhcmVQYXJ0aWFsQmxvY2sgPSBwcmVwYXJlUGFydGlhbEJsb2NrO1xuXG5cdHZhciBfZXhjZXB0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG5cdGZ1bmN0aW9uIHZhbGlkYXRlQ2xvc2Uob3BlbiwgY2xvc2UpIHtcblx0ICBjbG9zZSA9IGNsb3NlLnBhdGggPyBjbG9zZS5wYXRoLm9yaWdpbmFsIDogY2xvc2U7XG5cblx0ICBpZiAob3Blbi5wYXRoLm9yaWdpbmFsICE9PSBjbG9zZSkge1xuXHQgICAgdmFyIGVycm9yTm9kZSA9IHsgbG9jOiBvcGVuLnBhdGgubG9jIH07XG5cblx0ICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKG9wZW4ucGF0aC5vcmlnaW5hbCArIFwiIGRvZXNuJ3QgbWF0Y2ggXCIgKyBjbG9zZSwgZXJyb3JOb2RlKTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBTb3VyY2VMb2NhdGlvbihzb3VyY2UsIGxvY0luZm8pIHtcblx0ICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblx0ICB0aGlzLnN0YXJ0ID0ge1xuXHQgICAgbGluZTogbG9jSW5mby5maXJzdF9saW5lLFxuXHQgICAgY29sdW1uOiBsb2NJbmZvLmZpcnN0X2NvbHVtblxuXHQgIH07XG5cdCAgdGhpcy5lbmQgPSB7XG5cdCAgICBsaW5lOiBsb2NJbmZvLmxhc3RfbGluZSxcblx0ICAgIGNvbHVtbjogbG9jSW5mby5sYXN0X2NvbHVtblxuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBpZCh0b2tlbikge1xuXHQgIGlmICgvXlxcWy4qXFxdJC8udGVzdCh0b2tlbikpIHtcblx0ICAgIHJldHVybiB0b2tlbi5zdWJzdHJpbmcoMSwgdG9rZW4ubGVuZ3RoIC0gMSk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiB0b2tlbjtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBzdHJpcEZsYWdzKG9wZW4sIGNsb3NlKSB7XG5cdCAgcmV0dXJuIHtcblx0ICAgIG9wZW46IG9wZW4uY2hhckF0KDIpID09PSAnficsXG5cdCAgICBjbG9zZTogY2xvc2UuY2hhckF0KGNsb3NlLmxlbmd0aCAtIDMpID09PSAnfidcblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RyaXBDb21tZW50KGNvbW1lbnQpIHtcblx0ICByZXR1cm4gY29tbWVudC5yZXBsYWNlKC9eXFx7XFx7fj8hLT8tPy8sICcnKS5yZXBsYWNlKC8tPy0/fj9cXH1cXH0kLywgJycpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZVBhdGgoZGF0YSwgcGFydHMsIGxvYykge1xuXHQgIGxvYyA9IHRoaXMubG9jSW5mbyhsb2MpO1xuXG5cdCAgdmFyIG9yaWdpbmFsID0gZGF0YSA/ICdAJyA6ICcnLFxuXHQgICAgICBkaWcgPSBbXSxcblx0ICAgICAgZGVwdGggPSAwO1xuXG5cdCAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgIHZhciBwYXJ0ID0gcGFydHNbaV0ucGFydCxcblxuXHQgICAgLy8gSWYgd2UgaGF2ZSBbXSBzeW50YXggdGhlbiB3ZSBkbyBub3QgdHJlYXQgcGF0aCByZWZlcmVuY2VzIGFzIG9wZXJhdG9ycyxcblx0ICAgIC8vIGkuZS4gZm9vLlt0aGlzXSByZXNvbHZlcyB0byBhcHByb3hpbWF0ZWx5IGNvbnRleHQuZm9vWyd0aGlzJ11cblx0ICAgIGlzTGl0ZXJhbCA9IHBhcnRzW2ldLm9yaWdpbmFsICE9PSBwYXJ0O1xuXHQgICAgb3JpZ2luYWwgKz0gKHBhcnRzW2ldLnNlcGFyYXRvciB8fCAnJykgKyBwYXJ0O1xuXG5cdCAgICBpZiAoIWlzTGl0ZXJhbCAmJiAocGFydCA9PT0gJy4uJyB8fCBwYXJ0ID09PSAnLicgfHwgcGFydCA9PT0gJ3RoaXMnKSkge1xuXHQgICAgICBpZiAoZGlnLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnSW52YWxpZCBwYXRoOiAnICsgb3JpZ2luYWwsIHsgbG9jOiBsb2MgfSk7XG5cdCAgICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuXHQgICAgICAgIGRlcHRoKys7XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGRpZy5wdXNoKHBhcnQpO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIHJldHVybiB7XG5cdCAgICB0eXBlOiAnUGF0aEV4cHJlc3Npb24nLFxuXHQgICAgZGF0YTogZGF0YSxcblx0ICAgIGRlcHRoOiBkZXB0aCxcblx0ICAgIHBhcnRzOiBkaWcsXG5cdCAgICBvcmlnaW5hbDogb3JpZ2luYWwsXG5cdCAgICBsb2M6IGxvY1xuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlTXVzdGFjaGUocGF0aCwgcGFyYW1zLCBoYXNoLCBvcGVuLCBzdHJpcCwgbG9jSW5mbykge1xuXHQgIC8vIE11c3QgdXNlIGNoYXJBdCB0byBzdXBwb3J0IElFIHByZS0xMFxuXHQgIHZhciBlc2NhcGVGbGFnID0gb3Blbi5jaGFyQXQoMykgfHwgb3Blbi5jaGFyQXQoMiksXG5cdCAgICAgIGVzY2FwZWQgPSBlc2NhcGVGbGFnICE9PSAneycgJiYgZXNjYXBlRmxhZyAhPT0gJyYnO1xuXG5cdCAgdmFyIGRlY29yYXRvciA9IC9cXCovLnRlc3Qob3Blbik7XG5cdCAgcmV0dXJuIHtcblx0ICAgIHR5cGU6IGRlY29yYXRvciA/ICdEZWNvcmF0b3InIDogJ011c3RhY2hlU3RhdGVtZW50Jyxcblx0ICAgIHBhdGg6IHBhdGgsXG5cdCAgICBwYXJhbXM6IHBhcmFtcyxcblx0ICAgIGhhc2g6IGhhc2gsXG5cdCAgICBlc2NhcGVkOiBlc2NhcGVkLFxuXHQgICAgc3RyaXA6IHN0cmlwLFxuXHQgICAgbG9jOiB0aGlzLmxvY0luZm8obG9jSW5mbylcblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZVJhd0Jsb2NrKG9wZW5SYXdCbG9jaywgY29udGVudHMsIGNsb3NlLCBsb2NJbmZvKSB7XG5cdCAgdmFsaWRhdGVDbG9zZShvcGVuUmF3QmxvY2ssIGNsb3NlKTtcblxuXHQgIGxvY0luZm8gPSB0aGlzLmxvY0luZm8obG9jSW5mbyk7XG5cdCAgdmFyIHByb2dyYW0gPSB7XG5cdCAgICB0eXBlOiAnUHJvZ3JhbScsXG5cdCAgICBib2R5OiBjb250ZW50cyxcblx0ICAgIHN0cmlwOiB7fSxcblx0ICAgIGxvYzogbG9jSW5mb1xuXHQgIH07XG5cblx0ICByZXR1cm4ge1xuXHQgICAgdHlwZTogJ0Jsb2NrU3RhdGVtZW50Jyxcblx0ICAgIHBhdGg6IG9wZW5SYXdCbG9jay5wYXRoLFxuXHQgICAgcGFyYW1zOiBvcGVuUmF3QmxvY2sucGFyYW1zLFxuXHQgICAgaGFzaDogb3BlblJhd0Jsb2NrLmhhc2gsXG5cdCAgICBwcm9ncmFtOiBwcm9ncmFtLFxuXHQgICAgb3BlblN0cmlwOiB7fSxcblx0ICAgIGludmVyc2VTdHJpcDoge30sXG5cdCAgICBjbG9zZVN0cmlwOiB7fSxcblx0ICAgIGxvYzogbG9jSW5mb1xuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlQmxvY2sob3BlbkJsb2NrLCBwcm9ncmFtLCBpbnZlcnNlQW5kUHJvZ3JhbSwgY2xvc2UsIGludmVydGVkLCBsb2NJbmZvKSB7XG5cdCAgaWYgKGNsb3NlICYmIGNsb3NlLnBhdGgpIHtcblx0ICAgIHZhbGlkYXRlQ2xvc2Uob3BlbkJsb2NrLCBjbG9zZSk7XG5cdCAgfVxuXG5cdCAgdmFyIGRlY29yYXRvciA9IC9cXCovLnRlc3Qob3BlbkJsb2NrLm9wZW4pO1xuXG5cdCAgcHJvZ3JhbS5ibG9ja1BhcmFtcyA9IG9wZW5CbG9jay5ibG9ja1BhcmFtcztcblxuXHQgIHZhciBpbnZlcnNlID0gdW5kZWZpbmVkLFxuXHQgICAgICBpbnZlcnNlU3RyaXAgPSB1bmRlZmluZWQ7XG5cblx0ICBpZiAoaW52ZXJzZUFuZFByb2dyYW0pIHtcblx0ICAgIGlmIChkZWNvcmF0b3IpIHtcblx0ICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1VuZXhwZWN0ZWQgaW52ZXJzZSBibG9jayBvbiBkZWNvcmF0b3InLCBpbnZlcnNlQW5kUHJvZ3JhbSk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChpbnZlcnNlQW5kUHJvZ3JhbS5jaGFpbikge1xuXHQgICAgICBpbnZlcnNlQW5kUHJvZ3JhbS5wcm9ncmFtLmJvZHlbMF0uY2xvc2VTdHJpcCA9IGNsb3NlLnN0cmlwO1xuXHQgICAgfVxuXG5cdCAgICBpbnZlcnNlU3RyaXAgPSBpbnZlcnNlQW5kUHJvZ3JhbS5zdHJpcDtcblx0ICAgIGludmVyc2UgPSBpbnZlcnNlQW5kUHJvZ3JhbS5wcm9ncmFtO1xuXHQgIH1cblxuXHQgIGlmIChpbnZlcnRlZCkge1xuXHQgICAgaW52ZXJ0ZWQgPSBpbnZlcnNlO1xuXHQgICAgaW52ZXJzZSA9IHByb2dyYW07XG5cdCAgICBwcm9ncmFtID0gaW52ZXJ0ZWQ7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHtcblx0ICAgIHR5cGU6IGRlY29yYXRvciA/ICdEZWNvcmF0b3JCbG9jaycgOiAnQmxvY2tTdGF0ZW1lbnQnLFxuXHQgICAgcGF0aDogb3BlbkJsb2NrLnBhdGgsXG5cdCAgICBwYXJhbXM6IG9wZW5CbG9jay5wYXJhbXMsXG5cdCAgICBoYXNoOiBvcGVuQmxvY2suaGFzaCxcblx0ICAgIHByb2dyYW06IHByb2dyYW0sXG5cdCAgICBpbnZlcnNlOiBpbnZlcnNlLFxuXHQgICAgb3BlblN0cmlwOiBvcGVuQmxvY2suc3RyaXAsXG5cdCAgICBpbnZlcnNlU3RyaXA6IGludmVyc2VTdHJpcCxcblx0ICAgIGNsb3NlU3RyaXA6IGNsb3NlICYmIGNsb3NlLnN0cmlwLFxuXHQgICAgbG9jOiB0aGlzLmxvY0luZm8obG9jSW5mbylcblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZVByb2dyYW0oc3RhdGVtZW50cywgbG9jKSB7XG5cdCAgaWYgKCFsb2MgJiYgc3RhdGVtZW50cy5sZW5ndGgpIHtcblx0ICAgIHZhciBmaXJzdExvYyA9IHN0YXRlbWVudHNbMF0ubG9jLFxuXHQgICAgICAgIGxhc3RMb2MgPSBzdGF0ZW1lbnRzW3N0YXRlbWVudHMubGVuZ3RoIC0gMV0ubG9jO1xuXG5cdCAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuXHQgICAgaWYgKGZpcnN0TG9jICYmIGxhc3RMb2MpIHtcblx0ICAgICAgbG9jID0ge1xuXHQgICAgICAgIHNvdXJjZTogZmlyc3RMb2Muc291cmNlLFxuXHQgICAgICAgIHN0YXJ0OiB7XG5cdCAgICAgICAgICBsaW5lOiBmaXJzdExvYy5zdGFydC5saW5lLFxuXHQgICAgICAgICAgY29sdW1uOiBmaXJzdExvYy5zdGFydC5jb2x1bW5cblx0ICAgICAgICB9LFxuXHQgICAgICAgIGVuZDoge1xuXHQgICAgICAgICAgbGluZTogbGFzdExvYy5lbmQubGluZSxcblx0ICAgICAgICAgIGNvbHVtbjogbGFzdExvYy5lbmQuY29sdW1uXG5cdCAgICAgICAgfVxuXHQgICAgICB9O1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIHJldHVybiB7XG5cdCAgICB0eXBlOiAnUHJvZ3JhbScsXG5cdCAgICBib2R5OiBzdGF0ZW1lbnRzLFxuXHQgICAgc3RyaXA6IHt9LFxuXHQgICAgbG9jOiBsb2Ncblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZVBhcnRpYWxCbG9jayhvcGVuLCBwcm9ncmFtLCBjbG9zZSwgbG9jSW5mbykge1xuXHQgIHZhbGlkYXRlQ2xvc2Uob3BlbiwgY2xvc2UpO1xuXG5cdCAgcmV0dXJuIHtcblx0ICAgIHR5cGU6ICdQYXJ0aWFsQmxvY2tTdGF0ZW1lbnQnLFxuXHQgICAgbmFtZTogb3Blbi5wYXRoLFxuXHQgICAgcGFyYW1zOiBvcGVuLnBhcmFtcyxcblx0ICAgIGhhc2g6IG9wZW4uaGFzaCxcblx0ICAgIHByb2dyYW06IHByb2dyYW0sXG5cdCAgICBvcGVuU3RyaXA6IG9wZW4uc3RyaXAsXG5cdCAgICBjbG9zZVN0cmlwOiBjbG9zZSAmJiBjbG9zZS5zdHJpcCxcblx0ICAgIGxvYzogdGhpcy5sb2NJbmZvKGxvY0luZm8pXG5cdCAgfTtcblx0fVxuXG4vKioqLyB9KSxcbi8qIDUxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX09iamVjdCRjcmVhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVsnZGVmYXVsdCddO1xuXG5cdHZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKVsnZGVmYXVsdCddO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdGV4cG9ydHMuQ29tcGlsZXIgPSBDb21waWxlcjtcblx0ZXhwb3J0cy5wcmVjb21waWxlID0gcHJlY29tcGlsZTtcblx0ZXhwb3J0cy5jb21waWxlID0gY29tcGlsZTtcblxuXHR2YXIgX2V4Y2VwdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxuXHR2YXIgX3V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgX2FzdCA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXG5cdHZhciBfYXN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FzdCk7XG5cblx0dmFyIHNsaWNlID0gW10uc2xpY2U7XG5cblx0ZnVuY3Rpb24gQ29tcGlsZXIoKSB7fVxuXG5cdC8vIHRoZSBmb3VuZEhlbHBlciByZWdpc3RlciB3aWxsIGRpc2FtYmlndWF0ZSBoZWxwZXIgbG9va3VwIGZyb20gZmluZGluZyBhXG5cdC8vIGZ1bmN0aW9uIGluIGEgY29udGV4dC4gVGhpcyBpcyBuZWNlc3NhcnkgZm9yIG11c3RhY2hlIGNvbXBhdGliaWxpdHksIHdoaWNoXG5cdC8vIHJlcXVpcmVzIHRoYXQgY29udGV4dCBmdW5jdGlvbnMgaW4gYmxvY2tzIGFyZSBldmFsdWF0ZWQgYnkgYmxvY2tIZWxwZXJNaXNzaW5nLFxuXHQvLyBhbmQgdGhlbiBwcm9jZWVkIGFzIGlmIHRoZSByZXN1bHRpbmcgdmFsdWUgd2FzIHByb3ZpZGVkIHRvIGJsb2NrSGVscGVyTWlzc2luZy5cblxuXHRDb21waWxlci5wcm90b3R5cGUgPSB7XG5cdCAgY29tcGlsZXI6IENvbXBpbGVyLFxuXG5cdCAgZXF1YWxzOiBmdW5jdGlvbiBlcXVhbHMob3RoZXIpIHtcblx0ICAgIHZhciBsZW4gPSB0aGlzLm9wY29kZXMubGVuZ3RoO1xuXHQgICAgaWYgKG90aGVyLm9wY29kZXMubGVuZ3RoICE9PSBsZW4pIHtcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIHZhciBvcGNvZGUgPSB0aGlzLm9wY29kZXNbaV0sXG5cdCAgICAgICAgICBvdGhlck9wY29kZSA9IG90aGVyLm9wY29kZXNbaV07XG5cdCAgICAgIGlmIChvcGNvZGUub3Bjb2RlICE9PSBvdGhlck9wY29kZS5vcGNvZGUgfHwgIWFyZ0VxdWFscyhvcGNvZGUuYXJncywgb3RoZXJPcGNvZGUuYXJncykpIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgLy8gV2Uga25vdyB0aGF0IGxlbmd0aCBpcyB0aGUgc2FtZSBiZXR3ZWVuIHRoZSB0d28gYXJyYXlzIGJlY2F1c2UgdGhleSBhcmUgZGlyZWN0bHkgdGllZFxuXHQgICAgLy8gdG8gdGhlIG9wY29kZSBiZWhhdmlvciBhYm92ZS5cblx0ICAgIGxlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICBpZiAoIXRoaXMuY2hpbGRyZW5baV0uZXF1YWxzKG90aGVyLmNoaWxkcmVuW2ldKSkge1xuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9LFxuXG5cdCAgZ3VpZDogMCxcblxuXHQgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUocHJvZ3JhbSwgb3B0aW9ucykge1xuXHQgICAgdGhpcy5zb3VyY2VOb2RlID0gW107XG5cdCAgICB0aGlzLm9wY29kZXMgPSBbXTtcblx0ICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcblx0ICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdCAgICB0aGlzLnN0cmluZ1BhcmFtcyA9IG9wdGlvbnMuc3RyaW5nUGFyYW1zO1xuXHQgICAgdGhpcy50cmFja0lkcyA9IG9wdGlvbnMudHJhY2tJZHM7XG5cblx0ICAgIG9wdGlvbnMuYmxvY2tQYXJhbXMgPSBvcHRpb25zLmJsb2NrUGFyYW1zIHx8IFtdO1xuXG5cdCAgICBvcHRpb25zLmtub3duSGVscGVycyA9IF91dGlscy5leHRlbmQoX09iamVjdCRjcmVhdGUobnVsbCksIHtcblx0ICAgICAgaGVscGVyTWlzc2luZzogdHJ1ZSxcblx0ICAgICAgYmxvY2tIZWxwZXJNaXNzaW5nOiB0cnVlLFxuXHQgICAgICBlYWNoOiB0cnVlLFxuXHQgICAgICAnaWYnOiB0cnVlLFxuXHQgICAgICB1bmxlc3M6IHRydWUsXG5cdCAgICAgICd3aXRoJzogdHJ1ZSxcblx0ICAgICAgbG9nOiB0cnVlLFxuXHQgICAgICBsb29rdXA6IHRydWVcblx0ICAgIH0sIG9wdGlvbnMua25vd25IZWxwZXJzKTtcblxuXHQgICAgcmV0dXJuIHRoaXMuYWNjZXB0KHByb2dyYW0pO1xuXHQgIH0sXG5cblx0ICBjb21waWxlUHJvZ3JhbTogZnVuY3Rpb24gY29tcGlsZVByb2dyYW0ocHJvZ3JhbSkge1xuXHQgICAgdmFyIGNoaWxkQ29tcGlsZXIgPSBuZXcgdGhpcy5jb21waWxlcigpLFxuXHQgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuXHQgICAgcmVzdWx0ID0gY2hpbGRDb21waWxlci5jb21waWxlKHByb2dyYW0sIHRoaXMub3B0aW9ucyksXG5cdCAgICAgICAgZ3VpZCA9IHRoaXMuZ3VpZCsrO1xuXG5cdCAgICB0aGlzLnVzZVBhcnRpYWwgPSB0aGlzLnVzZVBhcnRpYWwgfHwgcmVzdWx0LnVzZVBhcnRpYWw7XG5cblx0ICAgIHRoaXMuY2hpbGRyZW5bZ3VpZF0gPSByZXN1bHQ7XG5cdCAgICB0aGlzLnVzZURlcHRocyA9IHRoaXMudXNlRGVwdGhzIHx8IHJlc3VsdC51c2VEZXB0aHM7XG5cblx0ICAgIHJldHVybiBndWlkO1xuXHQgIH0sXG5cblx0ICBhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdChub2RlKSB7XG5cdCAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogU2FuaXR5IGNvZGUgKi9cblx0ICAgIGlmICghdGhpc1tub2RlLnR5cGVdKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdVbmtub3duIHR5cGU6ICcgKyBub2RlLnR5cGUsIG5vZGUpO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLnNvdXJjZU5vZGUudW5zaGlmdChub2RlKTtcblx0ICAgIHZhciByZXQgPSB0aGlzW25vZGUudHlwZV0obm9kZSk7XG5cdCAgICB0aGlzLnNvdXJjZU5vZGUuc2hpZnQoKTtcblx0ICAgIHJldHVybiByZXQ7XG5cdCAgfSxcblxuXHQgIFByb2dyYW06IGZ1bmN0aW9uIFByb2dyYW0ocHJvZ3JhbSkge1xuXHQgICAgdGhpcy5vcHRpb25zLmJsb2NrUGFyYW1zLnVuc2hpZnQocHJvZ3JhbS5ibG9ja1BhcmFtcyk7XG5cblx0ICAgIHZhciBib2R5ID0gcHJvZ3JhbS5ib2R5LFxuXHQgICAgICAgIGJvZHlMZW5ndGggPSBib2R5Lmxlbmd0aDtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9keUxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuYWNjZXB0KGJvZHlbaV0pO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLm9wdGlvbnMuYmxvY2tQYXJhbXMuc2hpZnQoKTtcblxuXHQgICAgdGhpcy5pc1NpbXBsZSA9IGJvZHlMZW5ndGggPT09IDE7XG5cdCAgICB0aGlzLmJsb2NrUGFyYW1zID0gcHJvZ3JhbS5ibG9ja1BhcmFtcyA/IHByb2dyYW0uYmxvY2tQYXJhbXMubGVuZ3RoIDogMDtcblxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIEJsb2NrU3RhdGVtZW50OiBmdW5jdGlvbiBCbG9ja1N0YXRlbWVudChibG9jaykge1xuXHQgICAgdHJhbnNmb3JtTGl0ZXJhbFRvUGF0aChibG9jayk7XG5cblx0ICAgIHZhciBwcm9ncmFtID0gYmxvY2sucHJvZ3JhbSxcblx0ICAgICAgICBpbnZlcnNlID0gYmxvY2suaW52ZXJzZTtcblxuXHQgICAgcHJvZ3JhbSA9IHByb2dyYW0gJiYgdGhpcy5jb21waWxlUHJvZ3JhbShwcm9ncmFtKTtcblx0ICAgIGludmVyc2UgPSBpbnZlcnNlICYmIHRoaXMuY29tcGlsZVByb2dyYW0oaW52ZXJzZSk7XG5cblx0ICAgIHZhciB0eXBlID0gdGhpcy5jbGFzc2lmeVNleHByKGJsb2NrKTtcblxuXHQgICAgaWYgKHR5cGUgPT09ICdoZWxwZXInKSB7XG5cdCAgICAgIHRoaXMuaGVscGVyU2V4cHIoYmxvY2ssIHByb2dyYW0sIGludmVyc2UpO1xuXHQgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc2ltcGxlJykge1xuXHQgICAgICB0aGlzLnNpbXBsZVNleHByKGJsb2NrKTtcblxuXHQgICAgICAvLyBub3cgdGhhdCB0aGUgc2ltcGxlIG11c3RhY2hlIGlzIHJlc29sdmVkLCB3ZSBuZWVkIHRvXG5cdCAgICAgIC8vIGV2YWx1YXRlIGl0IGJ5IGV4ZWN1dGluZyBgYmxvY2tIZWxwZXJNaXNzaW5nYFxuXHQgICAgICB0aGlzLm9wY29kZSgncHVzaFByb2dyYW0nLCBwcm9ncmFtKTtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgaW52ZXJzZSk7XG5cdCAgICAgIHRoaXMub3Bjb2RlKCdlbXB0eUhhc2gnKTtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2Jsb2NrVmFsdWUnLCBibG9jay5wYXRoLm9yaWdpbmFsKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuYW1iaWd1b3VzU2V4cHIoYmxvY2ssIHByb2dyYW0sIGludmVyc2UpO1xuXG5cdCAgICAgIC8vIG5vdyB0aGF0IHRoZSBzaW1wbGUgbXVzdGFjaGUgaXMgcmVzb2x2ZWQsIHdlIG5lZWQgdG9cblx0ICAgICAgLy8gZXZhbHVhdGUgaXQgYnkgZXhlY3V0aW5nIGBibG9ja0hlbHBlck1pc3NpbmdgXG5cdCAgICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIHByb2dyYW0pO1xuXHQgICAgICB0aGlzLm9wY29kZSgncHVzaFByb2dyYW0nLCBpbnZlcnNlKTtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2VtcHR5SGFzaCcpO1xuXHQgICAgICB0aGlzLm9wY29kZSgnYW1iaWd1b3VzQmxvY2tWYWx1ZScpO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLm9wY29kZSgnYXBwZW5kJyk7XG5cdCAgfSxcblxuXHQgIERlY29yYXRvckJsb2NrOiBmdW5jdGlvbiBEZWNvcmF0b3JCbG9jayhkZWNvcmF0b3IpIHtcblx0ICAgIHZhciBwcm9ncmFtID0gZGVjb3JhdG9yLnByb2dyYW0gJiYgdGhpcy5jb21waWxlUHJvZ3JhbShkZWNvcmF0b3IucHJvZ3JhbSk7XG5cdCAgICB2YXIgcGFyYW1zID0gdGhpcy5zZXR1cEZ1bGxNdXN0YWNoZVBhcmFtcyhkZWNvcmF0b3IsIHByb2dyYW0sIHVuZGVmaW5lZCksXG5cdCAgICAgICAgcGF0aCA9IGRlY29yYXRvci5wYXRoO1xuXG5cdCAgICB0aGlzLnVzZURlY29yYXRvcnMgPSB0cnVlO1xuXHQgICAgdGhpcy5vcGNvZGUoJ3JlZ2lzdGVyRGVjb3JhdG9yJywgcGFyYW1zLmxlbmd0aCwgcGF0aC5vcmlnaW5hbCk7XG5cdCAgfSxcblxuXHQgIFBhcnRpYWxTdGF0ZW1lbnQ6IGZ1bmN0aW9uIFBhcnRpYWxTdGF0ZW1lbnQocGFydGlhbCkge1xuXHQgICAgdGhpcy51c2VQYXJ0aWFsID0gdHJ1ZTtcblxuXHQgICAgdmFyIHByb2dyYW0gPSBwYXJ0aWFsLnByb2dyYW07XG5cdCAgICBpZiAocHJvZ3JhbSkge1xuXHQgICAgICBwcm9ncmFtID0gdGhpcy5jb21waWxlUHJvZ3JhbShwYXJ0aWFsLnByb2dyYW0pO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgcGFyYW1zID0gcGFydGlhbC5wYXJhbXM7XG5cdCAgICBpZiAocGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1Vuc3VwcG9ydGVkIG51bWJlciBvZiBwYXJ0aWFsIGFyZ3VtZW50czogJyArIHBhcmFtcy5sZW5ndGgsIHBhcnRpYWwpO1xuXHQgICAgfSBlbHNlIGlmICghcGFyYW1zLmxlbmd0aCkge1xuXHQgICAgICBpZiAodGhpcy5vcHRpb25zLmV4cGxpY2l0UGFydGlhbENvbnRleHQpIHtcblx0ICAgICAgICB0aGlzLm9wY29kZSgncHVzaExpdGVyYWwnLCAndW5kZWZpbmVkJyk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcGFyYW1zLnB1c2goeyB0eXBlOiAnUGF0aEV4cHJlc3Npb24nLCBwYXJ0czogW10sIGRlcHRoOiAwIH0pO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHZhciBwYXJ0aWFsTmFtZSA9IHBhcnRpYWwubmFtZS5vcmlnaW5hbCxcblx0ICAgICAgICBpc0R5bmFtaWMgPSBwYXJ0aWFsLm5hbWUudHlwZSA9PT0gJ1N1YkV4cHJlc3Npb24nO1xuXHQgICAgaWYgKGlzRHluYW1pYykge1xuXHQgICAgICB0aGlzLmFjY2VwdChwYXJ0aWFsLm5hbWUpO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLnNldHVwRnVsbE11c3RhY2hlUGFyYW1zKHBhcnRpYWwsIHByb2dyYW0sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cblx0ICAgIHZhciBpbmRlbnQgPSBwYXJ0aWFsLmluZGVudCB8fCAnJztcblx0ICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmVudEluZGVudCAmJiBpbmRlbnQpIHtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2FwcGVuZENvbnRlbnQnLCBpbmRlbnQpO1xuXHQgICAgICBpbmRlbnQgPSAnJztcblx0ICAgIH1cblxuXHQgICAgdGhpcy5vcGNvZGUoJ2ludm9rZVBhcnRpYWwnLCBpc0R5bmFtaWMsIHBhcnRpYWxOYW1lLCBpbmRlbnQpO1xuXHQgICAgdGhpcy5vcGNvZGUoJ2FwcGVuZCcpO1xuXHQgIH0sXG5cdCAgUGFydGlhbEJsb2NrU3RhdGVtZW50OiBmdW5jdGlvbiBQYXJ0aWFsQmxvY2tTdGF0ZW1lbnQocGFydGlhbEJsb2NrKSB7XG5cdCAgICB0aGlzLlBhcnRpYWxTdGF0ZW1lbnQocGFydGlhbEJsb2NrKTtcblx0ICB9LFxuXG5cdCAgTXVzdGFjaGVTdGF0ZW1lbnQ6IGZ1bmN0aW9uIE11c3RhY2hlU3RhdGVtZW50KG11c3RhY2hlKSB7XG5cdCAgICB0aGlzLlN1YkV4cHJlc3Npb24obXVzdGFjaGUpO1xuXG5cdCAgICBpZiAobXVzdGFjaGUuZXNjYXBlZCAmJiAhdGhpcy5vcHRpb25zLm5vRXNjYXBlKSB7XG5cdCAgICAgIHRoaXMub3Bjb2RlKCdhcHBlbmRFc2NhcGVkJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLm9wY29kZSgnYXBwZW5kJyk7XG5cdCAgICB9XG5cdCAgfSxcblx0ICBEZWNvcmF0b3I6IGZ1bmN0aW9uIERlY29yYXRvcihkZWNvcmF0b3IpIHtcblx0ICAgIHRoaXMuRGVjb3JhdG9yQmxvY2soZGVjb3JhdG9yKTtcblx0ICB9LFxuXG5cdCAgQ29udGVudFN0YXRlbWVudDogZnVuY3Rpb24gQ29udGVudFN0YXRlbWVudChjb250ZW50KSB7XG5cdCAgICBpZiAoY29udGVudC52YWx1ZSkge1xuXHQgICAgICB0aGlzLm9wY29kZSgnYXBwZW5kQ29udGVudCcsIGNvbnRlbnQudmFsdWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBDb21tZW50U3RhdGVtZW50OiBmdW5jdGlvbiBDb21tZW50U3RhdGVtZW50KCkge30sXG5cblx0ICBTdWJFeHByZXNzaW9uOiBmdW5jdGlvbiBTdWJFeHByZXNzaW9uKHNleHByKSB7XG5cdCAgICB0cmFuc2Zvcm1MaXRlcmFsVG9QYXRoKHNleHByKTtcblx0ICAgIHZhciB0eXBlID0gdGhpcy5jbGFzc2lmeVNleHByKHNleHByKTtcblxuXHQgICAgaWYgKHR5cGUgPT09ICdzaW1wbGUnKSB7XG5cdCAgICAgIHRoaXMuc2ltcGxlU2V4cHIoc2V4cHIpO1xuXHQgICAgfSBlbHNlIGlmICh0eXBlID09PSAnaGVscGVyJykge1xuXHQgICAgICB0aGlzLmhlbHBlclNleHByKHNleHByKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuYW1iaWd1b3VzU2V4cHIoc2V4cHIpO1xuXHQgICAgfVxuXHQgIH0sXG5cdCAgYW1iaWd1b3VzU2V4cHI6IGZ1bmN0aW9uIGFtYmlndW91c1NleHByKHNleHByLCBwcm9ncmFtLCBpbnZlcnNlKSB7XG5cdCAgICB2YXIgcGF0aCA9IHNleHByLnBhdGgsXG5cdCAgICAgICAgbmFtZSA9IHBhdGgucGFydHNbMF0sXG5cdCAgICAgICAgaXNCbG9jayA9IHByb2dyYW0gIT0gbnVsbCB8fCBpbnZlcnNlICE9IG51bGw7XG5cblx0ICAgIHRoaXMub3Bjb2RlKCdnZXRDb250ZXh0JywgcGF0aC5kZXB0aCk7XG5cblx0ICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIHByb2dyYW0pO1xuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgaW52ZXJzZSk7XG5cblx0ICAgIHBhdGguc3RyaWN0ID0gdHJ1ZTtcblx0ICAgIHRoaXMuYWNjZXB0KHBhdGgpO1xuXG5cdCAgICB0aGlzLm9wY29kZSgnaW52b2tlQW1iaWd1b3VzJywgbmFtZSwgaXNCbG9jayk7XG5cdCAgfSxcblxuXHQgIHNpbXBsZVNleHByOiBmdW5jdGlvbiBzaW1wbGVTZXhwcihzZXhwcikge1xuXHQgICAgdmFyIHBhdGggPSBzZXhwci5wYXRoO1xuXHQgICAgcGF0aC5zdHJpY3QgPSB0cnVlO1xuXHQgICAgdGhpcy5hY2NlcHQocGF0aCk7XG5cdCAgICB0aGlzLm9wY29kZSgncmVzb2x2ZVBvc3NpYmxlTGFtYmRhJyk7XG5cdCAgfSxcblxuXHQgIGhlbHBlclNleHByOiBmdW5jdGlvbiBoZWxwZXJTZXhwcihzZXhwciwgcHJvZ3JhbSwgaW52ZXJzZSkge1xuXHQgICAgdmFyIHBhcmFtcyA9IHRoaXMuc2V0dXBGdWxsTXVzdGFjaGVQYXJhbXMoc2V4cHIsIHByb2dyYW0sIGludmVyc2UpLFxuXHQgICAgICAgIHBhdGggPSBzZXhwci5wYXRoLFxuXHQgICAgICAgIG5hbWUgPSBwYXRoLnBhcnRzWzBdO1xuXG5cdCAgICBpZiAodGhpcy5vcHRpb25zLmtub3duSGVscGVyc1tuYW1lXSkge1xuXHQgICAgICB0aGlzLm9wY29kZSgnaW52b2tlS25vd25IZWxwZXInLCBwYXJhbXMubGVuZ3RoLCBuYW1lKTtcblx0ICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmtub3duSGVscGVyc09ubHkpIHtcblx0ICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1lvdSBzcGVjaWZpZWQga25vd25IZWxwZXJzT25seSwgYnV0IHVzZWQgdGhlIHVua25vd24gaGVscGVyICcgKyBuYW1lLCBzZXhwcik7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBwYXRoLnN0cmljdCA9IHRydWU7XG5cdCAgICAgIHBhdGguZmFsc3kgPSB0cnVlO1xuXG5cdCAgICAgIHRoaXMuYWNjZXB0KHBhdGgpO1xuXHQgICAgICB0aGlzLm9wY29kZSgnaW52b2tlSGVscGVyJywgcGFyYW1zLmxlbmd0aCwgcGF0aC5vcmlnaW5hbCwgX2FzdDJbJ2RlZmF1bHQnXS5oZWxwZXJzLnNpbXBsZUlkKHBhdGgpKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgUGF0aEV4cHJlc3Npb246IGZ1bmN0aW9uIFBhdGhFeHByZXNzaW9uKHBhdGgpIHtcblx0ICAgIHRoaXMuYWRkRGVwdGgocGF0aC5kZXB0aCk7XG5cdCAgICB0aGlzLm9wY29kZSgnZ2V0Q29udGV4dCcsIHBhdGguZGVwdGgpO1xuXG5cdCAgICB2YXIgbmFtZSA9IHBhdGgucGFydHNbMF0sXG5cdCAgICAgICAgc2NvcGVkID0gX2FzdDJbJ2RlZmF1bHQnXS5oZWxwZXJzLnNjb3BlZElkKHBhdGgpLFxuXHQgICAgICAgIGJsb2NrUGFyYW1JZCA9ICFwYXRoLmRlcHRoICYmICFzY29wZWQgJiYgdGhpcy5ibG9ja1BhcmFtSW5kZXgobmFtZSk7XG5cblx0ICAgIGlmIChibG9ja1BhcmFtSWQpIHtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2xvb2t1cEJsb2NrUGFyYW0nLCBibG9ja1BhcmFtSWQsIHBhdGgucGFydHMpO1xuXHQgICAgfSBlbHNlIGlmICghbmFtZSkge1xuXHQgICAgICAvLyBDb250ZXh0IHJlZmVyZW5jZSwgaS5lLiBge3tmb28gLn19YCBvciBge3tmb28gLi59fWBcblx0ICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hDb250ZXh0Jyk7XG5cdCAgICB9IGVsc2UgaWYgKHBhdGguZGF0YSkge1xuXHQgICAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IHRydWU7XG5cdCAgICAgIHRoaXMub3Bjb2RlKCdsb29rdXBEYXRhJywgcGF0aC5kZXB0aCwgcGF0aC5wYXJ0cywgcGF0aC5zdHJpY3QpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2xvb2t1cE9uQ29udGV4dCcsIHBhdGgucGFydHMsIHBhdGguZmFsc3ksIHBhdGguc3RyaWN0LCBzY29wZWQpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBTdHJpbmdMaXRlcmFsOiBmdW5jdGlvbiBTdHJpbmdMaXRlcmFsKHN0cmluZykge1xuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hTdHJpbmcnLCBzdHJpbmcudmFsdWUpO1xuXHQgIH0sXG5cblx0ICBOdW1iZXJMaXRlcmFsOiBmdW5jdGlvbiBOdW1iZXJMaXRlcmFsKG51bWJlcikge1xuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hMaXRlcmFsJywgbnVtYmVyLnZhbHVlKTtcblx0ICB9LFxuXG5cdCAgQm9vbGVhbkxpdGVyYWw6IGZ1bmN0aW9uIEJvb2xlYW5MaXRlcmFsKGJvb2wpIHtcblx0ICAgIHRoaXMub3Bjb2RlKCdwdXNoTGl0ZXJhbCcsIGJvb2wudmFsdWUpO1xuXHQgIH0sXG5cblx0ICBVbmRlZmluZWRMaXRlcmFsOiBmdW5jdGlvbiBVbmRlZmluZWRMaXRlcmFsKCkge1xuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hMaXRlcmFsJywgJ3VuZGVmaW5lZCcpO1xuXHQgIH0sXG5cblx0ICBOdWxsTGl0ZXJhbDogZnVuY3Rpb24gTnVsbExpdGVyYWwoKSB7XG5cdCAgICB0aGlzLm9wY29kZSgncHVzaExpdGVyYWwnLCAnbnVsbCcpO1xuXHQgIH0sXG5cblx0ICBIYXNoOiBmdW5jdGlvbiBIYXNoKGhhc2gpIHtcblx0ICAgIHZhciBwYWlycyA9IGhhc2gucGFpcnMsXG5cdCAgICAgICAgaSA9IDAsXG5cdCAgICAgICAgbCA9IHBhaXJzLmxlbmd0aDtcblxuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hIYXNoJyk7XG5cblx0ICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHRoaXMucHVzaFBhcmFtKHBhaXJzW2ldLnZhbHVlKTtcblx0ICAgIH1cblx0ICAgIHdoaWxlIChpLS0pIHtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2Fzc2lnblRvSGFzaCcsIHBhaXJzW2ldLmtleSk7XG5cdCAgICB9XG5cdCAgICB0aGlzLm9wY29kZSgncG9wSGFzaCcpO1xuXHQgIH0sXG5cblx0ICAvLyBIRUxQRVJTXG5cdCAgb3Bjb2RlOiBmdW5jdGlvbiBvcGNvZGUobmFtZSkge1xuXHQgICAgdGhpcy5vcGNvZGVzLnB1c2goe1xuXHQgICAgICBvcGNvZGU6IG5hbWUsXG5cdCAgICAgIGFyZ3M6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcblx0ICAgICAgbG9jOiB0aGlzLnNvdXJjZU5vZGVbMF0ubG9jXG5cdCAgICB9KTtcblx0ICB9LFxuXG5cdCAgYWRkRGVwdGg6IGZ1bmN0aW9uIGFkZERlcHRoKGRlcHRoKSB7XG5cdCAgICBpZiAoIWRlcHRoKSB7XG5cdCAgICAgIHJldHVybjtcblx0ICAgIH1cblxuXHQgICAgdGhpcy51c2VEZXB0aHMgPSB0cnVlO1xuXHQgIH0sXG5cblx0ICBjbGFzc2lmeVNleHByOiBmdW5jdGlvbiBjbGFzc2lmeVNleHByKHNleHByKSB7XG5cdCAgICB2YXIgaXNTaW1wbGUgPSBfYXN0MlsnZGVmYXVsdCddLmhlbHBlcnMuc2ltcGxlSWQoc2V4cHIucGF0aCk7XG5cblx0ICAgIHZhciBpc0Jsb2NrUGFyYW0gPSBpc1NpbXBsZSAmJiAhIXRoaXMuYmxvY2tQYXJhbUluZGV4KHNleHByLnBhdGgucGFydHNbMF0pO1xuXG5cdCAgICAvLyBhIG11c3RhY2hlIGlzIGFuIGVsaWdpYmxlIGhlbHBlciBpZjpcblx0ICAgIC8vICogaXRzIGlkIGlzIHNpbXBsZSAoYSBzaW5nbGUgcGFydCwgbm90IGB0aGlzYCBvciBgLi5gKVxuXHQgICAgdmFyIGlzSGVscGVyID0gIWlzQmxvY2tQYXJhbSAmJiBfYXN0MlsnZGVmYXVsdCddLmhlbHBlcnMuaGVscGVyRXhwcmVzc2lvbihzZXhwcik7XG5cblx0ICAgIC8vIGlmIGEgbXVzdGFjaGUgaXMgYW4gZWxpZ2libGUgaGVscGVyIGJ1dCBub3QgYSBkZWZpbml0ZVxuXHQgICAgLy8gaGVscGVyLCBpdCBpcyBhbWJpZ3VvdXMsIGFuZCB3aWxsIGJlIHJlc29sdmVkIGluIGEgbGF0ZXJcblx0ICAgIC8vIHBhc3Mgb3IgYXQgcnVudGltZS5cblx0ICAgIHZhciBpc0VsaWdpYmxlID0gIWlzQmxvY2tQYXJhbSAmJiAoaXNIZWxwZXIgfHwgaXNTaW1wbGUpO1xuXG5cdCAgICAvLyBpZiBhbWJpZ3VvdXMsIHdlIGNhbiBwb3NzaWJseSByZXNvbHZlIHRoZSBhbWJpZ3VpdHkgbm93XG5cdCAgICAvLyBBbiBlbGlnaWJsZSBoZWxwZXIgaXMgb25lIHRoYXQgZG9lcyBub3QgaGF2ZSBhIGNvbXBsZXggcGF0aCwgaS5lLiBgdGhpcy5mb29gLCBgLi4vZm9vYCBldGMuXG5cdCAgICBpZiAoaXNFbGlnaWJsZSAmJiAhaXNIZWxwZXIpIHtcblx0ICAgICAgdmFyIF9uYW1lID0gc2V4cHIucGF0aC5wYXJ0c1swXSxcblx0ICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdCAgICAgIGlmIChvcHRpb25zLmtub3duSGVscGVyc1tfbmFtZV0pIHtcblx0ICAgICAgICBpc0hlbHBlciA9IHRydWU7XG5cdCAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5rbm93bkhlbHBlcnNPbmx5KSB7XG5cdCAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmIChpc0hlbHBlcikge1xuXHQgICAgICByZXR1cm4gJ2hlbHBlcic7XG5cdCAgICB9IGVsc2UgaWYgKGlzRWxpZ2libGUpIHtcblx0ICAgICAgcmV0dXJuICdhbWJpZ3VvdXMnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmV0dXJuICdzaW1wbGUnO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBwdXNoUGFyYW1zOiBmdW5jdGlvbiBwdXNoUGFyYW1zKHBhcmFtcykge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXJhbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIHRoaXMucHVzaFBhcmFtKHBhcmFtc1tpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHB1c2hQYXJhbTogZnVuY3Rpb24gcHVzaFBhcmFtKHZhbCkge1xuXHQgICAgdmFyIHZhbHVlID0gdmFsLnZhbHVlICE9IG51bGwgPyB2YWwudmFsdWUgOiB2YWwub3JpZ2luYWwgfHwgJyc7XG5cblx0ICAgIGlmICh0aGlzLnN0cmluZ1BhcmFtcykge1xuXHQgICAgICBpZiAodmFsdWUucmVwbGFjZSkge1xuXHQgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXihcXC4/XFwuXFwvKSovZywgJycpLnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuXHQgICAgICB9XG5cblx0ICAgICAgaWYgKHZhbC5kZXB0aCkge1xuXHQgICAgICAgIHRoaXMuYWRkRGVwdGgodmFsLmRlcHRoKTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLm9wY29kZSgnZ2V0Q29udGV4dCcsIHZhbC5kZXB0aCB8fCAwKTtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hTdHJpbmdQYXJhbScsIHZhbHVlLCB2YWwudHlwZSk7XG5cblx0ICAgICAgaWYgKHZhbC50eXBlID09PSAnU3ViRXhwcmVzc2lvbicpIHtcblx0ICAgICAgICAvLyBTdWJFeHByZXNzaW9ucyBnZXQgZXZhbHVhdGVkIGFuZCBwYXNzZWQgaW5cblx0ICAgICAgICAvLyBpbiBzdHJpbmcgcGFyYW1zIG1vZGUuXG5cdCAgICAgICAgdGhpcy5hY2NlcHQodmFsKTtcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKHRoaXMudHJhY2tJZHMpIHtcblx0ICAgICAgICB2YXIgYmxvY2tQYXJhbUluZGV4ID0gdW5kZWZpbmVkO1xuXHQgICAgICAgIGlmICh2YWwucGFydHMgJiYgIV9hc3QyWydkZWZhdWx0J10uaGVscGVycy5zY29wZWRJZCh2YWwpICYmICF2YWwuZGVwdGgpIHtcblx0ICAgICAgICAgIGJsb2NrUGFyYW1JbmRleCA9IHRoaXMuYmxvY2tQYXJhbUluZGV4KHZhbC5wYXJ0c1swXSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChibG9ja1BhcmFtSW5kZXgpIHtcblx0ICAgICAgICAgIHZhciBibG9ja1BhcmFtQ2hpbGQgPSB2YWwucGFydHMuc2xpY2UoMSkuam9pbignLicpO1xuXHQgICAgICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hJZCcsICdCbG9ja1BhcmFtJywgYmxvY2tQYXJhbUluZGV4LCBibG9ja1BhcmFtQ2hpbGQpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICB2YWx1ZSA9IHZhbC5vcmlnaW5hbCB8fCB2YWx1ZTtcblx0ICAgICAgICAgIGlmICh2YWx1ZS5yZXBsYWNlKSB7XG5cdCAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXnRoaXMoPzpcXC58JCkvLCAnJykucmVwbGFjZSgvXlxcLlxcLy8sICcnKS5yZXBsYWNlKC9eXFwuJC8sICcnKTtcblx0ICAgICAgICAgIH1cblxuXHQgICAgICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hJZCcsIHZhbC50eXBlLCB2YWx1ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuYWNjZXB0KHZhbCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHNldHVwRnVsbE11c3RhY2hlUGFyYW1zOiBmdW5jdGlvbiBzZXR1cEZ1bGxNdXN0YWNoZVBhcmFtcyhzZXhwciwgcHJvZ3JhbSwgaW52ZXJzZSwgb21pdEVtcHR5KSB7XG5cdCAgICB2YXIgcGFyYW1zID0gc2V4cHIucGFyYW1zO1xuXHQgICAgdGhpcy5wdXNoUGFyYW1zKHBhcmFtcyk7XG5cblx0ICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIHByb2dyYW0pO1xuXHQgICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgaW52ZXJzZSk7XG5cblx0ICAgIGlmIChzZXhwci5oYXNoKSB7XG5cdCAgICAgIHRoaXMuYWNjZXB0KHNleHByLmhhc2gpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5vcGNvZGUoJ2VtcHR5SGFzaCcsIG9taXRFbXB0eSk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBwYXJhbXM7XG5cdCAgfSxcblxuXHQgIGJsb2NrUGFyYW1JbmRleDogZnVuY3Rpb24gYmxvY2tQYXJhbUluZGV4KG5hbWUpIHtcblx0ICAgIGZvciAodmFyIGRlcHRoID0gMCwgbGVuID0gdGhpcy5vcHRpb25zLmJsb2NrUGFyYW1zLmxlbmd0aDsgZGVwdGggPCBsZW47IGRlcHRoKyspIHtcblx0ICAgICAgdmFyIGJsb2NrUGFyYW1zID0gdGhpcy5vcHRpb25zLmJsb2NrUGFyYW1zW2RlcHRoXSxcblx0ICAgICAgICAgIHBhcmFtID0gYmxvY2tQYXJhbXMgJiYgX3V0aWxzLmluZGV4T2YoYmxvY2tQYXJhbXMsIG5hbWUpO1xuXHQgICAgICBpZiAoYmxvY2tQYXJhbXMgJiYgcGFyYW0gPj0gMCkge1xuXHQgICAgICAgIHJldHVybiBbZGVwdGgsIHBhcmFtXTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0fTtcblxuXHRmdW5jdGlvbiBwcmVjb21waWxlKGlucHV0LCBvcHRpb25zLCBlbnYpIHtcblx0ICBpZiAoaW5wdXQgPT0gbnVsbCB8fCB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnICYmIGlucHV0LnR5cGUgIT09ICdQcm9ncmFtJykge1xuXHQgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1lvdSBtdXN0IHBhc3MgYSBzdHJpbmcgb3IgSGFuZGxlYmFycyBBU1QgdG8gSGFuZGxlYmFycy5wcmVjb21waWxlLiBZb3UgcGFzc2VkICcgKyBpbnB1dCk7XG5cdCAgfVxuXG5cdCAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdCAgaWYgKCEoJ2RhdGEnIGluIG9wdGlvbnMpKSB7XG5cdCAgICBvcHRpb25zLmRhdGEgPSB0cnVlO1xuXHQgIH1cblx0ICBpZiAob3B0aW9ucy5jb21wYXQpIHtcblx0ICAgIG9wdGlvbnMudXNlRGVwdGhzID0gdHJ1ZTtcblx0ICB9XG5cblx0ICB2YXIgYXN0ID0gZW52LnBhcnNlKGlucHV0LCBvcHRpb25zKSxcblx0ICAgICAgZW52aXJvbm1lbnQgPSBuZXcgZW52LkNvbXBpbGVyKCkuY29tcGlsZShhc3QsIG9wdGlvbnMpO1xuXHQgIHJldHVybiBuZXcgZW52LkphdmFTY3JpcHRDb21waWxlcigpLmNvbXBpbGUoZW52aXJvbm1lbnQsIG9wdGlvbnMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29tcGlsZShpbnB1dCwgb3B0aW9ucywgZW52KSB7XG5cdCAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgb3B0aW9ucyA9IHt9O1xuXG5cdCAgaWYgKGlucHV0ID09IG51bGwgfHwgdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyAmJiBpbnB1dC50eXBlICE9PSAnUHJvZ3JhbScpIHtcblx0ICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdZb3UgbXVzdCBwYXNzIGEgc3RyaW5nIG9yIEhhbmRsZWJhcnMgQVNUIHRvIEhhbmRsZWJhcnMuY29tcGlsZS4gWW91IHBhc3NlZCAnICsgaW5wdXQpO1xuXHQgIH1cblxuXHQgIG9wdGlvbnMgPSBfdXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zKTtcblx0ICBpZiAoISgnZGF0YScgaW4gb3B0aW9ucykpIHtcblx0ICAgIG9wdGlvbnMuZGF0YSA9IHRydWU7XG5cdCAgfVxuXHQgIGlmIChvcHRpb25zLmNvbXBhdCkge1xuXHQgICAgb3B0aW9ucy51c2VEZXB0aHMgPSB0cnVlO1xuXHQgIH1cblxuXHQgIHZhciBjb21waWxlZCA9IHVuZGVmaW5lZDtcblxuXHQgIGZ1bmN0aW9uIGNvbXBpbGVJbnB1dCgpIHtcblx0ICAgIHZhciBhc3QgPSBlbnYucGFyc2UoaW5wdXQsIG9wdGlvbnMpLFxuXHQgICAgICAgIGVudmlyb25tZW50ID0gbmV3IGVudi5Db21waWxlcigpLmNvbXBpbGUoYXN0LCBvcHRpb25zKSxcblx0ICAgICAgICB0ZW1wbGF0ZVNwZWMgPSBuZXcgZW52LkphdmFTY3JpcHRDb21waWxlcigpLmNvbXBpbGUoZW52aXJvbm1lbnQsIG9wdGlvbnMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cdCAgICByZXR1cm4gZW52LnRlbXBsYXRlKHRlbXBsYXRlU3BlYyk7XG5cdCAgfVxuXG5cdCAgLy8gVGVtcGxhdGUgaXMgb25seSBjb21waWxlZCBvbiBmaXJzdCB1c2UgYW5kIGNhY2hlZCBhZnRlciB0aGF0IHBvaW50LlxuXHQgIGZ1bmN0aW9uIHJldChjb250ZXh0LCBleGVjT3B0aW9ucykge1xuXHQgICAgaWYgKCFjb21waWxlZCkge1xuXHQgICAgICBjb21waWxlZCA9IGNvbXBpbGVJbnB1dCgpO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGNvbXBpbGVkLmNhbGwodGhpcywgY29udGV4dCwgZXhlY09wdGlvbnMpO1xuXHQgIH1cblx0ICByZXQuX3NldHVwID0gZnVuY3Rpb24gKHNldHVwT3B0aW9ucykge1xuXHQgICAgaWYgKCFjb21waWxlZCkge1xuXHQgICAgICBjb21waWxlZCA9IGNvbXBpbGVJbnB1dCgpO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGNvbXBpbGVkLl9zZXR1cChzZXR1cE9wdGlvbnMpO1xuXHQgIH07XG5cdCAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uIChpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG5cdCAgICBpZiAoIWNvbXBpbGVkKSB7XG5cdCAgICAgIGNvbXBpbGVkID0gY29tcGlsZUlucHV0KCk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gY29tcGlsZWQuX2NoaWxkKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuXHQgIH07XG5cdCAgcmV0dXJuIHJldDtcblx0fVxuXG5cdGZ1bmN0aW9uIGFyZ0VxdWFscyhhLCBiKSB7XG5cdCAgaWYgKGEgPT09IGIpIHtcblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH1cblxuXHQgIGlmIChfdXRpbHMuaXNBcnJheShhKSAmJiBfdXRpbHMuaXNBcnJheShiKSAmJiBhLmxlbmd0aCA9PT0gYi5sZW5ndGgpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuXHQgICAgICBpZiAoIWFyZ0VxdWFscyhhW2ldLCBiW2ldKSkge1xuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdHJhbnNmb3JtTGl0ZXJhbFRvUGF0aChzZXhwcikge1xuXHQgIGlmICghc2V4cHIucGF0aC5wYXJ0cykge1xuXHQgICAgdmFyIGxpdGVyYWwgPSBzZXhwci5wYXRoO1xuXHQgICAgLy8gQ2FzdGluZyB0byBzdHJpbmcgaGVyZSB0byBtYWtlIGZhbHNlIGFuZCAwIGxpdGVyYWwgdmFsdWVzIHBsYXkgbmljZWx5IHdpdGggdGhlIHJlc3Rcblx0ICAgIC8vIG9mIHRoZSBzeXN0ZW0uXG5cdCAgICBzZXhwci5wYXRoID0ge1xuXHQgICAgICB0eXBlOiAnUGF0aEV4cHJlc3Npb24nLFxuXHQgICAgICBkYXRhOiBmYWxzZSxcblx0ICAgICAgZGVwdGg6IDAsXG5cdCAgICAgIHBhcnRzOiBbbGl0ZXJhbC5vcmlnaW5hbCArICcnXSxcblx0ICAgICAgb3JpZ2luYWw6IGxpdGVyYWwub3JpZ2luYWwgKyAnJyxcblx0ICAgICAgbG9jOiBsaXRlcmFsLmxvY1xuXHQgICAgfTtcblx0ICB9XG5cdH1cblxuLyoqKi8gfSksXG4vKiA1MiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX09iamVjdCRrZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMylbJ2RlZmF1bHQnXTtcblxuXHR2YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IF9fd2VicGFja19yZXF1aXJlX18oMSlbJ2RlZmF1bHQnXTtcblxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cdHZhciBfYmFzZSA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cblx0dmFyIF9leGNlcHRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfZXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4Y2VwdGlvbik7XG5cblx0dmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIF9jb2RlR2VuID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Myk7XG5cblx0dmFyIF9jb2RlR2VuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvZGVHZW4pO1xuXG5cdGZ1bmN0aW9uIExpdGVyYWwodmFsdWUpIHtcblx0ICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cdH1cblxuXHRmdW5jdGlvbiBKYXZhU2NyaXB0Q29tcGlsZXIoKSB7fVxuXG5cdEphdmFTY3JpcHRDb21waWxlci5wcm90b3R5cGUgPSB7XG5cdCAgLy8gUFVCTElDIEFQSTogWW91IGNhbiBvdmVycmlkZSB0aGVzZSBtZXRob2RzIGluIGEgc3ViY2xhc3MgdG8gcHJvdmlkZVxuXHQgIC8vIGFsdGVybmF0aXZlIGNvbXBpbGVkIGZvcm1zIGZvciBuYW1lIGxvb2t1cCBhbmQgYnVmZmVyaW5nIHNlbWFudGljc1xuXHQgIG5hbWVMb29rdXA6IGZ1bmN0aW9uIG5hbWVMb29rdXAocGFyZW50LCBuYW1lIC8qLCAgdHlwZSAqLykge1xuXHQgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxOYW1lTG9va3VwKHBhcmVudCwgbmFtZSk7XG5cdCAgfSxcblx0ICBkZXB0aGVkTG9va3VwOiBmdW5jdGlvbiBkZXB0aGVkTG9va3VwKG5hbWUpIHtcblx0ICAgIHJldHVybiBbdGhpcy5hbGlhc2FibGUoJ2NvbnRhaW5lci5sb29rdXAnKSwgJyhkZXB0aHMsICcsIEpTT04uc3RyaW5naWZ5KG5hbWUpLCAnKSddO1xuXHQgIH0sXG5cblx0ICBjb21waWxlckluZm86IGZ1bmN0aW9uIGNvbXBpbGVySW5mbygpIHtcblx0ICAgIHZhciByZXZpc2lvbiA9IF9iYXNlLkNPTVBJTEVSX1JFVklTSU9OLFxuXHQgICAgICAgIHZlcnNpb25zID0gX2Jhc2UuUkVWSVNJT05fQ0hBTkdFU1tyZXZpc2lvbl07XG5cdCAgICByZXR1cm4gW3JldmlzaW9uLCB2ZXJzaW9uc107XG5cdCAgfSxcblxuXHQgIGFwcGVuZFRvQnVmZmVyOiBmdW5jdGlvbiBhcHBlbmRUb0J1ZmZlcihzb3VyY2UsIGxvY2F0aW9uLCBleHBsaWNpdCkge1xuXHQgICAgLy8gRm9yY2UgYSBzb3VyY2UgYXMgdGhpcyBzaW1wbGlmaWVzIHRoZSBtZXJnZSBsb2dpYy5cblx0ICAgIGlmICghX3V0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuXHQgICAgICBzb3VyY2UgPSBbc291cmNlXTtcblx0ICAgIH1cblx0ICAgIHNvdXJjZSA9IHRoaXMuc291cmNlLndyYXAoc291cmNlLCBsb2NhdGlvbik7XG5cblx0ICAgIGlmICh0aGlzLmVudmlyb25tZW50LmlzU2ltcGxlKSB7XG5cdCAgICAgIHJldHVybiBbJ3JldHVybiAnLCBzb3VyY2UsICc7J107XG5cdCAgICB9IGVsc2UgaWYgKGV4cGxpY2l0KSB7XG5cdCAgICAgIC8vIFRoaXMgaXMgYSBjYXNlIHdoZXJlIHRoZSBidWZmZXIgb3BlcmF0aW9uIG9jY3VycyBhcyBhIGNoaWxkIG9mIGFub3RoZXJcblx0ICAgICAgLy8gY29uc3RydWN0LCBnZW5lcmFsbHkgYnJhY2VzLiBXZSBoYXZlIHRvIGV4cGxpY2l0bHkgb3V0cHV0IHRoZXNlIGJ1ZmZlclxuXHQgICAgICAvLyBvcGVyYXRpb25zIHRvIGVuc3VyZSB0aGF0IHRoZSBlbWl0dGVkIGNvZGUgZ29lcyBpbiB0aGUgY29ycmVjdCBsb2NhdGlvbi5cblx0ICAgICAgcmV0dXJuIFsnYnVmZmVyICs9ICcsIHNvdXJjZSwgJzsnXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHNvdXJjZS5hcHBlbmRUb0J1ZmZlciA9IHRydWU7XG5cdCAgICAgIHJldHVybiBzb3VyY2U7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGluaXRpYWxpemVCdWZmZXI6IGZ1bmN0aW9uIGluaXRpYWxpemVCdWZmZXIoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5xdW90ZWRTdHJpbmcoJycpO1xuXHQgIH0sXG5cdCAgLy8gRU5EIFBVQkxJQyBBUElcblx0ICBpbnRlcm5hbE5hbWVMb29rdXA6IGZ1bmN0aW9uIGludGVybmFsTmFtZUxvb2t1cChwYXJlbnQsIG5hbWUpIHtcblx0ICAgIHRoaXMubG9va3VwUHJvcGVydHlGdW5jdGlvbklzVXNlZCA9IHRydWU7XG5cdCAgICByZXR1cm4gWydsb29rdXBQcm9wZXJ0eSgnLCBwYXJlbnQsICcsJywgSlNPTi5zdHJpbmdpZnkobmFtZSksICcpJ107XG5cdCAgfSxcblxuXHQgIGxvb2t1cFByb3BlcnR5RnVuY3Rpb25Jc1VzZWQ6IGZhbHNlLFxuXG5cdCAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZShlbnZpcm9ubWVudCwgb3B0aW9ucywgY29udGV4dCwgYXNPYmplY3QpIHtcblx0ICAgIHRoaXMuZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudDtcblx0ICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdCAgICB0aGlzLnN0cmluZ1BhcmFtcyA9IHRoaXMub3B0aW9ucy5zdHJpbmdQYXJhbXM7XG5cdCAgICB0aGlzLnRyYWNrSWRzID0gdGhpcy5vcHRpb25zLnRyYWNrSWRzO1xuXHQgICAgdGhpcy5wcmVjb21waWxlID0gIWFzT2JqZWN0O1xuXG5cdCAgICB0aGlzLm5hbWUgPSB0aGlzLmVudmlyb25tZW50Lm5hbWU7XG5cdCAgICB0aGlzLmlzQ2hpbGQgPSAhIWNvbnRleHQ7XG5cdCAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0IHx8IHtcblx0ICAgICAgZGVjb3JhdG9yczogW10sXG5cdCAgICAgIHByb2dyYW1zOiBbXSxcblx0ICAgICAgZW52aXJvbm1lbnRzOiBbXVxuXHQgICAgfTtcblxuXHQgICAgdGhpcy5wcmVhbWJsZSgpO1xuXG5cdCAgICB0aGlzLnN0YWNrU2xvdCA9IDA7XG5cdCAgICB0aGlzLnN0YWNrVmFycyA9IFtdO1xuXHQgICAgdGhpcy5hbGlhc2VzID0ge307XG5cdCAgICB0aGlzLnJlZ2lzdGVycyA9IHsgbGlzdDogW10gfTtcblx0ICAgIHRoaXMuaGFzaGVzID0gW107XG5cdCAgICB0aGlzLmNvbXBpbGVTdGFjayA9IFtdO1xuXHQgICAgdGhpcy5pbmxpbmVTdGFjayA9IFtdO1xuXHQgICAgdGhpcy5ibG9ja1BhcmFtcyA9IFtdO1xuXG5cdCAgICB0aGlzLmNvbXBpbGVDaGlsZHJlbihlbnZpcm9ubWVudCwgb3B0aW9ucyk7XG5cblx0ICAgIHRoaXMudXNlRGVwdGhzID0gdGhpcy51c2VEZXB0aHMgfHwgZW52aXJvbm1lbnQudXNlRGVwdGhzIHx8IGVudmlyb25tZW50LnVzZURlY29yYXRvcnMgfHwgdGhpcy5vcHRpb25zLmNvbXBhdDtcblx0ICAgIHRoaXMudXNlQmxvY2tQYXJhbXMgPSB0aGlzLnVzZUJsb2NrUGFyYW1zIHx8IGVudmlyb25tZW50LnVzZUJsb2NrUGFyYW1zO1xuXG5cdCAgICB2YXIgb3Bjb2RlcyA9IGVudmlyb25tZW50Lm9wY29kZXMsXG5cdCAgICAgICAgb3Bjb2RlID0gdW5kZWZpbmVkLFxuXHQgICAgICAgIGZpcnN0TG9jID0gdW5kZWZpbmVkLFxuXHQgICAgICAgIGkgPSB1bmRlZmluZWQsXG5cdCAgICAgICAgbCA9IHVuZGVmaW5lZDtcblxuXHQgICAgZm9yIChpID0gMCwgbCA9IG9wY29kZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIG9wY29kZSA9IG9wY29kZXNbaV07XG5cblx0ICAgICAgdGhpcy5zb3VyY2UuY3VycmVudExvY2F0aW9uID0gb3Bjb2RlLmxvYztcblx0ICAgICAgZmlyc3RMb2MgPSBmaXJzdExvYyB8fCBvcGNvZGUubG9jO1xuXHQgICAgICB0aGlzW29wY29kZS5vcGNvZGVdLmFwcGx5KHRoaXMsIG9wY29kZS5hcmdzKTtcblx0ICAgIH1cblxuXHQgICAgLy8gRmx1c2ggYW55IHRyYWlsaW5nIGNvbnRlbnQgdGhhdCBtaWdodCBiZSBwZW5kaW5nLlxuXHQgICAgdGhpcy5zb3VyY2UuY3VycmVudExvY2F0aW9uID0gZmlyc3RMb2M7XG5cdCAgICB0aGlzLnB1c2hTb3VyY2UoJycpO1xuXG5cdCAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgaWYgKHRoaXMuc3RhY2tTbG90IHx8IHRoaXMuaW5saW5lU3RhY2subGVuZ3RoIHx8IHRoaXMuY29tcGlsZVN0YWNrLmxlbmd0aCkge1xuXHQgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnQ29tcGlsZSBjb21wbGV0ZWQgd2l0aCBjb250ZW50IGxlZnQgb24gc3RhY2snKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKCF0aGlzLmRlY29yYXRvcnMuaXNFbXB0eSgpKSB7XG5cdCAgICAgIHRoaXMudXNlRGVjb3JhdG9ycyA9IHRydWU7XG5cblx0ICAgICAgdGhpcy5kZWNvcmF0b3JzLnByZXBlbmQoWyd2YXIgZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5kZWNvcmF0b3JzLCAnLCB0aGlzLmxvb2t1cFByb3BlcnR5RnVuY3Rpb25WYXJEZWNsYXJhdGlvbigpLCAnO1xcbiddKTtcblx0ICAgICAgdGhpcy5kZWNvcmF0b3JzLnB1c2goJ3JldHVybiBmbjsnKTtcblxuXHQgICAgICBpZiAoYXNPYmplY3QpIHtcblx0ICAgICAgICB0aGlzLmRlY29yYXRvcnMgPSBGdW5jdGlvbi5hcHBseSh0aGlzLCBbJ2ZuJywgJ3Byb3BzJywgJ2NvbnRhaW5lcicsICdkZXB0aDAnLCAnZGF0YScsICdibG9ja1BhcmFtcycsICdkZXB0aHMnLCB0aGlzLmRlY29yYXRvcnMubWVyZ2UoKV0pO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuZGVjb3JhdG9ycy5wcmVwZW5kKCdmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgZGVwdGgwLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XFxuJyk7XG5cdCAgICAgICAgdGhpcy5kZWNvcmF0b3JzLnB1c2goJ31cXG4nKTtcblx0ICAgICAgICB0aGlzLmRlY29yYXRvcnMgPSB0aGlzLmRlY29yYXRvcnMubWVyZ2UoKTtcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5kZWNvcmF0b3JzID0gdW5kZWZpbmVkO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgZm4gPSB0aGlzLmNyZWF0ZUZ1bmN0aW9uQ29udGV4dChhc09iamVjdCk7XG5cdCAgICBpZiAoIXRoaXMuaXNDaGlsZCkge1xuXHQgICAgICB2YXIgcmV0ID0ge1xuXHQgICAgICAgIGNvbXBpbGVyOiB0aGlzLmNvbXBpbGVySW5mbygpLFxuXHQgICAgICAgIG1haW46IGZuXG5cdCAgICAgIH07XG5cblx0ICAgICAgaWYgKHRoaXMuZGVjb3JhdG9ycykge1xuXHQgICAgICAgIHJldC5tYWluX2QgPSB0aGlzLmRlY29yYXRvcnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG5cdCAgICAgICAgcmV0LnVzZURlY29yYXRvcnMgPSB0cnVlO1xuXHQgICAgICB9XG5cblx0ICAgICAgdmFyIF9jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXHQgICAgICB2YXIgcHJvZ3JhbXMgPSBfY29udGV4dC5wcm9ncmFtcztcblx0ICAgICAgdmFyIGRlY29yYXRvcnMgPSBfY29udGV4dC5kZWNvcmF0b3JzO1xuXG5cdCAgICAgIGZvciAoaSA9IDAsIGwgPSBwcm9ncmFtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgICBpZiAocHJvZ3JhbXNbaV0pIHtcblx0ICAgICAgICAgIHJldFtpXSA9IHByb2dyYW1zW2ldO1xuXHQgICAgICAgICAgaWYgKGRlY29yYXRvcnNbaV0pIHtcblx0ICAgICAgICAgICAgcmV0W2kgKyAnX2QnXSA9IGRlY29yYXRvcnNbaV07XG5cdCAgICAgICAgICAgIHJldC51c2VEZWNvcmF0b3JzID0gdHJ1ZTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC51c2VQYXJ0aWFsKSB7XG5cdCAgICAgICAgcmV0LnVzZVBhcnRpYWwgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGF0YSkge1xuXHQgICAgICAgIHJldC51c2VEYXRhID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAodGhpcy51c2VEZXB0aHMpIHtcblx0ICAgICAgICByZXQudXNlRGVwdGhzID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAodGhpcy51c2VCbG9ja1BhcmFtcykge1xuXHQgICAgICAgIHJldC51c2VCbG9ja1BhcmFtcyA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21wYXQpIHtcblx0ICAgICAgICByZXQuY29tcGF0ID0gdHJ1ZTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGlmICghYXNPYmplY3QpIHtcblx0ICAgICAgICByZXQuY29tcGlsZXIgPSBKU09OLnN0cmluZ2lmeShyZXQuY29tcGlsZXIpO1xuXG5cdCAgICAgICAgdGhpcy5zb3VyY2UuY3VycmVudExvY2F0aW9uID0geyBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDAgfSB9O1xuXHQgICAgICAgIHJldCA9IHRoaXMub2JqZWN0TGl0ZXJhbChyZXQpO1xuXG5cdCAgICAgICAgaWYgKG9wdGlvbnMuc3JjTmFtZSkge1xuXHQgICAgICAgICAgcmV0ID0gcmV0LnRvU3RyaW5nV2l0aFNvdXJjZU1hcCh7IGZpbGU6IG9wdGlvbnMuZGVzdE5hbWUgfSk7XG5cdCAgICAgICAgICByZXQubWFwID0gcmV0Lm1hcCAmJiByZXQubWFwLnRvU3RyaW5nKCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHJldCA9IHJldC50b1N0cmluZygpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXQuY29tcGlsZXJPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHQgICAgICB9XG5cblx0ICAgICAgcmV0dXJuIHJldDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJldHVybiBmbjtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgcHJlYW1ibGU6IGZ1bmN0aW9uIHByZWFtYmxlKCkge1xuXHQgICAgLy8gdHJhY2sgdGhlIGxhc3QgY29udGV4dCBwdXNoZWQgaW50byBwbGFjZSB0byBhbGxvdyBza2lwcGluZyB0aGVcblx0ICAgIC8vIGdldENvbnRleHQgb3Bjb2RlIHdoZW4gaXQgd291bGQgYmUgYSBub29wXG5cdCAgICB0aGlzLmxhc3RDb250ZXh0ID0gMDtcblx0ICAgIHRoaXMuc291cmNlID0gbmV3IF9jb2RlR2VuMlsnZGVmYXVsdCddKHRoaXMub3B0aW9ucy5zcmNOYW1lKTtcblx0ICAgIHRoaXMuZGVjb3JhdG9ycyA9IG5ldyBfY29kZUdlbjJbJ2RlZmF1bHQnXSh0aGlzLm9wdGlvbnMuc3JjTmFtZSk7XG5cdCAgfSxcblxuXHQgIGNyZWF0ZUZ1bmN0aW9uQ29udGV4dDogZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb25Db250ZXh0KGFzT2JqZWN0KSB7XG5cdCAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgdmFyRGVjbGFyYXRpb25zID0gJyc7XG5cblx0ICAgIHZhciBsb2NhbHMgPSB0aGlzLnN0YWNrVmFycy5jb25jYXQodGhpcy5yZWdpc3RlcnMubGlzdCk7XG5cdCAgICBpZiAobG9jYWxzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgdmFyRGVjbGFyYXRpb25zICs9ICcsICcgKyBsb2NhbHMuam9pbignLCAnKTtcblx0ICAgIH1cblxuXHQgICAgLy8gR2VuZXJhdGUgbWluaW1pemVyIGFsaWFzIG1hcHBpbmdzXG5cdCAgICAvL1xuXHQgICAgLy8gV2hlbiB1c2luZyB0cnVlIFNvdXJjZU5vZGVzLCB0aGlzIHdpbGwgdXBkYXRlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSBnaXZlbiBhbGlhc1xuXHQgICAgLy8gYXMgdGhlIHNvdXJjZSBub2RlcyBhcmUgcmV1c2VkIGluIHNpdHUuIEZvciB0aGUgbm9uLXNvdXJjZSBub2RlIGNvbXBpbGF0aW9uIG1vZGUsXG5cdCAgICAvLyBhbGlhc2VzIHdpbGwgbm90IGJlIHVzZWQsIGJ1dCB0aGlzIGNhc2UgaXMgYWxyZWFkeSBiZWluZyBydW4gb24gdGhlIGNsaWVudCBhbmRcblx0ICAgIC8vIHdlIGFyZW4ndCBjb25jZXJuIGFib3V0IG1pbmltaXppbmcgdGhlIHRlbXBsYXRlIHNpemUuXG5cdCAgICB2YXIgYWxpYXNDb3VudCA9IDA7XG5cdCAgICBfT2JqZWN0JGtleXModGhpcy5hbGlhc2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuXHQgICAgICB2YXIgbm9kZSA9IF90aGlzLmFsaWFzZXNbYWxpYXNdO1xuXHQgICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLnJlZmVyZW5jZUNvdW50ID4gMSkge1xuXHQgICAgICAgIHZhckRlY2xhcmF0aW9ucyArPSAnLCBhbGlhcycgKyArK2FsaWFzQ291bnQgKyAnPScgKyBhbGlhcztcblx0ICAgICAgICBub2RlLmNoaWxkcmVuWzBdID0gJ2FsaWFzJyArIGFsaWFzQ291bnQ7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBpZiAodGhpcy5sb29rdXBQcm9wZXJ0eUZ1bmN0aW9uSXNVc2VkKSB7XG5cdCAgICAgIHZhckRlY2xhcmF0aW9ucyArPSAnLCAnICsgdGhpcy5sb29rdXBQcm9wZXJ0eUZ1bmN0aW9uVmFyRGVjbGFyYXRpb24oKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIHBhcmFtcyA9IFsnY29udGFpbmVyJywgJ2RlcHRoMCcsICdoZWxwZXJzJywgJ3BhcnRpYWxzJywgJ2RhdGEnXTtcblxuXHQgICAgaWYgKHRoaXMudXNlQmxvY2tQYXJhbXMgfHwgdGhpcy51c2VEZXB0aHMpIHtcblx0ICAgICAgcGFyYW1zLnB1c2goJ2Jsb2NrUGFyYW1zJyk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy51c2VEZXB0aHMpIHtcblx0ICAgICAgcGFyYW1zLnB1c2goJ2RlcHRocycpO1xuXHQgICAgfVxuXG5cdCAgICAvLyBQZXJmb3JtIGEgc2Vjb25kIHBhc3Mgb3ZlciB0aGUgb3V0cHV0IHRvIG1lcmdlIGNvbnRlbnQgd2hlbiBwb3NzaWJsZVxuXHQgICAgdmFyIHNvdXJjZSA9IHRoaXMubWVyZ2VTb3VyY2UodmFyRGVjbGFyYXRpb25zKTtcblxuXHQgICAgaWYgKGFzT2JqZWN0KSB7XG5cdCAgICAgIHBhcmFtcy5wdXNoKHNvdXJjZSk7XG5cblx0ICAgICAgcmV0dXJuIEZ1bmN0aW9uLmFwcGx5KHRoaXMsIHBhcmFtcyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gdGhpcy5zb3VyY2Uud3JhcChbJ2Z1bmN0aW9uKCcsIHBhcmFtcy5qb2luKCcsJyksICcpIHtcXG4gICcsIHNvdXJjZSwgJ30nXSk7XG5cdCAgICB9XG5cdCAgfSxcblx0ICBtZXJnZVNvdXJjZTogZnVuY3Rpb24gbWVyZ2VTb3VyY2UodmFyRGVjbGFyYXRpb25zKSB7XG5cdCAgICB2YXIgaXNTaW1wbGUgPSB0aGlzLmVudmlyb25tZW50LmlzU2ltcGxlLFxuXHQgICAgICAgIGFwcGVuZE9ubHkgPSAhdGhpcy5mb3JjZUJ1ZmZlcixcblx0ICAgICAgICBhcHBlbmRGaXJzdCA9IHVuZGVmaW5lZCxcblx0ICAgICAgICBzb3VyY2VTZWVuID0gdW5kZWZpbmVkLFxuXHQgICAgICAgIGJ1ZmZlclN0YXJ0ID0gdW5kZWZpbmVkLFxuXHQgICAgICAgIGJ1ZmZlckVuZCA9IHVuZGVmaW5lZDtcblx0ICAgIHRoaXMuc291cmNlLmVhY2goZnVuY3Rpb24gKGxpbmUpIHtcblx0ICAgICAgaWYgKGxpbmUuYXBwZW5kVG9CdWZmZXIpIHtcblx0ICAgICAgICBpZiAoYnVmZmVyU3RhcnQpIHtcblx0ICAgICAgICAgIGxpbmUucHJlcGVuZCgnICArICcpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBidWZmZXJTdGFydCA9IGxpbmU7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGJ1ZmZlckVuZCA9IGxpbmU7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaWYgKGJ1ZmZlclN0YXJ0KSB7XG5cdCAgICAgICAgICBpZiAoIXNvdXJjZVNlZW4pIHtcblx0ICAgICAgICAgICAgYXBwZW5kRmlyc3QgPSB0cnVlO1xuXHQgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgYnVmZmVyU3RhcnQucHJlcGVuZCgnYnVmZmVyICs9ICcpO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgICAgYnVmZmVyRW5kLmFkZCgnOycpO1xuXHQgICAgICAgICAgYnVmZmVyU3RhcnQgPSBidWZmZXJFbmQgPSB1bmRlZmluZWQ7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgc291cmNlU2VlbiA9IHRydWU7XG5cdCAgICAgICAgaWYgKCFpc1NpbXBsZSkge1xuXHQgICAgICAgICAgYXBwZW5kT25seSA9IGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIGlmIChhcHBlbmRPbmx5KSB7XG5cdCAgICAgIGlmIChidWZmZXJTdGFydCkge1xuXHQgICAgICAgIGJ1ZmZlclN0YXJ0LnByZXBlbmQoJ3JldHVybiAnKTtcblx0ICAgICAgICBidWZmZXJFbmQuYWRkKCc7Jyk7XG5cdCAgICAgIH0gZWxzZSBpZiAoIXNvdXJjZVNlZW4pIHtcblx0ICAgICAgICB0aGlzLnNvdXJjZS5wdXNoKCdyZXR1cm4gXCJcIjsnKTtcblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyRGVjbGFyYXRpb25zICs9ICcsIGJ1ZmZlciA9ICcgKyAoYXBwZW5kRmlyc3QgPyAnJyA6IHRoaXMuaW5pdGlhbGl6ZUJ1ZmZlcigpKTtcblxuXHQgICAgICBpZiAoYnVmZmVyU3RhcnQpIHtcblx0ICAgICAgICBidWZmZXJTdGFydC5wcmVwZW5kKCdyZXR1cm4gYnVmZmVyICsgJyk7XG5cdCAgICAgICAgYnVmZmVyRW5kLmFkZCgnOycpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuc291cmNlLnB1c2goJ3JldHVybiBidWZmZXI7Jyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgaWYgKHZhckRlY2xhcmF0aW9ucykge1xuXHQgICAgICB0aGlzLnNvdXJjZS5wcmVwZW5kKCd2YXIgJyArIHZhckRlY2xhcmF0aW9ucy5zdWJzdHJpbmcoMikgKyAoYXBwZW5kRmlyc3QgPyAnJyA6ICc7XFxuJykpO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdGhpcy5zb3VyY2UubWVyZ2UoKTtcblx0ICB9LFxuXG5cdCAgbG9va3VwUHJvcGVydHlGdW5jdGlvblZhckRlY2xhcmF0aW9uOiBmdW5jdGlvbiBsb29rdXBQcm9wZXJ0eUZ1bmN0aW9uVmFyRGVjbGFyYXRpb24oKSB7XG5cdCAgICByZXR1cm4gJ1xcbiAgICAgIGxvb2t1cFByb3BlcnR5ID0gY29udGFpbmVyLmxvb2t1cFByb3BlcnR5IHx8IGZ1bmN0aW9uKHBhcmVudCwgcHJvcGVydHlOYW1lKSB7XFxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmVudCwgcHJvcGVydHlOYW1lKSkge1xcbiAgICAgICAgICByZXR1cm4gcGFyZW50W3Byb3BlcnR5TmFtZV07XFxuICAgICAgICB9XFxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXFxuICAgIH1cXG4gICAgJy50cmltKCk7XG5cdCAgfSxcblxuXHQgIC8vIFtibG9ja1ZhbHVlXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogaGFzaCwgaW52ZXJzZSwgcHJvZ3JhbSwgdmFsdWVcblx0ICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHJldHVybiB2YWx1ZSBvZiBibG9ja0hlbHBlck1pc3Npbmdcblx0ICAvL1xuXHQgIC8vIFRoZSBwdXJwb3NlIG9mIHRoaXMgb3Bjb2RlIGlzIHRvIHRha2UgYSBibG9jayBvZiB0aGUgZm9ybVxuXHQgIC8vIGB7eyN0aGlzLmZvb319Li4ue3svdGhpcy5mb299fWAsIHJlc29sdmUgdGhlIHZhbHVlIG9mIGBmb29gLCBhbmRcblx0ICAvLyByZXBsYWNlIGl0IG9uIHRoZSBzdGFjayB3aXRoIHRoZSByZXN1bHQgb2YgcHJvcGVybHlcblx0ICAvLyBpbnZva2luZyBibG9ja0hlbHBlck1pc3NpbmcuXG5cdCAgYmxvY2tWYWx1ZTogZnVuY3Rpb24gYmxvY2tWYWx1ZShuYW1lKSB7XG5cdCAgICB2YXIgYmxvY2tIZWxwZXJNaXNzaW5nID0gdGhpcy5hbGlhc2FibGUoJ2NvbnRhaW5lci5ob29rcy5ibG9ja0hlbHBlck1pc3NpbmcnKSxcblx0ICAgICAgICBwYXJhbXMgPSBbdGhpcy5jb250ZXh0TmFtZSgwKV07XG5cdCAgICB0aGlzLnNldHVwSGVscGVyQXJncyhuYW1lLCAwLCBwYXJhbXMpO1xuXG5cdCAgICB2YXIgYmxvY2tOYW1lID0gdGhpcy5wb3BTdGFjaygpO1xuXHQgICAgcGFyYW1zLnNwbGljZSgxLCAwLCBibG9ja05hbWUpO1xuXG5cdCAgICB0aGlzLnB1c2godGhpcy5zb3VyY2UuZnVuY3Rpb25DYWxsKGJsb2NrSGVscGVyTWlzc2luZywgJ2NhbGwnLCBwYXJhbXMpKTtcblx0ICB9LFxuXG5cdCAgLy8gW2FtYmlndW91c0Jsb2NrVmFsdWVdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBpbnZlcnNlLCBwcm9ncmFtLCB2YWx1ZVxuXHQgIC8vIENvbXBpbGVyIHZhbHVlLCBiZWZvcmU6IGxhc3RIZWxwZXI9dmFsdWUgb2YgbGFzdCBmb3VuZCBoZWxwZXIsIGlmIGFueVxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlciwgaWYgbm8gbGFzdEhlbHBlcjogc2FtZSBhcyBbYmxvY2tWYWx1ZV1cblx0ICAvLyBPbiBzdGFjaywgYWZ0ZXIsIGlmIGxhc3RIZWxwZXI6IHZhbHVlXG5cdCAgYW1iaWd1b3VzQmxvY2tWYWx1ZTogZnVuY3Rpb24gYW1iaWd1b3VzQmxvY2tWYWx1ZSgpIHtcblx0ICAgIC8vIFdlJ3JlIGJlaW5nIGEgYml0IGNoZWVreSBhbmQgcmV1c2luZyB0aGUgb3B0aW9ucyB2YWx1ZSBmcm9tIHRoZSBwcmlvciBleGVjXG5cdCAgICB2YXIgYmxvY2tIZWxwZXJNaXNzaW5nID0gdGhpcy5hbGlhc2FibGUoJ2NvbnRhaW5lci5ob29rcy5ibG9ja0hlbHBlck1pc3NpbmcnKSxcblx0ICAgICAgICBwYXJhbXMgPSBbdGhpcy5jb250ZXh0TmFtZSgwKV07XG5cdCAgICB0aGlzLnNldHVwSGVscGVyQXJncygnJywgMCwgcGFyYW1zLCB0cnVlKTtcblxuXHQgICAgdGhpcy5mbHVzaElubGluZSgpO1xuXG5cdCAgICB2YXIgY3VycmVudCA9IHRoaXMudG9wU3RhY2soKTtcblx0ICAgIHBhcmFtcy5zcGxpY2UoMSwgMCwgY3VycmVudCk7XG5cblx0ICAgIHRoaXMucHVzaFNvdXJjZShbJ2lmICghJywgdGhpcy5sYXN0SGVscGVyLCAnKSB7ICcsIGN1cnJlbnQsICcgPSAnLCB0aGlzLnNvdXJjZS5mdW5jdGlvbkNhbGwoYmxvY2tIZWxwZXJNaXNzaW5nLCAnY2FsbCcsIHBhcmFtcyksICd9J10pO1xuXHQgIH0sXG5cblx0ICAvLyBbYXBwZW5kQ29udGVudF1cblx0ICAvL1xuXHQgIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogLi4uXG5cdCAgLy9cblx0ICAvLyBBcHBlbmRzIHRoZSBzdHJpbmcgdmFsdWUgb2YgYGNvbnRlbnRgIHRvIHRoZSBjdXJyZW50IGJ1ZmZlclxuXHQgIGFwcGVuZENvbnRlbnQ6IGZ1bmN0aW9uIGFwcGVuZENvbnRlbnQoY29udGVudCkge1xuXHQgICAgaWYgKHRoaXMucGVuZGluZ0NvbnRlbnQpIHtcblx0ICAgICAgY29udGVudCA9IHRoaXMucGVuZGluZ0NvbnRlbnQgKyBjb250ZW50O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5wZW5kaW5nTG9jYXRpb24gPSB0aGlzLnNvdXJjZS5jdXJyZW50TG9jYXRpb247XG5cdCAgICB9XG5cblx0ICAgIHRoaXMucGVuZGluZ0NvbnRlbnQgPSBjb250ZW50O1xuXHQgIH0sXG5cblx0ICAvLyBbYXBwZW5kXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogdmFsdWUsIC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogLi4uXG5cdCAgLy9cblx0ICAvLyBDb2VyY2VzIGB2YWx1ZWAgdG8gYSBTdHJpbmcgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGN1cnJlbnQgYnVmZmVyLlxuXHQgIC8vXG5cdCAgLy8gSWYgYHZhbHVlYCBpcyB0cnV0aHksIG9yIDAsIGl0IGlzIGNvZXJjZWQgaW50byBhIHN0cmluZyBhbmQgYXBwZW5kZWRcblx0ICAvLyBPdGhlcndpc2UsIHRoZSBlbXB0eSBzdHJpbmcgaXMgYXBwZW5kZWRcblx0ICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZCgpIHtcblx0ICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcblx0ICAgICAgdGhpcy5yZXBsYWNlU3RhY2soZnVuY3Rpb24gKGN1cnJlbnQpIHtcblx0ICAgICAgICByZXR1cm4gWycgIT0gbnVsbCA/ICcsIGN1cnJlbnQsICcgOiBcIlwiJ107XG5cdCAgICAgIH0pO1xuXG5cdCAgICAgIHRoaXMucHVzaFNvdXJjZSh0aGlzLmFwcGVuZFRvQnVmZmVyKHRoaXMucG9wU3RhY2soKSkpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyIGxvY2FsID0gdGhpcy5wb3BTdGFjaygpO1xuXHQgICAgICB0aGlzLnB1c2hTb3VyY2UoWydpZiAoJywgbG9jYWwsICcgIT0gbnVsbCkgeyAnLCB0aGlzLmFwcGVuZFRvQnVmZmVyKGxvY2FsLCB1bmRlZmluZWQsIHRydWUpLCAnIH0nXSk7XG5cdCAgICAgIGlmICh0aGlzLmVudmlyb25tZW50LmlzU2ltcGxlKSB7XG5cdCAgICAgICAgdGhpcy5wdXNoU291cmNlKFsnZWxzZSB7ICcsIHRoaXMuYXBwZW5kVG9CdWZmZXIoXCInJ1wiLCB1bmRlZmluZWQsIHRydWUpLCAnIH0nXSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgLy8gW2FwcGVuZEVzY2FwZWRdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiB2YWx1ZSwgLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiAuLi5cblx0ICAvL1xuXHQgIC8vIEVzY2FwZSBgdmFsdWVgIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGJ1ZmZlclxuXHQgIGFwcGVuZEVzY2FwZWQ6IGZ1bmN0aW9uIGFwcGVuZEVzY2FwZWQoKSB7XG5cdCAgICB0aGlzLnB1c2hTb3VyY2UodGhpcy5hcHBlbmRUb0J1ZmZlcihbdGhpcy5hbGlhc2FibGUoJ2NvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uJyksICcoJywgdGhpcy5wb3BTdGFjaygpLCAnKSddKSk7XG5cdCAgfSxcblxuXHQgIC8vIFtnZXRDb250ZXh0XVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiAuLi5cblx0ICAvLyBDb21waWxlciB2YWx1ZSwgYWZ0ZXI6IGxhc3RDb250ZXh0PWRlcHRoXG5cdCAgLy9cblx0ICAvLyBTZXQgdGhlIHZhbHVlIG9mIHRoZSBgbGFzdENvbnRleHRgIGNvbXBpbGVyIHZhbHVlIHRvIHRoZSBkZXB0aFxuXHQgIGdldENvbnRleHQ6IGZ1bmN0aW9uIGdldENvbnRleHQoZGVwdGgpIHtcblx0ICAgIHRoaXMubGFzdENvbnRleHQgPSBkZXB0aDtcblx0ICB9LFxuXG5cdCAgLy8gW3B1c2hDb250ZXh0XVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiBjdXJyZW50Q29udGV4dCwgLi4uXG5cdCAgLy9cblx0ICAvLyBQdXNoZXMgdGhlIHZhbHVlIG9mIHRoZSBjdXJyZW50IGNvbnRleHQgb250byB0aGUgc3RhY2suXG5cdCAgcHVzaENvbnRleHQ6IGZ1bmN0aW9uIHB1c2hDb250ZXh0KCkge1xuXHQgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKHRoaXMuY29udGV4dE5hbWUodGhpcy5sYXN0Q29udGV4dCkpO1xuXHQgIH0sXG5cblx0ICAvLyBbbG9va3VwT25Db250ZXh0XVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiBjdXJyZW50Q29udGV4dFtuYW1lXSwgLi4uXG5cdCAgLy9cblx0ICAvLyBMb29rcyB1cCB0aGUgdmFsdWUgb2YgYG5hbWVgIG9uIHRoZSBjdXJyZW50IGNvbnRleHQgYW5kIHB1c2hlc1xuXHQgIC8vIGl0IG9udG8gdGhlIHN0YWNrLlxuXHQgIGxvb2t1cE9uQ29udGV4dDogZnVuY3Rpb24gbG9va3VwT25Db250ZXh0KHBhcnRzLCBmYWxzeSwgc3RyaWN0LCBzY29wZWQpIHtcblx0ICAgIHZhciBpID0gMDtcblxuXHQgICAgaWYgKCFzY29wZWQgJiYgdGhpcy5vcHRpb25zLmNvbXBhdCAmJiAhdGhpcy5sYXN0Q29udGV4dCkge1xuXHQgICAgICAvLyBUaGUgZGVwdGhlZCBxdWVyeSBpcyBleHBlY3RlZCB0byBoYW5kbGUgdGhlIHVuZGVmaW5lZCBsb2dpYyBmb3IgdGhlIHJvb3QgbGV2ZWwgdGhhdFxuXHQgICAgICAvLyBpcyBpbXBsZW1lbnRlZCBiZWxvdywgc28gd2UgZXZhbHVhdGUgdGhhdCBkaXJlY3RseSBpbiBjb21wYXQgbW9kZVxuXHQgICAgICB0aGlzLnB1c2godGhpcy5kZXB0aGVkTG9va3VwKHBhcnRzW2krK10pKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMucHVzaENvbnRleHQoKTtcblx0ICAgIH1cblxuXHQgICAgdGhpcy5yZXNvbHZlUGF0aCgnY29udGV4dCcsIHBhcnRzLCBpLCBmYWxzeSwgc3RyaWN0KTtcblx0ICB9LFxuXG5cdCAgLy8gW2xvb2t1cEJsb2NrUGFyYW1dXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiAuLi5cblx0ICAvLyBPbiBzdGFjaywgYWZ0ZXI6IGJsb2NrUGFyYW1bbmFtZV0sIC4uLlxuXHQgIC8vXG5cdCAgLy8gTG9va3MgdXAgdGhlIHZhbHVlIG9mIGBwYXJ0c2Agb24gdGhlIGdpdmVuIGJsb2NrIHBhcmFtIGFuZCBwdXNoZXNcblx0ICAvLyBpdCBvbnRvIHRoZSBzdGFjay5cblx0ICBsb29rdXBCbG9ja1BhcmFtOiBmdW5jdGlvbiBsb29rdXBCbG9ja1BhcmFtKGJsb2NrUGFyYW1JZCwgcGFydHMpIHtcblx0ICAgIHRoaXMudXNlQmxvY2tQYXJhbXMgPSB0cnVlO1xuXG5cdCAgICB0aGlzLnB1c2goWydibG9ja1BhcmFtc1snLCBibG9ja1BhcmFtSWRbMF0sICddWycsIGJsb2NrUGFyYW1JZFsxXSwgJ10nXSk7XG5cdCAgICB0aGlzLnJlc29sdmVQYXRoKCdjb250ZXh0JywgcGFydHMsIDEpO1xuXHQgIH0sXG5cblx0ICAvLyBbbG9va3VwRGF0YV1cblx0ICAvL1xuXHQgIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogZGF0YSwgLi4uXG5cdCAgLy9cblx0ICAvLyBQdXNoIHRoZSBkYXRhIGxvb2t1cCBvcGVyYXRvclxuXHQgIGxvb2t1cERhdGE6IGZ1bmN0aW9uIGxvb2t1cERhdGEoZGVwdGgsIHBhcnRzLCBzdHJpY3QpIHtcblx0ICAgIGlmICghZGVwdGgpIHtcblx0ICAgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKCdkYXRhJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLnB1c2hTdGFja0xpdGVyYWwoJ2NvbnRhaW5lci5kYXRhKGRhdGEsICcgKyBkZXB0aCArICcpJyk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMucmVzb2x2ZVBhdGgoJ2RhdGEnLCBwYXJ0cywgMCwgdHJ1ZSwgc3RyaWN0KTtcblx0ICB9LFxuXG5cdCAgcmVzb2x2ZVBhdGg6IGZ1bmN0aW9uIHJlc29sdmVQYXRoKHR5cGUsIHBhcnRzLCBpLCBmYWxzeSwgc3RyaWN0KSB7XG5cdCAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5cdCAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuXHQgICAgaWYgKHRoaXMub3B0aW9ucy5zdHJpY3QgfHwgdGhpcy5vcHRpb25zLmFzc3VtZU9iamVjdHMpIHtcblx0ICAgICAgdGhpcy5wdXNoKHN0cmljdExvb2t1cCh0aGlzLm9wdGlvbnMuc3RyaWN0ICYmIHN0cmljdCwgdGhpcywgcGFydHMsIHR5cGUpKTtcblx0ICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgbGVuID0gcGFydHMubGVuZ3RoO1xuXHQgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cblx0ICAgICAgdGhpcy5yZXBsYWNlU3RhY2soZnVuY3Rpb24gKGN1cnJlbnQpIHtcblx0ICAgICAgICB2YXIgbG9va3VwID0gX3RoaXMyLm5hbWVMb29rdXAoY3VycmVudCwgcGFydHNbaV0sIHR5cGUpO1xuXHQgICAgICAgIC8vIFdlIHdhbnQgdG8gZW5zdXJlIHRoYXQgemVybyBhbmQgZmFsc2UgYXJlIGhhbmRsZWQgcHJvcGVybHkgaWYgdGhlIGNvbnRleHQgKGZhbHN5IGZsYWcpXG5cdCAgICAgICAgLy8gbmVlZHMgdG8gaGF2ZSB0aGUgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhlc2UgdmFsdWVzLlxuXHQgICAgICAgIGlmICghZmFsc3kpIHtcblx0ICAgICAgICAgIHJldHVybiBbJyAhPSBudWxsID8gJywgbG9va3VwLCAnIDogJywgY3VycmVudF07XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSBjYW4gdXNlIGdlbmVyaWMgZmFsc3kgaGFuZGxpbmdcblx0ICAgICAgICAgIHJldHVybiBbJyAmJiAnLCBsb29rdXBdO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSk7XG5cdCAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tbG9vcC1mdW5jICovXG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8vIFtyZXNvbHZlUG9zc2libGVMYW1iZGFdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiB2YWx1ZSwgLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiByZXNvbHZlZCB2YWx1ZSwgLi4uXG5cdCAgLy9cblx0ICAvLyBJZiB0aGUgYHZhbHVlYCBpcyBhIGxhbWJkYSwgcmVwbGFjZSBpdCBvbiB0aGUgc3RhY2sgYnlcblx0ICAvLyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBsYW1iZGFcblx0ICByZXNvbHZlUG9zc2libGVMYW1iZGE6IGZ1bmN0aW9uIHJlc29sdmVQb3NzaWJsZUxhbWJkYSgpIHtcblx0ICAgIHRoaXMucHVzaChbdGhpcy5hbGlhc2FibGUoJ2NvbnRhaW5lci5sYW1iZGEnKSwgJygnLCB0aGlzLnBvcFN0YWNrKCksICcsICcsIHRoaXMuY29udGV4dE5hbWUoMCksICcpJ10pO1xuXHQgIH0sXG5cblx0ICAvLyBbcHVzaFN0cmluZ1BhcmFtXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiBzdHJpbmcsIGN1cnJlbnRDb250ZXh0LCAuLi5cblx0ICAvL1xuXHQgIC8vIFRoaXMgb3Bjb2RlIGlzIGRlc2lnbmVkIGZvciB1c2UgaW4gc3RyaW5nIG1vZGUsIHdoaWNoXG5cdCAgLy8gcHJvdmlkZXMgdGhlIHN0cmluZyB2YWx1ZSBvZiBhIHBhcmFtZXRlciBhbG9uZyB3aXRoIGl0c1xuXHQgIC8vIGRlcHRoIHJhdGhlciB0aGFuIHJlc29sdmluZyBpdCBpbW1lZGlhdGVseS5cblx0ICBwdXNoU3RyaW5nUGFyYW06IGZ1bmN0aW9uIHB1c2hTdHJpbmdQYXJhbShzdHJpbmcsIHR5cGUpIHtcblx0ICAgIHRoaXMucHVzaENvbnRleHQoKTtcblx0ICAgIHRoaXMucHVzaFN0cmluZyh0eXBlKTtcblxuXHQgICAgLy8gSWYgaXQncyBhIHN1YmV4cHJlc3Npb24sIHRoZSBzdHJpbmcgcmVzdWx0XG5cdCAgICAvLyB3aWxsIGJlIHB1c2hlZCBhZnRlciB0aGlzIG9wY29kZS5cblx0ICAgIGlmICh0eXBlICE9PSAnU3ViRXhwcmVzc2lvbicpIHtcblx0ICAgICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgdGhpcy5wdXNoU3RyaW5nKHN0cmluZyk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKHN0cmluZyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgZW1wdHlIYXNoOiBmdW5jdGlvbiBlbXB0eUhhc2gob21pdEVtcHR5KSB7XG5cdCAgICBpZiAodGhpcy50cmFja0lkcykge1xuXHQgICAgICB0aGlzLnB1c2goJ3t9Jyk7IC8vIGhhc2hJZHNcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnN0cmluZ1BhcmFtcykge1xuXHQgICAgICB0aGlzLnB1c2goJ3t9Jyk7IC8vIGhhc2hDb250ZXh0c1xuXHQgICAgICB0aGlzLnB1c2goJ3t9Jyk7IC8vIGhhc2hUeXBlc1xuXHQgICAgfVxuXHQgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKG9taXRFbXB0eSA/ICd1bmRlZmluZWQnIDogJ3t9Jyk7XG5cdCAgfSxcblx0ICBwdXNoSGFzaDogZnVuY3Rpb24gcHVzaEhhc2goKSB7XG5cdCAgICBpZiAodGhpcy5oYXNoKSB7XG5cdCAgICAgIHRoaXMuaGFzaGVzLnB1c2godGhpcy5oYXNoKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuaGFzaCA9IHsgdmFsdWVzOiB7fSwgdHlwZXM6IFtdLCBjb250ZXh0czogW10sIGlkczogW10gfTtcblx0ICB9LFxuXHQgIHBvcEhhc2g6IGZ1bmN0aW9uIHBvcEhhc2goKSB7XG5cdCAgICB2YXIgaGFzaCA9IHRoaXMuaGFzaDtcblx0ICAgIHRoaXMuaGFzaCA9IHRoaXMuaGFzaGVzLnBvcCgpO1xuXG5cdCAgICBpZiAodGhpcy50cmFja0lkcykge1xuXHQgICAgICB0aGlzLnB1c2godGhpcy5vYmplY3RMaXRlcmFsKGhhc2guaWRzKSk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5zdHJpbmdQYXJhbXMpIHtcblx0ICAgICAgdGhpcy5wdXNoKHRoaXMub2JqZWN0TGl0ZXJhbChoYXNoLmNvbnRleHRzKSk7XG5cdCAgICAgIHRoaXMucHVzaCh0aGlzLm9iamVjdExpdGVyYWwoaGFzaC50eXBlcykpO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLnB1c2godGhpcy5vYmplY3RMaXRlcmFsKGhhc2gudmFsdWVzKSk7XG5cdCAgfSxcblxuXHQgIC8vIFtwdXNoU3RyaW5nXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiBxdW90ZWRTdHJpbmcoc3RyaW5nKSwgLi4uXG5cdCAgLy9cblx0ICAvLyBQdXNoIGEgcXVvdGVkIHZlcnNpb24gb2YgYHN0cmluZ2Agb250byB0aGUgc3RhY2tcblx0ICBwdXNoU3RyaW5nOiBmdW5jdGlvbiBwdXNoU3RyaW5nKHN0cmluZykge1xuXHQgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKHRoaXMucXVvdGVkU3RyaW5nKHN0cmluZykpO1xuXHQgIH0sXG5cblx0ICAvLyBbcHVzaExpdGVyYWxdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiAuLi5cblx0ICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHZhbHVlLCAuLi5cblx0ICAvL1xuXHQgIC8vIFB1c2hlcyBhIHZhbHVlIG9udG8gdGhlIHN0YWNrLiBUaGlzIG9wZXJhdGlvbiBwcmV2ZW50c1xuXHQgIC8vIHRoZSBjb21waWxlciBmcm9tIGNyZWF0aW5nIGEgdGVtcG9yYXJ5IHZhcmlhYmxlIHRvIGhvbGRcblx0ICAvLyBpdC5cblx0ICBwdXNoTGl0ZXJhbDogZnVuY3Rpb24gcHVzaExpdGVyYWwodmFsdWUpIHtcblx0ICAgIHRoaXMucHVzaFN0YWNrTGl0ZXJhbCh2YWx1ZSk7XG5cdCAgfSxcblxuXHQgIC8vIFtwdXNoUHJvZ3JhbV1cblx0ICAvL1xuXHQgIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogcHJvZ3JhbShndWlkKSwgLi4uXG5cdCAgLy9cblx0ICAvLyBQdXNoIGEgcHJvZ3JhbSBleHByZXNzaW9uIG9udG8gdGhlIHN0YWNrLiBUaGlzIHRha2VzXG5cdCAgLy8gYSBjb21waWxlLXRpbWUgZ3VpZCBhbmQgY29udmVydHMgaXQgaW50byBhIHJ1bnRpbWUtYWNjZXNzaWJsZVxuXHQgIC8vIGV4cHJlc3Npb24uXG5cdCAgcHVzaFByb2dyYW06IGZ1bmN0aW9uIHB1c2hQcm9ncmFtKGd1aWQpIHtcblx0ICAgIGlmIChndWlkICE9IG51bGwpIHtcblx0ICAgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKHRoaXMucHJvZ3JhbUV4cHJlc3Npb24oZ3VpZCkpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKG51bGwpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICAvLyBbcmVnaXN0ZXJEZWNvcmF0b3JdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBwcm9ncmFtLCBwYXJhbXMuLi4sIC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogLi4uXG5cdCAgLy9cblx0ICAvLyBQb3BzIG9mZiB0aGUgZGVjb3JhdG9yJ3MgcGFyYW1ldGVycywgaW52b2tlcyB0aGUgZGVjb3JhdG9yLFxuXHQgIC8vIGFuZCBpbnNlcnRzIHRoZSBkZWNvcmF0b3IgaW50byB0aGUgZGVjb3JhdG9ycyBsaXN0LlxuXHQgIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbiByZWdpc3RlckRlY29yYXRvcihwYXJhbVNpemUsIG5hbWUpIHtcblx0ICAgIHZhciBmb3VuZERlY29yYXRvciA9IHRoaXMubmFtZUxvb2t1cCgnZGVjb3JhdG9ycycsIG5hbWUsICdkZWNvcmF0b3InKSxcblx0ICAgICAgICBvcHRpb25zID0gdGhpcy5zZXR1cEhlbHBlckFyZ3MobmFtZSwgcGFyYW1TaXplKTtcblxuXHQgICAgdGhpcy5kZWNvcmF0b3JzLnB1c2goWydmbiA9ICcsIHRoaXMuZGVjb3JhdG9ycy5mdW5jdGlvbkNhbGwoZm91bmREZWNvcmF0b3IsICcnLCBbJ2ZuJywgJ3Byb3BzJywgJ2NvbnRhaW5lcicsIG9wdGlvbnNdKSwgJyB8fCBmbjsnXSk7XG5cdCAgfSxcblxuXHQgIC8vIFtpbnZva2VIZWxwZXJdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBpbnZlcnNlLCBwcm9ncmFtLCBwYXJhbXMuLi4sIC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogcmVzdWx0IG9mIGhlbHBlciBpbnZvY2F0aW9uXG5cdCAgLy9cblx0ICAvLyBQb3BzIG9mZiB0aGUgaGVscGVyJ3MgcGFyYW1ldGVycywgaW52b2tlcyB0aGUgaGVscGVyLFxuXHQgIC8vIGFuZCBwdXNoZXMgdGhlIGhlbHBlcidzIHJldHVybiB2YWx1ZSBvbnRvIHRoZSBzdGFjay5cblx0ICAvL1xuXHQgIC8vIElmIHRoZSBoZWxwZXIgaXMgbm90IGZvdW5kLCBgaGVscGVyTWlzc2luZ2AgaXMgY2FsbGVkLlxuXHQgIGludm9rZUhlbHBlcjogZnVuY3Rpb24gaW52b2tlSGVscGVyKHBhcmFtU2l6ZSwgbmFtZSwgaXNTaW1wbGUpIHtcblx0ICAgIHZhciBub25IZWxwZXIgPSB0aGlzLnBvcFN0YWNrKCksXG5cdCAgICAgICAgaGVscGVyID0gdGhpcy5zZXR1cEhlbHBlcihwYXJhbVNpemUsIG5hbWUpO1xuXG5cdCAgICB2YXIgcG9zc2libGVGdW5jdGlvbkNhbGxzID0gW107XG5cblx0ICAgIGlmIChpc1NpbXBsZSkge1xuXHQgICAgICAvLyBkaXJlY3QgY2FsbCB0byBoZWxwZXJcblx0ICAgICAgcG9zc2libGVGdW5jdGlvbkNhbGxzLnB1c2goaGVscGVyLm5hbWUpO1xuXHQgICAgfVxuXHQgICAgLy8gY2FsbCBhIGZ1bmN0aW9uIGZyb20gdGhlIGlucHV0IG9iamVjdFxuXHQgICAgcG9zc2libGVGdW5jdGlvbkNhbGxzLnB1c2gobm9uSGVscGVyKTtcblx0ICAgIGlmICghdGhpcy5vcHRpb25zLnN0cmljdCkge1xuXHQgICAgICBwb3NzaWJsZUZ1bmN0aW9uQ2FsbHMucHVzaCh0aGlzLmFsaWFzYWJsZSgnY29udGFpbmVyLmhvb2tzLmhlbHBlck1pc3NpbmcnKSk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBmdW5jdGlvbkxvb2t1cENvZGUgPSBbJygnLCB0aGlzLml0ZW1zU2VwYXJhdGVkQnkocG9zc2libGVGdW5jdGlvbkNhbGxzLCAnfHwnKSwgJyknXTtcblx0ICAgIHZhciBmdW5jdGlvbkNhbGwgPSB0aGlzLnNvdXJjZS5mdW5jdGlvbkNhbGwoZnVuY3Rpb25Mb29rdXBDb2RlLCAnY2FsbCcsIGhlbHBlci5jYWxsUGFyYW1zKTtcblx0ICAgIHRoaXMucHVzaChmdW5jdGlvbkNhbGwpO1xuXHQgIH0sXG5cblx0ICBpdGVtc1NlcGFyYXRlZEJ5OiBmdW5jdGlvbiBpdGVtc1NlcGFyYXRlZEJ5KGl0ZW1zLCBzZXBhcmF0b3IpIHtcblx0ICAgIHZhciByZXN1bHQgPSBbXTtcblx0ICAgIHJlc3VsdC5wdXNoKGl0ZW1zWzBdKTtcblx0ICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgcmVzdWx0LnB1c2goc2VwYXJhdG9yLCBpdGVtc1tpXSk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmVzdWx0O1xuXHQgIH0sXG5cdCAgLy8gW2ludm9rZUtub3duSGVscGVyXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogaGFzaCwgaW52ZXJzZSwgcHJvZ3JhbSwgcGFyYW1zLi4uLCAuLi5cblx0ICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHJlc3VsdCBvZiBoZWxwZXIgaW52b2NhdGlvblxuXHQgIC8vXG5cdCAgLy8gVGhpcyBvcGVyYXRpb24gaXMgdXNlZCB3aGVuIHRoZSBoZWxwZXIgaXMga25vd24gdG8gZXhpc3QsXG5cdCAgLy8gc28gYSBgaGVscGVyTWlzc2luZ2AgZmFsbGJhY2sgaXMgbm90IHJlcXVpcmVkLlxuXHQgIGludm9rZUtub3duSGVscGVyOiBmdW5jdGlvbiBpbnZva2VLbm93bkhlbHBlcihwYXJhbVNpemUsIG5hbWUpIHtcblx0ICAgIHZhciBoZWxwZXIgPSB0aGlzLnNldHVwSGVscGVyKHBhcmFtU2l6ZSwgbmFtZSk7XG5cdCAgICB0aGlzLnB1c2godGhpcy5zb3VyY2UuZnVuY3Rpb25DYWxsKGhlbHBlci5uYW1lLCAnY2FsbCcsIGhlbHBlci5jYWxsUGFyYW1zKSk7XG5cdCAgfSxcblxuXHQgIC8vIFtpbnZva2VBbWJpZ3VvdXNdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBpbnZlcnNlLCBwcm9ncmFtLCBwYXJhbXMuLi4sIC4uLlxuXHQgIC8vIE9uIHN0YWNrLCBhZnRlcjogcmVzdWx0IG9mIGRpc2FtYmlndWF0aW9uXG5cdCAgLy9cblx0ICAvLyBUaGlzIG9wZXJhdGlvbiBpcyB1c2VkIHdoZW4gYW4gZXhwcmVzc2lvbiBsaWtlIGB7e2Zvb319YFxuXHQgIC8vIGlzIHByb3ZpZGVkLCBidXQgd2UgZG9uJ3Qga25vdyBhdCBjb21waWxlLXRpbWUgd2hldGhlciBpdFxuXHQgIC8vIGlzIGEgaGVscGVyIG9yIGEgcGF0aC5cblx0ICAvL1xuXHQgIC8vIFRoaXMgb3BlcmF0aW9uIGVtaXRzIG1vcmUgY29kZSB0aGFuIHRoZSBvdGhlciBvcHRpb25zLFxuXHQgIC8vIGFuZCBjYW4gYmUgYXZvaWRlZCBieSBwYXNzaW5nIHRoZSBga25vd25IZWxwZXJzYCBhbmRcblx0ICAvLyBga25vd25IZWxwZXJzT25seWAgZmxhZ3MgYXQgY29tcGlsZS10aW1lLlxuXHQgIGludm9rZUFtYmlndW91czogZnVuY3Rpb24gaW52b2tlQW1iaWd1b3VzKG5hbWUsIGhlbHBlckNhbGwpIHtcblx0ICAgIHRoaXMudXNlUmVnaXN0ZXIoJ2hlbHBlcicpO1xuXG5cdCAgICB2YXIgbm9uSGVscGVyID0gdGhpcy5wb3BTdGFjaygpO1xuXG5cdCAgICB0aGlzLmVtcHR5SGFzaCgpO1xuXHQgICAgdmFyIGhlbHBlciA9IHRoaXMuc2V0dXBIZWxwZXIoMCwgbmFtZSwgaGVscGVyQ2FsbCk7XG5cblx0ICAgIHZhciBoZWxwZXJOYW1lID0gdGhpcy5sYXN0SGVscGVyID0gdGhpcy5uYW1lTG9va3VwKCdoZWxwZXJzJywgbmFtZSwgJ2hlbHBlcicpO1xuXG5cdCAgICB2YXIgbG9va3VwID0gWycoJywgJyhoZWxwZXIgPSAnLCBoZWxwZXJOYW1lLCAnIHx8ICcsIG5vbkhlbHBlciwgJyknXTtcblx0ICAgIGlmICghdGhpcy5vcHRpb25zLnN0cmljdCkge1xuXHQgICAgICBsb29rdXBbMF0gPSAnKGhlbHBlciA9ICc7XG5cdCAgICAgIGxvb2t1cC5wdXNoKCcgIT0gbnVsbCA/IGhlbHBlciA6ICcsIHRoaXMuYWxpYXNhYmxlKCdjb250YWluZXIuaG9va3MuaGVscGVyTWlzc2luZycpKTtcblx0ICAgIH1cblxuXHQgICAgdGhpcy5wdXNoKFsnKCcsIGxvb2t1cCwgaGVscGVyLnBhcmFtc0luaXQgPyBbJyksKCcsIGhlbHBlci5wYXJhbXNJbml0XSA6IFtdLCAnKSwnLCAnKHR5cGVvZiBoZWxwZXIgPT09ICcsIHRoaXMuYWxpYXNhYmxlKCdcImZ1bmN0aW9uXCInKSwgJyA/ICcsIHRoaXMuc291cmNlLmZ1bmN0aW9uQ2FsbCgnaGVscGVyJywgJ2NhbGwnLCBoZWxwZXIuY2FsbFBhcmFtcyksICcgOiBoZWxwZXIpKSddKTtcblx0ICB9LFxuXG5cdCAgLy8gW2ludm9rZVBhcnRpYWxdXG5cdCAgLy9cblx0ICAvLyBPbiBzdGFjaywgYmVmb3JlOiBjb250ZXh0LCAuLi5cblx0ICAvLyBPbiBzdGFjayBhZnRlcjogcmVzdWx0IG9mIHBhcnRpYWwgaW52b2NhdGlvblxuXHQgIC8vXG5cdCAgLy8gVGhpcyBvcGVyYXRpb24gcG9wcyBvZmYgYSBjb250ZXh0LCBpbnZva2VzIGEgcGFydGlhbCB3aXRoIHRoYXQgY29udGV4dCxcblx0ICAvLyBhbmQgcHVzaGVzIHRoZSByZXN1bHQgb2YgdGhlIGludm9jYXRpb24gYmFjay5cblx0ICBpbnZva2VQYXJ0aWFsOiBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsKGlzRHluYW1pYywgbmFtZSwgaW5kZW50KSB7XG5cdCAgICB2YXIgcGFyYW1zID0gW10sXG5cdCAgICAgICAgb3B0aW9ucyA9IHRoaXMuc2V0dXBQYXJhbXMobmFtZSwgMSwgcGFyYW1zKTtcblxuXHQgICAgaWYgKGlzRHluYW1pYykge1xuXHQgICAgICBuYW1lID0gdGhpcy5wb3BTdGFjaygpO1xuXHQgICAgICBkZWxldGUgb3B0aW9ucy5uYW1lO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoaW5kZW50KSB7XG5cdCAgICAgIG9wdGlvbnMuaW5kZW50ID0gSlNPTi5zdHJpbmdpZnkoaW5kZW50KTtcblx0ICAgIH1cblx0ICAgIG9wdGlvbnMuaGVscGVycyA9ICdoZWxwZXJzJztcblx0ICAgIG9wdGlvbnMucGFydGlhbHMgPSAncGFydGlhbHMnO1xuXHQgICAgb3B0aW9ucy5kZWNvcmF0b3JzID0gJ2NvbnRhaW5lci5kZWNvcmF0b3JzJztcblxuXHQgICAgaWYgKCFpc0R5bmFtaWMpIHtcblx0ICAgICAgcGFyYW1zLnVuc2hpZnQodGhpcy5uYW1lTG9va3VwKCdwYXJ0aWFscycsIG5hbWUsICdwYXJ0aWFsJykpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcGFyYW1zLnVuc2hpZnQobmFtZSk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcGF0KSB7XG5cdCAgICAgIG9wdGlvbnMuZGVwdGhzID0gJ2RlcHRocyc7XG5cdCAgICB9XG5cdCAgICBvcHRpb25zID0gdGhpcy5vYmplY3RMaXRlcmFsKG9wdGlvbnMpO1xuXHQgICAgcGFyYW1zLnB1c2gob3B0aW9ucyk7XG5cblx0ICAgIHRoaXMucHVzaCh0aGlzLnNvdXJjZS5mdW5jdGlvbkNhbGwoJ2NvbnRhaW5lci5pbnZva2VQYXJ0aWFsJywgJycsIHBhcmFtcykpO1xuXHQgIH0sXG5cblx0ICAvLyBbYXNzaWduVG9IYXNoXVxuXHQgIC8vXG5cdCAgLy8gT24gc3RhY2ssIGJlZm9yZTogdmFsdWUsIC4uLiwgaGFzaCwgLi4uXG5cdCAgLy8gT24gc3RhY2ssIGFmdGVyOiAuLi4sIGhhc2gsIC4uLlxuXHQgIC8vXG5cdCAgLy8gUG9wcyBhIHZhbHVlIG9mZiB0aGUgc3RhY2sgYW5kIGFzc2lnbnMgaXQgdG8gdGhlIGN1cnJlbnQgaGFzaFxuXHQgIGFzc2lnblRvSGFzaDogZnVuY3Rpb24gYXNzaWduVG9IYXNoKGtleSkge1xuXHQgICAgdmFyIHZhbHVlID0gdGhpcy5wb3BTdGFjaygpLFxuXHQgICAgICAgIGNvbnRleHQgPSB1bmRlZmluZWQsXG5cdCAgICAgICAgdHlwZSA9IHVuZGVmaW5lZCxcblx0ICAgICAgICBpZCA9IHVuZGVmaW5lZDtcblxuXHQgICAgaWYgKHRoaXMudHJhY2tJZHMpIHtcblx0ICAgICAgaWQgPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5zdHJpbmdQYXJhbXMpIHtcblx0ICAgICAgdHlwZSA9IHRoaXMucG9wU3RhY2soKTtcblx0ICAgICAgY29udGV4dCA9IHRoaXMucG9wU3RhY2soKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGhhc2ggPSB0aGlzLmhhc2g7XG5cdCAgICBpZiAoY29udGV4dCkge1xuXHQgICAgICBoYXNoLmNvbnRleHRzW2tleV0gPSBjb250ZXh0O1xuXHQgICAgfVxuXHQgICAgaWYgKHR5cGUpIHtcblx0ICAgICAgaGFzaC50eXBlc1trZXldID0gdHlwZTtcblx0ICAgIH1cblx0ICAgIGlmIChpZCkge1xuXHQgICAgICBoYXNoLmlkc1trZXldID0gaWQ7XG5cdCAgICB9XG5cdCAgICBoYXNoLnZhbHVlc1trZXldID0gdmFsdWU7XG5cdCAgfSxcblxuXHQgIHB1c2hJZDogZnVuY3Rpb24gcHVzaElkKHR5cGUsIG5hbWUsIGNoaWxkKSB7XG5cdCAgICBpZiAodHlwZSA9PT0gJ0Jsb2NrUGFyYW0nKSB7XG5cdCAgICAgIHRoaXMucHVzaFN0YWNrTGl0ZXJhbCgnYmxvY2tQYXJhbXNbJyArIG5hbWVbMF0gKyAnXS5wYXRoWycgKyBuYW1lWzFdICsgJ10nICsgKGNoaWxkID8gJyArICcgKyBKU09OLnN0cmluZ2lmeSgnLicgKyBjaGlsZCkgOiAnJykpO1xuXHQgICAgfSBlbHNlIGlmICh0eXBlID09PSAnUGF0aEV4cHJlc3Npb24nKSB7XG5cdCAgICAgIHRoaXMucHVzaFN0cmluZyhuYW1lKTtcblx0ICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1N1YkV4cHJlc3Npb24nKSB7XG5cdCAgICAgIHRoaXMucHVzaFN0YWNrTGl0ZXJhbCgndHJ1ZScpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKCdudWxsJyk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIC8vIEhFTFBFUlNcblxuXHQgIGNvbXBpbGVyOiBKYXZhU2NyaXB0Q29tcGlsZXIsXG5cblx0ICBjb21waWxlQ2hpbGRyZW46IGZ1bmN0aW9uIGNvbXBpbGVDaGlsZHJlbihlbnZpcm9ubWVudCwgb3B0aW9ucykge1xuXHQgICAgdmFyIGNoaWxkcmVuID0gZW52aXJvbm1lbnQuY2hpbGRyZW4sXG5cdCAgICAgICAgY2hpbGQgPSB1bmRlZmluZWQsXG5cdCAgICAgICAgY29tcGlsZXIgPSB1bmRlZmluZWQ7XG5cblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG5cdCAgICAgIGNvbXBpbGVyID0gbmV3IHRoaXMuY29tcGlsZXIoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG5cblx0ICAgICAgdmFyIGV4aXN0aW5nID0gdGhpcy5tYXRjaEV4aXN0aW5nUHJvZ3JhbShjaGlsZCk7XG5cblx0ICAgICAgaWYgKGV4aXN0aW5nID09IG51bGwpIHtcblx0ICAgICAgICB0aGlzLmNvbnRleHQucHJvZ3JhbXMucHVzaCgnJyk7IC8vIFBsYWNlaG9sZGVyIHRvIHByZXZlbnQgbmFtZSBjb25mbGljdHMgZm9yIG5lc3RlZCBjaGlsZHJlblxuXHQgICAgICAgIHZhciBpbmRleCA9IHRoaXMuY29udGV4dC5wcm9ncmFtcy5sZW5ndGg7XG5cdCAgICAgICAgY2hpbGQuaW5kZXggPSBpbmRleDtcblx0ICAgICAgICBjaGlsZC5uYW1lID0gJ3Byb2dyYW0nICsgaW5kZXg7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LnByb2dyYW1zW2luZGV4XSA9IGNvbXBpbGVyLmNvbXBpbGUoY2hpbGQsIG9wdGlvbnMsIHRoaXMuY29udGV4dCwgIXRoaXMucHJlY29tcGlsZSk7XG5cdCAgICAgICAgdGhpcy5jb250ZXh0LmRlY29yYXRvcnNbaW5kZXhdID0gY29tcGlsZXIuZGVjb3JhdG9ycztcblx0ICAgICAgICB0aGlzLmNvbnRleHQuZW52aXJvbm1lbnRzW2luZGV4XSA9IGNoaWxkO1xuXG5cdCAgICAgICAgdGhpcy51c2VEZXB0aHMgPSB0aGlzLnVzZURlcHRocyB8fCBjb21waWxlci51c2VEZXB0aHM7XG5cdCAgICAgICAgdGhpcy51c2VCbG9ja1BhcmFtcyA9IHRoaXMudXNlQmxvY2tQYXJhbXMgfHwgY29tcGlsZXIudXNlQmxvY2tQYXJhbXM7XG5cdCAgICAgICAgY2hpbGQudXNlRGVwdGhzID0gdGhpcy51c2VEZXB0aHM7XG5cdCAgICAgICAgY2hpbGQudXNlQmxvY2tQYXJhbXMgPSB0aGlzLnVzZUJsb2NrUGFyYW1zO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGNoaWxkLmluZGV4ID0gZXhpc3RpbmcuaW5kZXg7XG5cdCAgICAgICAgY2hpbGQubmFtZSA9ICdwcm9ncmFtJyArIGV4aXN0aW5nLmluZGV4O1xuXG5cdCAgICAgICAgdGhpcy51c2VEZXB0aHMgPSB0aGlzLnVzZURlcHRocyB8fCBleGlzdGluZy51c2VEZXB0aHM7XG5cdCAgICAgICAgdGhpcy51c2VCbG9ja1BhcmFtcyA9IHRoaXMudXNlQmxvY2tQYXJhbXMgfHwgZXhpc3RpbmcudXNlQmxvY2tQYXJhbXM7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXHQgIG1hdGNoRXhpc3RpbmdQcm9ncmFtOiBmdW5jdGlvbiBtYXRjaEV4aXN0aW5nUHJvZ3JhbShjaGlsZCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuY29udGV4dC5lbnZpcm9ubWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgdmFyIGVudmlyb25tZW50ID0gdGhpcy5jb250ZXh0LmVudmlyb25tZW50c1tpXTtcblx0ICAgICAgaWYgKGVudmlyb25tZW50ICYmIGVudmlyb25tZW50LmVxdWFscyhjaGlsZCkpIHtcblx0ICAgICAgICByZXR1cm4gZW52aXJvbm1lbnQ7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgcHJvZ3JhbUV4cHJlc3Npb246IGZ1bmN0aW9uIHByb2dyYW1FeHByZXNzaW9uKGd1aWQpIHtcblx0ICAgIHZhciBjaGlsZCA9IHRoaXMuZW52aXJvbm1lbnQuY2hpbGRyZW5bZ3VpZF0sXG5cdCAgICAgICAgcHJvZ3JhbVBhcmFtcyA9IFtjaGlsZC5pbmRleCwgJ2RhdGEnLCBjaGlsZC5ibG9ja1BhcmFtc107XG5cblx0ICAgIGlmICh0aGlzLnVzZUJsb2NrUGFyYW1zIHx8IHRoaXMudXNlRGVwdGhzKSB7XG5cdCAgICAgIHByb2dyYW1QYXJhbXMucHVzaCgnYmxvY2tQYXJhbXMnKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnVzZURlcHRocykge1xuXHQgICAgICBwcm9ncmFtUGFyYW1zLnB1c2goJ2RlcHRocycpO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gJ2NvbnRhaW5lci5wcm9ncmFtKCcgKyBwcm9ncmFtUGFyYW1zLmpvaW4oJywgJykgKyAnKSc7XG5cdCAgfSxcblxuXHQgIHVzZVJlZ2lzdGVyOiBmdW5jdGlvbiB1c2VSZWdpc3RlcihuYW1lKSB7XG5cdCAgICBpZiAoIXRoaXMucmVnaXN0ZXJzW25hbWVdKSB7XG5cdCAgICAgIHRoaXMucmVnaXN0ZXJzW25hbWVdID0gdHJ1ZTtcblx0ICAgICAgdGhpcy5yZWdpc3RlcnMubGlzdC5wdXNoKG5hbWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBwdXNoOiBmdW5jdGlvbiBwdXNoKGV4cHIpIHtcblx0ICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBMaXRlcmFsKSkge1xuXHQgICAgICBleHByID0gdGhpcy5zb3VyY2Uud3JhcChleHByKTtcblx0ICAgIH1cblxuXHQgICAgdGhpcy5pbmxpbmVTdGFjay5wdXNoKGV4cHIpO1xuXHQgICAgcmV0dXJuIGV4cHI7XG5cdCAgfSxcblxuXHQgIHB1c2hTdGFja0xpdGVyYWw6IGZ1bmN0aW9uIHB1c2hTdGFja0xpdGVyYWwoaXRlbSkge1xuXHQgICAgdGhpcy5wdXNoKG5ldyBMaXRlcmFsKGl0ZW0pKTtcblx0ICB9LFxuXG5cdCAgcHVzaFNvdXJjZTogZnVuY3Rpb24gcHVzaFNvdXJjZShzb3VyY2UpIHtcblx0ICAgIGlmICh0aGlzLnBlbmRpbmdDb250ZW50KSB7XG5cdCAgICAgIHRoaXMuc291cmNlLnB1c2godGhpcy5hcHBlbmRUb0J1ZmZlcih0aGlzLnNvdXJjZS5xdW90ZWRTdHJpbmcodGhpcy5wZW5kaW5nQ29udGVudCksIHRoaXMucGVuZGluZ0xvY2F0aW9uKSk7XG5cdCAgICAgIHRoaXMucGVuZGluZ0NvbnRlbnQgPSB1bmRlZmluZWQ7XG5cdCAgICB9XG5cblx0ICAgIGlmIChzb3VyY2UpIHtcblx0ICAgICAgdGhpcy5zb3VyY2UucHVzaChzb3VyY2UpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICByZXBsYWNlU3RhY2s6IGZ1bmN0aW9uIHJlcGxhY2VTdGFjayhjYWxsYmFjaykge1xuXHQgICAgdmFyIHByZWZpeCA9IFsnKCddLFxuXHQgICAgICAgIHN0YWNrID0gdW5kZWZpbmVkLFxuXHQgICAgICAgIGNyZWF0ZWRTdGFjayA9IHVuZGVmaW5lZCxcblx0ICAgICAgICB1c2VkTGl0ZXJhbCA9IHVuZGVmaW5lZDtcblxuXHQgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0ICAgIGlmICghdGhpcy5pc0lubGluZSgpKSB7XG5cdCAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdyZXBsYWNlU3RhY2sgb24gbm9uLWlubGluZScpO1xuXHQgICAgfVxuXG5cdCAgICAvLyBXZSB3YW50IHRvIG1lcmdlIHRoZSBpbmxpbmUgc3RhdGVtZW50IGludG8gdGhlIHJlcGxhY2VtZW50IHN0YXRlbWVudCB2aWEgJywnXG5cdCAgICB2YXIgdG9wID0gdGhpcy5wb3BTdGFjayh0cnVlKTtcblxuXHQgICAgaWYgKHRvcCBpbnN0YW5jZW9mIExpdGVyYWwpIHtcblx0ICAgICAgLy8gTGl0ZXJhbHMgZG8gbm90IG5lZWQgdG8gYmUgaW5saW5lZFxuXHQgICAgICBzdGFjayA9IFt0b3AudmFsdWVdO1xuXHQgICAgICBwcmVmaXggPSBbJygnLCBzdGFja107XG5cdCAgICAgIHVzZWRMaXRlcmFsID0gdHJ1ZTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIEdldCBvciBjcmVhdGUgdGhlIGN1cnJlbnQgc3RhY2sgbmFtZSBmb3IgdXNlIGJ5IHRoZSBpbmxpbmVcblx0ICAgICAgY3JlYXRlZFN0YWNrID0gdHJ1ZTtcblx0ICAgICAgdmFyIF9uYW1lID0gdGhpcy5pbmNyU3RhY2soKTtcblxuXHQgICAgICBwcmVmaXggPSBbJygoJywgdGhpcy5wdXNoKF9uYW1lKSwgJyA9ICcsIHRvcCwgJyknXTtcblx0ICAgICAgc3RhY2sgPSB0aGlzLnRvcFN0YWNrKCk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBpdGVtID0gY2FsbGJhY2suY2FsbCh0aGlzLCBzdGFjayk7XG5cblx0ICAgIGlmICghdXNlZExpdGVyYWwpIHtcblx0ICAgICAgdGhpcy5wb3BTdGFjaygpO1xuXHQgICAgfVxuXHQgICAgaWYgKGNyZWF0ZWRTdGFjaykge1xuXHQgICAgICB0aGlzLnN0YWNrU2xvdC0tO1xuXHQgICAgfVxuXHQgICAgdGhpcy5wdXNoKHByZWZpeC5jb25jYXQoaXRlbSwgJyknKSk7XG5cdCAgfSxcblxuXHQgIGluY3JTdGFjazogZnVuY3Rpb24gaW5jclN0YWNrKCkge1xuXHQgICAgdGhpcy5zdGFja1Nsb3QrKztcblx0ICAgIGlmICh0aGlzLnN0YWNrU2xvdCA+IHRoaXMuc3RhY2tWYXJzLmxlbmd0aCkge1xuXHQgICAgICB0aGlzLnN0YWNrVmFycy5wdXNoKCdzdGFjaycgKyB0aGlzLnN0YWNrU2xvdCk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcy50b3BTdGFja05hbWUoKTtcblx0ICB9LFxuXHQgIHRvcFN0YWNrTmFtZTogZnVuY3Rpb24gdG9wU3RhY2tOYW1lKCkge1xuXHQgICAgcmV0dXJuICdzdGFjaycgKyB0aGlzLnN0YWNrU2xvdDtcblx0ICB9LFxuXHQgIGZsdXNoSW5saW5lOiBmdW5jdGlvbiBmbHVzaElubGluZSgpIHtcblx0ICAgIHZhciBpbmxpbmVTdGFjayA9IHRoaXMuaW5saW5lU3RhY2s7XG5cdCAgICB0aGlzLmlubGluZVN0YWNrID0gW107XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaW5saW5lU3RhY2subGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgdmFyIGVudHJ5ID0gaW5saW5lU3RhY2tbaV07XG5cdCAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuXHQgICAgICBpZiAoZW50cnkgaW5zdGFuY2VvZiBMaXRlcmFsKSB7XG5cdCAgICAgICAgdGhpcy5jb21waWxlU3RhY2sucHVzaChlbnRyeSk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHN0YWNrID0gdGhpcy5pbmNyU3RhY2soKTtcblx0ICAgICAgICB0aGlzLnB1c2hTb3VyY2UoW3N0YWNrLCAnID0gJywgZW50cnksICc7J10pO1xuXHQgICAgICAgIHRoaXMuY29tcGlsZVN0YWNrLnB1c2goc3RhY2spO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblx0ICBpc0lubGluZTogZnVuY3Rpb24gaXNJbmxpbmUoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5pbmxpbmVTdGFjay5sZW5ndGg7XG5cdCAgfSxcblxuXHQgIHBvcFN0YWNrOiBmdW5jdGlvbiBwb3BTdGFjayh3cmFwcGVkKSB7XG5cdCAgICB2YXIgaW5saW5lID0gdGhpcy5pc0lubGluZSgpLFxuXHQgICAgICAgIGl0ZW0gPSAoaW5saW5lID8gdGhpcy5pbmxpbmVTdGFjayA6IHRoaXMuY29tcGlsZVN0YWNrKS5wb3AoKTtcblxuXHQgICAgaWYgKCF3cmFwcGVkICYmIGl0ZW0gaW5zdGFuY2VvZiBMaXRlcmFsKSB7XG5cdCAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKCFpbmxpbmUpIHtcblx0ICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgICAgICAgIGlmICghdGhpcy5zdGFja1Nsb3QpIHtcblx0ICAgICAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdJbnZhbGlkIHN0YWNrIHBvcCcpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLnN0YWNrU2xvdC0tO1xuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBpdGVtO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICB0b3BTdGFjazogZnVuY3Rpb24gdG9wU3RhY2soKSB7XG5cdCAgICB2YXIgc3RhY2sgPSB0aGlzLmlzSW5saW5lKCkgPyB0aGlzLmlubGluZVN0YWNrIDogdGhpcy5jb21waWxlU3RhY2ssXG5cdCAgICAgICAgaXRlbSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXG5cdCAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cblx0ICAgIGlmIChpdGVtIGluc3RhbmNlb2YgTGl0ZXJhbCkge1xuXHQgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJldHVybiBpdGVtO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBjb250ZXh0TmFtZTogZnVuY3Rpb24gY29udGV4dE5hbWUoY29udGV4dCkge1xuXHQgICAgaWYgKHRoaXMudXNlRGVwdGhzICYmIGNvbnRleHQpIHtcblx0ICAgICAgcmV0dXJuICdkZXB0aHNbJyArIGNvbnRleHQgKyAnXSc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gJ2RlcHRoJyArIGNvbnRleHQ7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIHF1b3RlZFN0cmluZzogZnVuY3Rpb24gcXVvdGVkU3RyaW5nKHN0cikge1xuXHQgICAgcmV0dXJuIHRoaXMuc291cmNlLnF1b3RlZFN0cmluZyhzdHIpO1xuXHQgIH0sXG5cblx0ICBvYmplY3RMaXRlcmFsOiBmdW5jdGlvbiBvYmplY3RMaXRlcmFsKG9iaikge1xuXHQgICAgcmV0dXJuIHRoaXMuc291cmNlLm9iamVjdExpdGVyYWwob2JqKTtcblx0ICB9LFxuXG5cdCAgYWxpYXNhYmxlOiBmdW5jdGlvbiBhbGlhc2FibGUobmFtZSkge1xuXHQgICAgdmFyIHJldCA9IHRoaXMuYWxpYXNlc1tuYW1lXTtcblx0ICAgIGlmIChyZXQpIHtcblx0ICAgICAgcmV0LnJlZmVyZW5jZUNvdW50Kys7XG5cdCAgICAgIHJldHVybiByZXQ7XG5cdCAgICB9XG5cblx0ICAgIHJldCA9IHRoaXMuYWxpYXNlc1tuYW1lXSA9IHRoaXMuc291cmNlLndyYXAobmFtZSk7XG5cdCAgICByZXQuYWxpYXNhYmxlID0gdHJ1ZTtcblx0ICAgIHJldC5yZWZlcmVuY2VDb3VudCA9IDE7XG5cblx0ICAgIHJldHVybiByZXQ7XG5cdCAgfSxcblxuXHQgIHNldHVwSGVscGVyOiBmdW5jdGlvbiBzZXR1cEhlbHBlcihwYXJhbVNpemUsIG5hbWUsIGJsb2NrSGVscGVyKSB7XG5cdCAgICB2YXIgcGFyYW1zID0gW10sXG5cdCAgICAgICAgcGFyYW1zSW5pdCA9IHRoaXMuc2V0dXBIZWxwZXJBcmdzKG5hbWUsIHBhcmFtU2l6ZSwgcGFyYW1zLCBibG9ja0hlbHBlcik7XG5cdCAgICB2YXIgZm91bmRIZWxwZXIgPSB0aGlzLm5hbWVMb29rdXAoJ2hlbHBlcnMnLCBuYW1lLCAnaGVscGVyJyksXG5cdCAgICAgICAgY2FsbENvbnRleHQgPSB0aGlzLmFsaWFzYWJsZSh0aGlzLmNvbnRleHROYW1lKDApICsgJyAhPSBudWxsID8gJyArIHRoaXMuY29udGV4dE5hbWUoMCkgKyAnIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSknKTtcblxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgcGFyYW1zOiBwYXJhbXMsXG5cdCAgICAgIHBhcmFtc0luaXQ6IHBhcmFtc0luaXQsXG5cdCAgICAgIG5hbWU6IGZvdW5kSGVscGVyLFxuXHQgICAgICBjYWxsUGFyYW1zOiBbY2FsbENvbnRleHRdLmNvbmNhdChwYXJhbXMpXG5cdCAgICB9O1xuXHQgIH0sXG5cblx0ICBzZXR1cFBhcmFtczogZnVuY3Rpb24gc2V0dXBQYXJhbXMoaGVscGVyLCBwYXJhbVNpemUsIHBhcmFtcykge1xuXHQgICAgdmFyIG9wdGlvbnMgPSB7fSxcblx0ICAgICAgICBjb250ZXh0cyA9IFtdLFxuXHQgICAgICAgIHR5cGVzID0gW10sXG5cdCAgICAgICAgaWRzID0gW10sXG5cdCAgICAgICAgb2JqZWN0QXJncyA9ICFwYXJhbXMsXG5cdCAgICAgICAgcGFyYW0gPSB1bmRlZmluZWQ7XG5cblx0ICAgIGlmIChvYmplY3RBcmdzKSB7XG5cdCAgICAgIHBhcmFtcyA9IFtdO1xuXHQgICAgfVxuXG5cdCAgICBvcHRpb25zLm5hbWUgPSB0aGlzLnF1b3RlZFN0cmluZyhoZWxwZXIpO1xuXHQgICAgb3B0aW9ucy5oYXNoID0gdGhpcy5wb3BTdGFjaygpO1xuXG5cdCAgICBpZiAodGhpcy50cmFja0lkcykge1xuXHQgICAgICBvcHRpb25zLmhhc2hJZHMgPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5zdHJpbmdQYXJhbXMpIHtcblx0ICAgICAgb3B0aW9ucy5oYXNoVHlwZXMgPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICAgIG9wdGlvbnMuaGFzaENvbnRleHRzID0gdGhpcy5wb3BTdGFjaygpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgaW52ZXJzZSA9IHRoaXMucG9wU3RhY2soKSxcblx0ICAgICAgICBwcm9ncmFtID0gdGhpcy5wb3BTdGFjaygpO1xuXG5cdCAgICAvLyBBdm9pZCBzZXR0aW5nIGZuIGFuZCBpbnZlcnNlIGlmIG5laXRoZXIgYXJlIHNldC4gVGhpcyBhbGxvd3Ncblx0ICAgIC8vIGhlbHBlcnMgdG8gZG8gYSBjaGVjayBmb3IgYGlmIChvcHRpb25zLmZuKWBcblx0ICAgIGlmIChwcm9ncmFtIHx8IGludmVyc2UpIHtcblx0ICAgICAgb3B0aW9ucy5mbiA9IHByb2dyYW0gfHwgJ2NvbnRhaW5lci5ub29wJztcblx0ICAgICAgb3B0aW9ucy5pbnZlcnNlID0gaW52ZXJzZSB8fCAnY29udGFpbmVyLm5vb3AnO1xuXHQgICAgfVxuXG5cdCAgICAvLyBUaGUgcGFyYW1ldGVycyBnbyBvbiB0byB0aGUgc3RhY2sgaW4gb3JkZXIgKG1ha2luZyBzdXJlIHRoYXQgdGhleSBhcmUgZXZhbHVhdGVkIGluIG9yZGVyKVxuXHQgICAgLy8gc28gd2UgbmVlZCB0byBwb3AgdGhlbSBvZmYgdGhlIHN0YWNrIGluIHJldmVyc2Ugb3JkZXJcblx0ICAgIHZhciBpID0gcGFyYW1TaXplO1xuXHQgICAgd2hpbGUgKGktLSkge1xuXHQgICAgICBwYXJhbSA9IHRoaXMucG9wU3RhY2soKTtcblx0ICAgICAgcGFyYW1zW2ldID0gcGFyYW07XG5cblx0ICAgICAgaWYgKHRoaXMudHJhY2tJZHMpIHtcblx0ICAgICAgICBpZHNbaV0gPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHRoaXMuc3RyaW5nUGFyYW1zKSB7XG5cdCAgICAgICAgdHlwZXNbaV0gPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICAgICAgY29udGV4dHNbaV0gPSB0aGlzLnBvcFN0YWNrKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgaWYgKG9iamVjdEFyZ3MpIHtcblx0ICAgICAgb3B0aW9ucy5hcmdzID0gdGhpcy5zb3VyY2UuZ2VuZXJhdGVBcnJheShwYXJhbXMpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAodGhpcy50cmFja0lkcykge1xuXHQgICAgICBvcHRpb25zLmlkcyA9IHRoaXMuc291cmNlLmdlbmVyYXRlQXJyYXkoaWRzKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnN0cmluZ1BhcmFtcykge1xuXHQgICAgICBvcHRpb25zLnR5cGVzID0gdGhpcy5zb3VyY2UuZ2VuZXJhdGVBcnJheSh0eXBlcyk7XG5cdCAgICAgIG9wdGlvbnMuY29udGV4dHMgPSB0aGlzLnNvdXJjZS5nZW5lcmF0ZUFycmF5KGNvbnRleHRzKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHRoaXMub3B0aW9ucy5kYXRhKSB7XG5cdCAgICAgIG9wdGlvbnMuZGF0YSA9ICdkYXRhJztcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnVzZUJsb2NrUGFyYW1zKSB7XG5cdCAgICAgIG9wdGlvbnMuYmxvY2tQYXJhbXMgPSAnYmxvY2tQYXJhbXMnO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIG9wdGlvbnM7XG5cdCAgfSxcblxuXHQgIHNldHVwSGVscGVyQXJnczogZnVuY3Rpb24gc2V0dXBIZWxwZXJBcmdzKGhlbHBlciwgcGFyYW1TaXplLCBwYXJhbXMsIHVzZVJlZ2lzdGVyKSB7XG5cdCAgICB2YXIgb3B0aW9ucyA9IHRoaXMuc2V0dXBQYXJhbXMoaGVscGVyLCBwYXJhbVNpemUsIHBhcmFtcyk7XG5cdCAgICBvcHRpb25zLmxvYyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc291cmNlLmN1cnJlbnRMb2NhdGlvbik7XG5cdCAgICBvcHRpb25zID0gdGhpcy5vYmplY3RMaXRlcmFsKG9wdGlvbnMpO1xuXHQgICAgaWYgKHVzZVJlZ2lzdGVyKSB7XG5cdCAgICAgIHRoaXMudXNlUmVnaXN0ZXIoJ29wdGlvbnMnKTtcblx0ICAgICAgcGFyYW1zLnB1c2goJ29wdGlvbnMnKTtcblx0ICAgICAgcmV0dXJuIFsnb3B0aW9ucz0nLCBvcHRpb25zXTtcblx0ICAgIH0gZWxzZSBpZiAocGFyYW1zKSB7XG5cdCAgICAgIHBhcmFtcy5wdXNoKG9wdGlvbnMpO1xuXHQgICAgICByZXR1cm4gJyc7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gb3B0aW9ucztcblx0ICAgIH1cblx0ICB9XG5cdH07XG5cblx0KGZ1bmN0aW9uICgpIHtcblx0ICB2YXIgcmVzZXJ2ZWRXb3JkcyA9ICgnYnJlYWsgZWxzZSBuZXcgdmFyJyArICcgY2FzZSBmaW5hbGx5IHJldHVybiB2b2lkJyArICcgY2F0Y2ggZm9yIHN3aXRjaCB3aGlsZScgKyAnIGNvbnRpbnVlIGZ1bmN0aW9uIHRoaXMgd2l0aCcgKyAnIGRlZmF1bHQgaWYgdGhyb3cnICsgJyBkZWxldGUgaW4gdHJ5JyArICcgZG8gaW5zdGFuY2VvZiB0eXBlb2YnICsgJyBhYnN0cmFjdCBlbnVtIGludCBzaG9ydCcgKyAnIGJvb2xlYW4gZXhwb3J0IGludGVyZmFjZSBzdGF0aWMnICsgJyBieXRlIGV4dGVuZHMgbG9uZyBzdXBlcicgKyAnIGNoYXIgZmluYWwgbmF0aXZlIHN5bmNocm9uaXplZCcgKyAnIGNsYXNzIGZsb2F0IHBhY2thZ2UgdGhyb3dzJyArICcgY29uc3QgZ290byBwcml2YXRlIHRyYW5zaWVudCcgKyAnIGRlYnVnZ2VyIGltcGxlbWVudHMgcHJvdGVjdGVkIHZvbGF0aWxlJyArICcgZG91YmxlIGltcG9ydCBwdWJsaWMgbGV0IHlpZWxkIGF3YWl0JyArICcgbnVsbCB0cnVlIGZhbHNlJykuc3BsaXQoJyAnKTtcblxuXHQgIHZhciBjb21waWxlcldvcmRzID0gSmF2YVNjcmlwdENvbXBpbGVyLlJFU0VSVkVEX1dPUkRTID0ge307XG5cblx0ICBmb3IgKHZhciBpID0gMCwgbCA9IHJlc2VydmVkV29yZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdCAgICBjb21waWxlcldvcmRzW3Jlc2VydmVkV29yZHNbaV1dID0gdHJ1ZTtcblx0ICB9XG5cdH0pKCk7XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIE1heSBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cblx0ICovXG5cdEphdmFTY3JpcHRDb21waWxlci5pc1ZhbGlkSmF2YVNjcmlwdFZhcmlhYmxlTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdCAgcmV0dXJuICFKYXZhU2NyaXB0Q29tcGlsZXIuUkVTRVJWRURfV09SRFNbbmFtZV0gJiYgL15bYS16QS1aXyRdWzAtOWEtekEtWl8kXSokLy50ZXN0KG5hbWUpO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIHN0cmljdExvb2t1cChyZXF1aXJlVGVybWluYWwsIGNvbXBpbGVyLCBwYXJ0cywgdHlwZSkge1xuXHQgIHZhciBzdGFjayA9IGNvbXBpbGVyLnBvcFN0YWNrKCksXG5cdCAgICAgIGkgPSAwLFxuXHQgICAgICBsZW4gPSBwYXJ0cy5sZW5ndGg7XG5cdCAgaWYgKHJlcXVpcmVUZXJtaW5hbCkge1xuXHQgICAgbGVuLS07XG5cdCAgfVxuXG5cdCAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuXHQgICAgc3RhY2sgPSBjb21waWxlci5uYW1lTG9va3VwKHN0YWNrLCBwYXJ0c1tpXSwgdHlwZSk7XG5cdCAgfVxuXG5cdCAgaWYgKHJlcXVpcmVUZXJtaW5hbCkge1xuXHQgICAgcmV0dXJuIFtjb21waWxlci5hbGlhc2FibGUoJ2NvbnRhaW5lci5zdHJpY3QnKSwgJygnLCBzdGFjaywgJywgJywgY29tcGlsZXIucXVvdGVkU3RyaW5nKHBhcnRzW2ldKSwgJywgJywgSlNPTi5zdHJpbmdpZnkoY29tcGlsZXIuc291cmNlLmN1cnJlbnRMb2NhdGlvbiksICcgKSddO1xuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gc3RhY2s7XG5cdCAgfVxuXHR9XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gSmF2YVNjcmlwdENvbXBpbGVyO1xuXHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuLyoqKi8gfSksXG4vKiA1MyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qIGdsb2JhbCBkZWZpbmUgKi9cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfT2JqZWN0JGtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKVsnZGVmYXVsdCddO1xuXG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cblx0dmFyIF91dGlscyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIFNvdXJjZU5vZGUgPSB1bmRlZmluZWQ7XG5cblx0dHJ5IHtcblx0ICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHQgIGlmIChmYWxzZSkge1xuXHQgICAgLy8gV2UgZG9uJ3Qgc3VwcG9ydCB0aGlzIGluIEFNRCBlbnZpcm9ubWVudHMuIEZvciB0aGVzZSBlbnZpcm9ubWVudHMsIHdlIGFzdXNtZSB0aGF0XG5cdCAgICAvLyB0aGV5IGFyZSBydW5uaW5nIG9uIHRoZSBicm93c2VyIGFuZCB0aHVzIGhhdmUgbm8gbmVlZCBmb3IgdGhlIHNvdXJjZS1tYXAgbGlicmFyeS5cblx0ICAgIHZhciBTb3VyY2VNYXAgPSByZXF1aXJlKCdzb3VyY2UtbWFwJyk7XG5cdCAgICBTb3VyY2VOb2RlID0gU291cmNlTWFwLlNvdXJjZU5vZGU7XG5cdCAgfVxuXHR9IGNhdGNoIChlcnIpIHt9XG5cdC8qIE5PUCAqL1xuXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBpZjogdGVzdGVkIGJ1dCBub3QgY292ZXJlZCBpbiBpc3RhbmJ1bCBkdWUgdG8gZGlzdCBidWlsZCAgKi9cblx0aWYgKCFTb3VyY2VOb2RlKSB7XG5cdCAgU291cmNlTm9kZSA9IGZ1bmN0aW9uIChsaW5lLCBjb2x1bW4sIHNyY0ZpbGUsIGNodW5rcykge1xuXHQgICAgdGhpcy5zcmMgPSAnJztcblx0ICAgIGlmIChjaHVua3MpIHtcblx0ICAgICAgdGhpcy5hZGQoY2h1bmtzKTtcblx0ICAgIH1cblx0ICB9O1xuXHQgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdCAgU291cmNlTm9kZS5wcm90b3R5cGUgPSB7XG5cdCAgICBhZGQ6IGZ1bmN0aW9uIGFkZChjaHVua3MpIHtcblx0ICAgICAgaWYgKF91dGlscy5pc0FycmF5KGNodW5rcykpIHtcblx0ICAgICAgICBjaHVua3MgPSBjaHVua3Muam9pbignJyk7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5zcmMgKz0gY2h1bmtzO1xuXHQgICAgfSxcblx0ICAgIHByZXBlbmQ6IGZ1bmN0aW9uIHByZXBlbmQoY2h1bmtzKSB7XG5cdCAgICAgIGlmIChfdXRpbHMuaXNBcnJheShjaHVua3MpKSB7XG5cdCAgICAgICAgY2h1bmtzID0gY2h1bmtzLmpvaW4oJycpO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuc3JjID0gY2h1bmtzICsgdGhpcy5zcmM7XG5cdCAgICB9LFxuXHQgICAgdG9TdHJpbmdXaXRoU291cmNlTWFwOiBmdW5jdGlvbiB0b1N0cmluZ1dpdGhTb3VyY2VNYXAoKSB7XG5cdCAgICAgIHJldHVybiB7IGNvZGU6IHRoaXMudG9TdHJpbmcoKSB9O1xuXHQgICAgfSxcblx0ICAgIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0ICAgICAgcmV0dXJuIHRoaXMuc3JjO1xuXHQgICAgfVxuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjYXN0Q2h1bmsoY2h1bmssIGNvZGVHZW4sIGxvYykge1xuXHQgIGlmIChfdXRpbHMuaXNBcnJheShjaHVuaykpIHtcblx0ICAgIHZhciByZXQgPSBbXTtcblxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNodW5rLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdCAgICAgIHJldC5wdXNoKGNvZGVHZW4ud3JhcChjaHVua1tpXSwgbG9jKSk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmV0O1xuXHQgIH0gZWxzZSBpZiAodHlwZW9mIGNodW5rID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIGNodW5rID09PSAnbnVtYmVyJykge1xuXHQgICAgLy8gSGFuZGxlIHByaW1pdGl2ZXMgdGhhdCB0aGUgU291cmNlTm9kZSB3aWxsIHRocm93IHVwIG9uXG5cdCAgICByZXR1cm4gY2h1bmsgKyAnJztcblx0ICB9XG5cdCAgcmV0dXJuIGNodW5rO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ29kZUdlbihzcmNGaWxlKSB7XG5cdCAgdGhpcy5zcmNGaWxlID0gc3JjRmlsZTtcblx0ICB0aGlzLnNvdXJjZSA9IFtdO1xuXHR9XG5cblx0Q29kZUdlbi5wcm90b3R5cGUgPSB7XG5cdCAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcblx0ICAgIHJldHVybiAhdGhpcy5zb3VyY2UubGVuZ3RoO1xuXHQgIH0sXG5cdCAgcHJlcGVuZDogZnVuY3Rpb24gcHJlcGVuZChzb3VyY2UsIGxvYykge1xuXHQgICAgdGhpcy5zb3VyY2UudW5zaGlmdCh0aGlzLndyYXAoc291cmNlLCBsb2MpKTtcblx0ICB9LFxuXHQgIHB1c2g6IGZ1bmN0aW9uIHB1c2goc291cmNlLCBsb2MpIHtcblx0ICAgIHRoaXMuc291cmNlLnB1c2godGhpcy53cmFwKHNvdXJjZSwgbG9jKSk7XG5cdCAgfSxcblxuXHQgIG1lcmdlOiBmdW5jdGlvbiBtZXJnZSgpIHtcblx0ICAgIHZhciBzb3VyY2UgPSB0aGlzLmVtcHR5KCk7XG5cdCAgICB0aGlzLmVhY2goZnVuY3Rpb24gKGxpbmUpIHtcblx0ICAgICAgc291cmNlLmFkZChbJyAgJywgbGluZSwgJ1xcbiddKTtcblx0ICAgIH0pO1xuXHQgICAgcmV0dXJuIHNvdXJjZTtcblx0ICB9LFxuXG5cdCAgZWFjaDogZnVuY3Rpb24gZWFjaChpdGVyKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5zb3VyY2UubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaXRlcih0aGlzLnNvdXJjZVtpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcblx0ICAgIHZhciBsb2MgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbiB8fCB7IHN0YXJ0OiB7fSB9O1xuXHQgICAgcmV0dXJuIG5ldyBTb3VyY2VOb2RlKGxvYy5zdGFydC5saW5lLCBsb2Muc3RhcnQuY29sdW1uLCB0aGlzLnNyY0ZpbGUpO1xuXHQgIH0sXG5cdCAgd3JhcDogZnVuY3Rpb24gd3JhcChjaHVuaykge1xuXHQgICAgdmFyIGxvYyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHRoaXMuY3VycmVudExvY2F0aW9uIHx8IHsgc3RhcnQ6IHt9IH0gOiBhcmd1bWVudHNbMV07XG5cblx0ICAgIGlmIChjaHVuayBpbnN0YW5jZW9mIFNvdXJjZU5vZGUpIHtcblx0ICAgICAgcmV0dXJuIGNodW5rO1xuXHQgICAgfVxuXG5cdCAgICBjaHVuayA9IGNhc3RDaHVuayhjaHVuaywgdGhpcywgbG9jKTtcblxuXHQgICAgcmV0dXJuIG5ldyBTb3VyY2VOb2RlKGxvYy5zdGFydC5saW5lLCBsb2Muc3RhcnQuY29sdW1uLCB0aGlzLnNyY0ZpbGUsIGNodW5rKTtcblx0ICB9LFxuXG5cdCAgZnVuY3Rpb25DYWxsOiBmdW5jdGlvbiBmdW5jdGlvbkNhbGwoZm4sIHR5cGUsIHBhcmFtcykge1xuXHQgICAgcGFyYW1zID0gdGhpcy5nZW5lcmF0ZUxpc3QocGFyYW1zKTtcblx0ICAgIHJldHVybiB0aGlzLndyYXAoW2ZuLCB0eXBlID8gJy4nICsgdHlwZSArICcoJyA6ICcoJywgcGFyYW1zLCAnKSddKTtcblx0ICB9LFxuXG5cdCAgcXVvdGVkU3RyaW5nOiBmdW5jdGlvbiBxdW90ZWRTdHJpbmcoc3RyKSB7XG5cdCAgICByZXR1cm4gJ1wiJyArIChzdHIgKyAnJykucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9cXHUyMDI4L2csICdcXFxcdTIwMjgnKSAvLyBQZXIgRWNtYS0yNjIgNy4zICsgNy44LjRcblx0ICAgIC5yZXBsYWNlKC9cXHUyMDI5L2csICdcXFxcdTIwMjknKSArICdcIic7XG5cdCAgfSxcblxuXHQgIG9iamVjdExpdGVyYWw6IGZ1bmN0aW9uIG9iamVjdExpdGVyYWwob2JqKSB7XG5cdCAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgcGFpcnMgPSBbXTtcblxuXHQgICAgX09iamVjdCRrZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICAgIHZhciB2YWx1ZSA9IGNhc3RDaHVuayhvYmpba2V5XSwgX3RoaXMpO1xuXHQgICAgICBpZiAodmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgcGFpcnMucHVzaChbX3RoaXMucXVvdGVkU3RyaW5nKGtleSksICc6JywgdmFsdWVdKTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIHZhciByZXQgPSB0aGlzLmdlbmVyYXRlTGlzdChwYWlycyk7XG5cdCAgICByZXQucHJlcGVuZCgneycpO1xuXHQgICAgcmV0LmFkZCgnfScpO1xuXHQgICAgcmV0dXJuIHJldDtcblx0ICB9LFxuXG5cdCAgZ2VuZXJhdGVMaXN0OiBmdW5jdGlvbiBnZW5lcmF0ZUxpc3QoZW50cmllcykge1xuXHQgICAgdmFyIHJldCA9IHRoaXMuZW1wdHkoKTtcblxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGVudHJpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0ICAgICAgaWYgKGkpIHtcblx0ICAgICAgICByZXQuYWRkKCcsJyk7XG5cdCAgICAgIH1cblxuXHQgICAgICByZXQuYWRkKGNhc3RDaHVuayhlbnRyaWVzW2ldLCB0aGlzKSk7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiByZXQ7XG5cdCAgfSxcblxuXHQgIGdlbmVyYXRlQXJyYXk6IGZ1bmN0aW9uIGdlbmVyYXRlQXJyYXkoZW50cmllcykge1xuXHQgICAgdmFyIHJldCA9IHRoaXMuZ2VuZXJhdGVMaXN0KGVudHJpZXMpO1xuXHQgICAgcmV0LnByZXBlbmQoJ1snKTtcblx0ICAgIHJldC5hZGQoJ10nKTtcblxuXHQgICAgcmV0dXJuIHJldDtcblx0ICB9XG5cdH07XG5cblx0ZXhwb3J0c1snZGVmYXVsdCddID0gQ29kZUdlbjtcblx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKVxufSk7XG47IiwiLy8gTW9kdWxlXG52YXIgY29kZSA9IFwie3tjb250cm9sbGVyQ2xhc3MgJ3NlbGVjdGVkJyAoY29uY2F0IGNvbnRyb2xsZXIgJy0taXMtc2VsZWN0ZWQnKX19XFxuPGxhYmVsXFxuICAgICAgICBjbGFzcz1cXFwie3tjb250cm9sbGVyfX1fX2xhYmVsXFxcIlxcbj5cXG4gICAgPGlucHV0XFxuICAgICAgICAgICAgaWQ9XFxcImlucHV0XFxcIlxcbiAgICAgICAgICAgIGNsYXNzPVxcXCJ7e2NvbnRyb2xsZXJ9fV9faW5wdXRcXFwiXFxuICAgICAgICAgICAgdHlwZT1cXFwicmFkaW9cXFwiXFxuICAgICAgICAgICAgbmFtZT1cXFwie3tuYW1lfX1cXFwiXFxuICAgICAgICAgICAgdmFsdWU9XFxcInt7dmFsdWV9fVxcXCJcXG4gICAgICAgICAgICB7eyNpZiAoY29udHJvbGxlclZhbHVlICdjaGVja2VkJyl9fWNoZWNrZWR7ey9pZn19XFxuICAgICAgICAgICAgZGF0YS1hY3Rpb249XFxcImlucHV0LT57e2NvbnRyb2xsZXJ9fSNzZWxlY3QgZGVzZWxlY3QtPnt7Y29udHJvbGxlcn19I2Rlc2VsZWN0XFxcIlxcbiAgICAgICAgICAgIGRhdGEte3tjb250cm9sbGVyfX0tc2VsZWN0ZWQtY2xhc3M9XFxcInt7Y29udHJvbGxlcn19LS1pcy1zZWxlY3RlZFxcXCJcXG4gICAgPlxcbjwvbGFiZWw+XFxuXCI7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vcmFkaW9zLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9yYWRpb3Muc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgeyBBcHBsaWNhdGlvbiwgQ29udHJvbGxlckNvbnN0cnVjdG9yIH0gZnJvbSBcIkBob3R3aXJlZC9zdGltdWx1c1wiO1xuaW1wb3J0ICogYXMgSGFuZGxlQmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCB7IHRvQ2FtZWxDYXNlIH0gZnJvbSAnVXRpbHMvY2FtZWwtY2FzZSc7XG5cbmludGVyZmFjZSBDb250cm9sbGVyQ29uc3RydWN0b3JXaXRoQ2xhc3NlcyBleHRlbmRzIENvbnRyb2xsZXJDb25zdHJ1Y3RvciB7XG4gIGNsYXNzZXM6IEFycmF5PHN0cmluZz47XG59XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyQ29tcG9uZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICByZWFkb25seSBpZGVudGlmaWVyOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHRlbXBsYXRlOiBIYW5kbGVCYXJzLlRlbXBsYXRlO1xuICByZWFkb25seSBjb250cm9sbGVyOiBDb250cm9sbGVyQ29uc3RydWN0b3JXaXRoQ2xhc3NlcztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlckhhbmRsZUJhcnNIZWxwZXJzKCk7XG4gICAgdGhpcy5zdGFydFN0aW11bHVzTG9jYWxBcHBsaWNhdGlvbigpO1xuICAgIHRoaXMuc2V0SWRlbnRpZmllckRhdGEoKTtcbiAgICB0aGlzLnJlbmRlcklubmVySFRNTCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckhhbmRsZUJhcnNIZWxwZXJzKCkge1xuICAgIEhhbmRsZUJhcnMucmVnaXN0ZXJIZWxwZXIoJ2NvbnRyb2xsZXJWYWx1ZScsIChrZXkpID0+IHRoaXMuZ2V0VmFsdWVCeVNob3J0S2V5KGtleSkpO1xuICAgIEhhbmRsZUJhcnMucmVnaXN0ZXJIZWxwZXIoJ2NvbnRyb2xsZXJDbGFzcycsIChrZXksIGNsYXNzTmFtZSkgPT4gdGhpcy5hZGRDbGFzc0J5U2hvcnRLZXkoa2V5LCBjbGFzc05hbWUpKTtcbiAgICBIYW5kbGVCYXJzLnJlZ2lzdGVySGVscGVyKCdjb25jYXQnLCAoc3RyaW5nQSwgc3RyaW5nQikgPT4gc3RyaW5nQSArIHN0cmluZ0IpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydFN0aW11bHVzTG9jYWxBcHBsaWNhdGlvbigpIHtcbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IEFwcGxpY2F0aW9uLnN0YXJ0KHRoaXMpO1xuICAgIGFwcGxpY2F0aW9uLnJlZ2lzdGVyKHRoaXMuaWRlbnRpZmllciwgdGhpcy5jb250cm9sbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SWRlbnRpZmllckRhdGEoKSB7XG4gICAgdGhpcy5kYXRhc2V0LmNvbnRyb2xsZXIgPSB0aGlzLmlkZW50aWZpZXI7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKHRoaXMuaWRlbnRpZmllcik7XG4gIH1cblxuICBwcml2YXRlIGdldFZhbHVlQnlTaG9ydEtleShrZXk6IHN0cmluZykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZUtleSA9IGAke3RoaXMuaWRlbnRpZmllcn0tJHtrZXl9LXZhbHVlYDtcbiAgICBjb25zdCBjYW1lbENhc2VLZXkgPSB0b0NhbWVsQ2FzZShhdHRyaWJ1dGVLZXkpO1xuICAgIHJldHVybiB0aGlzLmRhdGFzZXRbY2FtZWxDYXNlS2V5XTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2xhc3NCeVNob3J0S2V5KGtleTogc3RyaW5nLCBjbGFzc05hbWU6c3RyaW5nKSB7XG4gICAgY29uc3QgYXR0cmlidXRlS2V5ID0gYCR7dGhpcy5pZGVudGlmaWVyfS0ke2tleX0tY2xhc3NgO1xuICAgIGNvbnN0IGNhbWVsQ2FzZUtleSA9IHRvQ2FtZWxDYXNlKGF0dHJpYnV0ZUtleSk7XG4gICAgdGhpcy5kYXRhc2V0W2NhbWVsQ2FzZUtleV0gPSBjbGFzc05hbWU7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcklubmVySFRNTCgpIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gSGFuZGxlQmFycy5jb21waWxlKHRoaXMudGVtcGxhdGUpKHRoaXMuZGF0YXNldCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFwcGVuZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCAnLi9yYWRpb3Muc2Nzcyc7XG5pbXBvcnQgaHRtbCBmcm9tICcuL3JhZGlvcy5oYnMnO1xuaW1wb3J0IFJhZGlvc0NvbnRyb2xsZXIgZnJvbSAnQ29udHJvbGxlcnMvaW5wdXRzL3JhZGlvc19jb250cm9sbGVyJztcbmltcG9ydCB7IENvbnRyb2xsZXJDb21wb25lbnQgfSBmcm9tICdDb21wb25lbnRzL2NvbnRyb2xsZXItY29tcG9uZW50JztcblxuZXhwb3J0IGNsYXNzIFJhZGlvcyBleHRlbmRzIENvbnRyb2xsZXJDb21wb25lbnQge1xuICByZWFkb25seSBpZGVudGlmaWVyID0gJ2FwLWlucHV0LXJhZGlvcyc7XG4gIHJlYWRvbmx5IHRlbXBsYXRlID0gaHRtbDtcbiAgcmVhZG9ubHkgY29udHJvbGxlciA9IFJhZGlvc0NvbnRyb2xsZXI7XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIkBob3R3aXJlZC9zdGltdWx1c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIHN0YXRpYyB2YWx1ZXMgPSB7XG4gICAgdG9wOiBTdHJpbmcsXG4gICAgbGVmdDogU3RyaW5nLFxuICAgIHdpZHRoOiBTdHJpbmcsXG4gICAgaGVpZ2h0OiBTdHJpbmcsXG4gICAgY2hlY2tlZDogU3RyaW5nLFxuICB9XG4gIHByaXZhdGUgY2hlY2tlZFZhbHVlOiBzdHJpbmc7XG4gIHN0YXRpYyBjbGFzc2VzID0gWyAnc2VsZWN0ZWQnIF07XG4gIHByaXZhdGUgc2VsZWN0ZWRDbGFzczogc3RyaW5nO1xuICBwcml2YXRlIHNlbGVjdGVkQ2xhc3Nlczogc3RyaW5nO1xuXG4gIGNvbm5lY3QoKSB7XG4gIH1cblxuICB0b3BWYWx1ZUNoYW5nZWQodmFsdWU6IHN0cmluZykge1xuICAgICh0aGlzLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRvcCA9IHZhbHVlO1xuICB9XG5cbiAgbGVmdFZhbHVlQ2hhbmdlZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKHRoaXMuZWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUubGVmdCA9IHZhbHVlO1xuICB9XG5cbiAgd2lkdGhWYWx1ZUNoYW5nZWQodmFsdWU6IHN0cmluZykge1xuICAgICh0aGlzLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLndpZHRoID0gdmFsdWU7XG4gIH1cblxuICBoZWlnaHRWYWx1ZUNoYW5nZWQodmFsdWU6IHN0cmluZykge1xuICAgICh0aGlzLmVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmhlaWdodCA9IHZhbHVlO1xuICB9XG5cbiAgY2hlY2tlZFZhbHVlQ2hhbmdlZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNlbGVjdGVkQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdChldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3RoaXMuZWxlbWVudC50YWdOYW1lfSBbbmFtZT0nJHtpbnB1dEVsZW1lbnQubmFtZX0nXTpub3QoOmNoZWNrZWQpYCkuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Rlc2VsZWN0JykpO1xuICAgIHRoaXMuY2hlY2tlZFZhbHVlID0gJ29uJztcbiAgfVxuXG4gIGRlc2VsZWN0KGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2hlY2tlZFZhbHVlID0gJyc7XG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHJpbmc6IHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXpBLVowLTldKyguKS9nLCAobSwgY2hyKSA9PiBjaHIudG9VcHBlckNhc2UoKSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUmFkaW9zIH0gZnJvbSAnQ29tcG9uZW50cy9yYWRpb3MvcmFkaW9zJztcblxuZXhwb3J0IHsgUmFkaW9zIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=