const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const MOVIES = require('./movies-data.json')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

app.get('/movie', (req, res) => {

    let resultArr = []

    if (req.query.genre) {
        console.log(req.query.genre)
        for (let i = 0; i < MOVIES.length; i++) {
            const dataGenre = MOVIES[i].genre.toLowerCase()
            //console.log(dataGenre)
            if (dataGenre === req.query.genre.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    if (req.query.country) {
        console.log(req.query.country)
        for (let i = 0; i < MOVIES.length; i++) {
            const data = MOVIES[i].country.toLowerCase()
            //console.log(dataGenre)
            if (data === req.query.country.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }


    res.json(resultArr)
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Movie API Server listening at http://localhost:${PORT}`)
})