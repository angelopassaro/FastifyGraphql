const typeDefs = `type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }
  
  type AuthPayload {
    token: String
    user: User
  }`

module.exports = typeDefs;