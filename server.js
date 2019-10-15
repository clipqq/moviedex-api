const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const MOVIES = require('./movies-data.json')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
const apiToken = process.env.API_TOKEN

app.use(morgan(morganSetting))
app.use(cors())
app.use(helmet())
app.use((req, res, next) => {
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
    console.log(`made it here`)
    if (req.query.genre) {
        for (let i = 0; i < MOVIES.length; i++) {
            const dataGenre = MOVIES[i].genre.toLowerCase()
            if (dataGenre === req.query.genre.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    if (req.query.country) {
        for (let i = 0; i < MOVIES.length; i++) {
            const data = MOVIES[i].country.toLowerCase()
            if (data === req.query.country.toLowerCase()) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    if (req.query.avg_vote) {
        for (let i = 0; i < MOVIES.length; i++) {
            const data = MOVIES[i].avg_vote
            if (data >= req.query.avg_vote) {
                resultArr.push(MOVIES[i])
            }
        }
    }

    res.json(resultArr)
})

app.use((error, req, res, next) => {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = {
            error: {
                message: 'server error'
            }
        }
    } else {
        response = {
            error
        }
    }
    res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {})