const {gql} = require("apollo-server-express");
const {productType, productQuery} = require("./products");

const schema = gql`

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

`
const typeDefs = [schema, productType];
const resolvers = {
    Query: {...productQuery},
    Mutation: {

    }
}

console.log(resolvers)


module.exports = {
    typeDefs,
    resolvers
}