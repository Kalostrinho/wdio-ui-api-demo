/**
 * A cool utility for logging messages to the console.
 * Usage:
 * ```
 * // - Get the module:
 * const Log = require('<path-to-customLogs>')
 * 
 * // - Log messages:
 * Log.info('This will be an informational message')
 * ```
 */

const chalk = require('chalk')
const informMe = chalk.cyanBright.bold
const noticeMe = chalk.magentaBright.bold
const warnMe = chalk.yellowBright.bold 
const passMe = chalk.greenBright.bold
const failMe = chalk.bgRedBright.yellowBright.bold 
const winkMe = chalk.bgBlue.whiteBright.bold
const shadowMe = chalk.gray.bold

/**
 * @private
 * Returns a formatted timestamp for logging purposes.
 * @returns {String} - A formatted timestamp
 */
const coolTimestamp = () => {
    const date = new Date()
    return `${date.getFullYear()}-` + 
    `${date.getMonth() + 1}`.padStart(2, '0') + '-' +
    `${date.getDate()}`.padStart(2, '0') + ' ' +
    `${date.getHours()}`.padStart(2, '0') + ':' + 
    `${date.getMinutes()}`.padStart(2, '0') + ':' +
    `${date.getSeconds()}`.padStart(2, '0')  
}

/**
 * An information message will be logged.
 * @param {String} msg - The message to log 
 */
const info = (msg) => {
    console.log(`${coolTimestamp()} ${informMe(`${'INFO'.padEnd(5)} ${msg}`)}`)
}

/**
 * An "important note" message will be logged.
 * @param {String} msg - The message to log 
 */
const note = (msg) => {
    console.log(`${coolTimestamp()} ${noticeMe(`${'NOTE'.padEnd(5)} ${msg}`)}`)
}

/**
 * A warning message will be logged.
 * @param {String} msg - The message to log 
 */
const warning = (msg) => {
    console.log(`${coolTimestamp()} ${warnMe(`${'WARN'.padEnd(5)} ${msg}`)}`)
}

/**
 * A failure message will be logged.
 * @param {String} msg - The message to log 
 */
const failure = (msg) => {
    console.log(`${coolTimestamp()} ${failMe(`${'ERROR'.padEnd(5)} ${msg}`)}`)
}

/**
 * A success message will be logged.
 * @param {String} msg - The message to log 
 */
 const success = (msg) => {
    console.log(`${coolTimestamp()} ${passMe(`${'OK!'.padEnd(5)} ${msg}`)}`)
}

/**
 * A "side note" message will be logged.
 * @param {String} msg - The message to log 
 */
const wink = (msg) => {
    console.log(`${coolTimestamp()} ${winkMe(`${'WINK'.padEnd(5)} ${msg}`)}`)
}

/**
 * A "step" message will be logged.
 * @param {String} msg - The message to log 
 */
const step = (msg) => {
    console.log(`${coolTimestamp()} ${shadowMe(`${'STEP'.padEnd(5)} ${msg}`)}`)
}

module.exports = {
    info,
    note,
    warning,
    failure,
    success,
    wink,
    step,
}