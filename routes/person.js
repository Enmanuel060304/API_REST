const { Router } = require('express')
const moviesRouter = Router()
const PersonController = require('../controllers/person')

moviesRouter.get('/', PersonController.getAll)

moviesRouter.get('/info', PersonController.getInfo)

moviesRouter.get('/:id', PersonController.getById)

moviesRouter.delete('/:id', PersonController.deleteById)

moviesRouter.post('/', PersonController.create)

moviesRouter.put('/:id', PersonController.updateById)

module.exports = { moviesRouter }
