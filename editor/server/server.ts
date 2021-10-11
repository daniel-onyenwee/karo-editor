import { createReadStream, existsSync } from "fs"
import * as http from "http"
import { join, parse } from "path"
import getContentType from "./getContentType"
import Router from "./router"

export default class Server {
    private httpServer:http.Server

    private router:Router = new Router()

    /**
     * class to create a http server
     */
    constructor() {
        this.httpServer = http.createServer((req, res) => {
            if (!this.router.resolve((req.method as string), (req.url as string), req, res)) {
                res.writeHead(200, { 'Content-Type': 'text/plain' })
                res.end(`${(req.method as string)} - route ${(req.url as string)} doesn't exist`)
            }
        })
    }

    /**
     * public method to add a route with server requested method "GET"
     * @param url server requested URL
     * @param handler callback function called when this `url` with GET method is requested
     */
    public get(url:string|RegExp, handler:(request:http.IncomingMessage, response:http.ServerResponse) => void): void {
        this.router.add("GET", url, handler)
    }

    /**
     * public method to add a route with server requested method "POST"
     * @param url server requested URL
     * @param handler callback function called when this `url` with POST method is requested
     */
    public post(url:string|RegExp, handler:(request:http.IncomingMessage, response:http.ServerResponse)  => void): void {
        this.router.add("POST", url, handler)
    }

    /**
     * public method to add a route with server requested method "DELETE"
     * @param url server requested URL
     * @param handler callback function called when this `url` with DELETE method is requested
     */
    public delete(url:string|RegExp, handler:(request:http.IncomingMessage, response:http.ServerResponse)  => void): void {
        this.router.add("DELETE", url, handler)
    }

    /**
     * public method to add a route with server requested method "PUT"
     * @param url server requested URL
     * @param handler callback function called when this `url` with PUT method is requested
     */
    public put(url:string|RegExp, handler:(request:http.IncomingMessage, response:http.ServerResponse)  => void): void {
        this.router.add("PUT", url, handler)
    }

    /**
     * public method to set the site static files directory
     * @param dirpath valid path to directory
     */
    public static(dirpath:string): void {
        if (existsSync(dirpath)) {
            this.get(RegExp(`/${parse(dirpath).name}/.+`), (req, res) => {
                let staticFilePath:string = join(dirpath, (RegExp(`/${parse(dirpath).name}/(.+)`).exec((req.url as string)) as RegExpExecArray)[1])
                if (existsSync(staticFilePath)) {
                    res.writeHead(200, {"content-type": getContentType(staticFilePath)})
                    createReadStream(staticFilePath).pipe(res)  
                } else {
                    res.writeHead(200, {"content-type": "text/plain"})
                    res.end(`Static file ${parse(staticFilePath).base} dosn't exist`)
                }
            })
        }
    }
    
    /**
     * public method to start a server listening for connections
     * @param port port to listen for connection
     * @param callback callback function called when server start listening for connection
     */
    public listen(port:number = 8080, callback:(() => void) = (() => {})): void {
        this.httpServer.listen(port, callback)
    }
}