// require statements for necessary modules
//path is a core node module to route a path 
const path = require('path')
//express is actually a function.
const express = require('express') 
//handlebars is a template engine that allows you render dynamic documents and allows you to easily create code such as header and footer to use across different pages
const hbs = require('hbs')
//requiring the geocode and forecast functions that are also located in the weather-app folder
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//setting app to equal express and everything else we do we will use app as it is equal to express
const app = express()

// define paths to directories for Express
//path.join is a function and joins the __dirname and public to route express to the public folder. 
const publicDirectoryPath = path.join(__dirname, '../public') 
// setting absolute path to templates folder and then the views file that is located within.
const viewsPath = path.join(__dirname, '../templates/views')
// setting absolute path to templates folder and then the partials file that is located within.
const partialsPath = path.join(__dirname, '../templates/partials')



// configure the app to use Handlebars
//allows you set value for express to view handlebars
app.set('view engine', 'hbs')
// setting express to be able to view the "views path"
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static route to the publicDirectoryPath which has the path routing express to the public folder to use the assets located in the public folder 
app.use(express.static(publicDirectoryPath))  


//access path to handlebar index.hbs
//function gets call with two parameters the second one is an object (request and receive), and the first one is a route. for the first route it is empty as it will route to the home page or index page
app.get('', (req, res) => {
    // render the 'index' view and pass in the title and name variables to be used
    res.render('index', {
        title: 'Weather',
        name: 'Bryan Olvera'
    })  
})
//using the handlebars template
app.get('/about', (req, res) => {
    // render the 'about' view and pass in the title and name variables to be used,
    res.render('about', {
        title: 'About Page',
        name: 'Bryan Olvera'
    })

})

app.get('/help', (req, res) =>{
    // render the 'help' view and pass in the title and name properties to be used
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Bryan Olvera'
    })
})
// if the user goes to the weather page and they enter an invalid address, the page will send a response and provide an error that is stored in the string
app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    // if there is an error grabbing data we account for that with this if statement and return an error statement
    if (error) {
        return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) { 
            return res.send({ error })
        }
// this will only work if no errors from both forecast and geocode
        res.send ({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

//express route handler
app.get('/products', (req, res) => {
    //request.query.search allows you to ensure that a search will be provided using the bang operator.
if (!req.query.search) { 
     return res.send({
        error: 'You must provide a search term.'
     })
}
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// routing help to a a wildcard character in case user looks for a helppage that isnt there. 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan Olvera',
        errorMessage: 'Help article not found.'
    })
})

//wild card character * for page not found has to be set up last, because of the way express looks for routes to direct requests
app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan Olvera',
        errorMessage: 'Page not found.'
    })
})


// Start the server and listen for incoming requests on port 3000
app.listen(3001, () => {
    console.log('Weather app on 3001')
})

 