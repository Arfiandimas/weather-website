const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arfian Dimas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arfian Dimas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Arfian Dimas',
        helpText : 'ini pesan help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Harus menyertakan location'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => { // = {} default value latitude, longitude, location
        if (error) {
             return res.send({error})
        }

        forecast(`${latitude},${longitude}`, (error, forecastData) => {
             if (error) {
                return res.send({error})
             }

             res.send({
                forecast: forecastData,
                location,
                address: req.query.location
            })
        })
   })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Arfian Dimas',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Arfian Dimas',
        errorMessage: 'the page you requested could not found'
    })
})

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000')
})