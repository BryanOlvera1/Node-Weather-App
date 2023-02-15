// require statements for necessary modules
const path = require('path')
const express = require('express') //express is a function 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// define paths to directories for Express
const publicDirectoryPath = path.join(__dirname, '../public') 
// directory for Handlebars.js views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// configure the app to use Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory from path to file
app.use(express.static(publicDirectoryPath))  


//access path to handlebar index.hbs
app.get('', (req, res) => {
    // render the 'index' view and pass in the title and name variables to be used
    res.render('index', {
        title: 'Weather',
        name: 'Bryan Olvera'
    })  
})

app.get('/about', (req, res) => {
    // render the 'about' view and pass in the title and name variables to be used 
    res.render('about', {
        title: 'About Page',
        name: 'Bryan Olvera'
    })

})

app.get('/help', (req, res) =>{
    // render the 'help' view and pass in the title and name variables to be used
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Bryan Olvera'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            errorr: 'You must provide an address.'
        })
    }
geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
        return res.send({error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) { 
            return res.send({ error })
        }
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
if (!req.query.search) {  //only runs when there is no search term
     return res.send({
        error: 'You must provide a search term.'
     })
}

    console.log(req.query.search)
    // req.query //
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan Olvera',
        errorMessage: 'Help article not found.'
    })
})

//wild card character * for page not found
app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bryan Olvera',
        errorMessage: 'Page not found.'
    })
})
// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Weather app on 3000')
})

 