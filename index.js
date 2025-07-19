const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const { moviesRouter } = require('./routes/person')
// const { default: mongoose } = require('mongoose')

app.use(cors())
app.use(express.json())

app.use('/persons', moviesRouter)

app.use((req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
})

app.listen(PORT, () => console.log('app is listening on port', PORT))
