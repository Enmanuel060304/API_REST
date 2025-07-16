const z = require('zod')

const personSchema = z.object({
  name: z.string({
    required_error: 'El nombre es obligatorio',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  }).min(2).max(100),
  number: z.string({
    required_error: 'El número es obligatorio',
    invalid_type_error: 'El número debe ser una cadena de texto'
  })
})

const validarPersona = (data) => {
  return personSchema.safeParse(data)
}

const validarParcialPersona = (data) => {
  return personSchema.partial().safeParse(data)
}

module.exports = { validarPersona, validarParcialPersona }
