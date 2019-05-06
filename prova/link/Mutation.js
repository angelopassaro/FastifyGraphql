const mutation = `type Mutation {
    post(url: String!, description: String!): Link!
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }`

module.exports = mutation