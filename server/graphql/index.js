const {gql} = require("apollo-server-express");
const {productType, productQuery} = require("./products");
const {userType, userQuery, userMutation} = require("./users");

const schema = gql`

    type Response {
        error: String
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

`
const typeDefs = [schema, productType, userType];
const resolvers = {
    Query: {...productQuery, ...userQuery},
    Mutation: {
        ...userMutation
    }
}

console.log(resolvers)


module.exports = {
    typeDefs,
    resolvers
}