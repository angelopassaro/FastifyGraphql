'use strict'

const path = require('path')
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const fs = require('fs')
const fileLoader = mergeGraphqlSchemas.fileLoader
const mergeTypes = mergeGraphqlSchemas.mergeTypes

let listFiles = []

// find all index file for resolvers
fs.readdirSync(__dirname).forEach((file) => {
    if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
        if (fs.existsSync(path.join(__dirname, file, '/resolver/index.js')))
            listFiles.push(path.join(__dirname, file, '/resolver/index'))
    }
})

// merge graphql types
const typesArray = fileLoader(path.join(__dirname, '/**/model/*.graphql'))
const result = []
let resolvers = []
let extra = {}
let query = {}




//import resolver (query and mutation)
listFiles.forEach((file) => {
    result.push(require(file))
})


let schema = result.reduce((a, b) => {
    Object.keys(b).forEach((k) => {
        if (Object.entries(b[k]).length !== 0 && b[k] !== Object) {
            if (a[k]) {
                a[k] = [Object.assign({}, a[k][0], b[k])]
            } else {
                a[k] = [b[k]];
            }
        }
    })
    return a;
}, {});


// split query from extra , extra is used for relations

Object.entries(schema['Query'][0]).forEach((k) => {
    if (Object.keys(k[1]).length === 0) {
        query[k[0]] = k[1]
    } else {
        extra[k[0]] = k[1]
    }
})


// if extra exist merge in resolver
if (!(Object.entries(extra).length === 0 && extra.constructor === Object)) {
    resolvers = Object.assign({}, resolvers, extra)
}

// if subscription exist merge in resolver
if (!(Object.entries(schema['Subscription'][0]).length === 0 && schema['Subscription'][0].constructor === Object)) {
    resolvers = Object.assign({}, resolvers, { 'Subscription': schema['Subscription'][0] })
}

resolvers = Object.assign({}, resolvers, { 'Query': query })
resolvers = Object.assign({}, resolvers, { 'Mutation': schema['Mutation'][0] })


module.exports = {
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: resolvers,
}

