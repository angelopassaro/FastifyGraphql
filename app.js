'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-fastify');


const { typeDefs, resolvers } = require('./schema/index')


module.exports = function (fastify, opts, next) {

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret', //change
    sign: {
      algorithm: 'HS512'
    }
  })

  const server = new ApolloServer({
    subscriptionsEndpoint: 'ws://localhost:3000/graphql',
    typeDefs,
    resolvers,
    debug: true,
    context: request => {
      return {
        prisma,
        ...fastify,
        ...request
      }
    },
  });

  server.installSubscriptionHandlers(fastify.server)
  fastify.register(server.createHandler());

  // Make sure to call next when done
  next()
}
