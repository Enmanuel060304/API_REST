const Person = require('../mongodb/context')

class personModel {
  static async getAll () {
    const persons = await Person.find({})
    return persons
  }

  static async getInfo () {
    const count = await Person.countDocuments({})
    return {
      message: `PhoneBook has info for ${count} people`,
      date: new Date()
    }
  }

  static async getById ({ id }) {
    const person = await Person.findOne({ id })
    return person
  }

  static async deleteById ({ id }) {
    const person = await Person.findOneAndDelete({ id })
    return person
  }

  static async create ({ id, data }) {
    const newPerson = new Person({ id, ...data })
    await newPerson.save()
    return newPerson
  }

  static async updateById ({ id, data }) {
    const person = await Person.findOneAndUpdate({ id }, data, {
      new: true,
      runValidators: true
    })
    return person
  }
}

module.exports = personModel
