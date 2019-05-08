'use strict'

const path = require('path')
const mergeGraphqlSchemas = require('merge-graphql-schemas')
const fs = require('fs')
const fileLoader = mergeGraphqlSchemas.fileLoader
const mergeTypes = mergeGraphqlSchemas.mergeTypes

let listFiles = []

fs.readdirSync(__dirname).forEach((file) => {
    if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
        if (fs.existsSync(path.join(__dirname, file, '/resolver/index.js')))
            listFiles.push(path.join(__dirname, file, '/resolver/index'))
    }
})

const typesArray = fileLoader(path.join(__dirname, '/**/model/*.graphql'), { recursive: true })
const result = []


listFiles.forEach((file) => {
    result.push(require(file))
})


let resolver = result.reduce((a, b) => {
    Object.keys(b).forEach((k) => {
        if (a[k]) {
            a[k].push(b[k]);
        } else {
            a[k] = [b[k]];
        }
    })
    return a;
}, {});


module.exports = {
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: { 'Query': resolver['Query'][0], 'Mutation': resolver['Mutation'][0] }
}

