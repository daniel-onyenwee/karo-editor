"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var os_1 = require("os");
var cliMessage_1 = __importDefault(require("../libs/cliMessage"));
/**
 * Javascript object to get and set the recent project
 */
var recentStorage = {
    /**
     * Property to get recent project
     * @returns return recent project path if any recent project has been open else return `null`
     */
    get: function () {
        if ((0, fs_1.existsSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json"))) {
            try {
                var data = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json"), "utf-8"));
                if ("recent project" in data)
                    return data["recent project"];
                else
                    return null;
            }
            catch (error) {
                return null;
            }
        }
        else {
            return null;
        }
    },
    /**
     * Property to set recent project
     * @param projectDir project path to set as recent project
     */
    set: function (projectDir) {
        if ((0, fs_1.existsSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor"))) {
            try {
                (0, fs_1.writeFileSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json"), JSON.stringify({
                    "recent project": projectDir
                }));
            }
            catch (error) {
                (0, cliMessage_1.default)({
                    type: "error",
                    message: "Error occur while writing to -> " + (0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json")
                });
            }
        }
        else {
            try {
                (0, fs_1.mkdirSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor"));
                (0, fs_1.writeFileSync)((0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json"), JSON.stringify({
                    "recent project": projectDir
                }));
            }
            catch (error) {
                (0, cliMessage_1.default)({
                    type: "error",
                    message: "Error occur while writing to -> " + (0, path_1.join)((0, os_1.homedir)(), ".karo-editor", "user-data.json")
                });
            }
        }
    }
};
exports.default = recentStorage;
