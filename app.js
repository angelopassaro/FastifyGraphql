'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { prisma } = require('./generated/prisma-client')
const { ApolloServer } = require('apollo-server-fastify');

const { typeDefs, resolvers } = require('./schema/index')

module.exports = function (fastify, opts, next) {


  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })

  /*
    const resolvers2 = {
      Query: {
        feed: (root, args, context, info) => {
          return context.prisma.links()
        },
      },
      Mutation: {
        post: (root, args, context) => {
          return context.prisma.createLink({
            url: args.url,
            description: args.description,
          })
        },
      },
    }
  
    console.log("resolver", resolvers)
    console.log("#########################################################")
    console.log("resolver2", resolvers2)
    */



  // Place here your custom code!  

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
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
