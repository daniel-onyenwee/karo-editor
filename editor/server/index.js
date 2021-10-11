"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var path_1 = require("path");
var cliMessage_1 = __importDefault(require("../cli/libs/cliMessage"));
var open_1 = __importDefault(require("open"));
var server_1 = __importDefault(require("./server"));
var server = new server_1.default();
server.static((0, path_1.join)(__dirname, "../", "ui/src"));
module.exports = function (projectData, editorHandle) {
    server.get("/", editorHandle);
    server.post("/getProjectData", function (req, res) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(projectData));
    });
    server.listen(8080, function () {
        (0, open_1.default)("http://localhost:8080").then(function () {
            console.log("");
            (0, cliMessage_1.default)({
                type: "success-time",
                message: "Lauching Editor at http://localhost:8080"
            });
        });
    });
};
