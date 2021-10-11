"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successMessage = exports.plainMessage = exports.warnMessage = exports.errorMessage = exports.timeMessage = void 0;
/**
 * function to create a time box (e.g `[08:10:59]`) with the current time
 * @returns `string` of the created time box
 */
var timeBox = function () {
    var date = new Date();
    var hours = date.getHours().toString().length == 1 ? String("0" + date.getHours()) : String(date.getHours());
    var minutes = date.getMinutes().toString().length == 1 ? String("0" + date.getMinutes()) : String(date.getMinutes());
    var seconds = date.getSeconds().toString().length == 1 ? String("0" + date.getSeconds()) : String(date.getSeconds());
    return String("[\u001B[90m" + hours + ":" + minutes + ":" + seconds + "\u001B[39m\u001B[0m]");
};
/**
 * function to add a time box at the beginning of a `string`
 * @param message `string` to add time box
 * @returns `string` with a time box at it's beginning
 */
var timeMessage = function (message) {
    return String(timeBox() + " " + message);
};
exports.timeMessage = timeMessage;
/**
 * function to change a `string` color to red
 * @param message `string` to change color
 * @returns `string` in red color
 */
var errorMessage = function (message) {
    return String("\u001B[31m" + message + "\u001B[39m\u001B[0m");
};
exports.errorMessage = errorMessage;
/**
 * function to change a `string` color to yellow
 * @param message `string` to change color
 * @returns `string` in yellow color
 */
var warnMessage = function (message) {
    return String("\u001B[33m" + message + "\u001B[39m\u001B[0m");
};
exports.warnMessage = warnMessage;
/**
 * function to change a `string` color to white
 * @param message `string` to change color
 * @returns `string` in white color
 */
var plainMessage = function (message) {
    return String("" + message);
};
exports.plainMessage = plainMessage;
/**
 * function to change a `string` color to green
 * @param message `string` to change color
 * @returns `string` in green color
 */
var successMessage = function (message) {
    return String("\u001B[32m" + message + "\u001B[89m\u001B[0m");
};
exports.successMessage = successMessage;
var print = console.log;
exports.default = (function (option) {
    var type = option.type, message = option.message;
    if (type == "error")
        print((0, exports.errorMessage)(String(message)));
    else if (type == "warn")
        print((0, exports.warnMessage)(String(message)));
    else if (type == "success")
        print((0, exports.successMessage)(String(message)));
    else if (type == "plain")
        print((0, exports.plainMessage)(String(message)));
    else if (type == "time")
        print((0, exports.timeMessage)(String(message)));
    else if (type == "error-time")
        print((0, exports.timeMessage)((0, exports.errorMessage)(String(message))));
    else if (type == "plain-time")
        print((0, exports.timeMessage)((0, exports.plainMessage)(String(message))));
    else if (type == "success-time")
        print((0, exports.timeMessage)((0, exports.successMessage)(String(message))));
    else if (type == "warn-time")
        print((0, exports.timeMessage)((0, exports.warnMessage)(String(message))));
});
