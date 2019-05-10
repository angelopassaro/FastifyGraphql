'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('getUserId', (context) => {
    const Authorization = context.request.headers['Authorization']
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token)
      return userId
    }

    throw new Error('Not authenticated')
  })
})
