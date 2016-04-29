'use strict'

module.exports = (username, password) => (login) => (
  typeof login === 'object' && login.name === username && login.pass === password
)
