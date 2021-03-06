'use strict'

const db = require('../../app/bootstrap/db')
const config = require('../../app/bootstrap/config')
const shortlinks = require('../../app/odm')
const isValid = require('../_isValid')
const assert = require('assert')

before((done) => {
  db.init(config.dbUrl, 'shortlinks-integration-test-' + (new Date()).toISOString()).then(() => {
    done()
  }).catch((error) => {
    console.log(error)
    console.log('\n')
    console.log('>>> In order to run this test, you need to have a mongodb and')
    console.log('>>> provide the DB_HOST variable to the test process. E.g.')
    console.log('>>> $ DB_HOST=localhost:27017 npm test')
    process.exit(1)
  })
})

// The tests in this suite are dependent on one another and
// need to be executed in this order
describe('ODM integration test', () => {
  it('should be empty initially', (done) => {
    shortlinks.list().then((result) => {
      assert(result.length === 0)
      done()
    })
  })

  it('should create a new document', (done) => {
    shortlinks.create('foo', 'http://google.com', 302).then((result) => {
      assert(isValid.odmOutput(result))
      assert(result.token === 'foo')
      assert(result.url === 'http://google.com')
      assert(result.status_code === 302)
      done()
    })
  })

  it('should not recreate the same document', (done) => {
    shortlinks.create('foo', 'http://google.com', 302).catch((error) => {
      assert(error.message === 'ALREADY_EXISTS')
      done()
    })
  })

  it('should return the new document with correct data/format', (done) => {
    shortlinks.find('foo').then((result) => {
      assert(isValid.odmOutput(result))
      assert(result.token === 'foo')
      assert(result.url === 'http://google.com')
      assert(result.status_code === 302)
      done()
    })
  })

  it('should handle the dates of a new document properly', (done) => {
    const start = new Date()
    shortlinks.create('baz', 'http://wikipedia.org', 305).then((result) => {
      const end = new Date()
      const created = new Date(result.created)
      const updated = new Date(result.updated)
      assert(updated.valueOf() === created.valueOf())
      assert(created >= start)
      assert(created <= end)
      done()
    })
  })

  it('should update an existing document', (done) => {
    shortlinks.update('foo', 'http://bing.com', 309).then((result) => {
      assert(result.token === 'foo')
      assert(result.url === 'http://bing.com')
      assert(result.status_code === 309)
      assert(result.updated > result.created)
      done()
    })
  })

  it('should list both documents now', (done) => {
    shortlinks.list().then((result) => {
      assert(result.length === 2)
      assert(result[0].token === 'foo')
      assert(isValid.odmOutput(result[0]))
      assert(result[1].token === 'baz')
      assert(isValid.odmOutput(result[1]))
      done()
    })
  })

  it('should delete an existing document', (done) => {
    shortlinks.delete('foo').then((doc) => {
      assert(doc.token === 'foo')
      done()
    })
  })

  it('should not delete the same document twice', (done) => {
    shortlinks.delete('foo').then((doc) => {
      assert(doc === undefined)
      done()
    })
  })

  it('should list just one document', (done) => {
    shortlinks.list().then((result) => {
      assert(result.length === 1)
      assert(result[0].token === 'baz')
      assert(isValid.odmOutput(result[0]))
      done()
    })
  })
})
