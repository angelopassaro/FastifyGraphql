'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs, resolvers } = require('./services/User/index')

module.exports = function (fastify, opts, next) {

  // Place here your custom code!
  // Do not touch the following lines
  fastify.register(require('fastify-compress'))
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-helmet'))

  fastify.register(require('fastify-gql'), {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })



  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  /** 

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })
    */

  // Make sure to call next when done
  next()
}
