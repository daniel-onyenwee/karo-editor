import { existsSync, mkdirSync, writeFileSync } from "fs"
import { join } from "path"
import { ProjectDataOption } from "../../EditorDeclaration"
import cliMessage from "../libs/cliMessage"

/**
 * Function to create a project
 * @param projectDir project directory path
 * @param projectName project name
 * @param onSuccess function called when project is created
 * @param onError function called if error occur while creating project
 */
const projectInitializier = (projectDir:string, projectName:string = "New Project", onSuccess:((projectData:ProjectDataOption) => void) = () => {}, onError:(() => void) = () => {}) => {
    cliMessage({
        type: "plain",
        message: "Createing project required files and directories"
    })
    try {  
        if (!existsSync(join(projectDir, "assets"))) {
            mkdirSync(
                join(projectDir, "assets")
            )
            cliMessage({
                type: "success",
                message: "assets folder created"
            })
        } else {
            cliMessage({
                type: "warn",
                message: "using existing assets folder -> "+join(projectDir, "assets")
            })
        }
        if (!existsSync(join(projectDir, "characters"))) {
            mkdirSync(
                join(projectDir, "characters")
            )
            cliMessage({
                type: "success",
                message: "characters folder created"
            })
        } else {
            cliMessage({
                type: "warn",
                message: "using existing characters folder -> "+join(projectDir, "assets")
            })
        }
        let projectData:ProjectDataOption = {
            name: projectName,
            directory: projectDir,
            author: "",
            dependencies: {
                assets: {},
                characters: {}
            },
            version: "0.1.0",
            "assets directory": join(projectDir, "assets"),
            "characters directory": join(projectDir, "characters"),
            "game data": {}
        }
        writeFileSync(
            join(projectDir, "game.project"),
            JSON.stringify(projectData)
        )
        cliMessage({
            type: "success",
            message: "game.project file created"
        })
        onSuccess(projectData)
    } catch (error) {
        onError() 
    }
}

export default projectInitializier