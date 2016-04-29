'use strict'

const Joi = require('joi')
const errors = require('./errors')

module.exports = (schema) => (req, res, next) => {
  Joi.validate(req.body, schema, (error) => {
    error ? res.sendError(errors.unprocessableEntity(error.details)) : next()
  })
}
