require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const Note = require('./noteSchema')
const Note = require('./models/note')

// const url = `mongodb+srv://bodunrindavid:bodunrindavid@cluster0.qugwu.mongodb.net/notesapp?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('<h1> Hello world! </h1>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find()
  res.status(200).json(notes)
})

app.get('/api/notes/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', async (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const createNote = new Note({
    content: body.content,
    important: body.important || false,
  })

  const note = await createNote.save()

  response.json(note)
})

app.delete('/api/notes/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)