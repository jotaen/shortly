'use strict'

const basicAuth = require('basic-auth')
const errors = require('./errors')

module.exports = (isAuthorized) => {
  return (req, res, next) => {
    const loginAttempt = basicAuth(req)
    isAuthorized(loginAttempt) ? next() : res.sendError(errors.unauthorized)
  }
}
