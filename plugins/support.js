'use strict'

const fp = require('fastify-plugin')


// If you prefer async/await, use the following
//
module.exports = fp(async function (fastify, opts) {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })
})
