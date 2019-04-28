'use strict'

const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

module.exports = fp(async function (fastify, opts) {
    fastify.decorate('dbConnection', function () {
        return new Sequelize("testfastify", "testfastify", "Qy65Qq_Vi_mm", {
            host: "den1.mysql6.gear.host",
            dialect: "mysql"
        })
    })
})
