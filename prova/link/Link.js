const typeDefs = `
type Link {
  id: ID!
  description: String!
  url: String!
  postedBy: User
}`

module.exports = typeDefs;