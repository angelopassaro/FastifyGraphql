const mutations = require('./mutation')

module.exports = {
    Query: require('./query'),
    Mutation: mutations,
    Subscription: require('./subscription')
}