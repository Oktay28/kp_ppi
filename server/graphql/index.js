const {gql} = require("apollo-server-express");
const {productType, productQuery} = require("./products");
const {userType, userQuery, userMutation} = require("./users");
const {sizeType, sizeQuery} = require("./size");
const {favouriteType} = require("./favourites");
const {categoryQuery, categoryType} = require("./categories");

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
const typeDefs = [schema, productType, userType, sizeType, favouriteType, categoryType];
const resolvers = {
    Query: {...productQuery, ...userQuery, ...sizeQuery, ...categoryQuery},
    Mutation: {
        ...userMutation
    }
}

console.log(resolvers)


module.exports = {
    typeDefs,
    resolvers
}