const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2F0ZXJjaWxhIiwiYSI6ImNsZHh4YXJqeTA2bmszbnBvY3JqczhydHUifQ.HszCfvNf3crG1rSCWueJ0w&limit=1'
  
    request({ url, json: true }, (error, { body }) => {
            if (error) {
                console.log('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                console.log('Unable to find location. Try another search.', undefined)
            } else {
                callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            
                })
            }
        })
    }
//exporting function like in forecast
    module.exports = geocode