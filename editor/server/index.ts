import { IncomingMessage, ServerResponse } from "http"
import { join } from "path"
import cliMessage from "../cli/libs/cliMessage"
import open from "open"
import Server from "./server"

const server:Server = new Server()

server.static(join(__dirname, "../", "ui/src"))

export = (projectData:object, editorHandle:((req:IncomingMessage, res:ServerResponse) => void)) => {
    server.get("/", editorHandle)
    server.post("/getProjectData", (req, res) => {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify(projectData))
    })
    server.listen(8080, () => {
        open("http://localhost:8080").then(() => {
            console.log("")
            cliMessage({
                type: "success-time",
                message: `Lauching Editor at http://localhost:8080`
            })
        })
    })
}