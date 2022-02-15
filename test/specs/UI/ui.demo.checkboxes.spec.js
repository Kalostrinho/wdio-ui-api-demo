const CheckboxPage = require('../../pageobjects/checkbox.page')
const Log = require('../../utils/customLogs')

describe('=> UI CHECKBOXES TESTS', () => {

    it('should validate default states of available checkboxes', () => {
        CheckboxPage.open()
        Log.step('Validating checkboxes exist...')
        expect(CheckboxPage.checkOne).toBeExisting()
        expect(CheckboxPage.checkTwo).toBeExisting()
        Log.step('Validating default state of these checkboxes...')
        expect(CheckboxPage.checkOne).not.toBeChecked()
        expect(CheckboxPage.checkTwo).toBeChecked()
        Log.success('Successfully validated!')
    })
    
    it('should check all available checkboxes', () => {
        CheckboxPage.open()
        Log.step('Validating checkboxes exist...')
        expect(CheckboxPage.checkOne).toBeExisting()
        expect(CheckboxPage.checkTwo).toBeExisting()
        CheckboxPage.checkAll()
        Log.step('Validating state of these checkboxes after "checking" them all...')
        expect(CheckboxPage.checkOne).toBeChecked()
        expect(CheckboxPage.checkTwo).toBeChecked()
        Log.success('Successfully validated!')
    })

    it('should uncheck all available checkboxes', () => {
        CheckboxPage.open()
        Log.step('Validating checkboxes exist...')
        expect(CheckboxPage.checkOne).toBeExisting()
        expect(CheckboxPage.checkTwo).toBeExisting()
        CheckboxPage.uncheckAll()
        Log.step('Validating state of these checkboxes after "checking" them all...')
        expect(CheckboxPage.checkOne).not.toBeChecked()
        expect(CheckboxPage.checkTwo).not.toBeChecked()
        Log.success('Successfully validated!')
    })

})


