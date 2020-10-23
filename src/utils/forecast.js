const request = require('postman-request')
const geocode = require('./geocode')
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1110c6a859cfd1e05e7bdf09581bddf&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
//&query=
    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to locate the server!')
        } else if(body.error) {
            callback('Unable to find forecast for that location!')
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + '°C'
            )
        }
    })
}

module.exports = forecast
