const Page = require('./base.page')
const Log = require('../utils/customLogs')

class LoginPage extends Page {

    //  -- SELECTORS
    get inputUsername() {
        return $('#username')
    }

    get inputPassword() {
        return $('#password')
    }

    get btnSubmit() {
        return $('button[type="submit"]')
    }

    get flashAlert() {
        return $('#flash')
    }

    /**
     * Login with credentials.
     * @param {String} username - The username to use.
     * @param {String} password - The password to use.
     */
    login (username, password) {
        Log.info(`Attempting to login as ${username}`)
        this.inputUsername.setValue(username)
        this.inputPassword.setValue(password)
        this.btnSubmit.click()
    }

    /**
     * Directly open the "Login" section.
     */
    open() {
        return super.open('login')
    }
}

module.exports = new LoginPage()
