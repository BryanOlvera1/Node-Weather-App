const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd975cb597cb2e79e2970838b46e0f46&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json:true }, (error, { body}) => {  //url (shorthand syntax)// data is automatically parsed here and the lower two statements are if errors occur the first statement is if there is no internet or another issue that doesnt allow user to access body 
        if (error){
            callback('Unable to connect to weather service!', undefined)
            // this will print if user inputs and invalied adress so the body has been accessed but user input was not valid
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } 
        // in each body.current.temp/feelslike or weather description. it is pulling the data out of the parsed data similar to pulling a key pair value out of an object so it would access the data this way. it would access the body first then.current to access the current weather data from the API and then .temp/feels like to access that particular piece of information
        else {
            callback(undefined,
                //[0] is used because weather descriptions is an array and we want to grab first item from array
             body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })

}
//exporting function
module.exports = forecast
