import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { homedir } from "os"
import cliMessage from "../libs/cliMessage"

/**
 * Javascript object to get and set the recent project
 */
const recentStorage = {
    /**
     * Property to get recent project
     * @returns return recent project path if any recent project has been open else return `null`
     */
    get: (): string|null => {
        if (existsSync(join(homedir(), ".karo-editor", "user-data.json"))) {
            try {
                let data:{"recent project": string} = JSON.parse(readFileSync(join(homedir(), ".karo-editor", "user-data.json"), "utf-8"))
                if ("recent project" in data)
                    return data["recent project"]
                else
                    return null
            } catch (error) {
                return null   
            }
        } else {
            return null
        }
    },
    /**
     * Property to set recent project
     * @param projectDir project path to set as recent project
     */
    set: (projectDir:string): void => {
        if (existsSync(join(homedir(), ".karo-editor"))) {
            try {
                writeFileSync(join(homedir(), ".karo-editor", "user-data.json"), 
                    JSON.stringify({
                        "recent project": projectDir
                    })
                )
            } catch (error) {
                cliMessage({
                    type: "error",
                    message: `Error occur while writing to -> ${join(homedir(), ".karo-editor", "user-data.json")}`
                })
            }
        } else {
            try {
                mkdirSync(join(homedir(), ".karo-editor"))
                writeFileSync(join(homedir(), ".karo-editor", "user-data.json"), 
                    JSON.stringify({
                        "recent project": projectDir
                    })
                )
            } catch (error) {
                cliMessage({
                    type: "error",
                    message: `Error occur while writing to -> ${join(homedir(), ".karo-editor", "user-data.json")}`
                })
            }
        }
    }
}

export default recentStorage