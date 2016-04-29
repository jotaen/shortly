'use strict'

const match = (login, secret) => (typeof login === 'object' && login.name === secret.username && login.pass === secret.password)

module.exports = (username, password) => (login) => match(login, {
  username: username,
  password: password
})
