'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { prisma } = require('./generated/prisma-client')

// graphql-jit
const { makeExecutableSchema } = require('graphql-tools')
//const typeDefs = require('./services/schema/schema')

//graphql apollo
const { ApolloServer } = require('apollo-server-fastify');

const typeDefs = require('./prova/user/User');
const query = require('./prova/user/Query');
const mutation = require('./prova/user/Mutation')

const typeDefsL = require('./prova/link/Link');
const queryL = require('./prova/link/Query');
const mutationL = require('./prova/link/Mutation')



module.exports = function (fastify, opts, next) {


  const resolvers = {
    typeDefs,
    query,
    mutation,
    typeDefsL,
    queryL,
    mutationL
    /*
        Query: {
          info: () => `This is the API of a Hackernews Clone`,
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
        */
  }


  // Place here your custom code!  

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'prova'),
    //options: Object.assign({}, opts)
  })

  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })

  /* graphql-jit
    fastify.register(require('fastify-gql'), {
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      graphiql: true
    });
  */

  //graphql apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma }
  });

  fastify.register(server.createHandler());

  /*
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
