import CommandEmitter from "./CommandEmitter"
import ejs from "ejs"
import server from "../../server"
import { join, parse } from "path"
import { existsSync, writeFileSync, mkdirSync } from "fs"
import cliMessage from "./cliMessage"
import projectChecker from "../src/projectChecker"
import { ProjectDataOption } from "../../EditorDeclaration"
import projectInitializier from "../src/projectInitializier"
import recentStorage from "../src/recentStorage"

export default class KaroCli {
    private commandEmitter:CommandEmitter = new CommandEmitter()

    constructor() {
        this.commandEmitter
        .on(["version", "-v"], () => {
            console.log("Karo Editor version 0.0.1\nKaro Engine version 0.0.1-beta")
        })
        .on(["help", "-h"], () => {
            console.log(
                String()
                    .concat("Karo Editor version 0.0.1\nKaro Engine version 0.0.1-beta\n")
                    .concat("\nUsage: karo-editor [options]\n")
                    .concat("\nOptions")
                    .concat("\n   init|-i <name>                Create a project")
                    .concat("\n           <name> - name of the project")
                    .concat("\n   recent|-r                     Open the recent project")
                    .concat("\n   open|-o                       Open the project found in current directory")
                    .concat("\n   check|-c                      check if the project assets and characters exist")
                    .concat("\n   help|-h                       Print usage")
                    .concat("\n   version|-v                    Print version")
            )
        })
        .on(["open", "-o"], (projectDir:string) => {
            if (existsSync(join(projectDir, "game.project"))) {
                cliMessage({
                    type: "plain",
                    message: `Retrieve project data from -> ${join(projectDir, "game.project")}`
                })
                cliMessage({
                    type: "plain",
                    message: "Checking project...."
                })
                let projectData:ProjectDataOption = projectChecker(JSON.parse(ejs.fileLoader(join(projectDir, "game.project")).toString()))
                writeFileSync(join(projectDir, "game.project"), JSON.stringify(projectData))
                cliMessage({
                    type: "plain",
                    message: "Project checked"
                })
                this.runEditor(projectDir, projectData)
            } else {
                cliMessage({
                    type: "error",
                    message: "No 'game.project' file found -> "+projectDir
                })
            }
        })
        .on(["check", "-c"], (projectDir:string) => {
            if (existsSync(join(projectDir, "game.project"))) {
                cliMessage({
                    type: "plain",
                    message: `Retrieve project data from -> ${join(projectDir, "game.project")}`
                })
                cliMessage({
                    type: "plain",
                    message: "Checking project...."
                })
                let projectData:ProjectDataOption = projectChecker((JSON.parse(ejs.fileLoader(join(projectDir, "game.project")).toString()) as ProjectDataOption))
                writeFileSync(join(projectDir, "game.project"), JSON.stringify(projectData))
                cliMessage({
                    type: "plain",
                    message: "Project checked"
                })
            } else {
                cliMessage({
                    type: "error",
                    message: `No 'game.project' file found -> ${projectDir}`
                })
            }
        })
        .on(["recent", "-r"], () => {
            let recentProjectDir:string|null = recentStorage.get()
            if (recentProjectDir == null) {
                cliMessage({
                    type: "warn",
                    message: "No recent project have been opened"
                })
            } else {
                if (existsSync(join(recentProjectDir, "game.project"))) {
                    cliMessage({
                        type: "plain",
                        message: `Retrieve project data from -> ${join(recentProjectDir, "game.project")}`
                    })
                    cliMessage({
                        type: "plain",
                        message: "Checking project...."
                    })
                    let projectData:ProjectDataOption = projectChecker(JSON.parse(ejs.fileLoader(join(recentProjectDir, "game.project")).toString()))
                    writeFileSync(join(recentProjectDir, "game.project"), JSON.stringify(projectData))
                    cliMessage({
                        type: "plain",
                        message: "Project checked"
                    })
                    this.runEditor(recentProjectDir, projectData)
                } else {
                    cliMessage({
                        type: "error",
                        message: `No 'game.project' file found -> ${recentProjectDir}`
                    })
                }
            }
        })
        .on(["init", "-i"], (projectDir:string, projectName?:string) => {
            if (!existsSync(join(projectDir, "game.project"))) {
                if (projectName != undefined) {
                    projectInitializier(projectDir, projectName,
                        () => {
                            console.log("\tType 'karo-editor' to start editor")
                        },
                        () => {
                            cliMessage({
                                type: "error",
                                message: "Error occur while createing project required files and directories"
                            }) 
                        }
                    )
                } else {
                    cliMessage({
                        type: "warn",
                        message: `Project name was not provided, using '${parse(projectDir).base}' as project name`
                    })
                    projectName = parse(projectDir).base
                    projectInitializier(projectDir, projectName,
                        () => {
                            console.log("\tType 'karo-editor' to start editor")
                        },
                        () => {
                            cliMessage({
                                type: "error",
                                message: "Error occur while createing project required files and directories"
                            }) 
                        }
                    )
                }
            } else {
                cliMessage({
                    type: "warn",
                    message: "A project already created in the directory"
                })
                console.log("\tType 'karo-editor' to start editor")
            }
            
        })
    }

    /**
     * Public method to run the karo editor
     * @param projectDir project path
     * @param editorData Javascript object containing the project data
     */
    private runEditor(projectDir:string, projectData:ProjectDataOption): void {
        recentStorage.set(projectDir)
        server(
            projectData,
            (req, res) => {
                res.writeHead(200, {"content-type": "text/html"})
                res.end(
                    ejs.render(
                        ejs.fileLoader(join(__dirname, "../../", "ui/index.ejs")).toString(),
                        projectData
                    ),
                )
            },
        )
    }

    /**
     * Public method to run the cli
     * @param argv argument to run cli with
     */
    public run(argv:Array<string>): void {
        if (argv.length > 2) {
            if (this.commandEmitter.has(argv[2])) {
                let args = argv.slice(3)
                this.commandEmitter.emit.apply(this.commandEmitter, [argv[2], process.cwd(), ...args])
            } else {
                console.log(
                    String()
                        .concat(`'${argv[2]}' is not an available command`)
                        .concat("\nAvailable Commands:")
                        .concat("\n      init|-i, recent|-r, open|-o, check|-c, help|-h, version|-v")
                )
            }
        } else {
            if (existsSync(join(process.cwd(), "game.project"))) {
                cliMessage({
                    type: "plain",
                    message: `Retrieve project data from -> ${join(process.cwd(), "game.project")}`
                })
                cliMessage({
                    type: "plain",
                    message: "Checking project...."
                })
                let projectData:ProjectDataOption = projectChecker(JSON.parse(ejs.fileLoader(join(process.cwd(), "game.project")).toString()))
                writeFileSync(join(process.cwd(), "game.project"), JSON.stringify(projectData))
                cliMessage({
                    type: "plain",
                    message: "Project checked"
                })
                this.runEditor(process.cwd(), projectData)
            } else {
                cliMessage({
                    type: "warn",
                    message: "No 'game.project' file found -> "+process.cwd()
                })
                projectInitializier(process.cwd(), "New Project", 
                    (projectData) => {
                        this.runEditor(process.cwd(), projectData)
                    },
                    () => {
                        cliMessage({
                            type: "error",
                            message: "Error occur while createing project required files and directories"
                        }) 
                    }
                )
            }
        }
    }
}