"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class for handling cli commands
 */
var CommandEmitter = /** @class */ (function () {
    function CommandEmitter() {
        this.commandMap = new Map();
    }
    /**
     * Public method to set a command
     * @param atlas command atlas
     * @param handle function called when command is emiited
     * @returns the `CommandEmiiter` instance
     */
    CommandEmitter.prototype.on = function (atlas, handle) {
        var _this = this;
        atlas.forEach(function (command) {
            _this.commandMap.set(command, handle);
        });
        return this;
    };
    /**
     * Public method to emit a command of the `CommandEmiiter` instance
     * @param command command to emit
     * @param args arguments to emit the commend with
     * @returns the `CommandEmiiter` instance
     */
    CommandEmitter.prototype.emit = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.commandMap.has(command))
            this.commandMap.get(command).apply(null, args);
        return this;
    };
    /**
     * Public method to check if the `CommandEmiiter` instance has the command
     * @param command command to check if the `CommandEmiiter` instance has
     * @returns return `true` if the `CommandEmiiter` instance has the command otherwise return `false`
     */
    CommandEmitter.prototype.has = function (command) {
        return this.commandMap.has(command);
    };
    return CommandEmitter;
}());
exports.default = CommandEmitter;
