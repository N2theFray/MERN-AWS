const { gql } = require('apollo-server-express')

//create out typeDefs
const typeDefs = gql `
type Query {
    helloWorld: String
}
`

module.exports = typeDefs