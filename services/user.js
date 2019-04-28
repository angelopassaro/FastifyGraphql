'use strict'

module.exports = async function (fastify, opts) {

    const model = require('../models/')

    fastify.setNotFoundHandler(function (request, reply) {
        reply
            .code(404)
            .type('application/json')
            .send({ message: 'Requested user  does not exist' })
    })

    fastify.get('/', async function (request, reply) {
        let users = await model.User.findAll()
        reply.code(200).send(users);
    }
    )

    fastify.post('/', async function (request, reply) {
        let user = await model.User.create(request.query)
        reply.code(200).send(user)
    })

}

module.exports.autoPrefix = '/user'