"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var http = __importStar(require("http"));
var path_1 = require("path");
var getContentType_1 = __importDefault(require("./getContentType"));
var router_1 = __importDefault(require("./router"));
var Server = /** @class */ (function () {
    /**
     * class to create a http server
     */
    function Server() {
        var _this = this;
        this.router = new router_1.default();
        this.httpServer = http.createServer(function (req, res) {
            if (!_this.router.resolve(req.method, req.url, req, res)) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(req.method + " - route " + req.url + " doesn't exist");
            }
        });
    }
    /**
     * public method to add a route with server requested method "GET"
     * @param url server requested URL
     * @param handler callback function called when this `url` with GET method is requested
     */
    Server.prototype.get = function (url, handler) {
        this.router.add("GET", url, handler);
    };
    /**
     * public method to add a route with server requested method "POST"
     * @param url server requested URL
     * @param handler callback function called when this `url` with POST method is requested
     */
    Server.prototype.post = function (url, handler) {
        this.router.add("POST", url, handler);
    };
    /**
     * public method to add a route with server requested method "DELETE"
     * @param url server requested URL
     * @param handler callback function called when this `url` with DELETE method is requested
     */
    Server.prototype.delete = function (url, handler) {
        this.router.add("DELETE", url, handler);
    };
    /**
     * public method to add a route with server requested method "PUT"
     * @param url server requested URL
     * @param handler callback function called when this `url` with PUT method is requested
     */
    Server.prototype.put = function (url, handler) {
        this.router.add("PUT", url, handler);
    };
    /**
     * public method to set the site static files directory
     * @param dirpath valid path to directory
     */
    Server.prototype.static = function (dirpath) {
        if ((0, fs_1.existsSync)(dirpath)) {
            this.get(RegExp("/" + (0, path_1.parse)(dirpath).name + "/.+"), function (req, res) {
                var staticFilePath = (0, path_1.join)(dirpath, RegExp("/" + (0, path_1.parse)(dirpath).name + "/(.+)").exec(req.url)[1]);
                if ((0, fs_1.existsSync)(staticFilePath)) {
                    res.writeHead(200, { "content-type": (0, getContentType_1.default)(staticFilePath) });
                    (0, fs_1.createReadStream)(staticFilePath).pipe(res);
                }
                else {
                    res.writeHead(200, { "content-type": "text/plain" });
                    res.end("Static file " + (0, path_1.parse)(staticFilePath).base + " dosn't exist");
                }
            });
        }
    };
    /**
     * public method to start a server listening for connections
     * @param port port to listen for connection
     * @param callback callback function called when server start listening for connection
     */
    Server.prototype.listen = function (port, callback) {
        if (port === void 0) { port = 8080; }
        if (callback === void 0) { callback = (function () { }); }
        this.httpServer.listen(port, callback);
    };
    return Server;
}());
exports.default = Server;
