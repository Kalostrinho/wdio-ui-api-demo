const Page = require('./base.page')
const Log = require('../utils/customLogs')

class CheckboxPage extends Page {

    //  -- SELECTORS
    get checkOne() {
        return $('//input[1]')
    }

    get checkTwo() {
        return $('//input[2]')
    }

    /**
     * Checks all available checkboxes.
     */
    checkAll() {
        Log.info(`Attempting to check all checkboxes...`)
        if (!this.checkOne.isSelected()) { this.checkOne.click() }
        if (!this.checkTwo.isSelected()) { this.checkTwo.click() }
    }

    /**
     * Unchecks all available checkboxes.
     */
    uncheckAll() {
        Log.info(`Attempting to uncheck all checkboxes...`)
        if (this.checkOne.isSelected()) { this.checkOne.click() }
        if (this.checkTwo.isSelected()) { this.checkTwo.click() }
    }

    /**
     * Directly open the "Login" section.
     */
    open() {
        return super.open('checkboxes')
    }
}

module.exports = new CheckboxPage()
