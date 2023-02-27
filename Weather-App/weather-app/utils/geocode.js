// the geocoding API allows the app to change the physical address to coordinates and passes it to the weatherstack API to fetch the weather.
const request = require('request')
// below in the URL after geocoding/v5/ both mapbox.places and the encodeURIComponent are required parameters for the API to work and the ? starts the query string///////
/// The encodeURIComponent handles any special characters and wont let the app crash it will simply encode the special characters.
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2F0ZXJjaWxhIiwiYSI6ImNsZHh4YXJqeTA2bmszbnBvY3JqczhydHUifQ.HszCfvNf3crG1rSCWueJ0w&limit=1'
  //after the query string there are two parameters the first is the access token and the second one is limit to limit the amount of locations it gives to the most relevant one thereby speeding up the request.


  // the api is now saved in the URL below and is passed through in the request function
    request({ url, json: true }, (error, { body }) => {
        //if there is an error connecting to the page itself it will log this to the console.
            if (error) {
                console.log('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                console.log('Unable to find location. Try another search.', undefined)
            } 
            //
            else {
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