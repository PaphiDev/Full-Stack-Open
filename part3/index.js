require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// morgan
morgan.token('postInfo', function (req) {
    const value = req.method === 'POST' ? JSON.stringify(req.body) : ''
    return value
})

morgan.format(
    'customTiny',
    ':method :url :status :res[content-length] - :response-time ms :postInfo'
)

app.use(morgan('customTiny'))

// GET
app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        if (persons) {
            response.json(persons)
        } else {
            response.status(404).end()
        }
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).countDocuments(function (err, count) {
        if (err) {
            console.log(err)
        } else {
            const time = new Date()
            response.send(`<p>Phonebook has info for ${count} people</p> <p> ${time} </p>`)
        }
    })
})

// POST
app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body

    if (!name || !number) {
        return response.status(400).json({ error: 'name or number is missing' })
    }

    const person = new Person({
        name,
        number,
    })

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
})

// PUT
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    const person = {
        name,
        number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

// Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`)
})
