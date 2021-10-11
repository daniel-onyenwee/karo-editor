import { existsSync, writeFileSync } from "fs"
import { parse } from "path"
import cliMessage from "../libs/cliMessage"
import { ProjectDataOption, AssetDependenciesOption } from "../../EditorDeclaration"
/**
 * Function to check if the project assets and characters exist
 * @param projectData Javascript object containing the project data 
 * @returns Javascript object containing the project data
 */
const projectChecker = (projectData:ProjectDataOption): ProjectDataOption => {
    if ("dependencies" in projectData && "assets" in projectData.dependencies ) {
        for (const name in projectData.dependencies.assets) {
            let asset:AssetDependenciesOption = projectData.dependencies.assets[name]
            if (existsSync(asset.path)) {
                cliMessage({
                    type: "success",
                    message: `file '${parse(asset.path).base}' found in -> ${parse(asset.path).dir}`
                })
            } else {
                cliMessage({
                    type: "error",
                    message: `file '${parse(asset.path).base}' not found in -> ${parse(asset.path).dir}`
                })
                delete projectData.dependencies.assets[name]
            }
        }
    }
    return projectData
}

export default projectChecker