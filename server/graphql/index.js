const {gql} = require("apollo-server-express");
const {productType, productQuery} = require("./products");
const {userType, userQuery, userMutation} = require("./users");
const {sizeType, sizeQuery} = require("./size");

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
const typeDefs = [schema, productType, userType, sizeType];
const resolvers = {
    Query: {...productQuery, ...userQuery, ...sizeQuery},
    Mutation: {
        ...userMutation
    }
}

console.log(resolvers)


module.exports = {
    typeDefs,
    resolvers
}