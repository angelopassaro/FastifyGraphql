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
const typesArray = fileLoader(path.join(__dirname, '/**/model/*.graphql'), { recursive: true })
const result = []

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

let resolvers = []
/*
if (schema['extra'])
    Object.entries(schema['extra'][0]).forEach((f) => {
        resolvers[f[0]] = f[1]
    })
    */

if (schema['extra']) {
    resolvers = Object.assign({}, resolvers, schema['extra'][0])
}

resolvers = Object.assign({}, resolvers, { 'Query': schema['Query'][0] })
resolvers = Object.assign({}, resolvers, { 'Mutation': schema['Mutation'][0] })

module.exports = {
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: resolvers
}

