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


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma }
  });

  fastify.register(server.createHandler());

  // Make sure to call next when done
  next()
}
