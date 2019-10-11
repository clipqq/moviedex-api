const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const MOVIES = require('./movies-data.json')
const cors = require('cors')
const helmet = require('helmet')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.use((req, res, next) => {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({
            error: 'Unauthorized request'
        })
    }
    next()
})

app.get('/movie', (req, res) => {
    let resultArr = []

    if (req.query.genre) {
        console.log(req.query.genre)
        for (let i = 0; i < MOVIES.length; i++) {
            const dataGenre = MOVIES[i].genre.toLowerCase()
            if (dataGenre === req.query.genre.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    if (req.query.country) {
        console.log(req.query.country)
        for (let i = 0; i < MOVIES.length; i++) {
            const data = MOVIES[i].country.toLowerCase()
            if (data === req.query.country.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    if (req.query.avg_vote) {
        console.log(req.query.avg_vote)
        for (let i = 0; i < MOVIES.length; i++) {
            const data = MOVIES[i].avg_vote
            if (data >= req.query.avg_vote) {
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