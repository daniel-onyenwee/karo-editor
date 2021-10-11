"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandEmitter_1 = __importDefault(require("./CommandEmitter"));
var ejs_1 = __importDefault(require("ejs"));
var server_1 = __importDefault(require("../../server"));
var path_1 = require("path");
var fs_1 = require("fs");
var cliMessage_1 = __importDefault(require("./cliMessage"));
var projectChecker_1 = __importDefault(require("../src/projectChecker"));
var projectInitializier_1 = __importDefault(require("../src/projectInitializier"));
var recentStorage_1 = __importDefault(require("../src/recentStorage"));
var KaroCli = /** @class */ (function () {
    function KaroCli() {
        var _this = this;
        this.commandEmitter = new CommandEmitter_1.default();
        this.commandEmitter
            .on(["version", "-v"], function () {
            console.log("Karo Editor version 0.0.1\nKaro Engine version 0.0.1-beta");
        })
            .on(["help", "-h"], function () {
            console.log(String()
                .concat("Karo Editor version 0.0.1\nKaro Engine version 0.0.1-beta\n")
                .concat("\nUsage: karo-editor [options]\n")
                .concat("\nOptions")
                .concat("\n   init|-i <name>                Create a project")
                .concat("\n           <name> - name of the project")
                .concat("\n   recent|-r                     Open the recent project")
                .concat("\n   open|-o                       Open the project found in current directory")
                .concat("\n   check|-c                      check if the project assets and characters exist")
                .concat("\n   help|-h                       Print usage")
                .concat("\n   version|-v                    Print version"));
        })
            .on(["open", "-o"], function (projectDir) {
            if ((0, fs_1.existsSync)((0, path_1.join)(projectDir, "game.project"))) {
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Retrieve project data from -> " + (0, path_1.join)(projectDir, "game.project")
                });
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Checking project...."
                });
                var projectData = (0, projectChecker_1.default)(JSON.parse(ejs_1.default.fileLoader((0, path_1.join)(projectDir, "game.project")).toString()));
                (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, "game.project"), JSON.stringify(projectData));
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Project checked"
                });
                _this.runEditor(projectDir, projectData);
            }
            else {
                (0, cliMessage_1.default)({
                    type: "error",
                    message: "No 'game.project' file found -> " + projectDir
                });
            }
        })
            .on(["check", "-c"], function (projectDir) {
            if ((0, fs_1.existsSync)((0, path_1.join)(projectDir, "game.project"))) {
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Retrieve project data from -> " + (0, path_1.join)(projectDir, "game.project")
                });
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Checking project...."
                });
                var projectData = (0, projectChecker_1.default)(JSON.parse(ejs_1.default.fileLoader((0, path_1.join)(projectDir, "game.project")).toString()));
                (0, fs_1.writeFileSync)((0, path_1.join)(projectDir, "game.project"), JSON.stringify(projectData));
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Project checked"
                });
            }
            else {
                (0, cliMessage_1.default)({
                    type: "error",
                    message: "No 'game.project' file found -> " + projectDir
                });
            }
        })
            .on(["recent", "-r"], function () {
            var recentProjectDir = recentStorage_1.default.get();
            if (recentProjectDir == null) {
                (0, cliMessage_1.default)({
                    type: "warn",
                    message: "No recent project have been opened"
                });
            }
            else {
                if ((0, fs_1.existsSync)((0, path_1.join)(recentProjectDir, "game.project"))) {
                    (0, cliMessage_1.default)({
                        type: "plain",
                        message: "Retrieve project data from -> " + (0, path_1.join)(recentProjectDir, "game.project")
                    });
                    (0, cliMessage_1.default)({
                        type: "plain",
                        message: "Checking project...."
                    });
                    var projectData = (0, projectChecker_1.default)(JSON.parse(ejs_1.default.fileLoader((0, path_1.join)(recentProjectDir, "game.project")).toString()));
                    (0, fs_1.writeFileSync)((0, path_1.join)(recentProjectDir, "game.project"), JSON.stringify(projectData));
                    (0, cliMessage_1.default)({
                        type: "plain",
                        message: "Project checked"
                    });
                    _this.runEditor(recentProjectDir, projectData);
                }
                else {
                    (0, cliMessage_1.default)({
                        type: "error",
                        message: "No 'game.project' file found -> " + recentProjectDir
                    });
                }
            }
        })
            .on(["init", "-i"], function (projectDir, projectName) {
            if (!(0, fs_1.existsSync)((0, path_1.join)(projectDir, "game.project"))) {
                if (projectName != undefined) {
                    (0, projectInitializier_1.default)(projectDir, projectName, function () {
                        console.log("\tType 'karo-editor' to start editor");
                    }, function () {
                        (0, cliMessage_1.default)({
                            type: "error",
                            message: "Error occur while createing project required files and directories"
                        });
                    });
                }
                else {
                    (0, cliMessage_1.default)({
                        type: "warn",
                        message: "Project name was not provided, using '" + (0, path_1.parse)(projectDir).base + "' as project name"
                    });
                    projectName = (0, path_1.parse)(projectDir).base;
                    (0, projectInitializier_1.default)(projectDir, projectName, function () {
                        console.log("\tType 'karo-editor' to start editor");
                    }, function () {
                        (0, cliMessage_1.default)({
                            type: "error",
                            message: "Error occur while createing project required files and directories"
                        });
                    });
                }
            }
            else {
                (0, cliMessage_1.default)({
                    type: "warn",
                    message: "A project already created in the directory"
                });
                console.log("\tType 'karo-editor' to start editor");
            }
        });
    }
    /**
     * Public method to run the karo editor
     * @param projectDir project path
     * @param editorData Javascript object containing the project data
     */
    KaroCli.prototype.runEditor = function (projectDir, projectData) {
        recentStorage_1.default.set(projectDir);
        (0, server_1.default)(projectData, function (req, res) {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(ejs_1.default.render(ejs_1.default.fileLoader((0, path_1.join)(__dirname, "../../", "ui/index.ejs")).toString(), projectData));
        });
    };
    /**
     * Public method to run the cli
     * @param argv argument to run cli with
     */
    KaroCli.prototype.run = function (argv) {
        var _this = this;
        if (argv.length > 2) {
            if (this.commandEmitter.has(argv[2])) {
                var args = argv.slice(3);
                this.commandEmitter.emit.apply(this.commandEmitter, __spreadArray([argv[2], process.cwd()], args, true));
            }
            else {
                console.log(String()
                    .concat("'" + argv[2] + "' is not an available command")
                    .concat("\nAvailable Commands:")
                    .concat("\n      init|-i, recent|-r, open|-o, check|-c, help|-h, version|-v"));
            }
        }
        else {
            if ((0, fs_1.existsSync)((0, path_1.join)(process.cwd(), "game.project"))) {
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Retrieve project data from -> " + (0, path_1.join)(process.cwd(), "game.project")
                });
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Checking project...."
                });
                var projectData = (0, projectChecker_1.default)(JSON.parse(ejs_1.default.fileLoader((0, path_1.join)(process.cwd(), "game.project")).toString()));
                (0, fs_1.writeFileSync)((0, path_1.join)(process.cwd(), "game.project"), JSON.stringify(projectData));
                (0, cliMessage_1.default)({
                    type: "plain",
                    message: "Project checked"
                });
                this.runEditor(process.cwd(), projectData);
            }
            else {
                (0, cliMessage_1.default)({
                    type: "warn",
                    message: "No 'game.project' file found -> " + process.cwd()
                });
                (0, projectInitializier_1.default)(process.cwd(), "New Project", function (projectData) {
                    _this.runEditor(process.cwd(), projectData);
                }, function () {
                    (0, cliMessage_1.default)({
                        type: "error",
                        message: "Error occur while createing project required files and directories"
                    });
                });
            }
        }
    };
    return KaroCli;
}());
exports.default = KaroCli;
