const typeDefs = `type Query {
  info: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
  links: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
  postedBy: User
}`

module.exports = typeDefs