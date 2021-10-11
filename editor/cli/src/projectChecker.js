"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var cliMessage_1 = __importDefault(require("../libs/cliMessage"));
/**
 * Function to check if the project assets and characters exist
 * @param projectData Javascript object containing the project data
 * @returns Javascript object containing the project data
 */
var projectChecker = function (projectData) {
    if ("dependencies" in projectData && "assets" in projectData.dependencies) {
        for (var name_1 in projectData.dependencies.assets) {
            var asset = projectData.dependencies.assets[name_1];
            if ((0, fs_1.existsSync)(asset.path)) {
                (0, cliMessage_1.default)({
                    type: "success",
                    message: "file '" + (0, path_1.parse)(asset.path).base + "' found in -> " + (0, path_1.parse)(asset.path).dir
                });
            }
            else {
                (0, cliMessage_1.default)({
                    type: "error",
                    message: "file '" + (0, path_1.parse)(asset.path).base + "' not found in -> " + (0, path_1.parse)(asset.path).dir
                });
                delete projectData.dependencies.assets[name_1];
            }
        }
    }
    return projectData;
};
exports.default = projectChecker;
