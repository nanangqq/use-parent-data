"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useParentDataParent = exports.useParentDataChild = void 0;
var react_1 = require("react");
/**
 * get data from parent
 * @param targetOrigin - target origin, default '*'
 * @returns data from parent
 * @param T_parentData - type of data from parent, default any
 */
var useParentDataChild = function (targetOrigin) {
    if (targetOrigin === void 0) { targetOrigin = '*'; }
    var _a = __read((0, react_1.useState)({}), 2), parentData = _a[0], setParentData = _a[1];
    (0, react_1.useEffect)(function () {
        var parent = window.parent;
        if (!parent) {
            return function () { };
        }
        parent.postMessage('child-ready', targetOrigin);
        var handleParentData = function (event) {
            setParentData(event.data);
        };
        window.addEventListener('message', handleParentData);
        return function () {
            window.removeEventListener('message', handleParentData);
        };
    }, []);
    return { parentData: parentData };
};
exports.useParentDataChild = useParentDataChild;
/**
 * send data to child when child is ready
 * @param data - data sending to child
 * @param iframeRef - iframe ref
 * @param targetOrigin - target origin, default '*'
 * @param T_data - type of data sending to child, default any
 */
var useParentDataParent = function (_a) {
    var data = _a.data, iframeRef = _a.iframeRef, _b = _a.targetOrigin, targetOrigin = _b === void 0 ? '*' : _b;
    (0, react_1.useEffect)(function () {
        var childReadyMessageHandler = function (event) {
            var _a;
            if (event.data === 'child-ready') {
                if (iframeRef.current) {
                    (_a = iframeRef.current.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(data, targetOrigin);
                }
                window.removeEventListener('message', childReadyMessageHandler);
            }
        };
        window.addEventListener('message', childReadyMessageHandler);
        return function () {
            window.removeEventListener('message', childReadyMessageHandler);
        };
    }, [data, iframeRef]);
};
exports.useParentDataParent = useParentDataParent;
