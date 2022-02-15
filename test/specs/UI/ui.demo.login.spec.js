const LoginPage = require('../../pageobjects/login.page')
const credentials = require('../../utils/login.data').valid
const Log = require('../../utils/customLogs')

describe('=> UI LOGIN TESTS', () => {

    it('should login with valid credentials', () => {
        LoginPage.open()
        LoginPage.login(
            credentials.user,
            credentials.pwd
        )
        Log.step('Validating outcome after login attempt...')
        expect(LoginPage.flashAlert).toBeExisting()
        expect(LoginPage.flashAlert).toHaveTextContaining('logged into a secure area')
        Log.success('Successfully validated!')
    })
    
    it('should not allow to login with invalid credentials', () => {
        LoginPage.open()
        LoginPage.login('admin', 'admin')
        Log.step('Validating outcome after login attempt...')
        expect(LoginPage.flashAlert).toBeExisting()
        expect(LoginPage.flashAlert).toHaveTextContaining('username is invalid')
        Log.success('Successfully validated!')
    })

})


