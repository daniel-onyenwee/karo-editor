/**
 * class for handling cli commands
 */
class CommandEmitter {
    private commandMap:Map<string, (...args:Array<string>) => void> = new Map<string, (...args:Array<string>) => void>()

    /**
     * Public method to set a command
     * @param atlas command atlas
     * @param handle function called when command is emiited
     * @returns the `CommandEmiiter` instance
     */
    public on(atlas:Array<string>, handle:(...args:Array<string>) => void): CommandEmitter {
        atlas.forEach(command => {
            this.commandMap.set(command, handle)
        })
        return this
    }

    /**
     * Public method to emit a command of the `CommandEmiiter` instance
     * @param command command to emit
     * @param args arguments to emit the commend with
     * @returns the `CommandEmiiter` instance
     */
    public emit(command:string, ...args:Array<string>): CommandEmitter {
        if (this.commandMap.has(command))
            (this.commandMap.get(command) as (...args:Array<string>) => void).apply(null, args)
        return this
    }

    /**
     * Public method to check if the `CommandEmiiter` instance has the command  
     * @param command command to check if the `CommandEmiiter` instance has
     * @returns return `true` if the `CommandEmiiter` instance has the command otherwise return `false`
     */
    public has(command:string): boolean {
        return this.commandMap.has(command)
    }
}

export default CommandEmitter