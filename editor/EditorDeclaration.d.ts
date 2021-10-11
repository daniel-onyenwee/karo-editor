export interface AssetDependenciesOption {
    /**
     * assets file path
     */
    path: string
    /**
     * assets type
     */
    type: "Image"|"Font"|"Audio"
}

export interface ProjectDataOption {
    /**
     * project name
     */
    name: string
    /**
     * project version
     */
    version: string
    /**
     * project game data
     */
    "game data": object
    /**
     * project author name
     */
    author: string
    /**
     * project directory path
     */
    directory: string
    /**
     * project assets directory path
     */
    "assets directory": string
    /**
     * project characters directory path
     */
    "characters directory": string
    /**
     * project dependencies
     */
    "dependencies": {
        /**
         * project assets
         */
        assets: {
            [name:string]: AssetDependenciesOption
        },
        /**
         * project characters
         */
        characters: {[name: string]: any}
    }
}
