/**
 * function to create a time box (e.g `[08:10:59]`) with the current time
 * @returns `string` of the created time box
 */
const timeBox = (): string => {
    let date:Date = new Date()
    let hours:string = date.getHours().toString().length == 1 ? String(`0${date.getHours()}`) : String(date.getHours())
    let minutes:string = date.getMinutes().toString().length == 1 ? String(`0${date.getMinutes()}`) : String(date.getMinutes())
    let seconds:string = date.getSeconds().toString().length == 1 ? String(`0${date.getSeconds()}`) : String(date.getSeconds())
    return String(`[\x1b[90m${hours}:${minutes}:${seconds}\x1b[39m\x1b[0m]`)
}

/**
 * function to add a time box at the beginning of a `string`
 * @param message `string` to add time box
 * @returns `string` with a time box at it's beginning
 */
export const timeMessage = (message:string): string => {
    return String(`${timeBox()} ${message}`)
}

/**
 * function to change a `string` color to red
 * @param message `string` to change color 
 * @returns `string` in red color
 */
export const errorMessage = (message:string): string => {
    return String(`\x1b[31m${message}\x1b[39m\x1b[0m`)
}

/**
 * function to change a `string` color to yellow
 * @param message `string` to change color 
 * @returns `string` in yellow color
 */
export const warnMessage = (message:string): string => {
    return String(`\x1b[33m${message}\x1b[39m\x1b[0m`)
}

/**
 * function to change a `string` color to white
 * @param message `string` to change color 
 * @returns `string` in white color
 */
export const plainMessage = (message:string): string => {
    return String(`${message}`)
}

/**
 * function to change a `string` color to green
 * @param message `string` to change color 
 * @returns `string` in green color
 */
export const successMessage = (message:string): string => {
    return String(`\x1b[32m${message}\x1b[89m\x1b[0m`)
}

/**
 * @param success - to display the message in green color
 * @param plain - to display the message in white color
 * @param warn - to display the message in yellow color
 * @param error - to display the message in red color
 * @param time - to display the message with a time box (e.g `[08:10:59]`)
 * @param success-time - to display the message in green color with a time box
 * @param plain-time - to display the message in white color with a time box
 * @param warn-time - to display the message in yellow color with a time box
 * @param error-time - to display the message in red color with a time box
 */
type messageType = "success"|"plain"|"warn"|"error"|"time"|"success-time"|"plain-time"|"warn-time"|"error-time"

const print = console.log

interface messageOption { 
    /**
     * type of message to display
     */
    type:messageType
    /**
     * message to display
     */
    message:any 
}

export default (option:messageOption): void => {
    const { type, message } = option
    if (type == "error")
        print(errorMessage(String(message)))
    else if (type == "warn")
        print(warnMessage(String(message)))
    else if (type == "success")
        print(successMessage(String(message)))
    else if (type == "plain")
        print(plainMessage(String(message)))
    else if (type == "time")
        print(timeMessage(String(message)))
    else if (type == "error-time")
        print(timeMessage(errorMessage(String(message))))
    else if (type == "plain-time")
        print(timeMessage(plainMessage(String(message))))
    else if (type == "success-time")
        print(timeMessage(successMessage(String(message))))
    else if (type == "warn-time")
        print(timeMessage(warnMessage(String(message))))
}