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

/*
let resolver = result.reduce((a, b) => {
    Object.keys(b).forEach((k) => {
        console.log(b[k])
        if (a[k]) {
            a[k].push(b[k]);
        } else {
            a[k] = [b[k]];
        }
    })
    return a;
}, {});
*/

let resolver = result.reduce((a, b) => {
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

module.exports = {
    typeDefs: mergeTypes(typesArray, { all: true }),
    resolvers: { 'Query': resolver['Query'][0], 'Mutation': resolver['Mutation'][0] }
}

