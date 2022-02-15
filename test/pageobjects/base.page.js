const Log = require('../utils/customLogs')

/**
* Base page... Nothing fancy!
*/
module.exports = class Page {
    
    /**
    * Opens a webpage based on the path given.
    * Takes the baseUrl (wdio config) into account.
    * @param {String} path - Path of the sub page
    */
    open(path) {
        Log.note(`Attempting to open ${browser.config.baseUrl}${path}`)
        browser.url(`/${path}`)
    }
}
