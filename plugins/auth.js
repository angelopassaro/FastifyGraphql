'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {

  fastify.decorate('sign', (id) => {
    return fastify.jwt.sign(
      {
        userId: id
      },
      {
        expiresIn: 24 * 60 * 60 //expires in 24 hours
      }
    )
  })

  fastify.decorate('getUserId', (context) => {
    const Authorization = context.headers.authorization
    if (Authorization) {
      const { userId } = fastify.jwt.verify(Authorization)
      return userId
    }
    throw new Error('Not authenticated')
  })
})




