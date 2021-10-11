import * as http from "http"

interface RouteOption {
    method: "GET"|"POST"|"DELETE"|"PUT",
    url: string|RegExp,
    handle: ((req:http.IncomingMessage, res:http.ServerResponse) => void)
}

export default class Router {
    private routeArray:Array<RouteOption> = Array<RouteOption>()

    /**
     * public method to add a route to your site
     * @param method server request method
     * @param url server request url
     * @param handle callback function called when this `url` is requested
     */
    public add(method:"GET"|"POST"|"DELETE"|"PUT", url:string|RegExp, handle:((req:http.IncomingMessage, res:http.ServerResponse) => void)): void {
        this.routeArray.push({
            method: method,
            url: url,
            handle: handle
        })
    }

    /**
     * public method to resolve a server request
     * @param method the server requested method
     * @param url the server requested url
     * @param req instance of IncomingMessage object
     * @param res instance of ServerResponse object
     * @returns if server request is resolve return `true` else return `false`
     */
    public resolve(method:string, url:string, req:http.IncomingMessage, res:http.ServerResponse): boolean {
        let isResolve:boolean = false
        for (const route of this.routeArray) {
            if (route.method == method && ((typeof route.url == "string" && route.url == url) || (route.url instanceof RegExp && route.url.test(url)))) {
                route.handle(req, res)
                isResolve = true
                break
            }
        }
        return isResolve
    }
}