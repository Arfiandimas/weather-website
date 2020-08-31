const request = require('request')

const forecast = (latlong, callback) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=ad2a46fc3b004b9099c71636202508&q=${latlong}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("tidak ada koneksi", undefined)
        } else if (body.error) {
            callback('Lokasi tidak ditemukan', undefined)
        } else {
            callback(undefined, "It is currently " + body.current.temp_c + " degrees out. This high today is " + body.forecast.forecastday[0].day.maxtemp_c + " with a low of " + body.forecast.forecastday[0].day.mintemp_c + ". There is a " + body.current.precip_in + "% chance of " + body.current.condition.text)
        }
    })
}

module.exports = forecast