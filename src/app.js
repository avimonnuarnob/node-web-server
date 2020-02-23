const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Blah Blah',
        name: 'Avimonnu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You Suck',
        title: 'Help',
        name: 'Avimonnu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Avimonnu'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No Address Was Provided'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData, eatKacchi) => {
            if (error) {
                return res.send({ error })
            } 

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address,
                eatKacchi 
            })
        })
    })
})


app.listen(port, () => {
    console.log(`Listening on port 3000 ${port}`)
})