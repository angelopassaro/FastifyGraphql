const mutations = require('./mutation')

let extra = {}
let query = {}

// split query from extra , extra is used for relations
Object.entries(require('./query')).forEach((k) => {
    if (Object.keys(k[1]).length === 1) {
        extra[k[0]] = k[1]
    } else {
        query[k[0]] = k[1]
    }
})

module.exports = {
    Query: query,
    Mutation: mutations,
    extra: extra
}