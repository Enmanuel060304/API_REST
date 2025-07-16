const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const Person = require('./models/person')
const { validarPersona, validarParcialPersona } = require('./schemas/person')
const crypto = require('crypto')
// const { default: mongoose } = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  }).catch(err => {
    console.error('Error fetching persons:', err.message)
    res.status(500).send('Internal Server Error')
  })
})

app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      const response = `
      <p> 
          PhoneBook has info for ${count} people
      </p>
      <br/>
      <p>
          ${new Date()}
      </p>
    `

      res.send(response)
    })
    .catch(error => {
      console.error('Error fetching count:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.get('/api/persons/:id', (req, res) => {
  const result = validarParcialPersona({ id: req.params.id })
  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message))
  }

  Person.findOne({ id: result.data.id })
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.json(person)
    })
    .catch(error => {
      console.error('Error fetching person:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const result = validarParcialPersona({ id: req.params.id })

  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message))
  }

  const id = result.data.id

  Person.findOneAndDelete({ id })
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.status(204).end()
    })
    .catch(error => {
      console.error('Error deleting person:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.delete('/api/persons', (req, res) => {
  Person.deleteMany({})
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.error('Error deleting all persons:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.post('/api/persons', (req, res) => {
  const result = validarPersona(req.body)

  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message))
  }

  const newPerson = new Person({
    id: crypto.randomUUID(),
    ...result.data
  })

  newPerson.save()
    .then(persona => {
      res.status(201).json(persona)
    })
    .catch(error => {
      console.error('Error saving person:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.put('/api/persons/:id', (req, res) => {
  const result = validarParcialPersona({ id: req.params.id, ...req.body })

  if (!result.success) {
    return res.status(400).json(JSON.parse(result.error.message))
  }

  const updatedPerson = {
    ...result.data,
    id: req.params.id
  }

  Person.findByIdAndUpdate(updatedPerson.id, updatedPerson, { new: true, runValidators: true })
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.json(person)
    })
    .catch(error => {
      console.error('Error updating person:', error.message)
      res.status(500).send('Internal Server Error')
    })
})

app.use((req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
})

app.listen(PORT, () => console.log('app is listening on port', PORT))
