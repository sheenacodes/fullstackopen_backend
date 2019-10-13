const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('reqbody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))



let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let n_persons = persons.length
    let date = (new Date()).toString()
    let text = `<p> Phonebook has info for ${n_persons} people </p><br/> <p>${date}</p> `
    response.send(text)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    receivedPerson = request.body

    //console.log(receivedPerson)
    if (!receivedPerson.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!receivedPerson.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    let existingPerson = persons.find(p => p.name === receivedPerson.name)
    if (existingPerson) {
        return response.status(400).json({
            error: 'duplicate name'
        })
    }

    const person = {
        name: receivedPerson.name,
        number: receivedPerson.number,
        id: getRandomId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const getRandomId = () => Math.floor(Math.random() * Math.floor(10000))

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})