const wdioReporter = require('@wdio/reporter').default
const chalk = require('chalk')

/**
 * Helper module
 * Contains all logic for the custom reporter.
 */
module.exports = class SuperLean extends wdioReporter {
  
  /**
   * Instantiates the custom report.
   * Also, reads custom options from the config file.
   * @param {Object} options - Custom options retrieved directly from the config file
   */
  constructor (options) {
    super(options)
  }

  /**
   * Reporting hook that will be triggered when the runner ends.
   * Similar to `after` hook within the `config file`.
   * 
   * _**NOTE:** A worker is spawned for every spec file being executed._
   * _This means `runner` will only have information related to just one spec file._
   * @param {Object} runner - Working WDIO runner 
   */
  onRunnerEnd(runner) {
    const rawReport = this._obtainRaw(runner, this.suites)
    this._message(rawReport)
  }

  /* **********  **********  **********  **********  **********  
   *    PRIVATE FUNCTIONS TO ACCOMPLISH CUSTOM REPORTING
   * **********  **********  **********  **********  **********  
   */

  /**
  * @private
  * Gets an emoji depending on status.
  *   - _Valid `status` values: **passed** | (any other)_
  *   - _Valid `section` values: **test** | (any other)_
  * @param {string} status - Whether `passed` or `failed` 
  * @param {string} [section = "test"] - The section where the emoji should live. _Defaults to **`test`**.
  * @returns {string} - An emoji
  */
  _emoji(status, section = 'test') {
    switch(status.toUpperCase()){
      case "PASSED":
        return section === 'test'
          ? `✅`
          : `🏆`

      default:
        return section === 'test'
          ? `❌`
          : `🔥`
    }
  }

  /**
  * @private
  * Gets an improved array of test reported by WDIO.
  * _**Discards** useless information regarding tests executed._
  * @param {Object[]} tests - Tests executed within the suite
  * @returns {Object[]} - An improved array of object with tests information
  */
  _improvedRawTests(tests) {
    let rawTests = []
    for (const test of tests) {
      let rawTest = {}
      rawTest.state = test.state
      rawTest.duration = test._duration
      rawTest.title = test.title
      if ("error" in test){
        rawTest.error = {}
        rawTest.error.type = test.error.type
        rawTest.error.message = test.error.message
      } else if (test.state.includes('failed')) {
        rawTest.error = {}
        rawTest.error.type = 'UnknownError'
        rawTest.error.message = 'Unknown failure'
      }
      rawTests.push(rawTest)
    }
    return rawTests
  }

  /**
  * @private
  * Returns a formated list of error types.
  * _Otherwise, returns an `empty string` if all tests passed._
  * @param {Object[]} tests - Tests executed within the suite
  * @returns {string} - Formated string of failure types within the suite
  */
  _listErrors(tests){
    const failed = tests.filter(test => 'error' in test)
    const types = failed.map(m => m.error.type)
    const uniqueTypes = new Set([... types])
    const errorColor = this._reportStyle('error', 'type')
    return [... uniqueTypes].length !== 0
      ? errorColor(` (${[... uniqueTypes].join(', ')})`)
      : ''
  }

  /**
  * @private
  * This function formats outputs based on an `improved report`.
  * _Also, this function prints out the **final report** to console._
  * @param {Object} raw - The improved report object
  */
  _message(raw) {
    const indent = '   '
    const separatorColor = this._reportStyle('separator')
    const suiteColor = this._reportStyle(raw.finalState)
    const suiteEmoji = this._emoji(raw.finalState, 'suite')
    const tests = raw.tests
    this.write(separatorColor(`${'-'.repeat(50)}\n${suiteEmoji}`))
    this.write(suiteColor(` ${raw.suite}`))
    this.write(`${this._listErrors(tests)}\n`)
    tests.forEach(test => {
      const testColor = this._reportStyle(test.state, 'text')
      const msg = `${indent}${this._emoji(test.state)} - ${test.title}\n`
      this.write(testColor(msg))
      if (test.state === 'failed') {
        const errTitleColor = this._reportStyle('error')
        const errHeader = indent.repeat(3) + errTitleColor('ERROR:')
        const errMsg = testColor(test.error.message)
        this.write(`${errHeader} ${errMsg}\n`)
      }
    })
  }

  /**
  * @private
  * Gets optimal report information of the suite executed.
  * _**Discards** useless information regarding tests executed._
  * @param {Object} runner - Working WDIO runner 
  * @param {Object[]} suites - Suites executed by the runner
  * @returns {Object} - An enhanced report object of the suites executed within the worker.
  */
  _obtainRaw(runner, suites) {        
    let raw = {}
    let improvedTests = []
    const oSuite = suites[Object.keys(suites)[0]]
    const specFile= runner.specs[0]        
    improvedTests = this._improvedRawTests([... oSuite.tests])
    raw.suite = oSuite.title
    raw.tests = improvedTests
    raw.retriesLeft = runner.retries
    raw.sessionId = runner.sessionId;
    raw.spec = specFile.substring(specFile.lastIndexOf('/') + 1)        
    raw.finalState = this._result(improvedTests)
    return raw
  }

  /**
  * @private
  * Returns a style for console output.
  *   - _Valid `style` values: **passed** | **failed** | **error**_
  *   - _Valid `type` values: **title** | **text** | **type**_
  * @param {string} style - Report style
  * @param {boolean} [type = 'title'] - Type of report section. _Defaults to **`"title"`**_
  * @returns {Function} - The color style wrapper fuction
  */
  _reportStyle(style, type = 'title') {
    switch (style.toUpperCase()) {

      case "PASSED":
        switch (type.toUpperCase()) {
          case 'TITLE': return chalk.bold.greenBright 
          default: return chalk.greenBright 
        }

      case "FAILED":
        switch (type.toUpperCase()) {
          case 'TITLE': return chalk.bold.redBright  
          default: return chalk.redBright 
        }

      case "ERROR":
        switch (type.toUpperCase()) {
          case 'TITLE': return chalk.bold.bgRed.yellowBright 
          case 'TEXT': return chalk.redBright 
          case 'TYPE': return chalk.dim.italic.redBright 
        }

      default: return chalk.bold.magentaBright 
    }
  }

  /**
  * @private
  * Gets the overall result from a suite.
  * @param {Object[]} tests - Tests executed within the suite
  * @returns {string} - The status of the suite
  */
  _result(tests) {
    const failed = tests.filter(test => {
      if (test.state === 'failed') return true
    })
    return failed.length === 0 ? 'PASSED' : 'FAILED'
  }

}