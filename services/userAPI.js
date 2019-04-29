'use strict'

module.exports = async function (fastify, opts) {

    const { User } = require('../models')

    fastify.setNotFoundHandler(function (request, reply) {
        reply
            .code(404)
            .type('application/json')
            .send({ message: 'Requested user does not exist' })
    })

    fastify.get('/', async function (request, reply) {
        let users = await User.findAll()
        reply.code(200).send(users);
    }
    )

    fastify.post('/', async function (request, reply) {
        let user = await User.create(request.query)
        reply.code(200).send(user)
    })

}

module.exports.autoPrefix = '/user'