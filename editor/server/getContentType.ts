import { readFileSync } from "fs"
import { extname, join } from "path"

let mineDb:any = JSON.parse(readFileSync(join(__dirname, "content-type-db.json") , {encoding: "utf8"}))

export = (filePath:string):string => {
    return extname(filePath) in mineDb ? mineDb[extname(filePath)] : "text/plain"
}
