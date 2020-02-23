const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1eb98b2d2868fdf365ff49d1c46b5aea/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = `It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability}% chance of rain`
            callback(undefined, data)
        }
    })
}

module.exports = forecast