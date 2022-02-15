const customReport = require('./test/utils/customReporter')
const Log = require('./test/utils/customLogs')

exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    suites: {
        ui: [ './test/specs/UI/**/*.spec.js' ],
        api: [ './test/specs/API/**/*.spec.js' ]
    },
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 3,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: [
        customReport,
        ['junit', {
            outputDir: './output',
            outputFileFormat: (opts) => { return 'results-junit.xml' } 
        }]
    ],
    mochaOpts: {
        requireModule: ['@babel/register'],
        ui: 'bdd',
        timeout: 100000
    },
    //
    // =====
    // Hooks
    // =====

    beforeTest: (test) => {
        Log.wink(`Starting [${test.title}]...`)
    },

    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        if (!passed) {
            browser.takeScreenshot();
        }
    },
}
