'use strict'

exports.internal = {
  status: 500,
  message: 'Error: internal server error'
}
exports.notFound = {
  status: 404,
  message: 'Error: resource not found'
}
exports.unauthorized = {
  status: 401,
  message: 'Error – you are not authorized',
}
exports.methodNotAllowed = (methods) => ({
  status: 405,
  message: 'Error: method not allowed',
  headers: {
    'Allow': methods
  }
})
exports.unprocessableEntity = (details) => ({
  status: 422,
  message: 'Error – the request parameters could not be validated.',
  errors: details
})
