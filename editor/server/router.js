"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = /** @class */ (function () {
    function Router() {
        this.routeArray = Array();
    }
    /**
     * public method to add a route to your site
     * @param method server request method
     * @param url server request url
     * @param handle callback function called when this `url` is requested
     */
    Router.prototype.add = function (method, url, handle) {
        this.routeArray.push({
            method: method,
            url: url,
            handle: handle
        });
    };
    /**
     * public method to resolve a server request
     * @param method the server requested method
     * @param url the server requested url
     * @param req instance of IncomingMessage object
     * @param res instance of ServerResponse object
     * @returns if server request is resolve return `true` else return `false`
     */
    Router.prototype.resolve = function (method, url, req, res) {
        var isResolve = false;
        for (var _i = 0, _a = this.routeArray; _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.method == method && ((typeof route.url == "string" && route.url == url) || (route.url instanceof RegExp && route.url.test(url)))) {
                route.handle(req, res);
                isResolve = true;
                break;
            }
        }
        return isResolve;
    };
    return Router;
}());
exports.default = Router;
