const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dc127f6627d2f65dadd588698d44aca9&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json:true }, (error, { body}) => {  //url (shorthand syntax)
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })

}
//exporting function
module.exports = forecast