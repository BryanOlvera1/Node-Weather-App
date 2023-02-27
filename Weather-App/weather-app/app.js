const geocode = require('./utils/geocode') //pulls geocode out of utils folder and requires it 
const forecast = require('./utils/forecast')//pulls forecast out of utils folder and requires it 


//process.argv is a built in program to get the data from the node process that was ran in the terminal and the define what data to pull in the array. this w
const address = process.argv[2]
//using bang operator to determine if there is an address and if there is not. it will move on the else statement
if (!address) {
    console.log('Please provide an address')
}
//
else {
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