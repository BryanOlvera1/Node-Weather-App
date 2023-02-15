const geocode = require('./utils/geocode') //pulls geocode out of utils folder and requires it 
const forecast = require('./utils/forecast')//pulls forecast out of utils folder and requires it 



const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {     
    if (error) {
          return console.log(error)
        } 
    
      
        forecast(latitude, longitude, (error, forecastData) => {   
            if (error) {
            return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
          })
    })
}

console.log(process.argv)