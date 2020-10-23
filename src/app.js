const path = require('path')
const { request } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location (it expects views as a default, so point to it)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve on the web
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex Tagg'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT',
        company: 'For Konversational Ltd',
        name: 'Alex Tagg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Elfy',
        name: 'Alex Tagg'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide and address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
           
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a "Search" term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 Error: Page not found',
        name: 'Alex Tagg'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 Error: Page not found',
        name: 'Alex Tagg'
    })
})

app.listen(3000, () => {
    console.log('Server started correctly on port 3000')
})