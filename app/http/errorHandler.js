'use strict'

module.exports = (req, res, next) => {
  res.sendError = (error) => res
    .status(error.status)
    .header(error.headers || {})
    .send({
      message: error.message,
      code: error.status
    })
  next()
}
