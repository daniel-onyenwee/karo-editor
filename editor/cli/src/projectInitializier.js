"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var cliMessage_1 = __importDefault(require("../libs/cliMessage"));
/**
 * Function to create a project
 * @param projectDir project directory path
 * @param projectName project name
 * @param onSuccess function called when project is created
 * @param onError function called if error occur while creating project
 */
var projectInitializier = function (projectDir, projectName, onSuccess, onError) {
    if (projectName === void 0) { projectName = "New Project"; }
    if (onSuccess === void 0) { onSuccess = function () { }; }
    if (onError === void 0) { onError = function () { }; }
    (0, cliMessage_1.default)({
        type: "plain",
        message: "Createing project required files and directories"
    });
    try {
        if (!(0, fs_1.existsSync)((0, path_1.join)(projectDir, "assets"))) {
            (0, fs_1.mkdirSync)((0, path_1.join)(projectDir, "assets"));
            (0, cliMessage_1.default)({
                type: "success",
                message: "assets folder created"
            });
        }
        else {
            (0, cliMessage_1.default)({
                type: "warn",
                message: "using existing assets folder -> " + (0, path_1.join)(projectDir, "assets")
            });
        }
        if (!(0, fs_1.existsSync)((0, path_1.join)(projectDir, "characters"))) {
            (0, fs_1.mkdirSync)((0, path_1.join)(projectDir, "characters"));
            (0, cliMessage_1.default)({
                type: "success",
                message: "characters folder created"
            });
        }
        else {
            (0, cliMessage_1.default)({
                type: "warn",
                message: "using existing characters folder -> " + (0, path_1.join)(projectDir, "assets")
            });
        }
        var projectData = {
            name: projectName,
            directory: projectDir,
            author: "",
            dependencies: {
                assets: {},
                characters: {}
            },
            version: "0.1.0",
            "assets directory": (0, path_1.join)(projectDir, "assets"),
            "characters directory": (0, path_1.join)(projectDir, "characters"),
            "game data": {}
        };
        (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, "game.project"), JSON.stringify(projectData));
        (0, cliMessage_1.default)({
            type: "success",
            message: "game.project file created"
        });
        onSuccess(projectData);
    }
    catch (error) {
        onError();
    }
};
exports.default = projectInitializier;
