const personModel = require('../models/mongodb/person.js')
const { validarPersona, validarParcialPersona } = require('../schemas/person')

class PersonController {
  static async getAll (req, res) {
    try {
      const persons = await personModel.getAll()
      res.json(persons)
    } catch (error) {
      console.error('Error fetching persons:', error.message)
      res.status(500).send('Internal Server Error')
    }
  }

  static async getInfo (req, res) {
    try {
      const info = await personModel.getInfo()
      res.json(info)
    } catch (error) {
      console.error('Error fetching info:', error.message)
      return res.status(500).send('Internal Server Error')
    }
  }

  static async getById (req, res) {
    const result = validarParcialPersona({ id: req.params.id })
    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    const id = result.data.id

    try {
      const person = await personModel.getById({ id })
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.json(person)
    } catch (error) {
      console.error('Error fetching person:', error.message)
      return res.status(500).send('Internal Server Error')
    }
  }

  static async deleteById (req, res) {
    const result = validarParcialPersona({ id: req.params.id })

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    const id = result.data.id

    try {
      const person = await personModel.deleteById({ id })
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.status(204).json({ message: 'Person deleted successfully' })
    } catch (error) {
      console.error('Error deleting person:', error.message)
      res.status(500).send('Internal Server Error')
    }
  }

  static async create (req, res) {
    const result = validarPersona(req.body)

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    try {
      const person = await personModel.create({ id: crypto.randomUUID(), data: result.data })
      res.status(201).json(person)
    } catch (error) {
      console.error('Error creating person:', error.message)
      res.status(500).send('Internal Server Error')
    }
  }

  static async updateById (req, res) {
    const result = validarParcialPersona({ id: req.params.id, ...req.body })

    if (!result.success) {
      return res.status(400).json(JSON.parse(result.error.message))
    }

    try {
      const person = await personModel.updateById({ id: result.data.id, data: result.data })
      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.json(person)
    } catch (error) {
      console.error('Error updating person:', error.message)
      res.status(500).send('Internal Server Error')
    }
  }
}

module.exports = PersonController
