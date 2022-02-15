/**
 * Utility to use AXIOS to send HTTP requests
 */
const Log = require('./customLogs')
const axios = require('axios').default
axios.defaults.baseURL = 'https://www.foaas.com/'
axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
}
axios.defaults.timeout = 10000

async function sendGet(uri) {
    Log.step(`Sending GET request to FOAAS resource: [${uri}]...`)
    try {
        const resp = await axios.get(uri)
        Log.step('Retrieved response...')
        return resp 
    } catch(e) {
        Log.failure(e)
    }
}

module.exports = {
    sendGet,
}