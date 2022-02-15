
const Log = require('../../utils/customLogs')
const req = require('../../utils/foaas.requests')

describe('=> API FOAAS TESTS', () => {

    it('should send a "harmless" GET request', async () => {
        const res = await req.sendGet('/version')
        Log.step('Validating response status...')
        expect(res.status).toBe(200)
        expect(res.statusText).toContain('OK')
        Log.step('Validating response data schema...')
        expect(res.data).toHaveAttribute('message')
        expect(res.data).toHaveAttribute('subtitle')
        Log.note(`Response: ${res.status} ${res.statusText} - ${JSON.stringify(res.data)}`)
        Log.success('Successfully validated!')
    })

    it('should send an "I would say no" GET request', async () => {
        const res = await req.sendGet('/absolutely/John/Jimmy')
        Log.step('Validating response status...')
        expect(res.status).toBe(200)
        expect(res.statusText).toContain('OK')
        Log.step('Validating response data schema...')
        expect(res.data).toHaveAttribute('message')
        expect(res.data).toHaveAttribute('subtitle')
        Log.step('Validating response data itself...')
        expect(res.data.message).toHaveTextContaining('John')
        expect(res.data.subtitle).toHaveTextContaining('Jimmy')
        Log.note(`Response: ${res.status} ${res.statusText} - ${JSON.stringify(res.data)}`)
        Log.success('Successfully validated!')
    })

    it('should send a "Happy birthday" GET request', async () => {
        const res = await req.sendGet('/bday/Karen/Beth')
        Log.step('Validating response status...')
        expect(res.status).toBe(200)
        expect(res.statusText).toContain('OK')
        Log.step('Validating response data schema...')
        expect(res.data).toHaveAttribute('message')
        expect(res.data).toHaveAttribute('subtitle')
        Log.step('Validating response data itself...')
        expect(res.data.message).toHaveTextContaining('Karen')
        expect(res.data.subtitle).toHaveTextContaining('Beth')
        Log.note(`Response: ${res.status} ${res.statusText} - ${JSON.stringify(res.data)}`)
        Log.success('Successfully validated!')
    })

})


