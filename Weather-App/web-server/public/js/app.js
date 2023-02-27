// clientside Javascript file that will run in the browser 
//selecting element from html doc to use in JS by adding form in the ()
const weatherForm = document.querySelector('form')

//this will find the element by its name, that is what query selector does. 
const search = document.querySelector('input')
//
const messageOne = document.querySelector('#message-1') 
//
const messageTwo = document.querySelector('#message-2')


//once the form query selector has been stored in a variable we use an event listener and it will run everytime the form is submitted. the e stands for event and the default event for a form is to reload the page, however using e.prevent will stop this from running allowing the page to fetch the weather.
weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault() 
    //initializing new variable to hold the search value in location
    const location = search.value
    //this shows up as you mutating whatever the <P> is from html and using the string instead.
    messageOne.textContent = 'Loading...' 
    messageTwo.textContent = ''
//we are telling it to fetch data from this url and then run the function
fetch('http://localhost:3001/weather?address=!' + location).then((response) => {
    //this function will run once the json data has arrived and is parsed.
        response.json().then((data) => {
        // this conditional statement will execute if there is an error in the json data and display an error, 
        if (data.error) {
            messageOne.textContent = data.error
        // this is what will print if there is no error encountered, it will print the location and forecast data
        } else {
            //here the same messages1/2 are being set equal to the data.location/forecast data
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
           
        }
    })
})
})  
