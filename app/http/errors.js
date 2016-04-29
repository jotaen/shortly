'use strict'

exports.internal = {
  status: 500,
  message: 'Error: internal server error'
}
exports.notFound = {
  status: 404,
  message: 'Error: resource not found'
},
exports.methodNotAllowed = (methods) => ({
  status: '405',
  message: 'Error: method not allowed',
  headers: {
    'Allow': methods
  }
})
