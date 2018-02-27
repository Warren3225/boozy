const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const orderQuantity = 3;

    beforeEach(() => {
      return User.create({
        quantity: orderQuantity
      })
    })

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].quantity).to.be.equal(orderQuantity)
        })
    })
  }) // end describe('/api/orders')
}) // end describe('order routes')