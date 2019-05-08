'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('getUserId', (context) => {
    console.log(context.request)
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token, APP_SECRET)
      return userId
    }

    throw new Error('Not authenticated')
  })
})
