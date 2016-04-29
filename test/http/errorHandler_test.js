'use strict'

const request = require('supertest')
const express = require('express')
const errorHandler = require('../../app/http/errorHandler')

describe('errorHandler', () => {
  it('returns error with mandatory status + message', (done) => {
    const app = express()
    app.use(errorHandler)
    app.get('/error', (req, res) => res
      .sendError({
        status: 418,
        message: "I'm a teapot"
      }))
    request(app)
      .get('/error')
      .send({})
      .expect(418)
      .expect({
        code: 418,
        message: "I'm a teapot"
      })
      .end(done)
  })

  it('returns error with optional headers', (done) => {
    const app = express()
    app.use(errorHandler)
    app.get('/error', (req, res) => res
      .sendError({
        status: 418,
        message: "I'm a teapot",
        headers: {'Accept': 'POST, PATCH'}
      }))
    request(app)
      .get('/error')
      .send({})
      .expect(418)
      .expect({
        code: 418,
        message: "I'm a teapot"
      })
      .expect('Accept', 'POST, PATCH')
      .end(done)
  })
})
