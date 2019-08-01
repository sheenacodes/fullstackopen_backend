const express = require('express')
const app = express()


let persons = [
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






const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})