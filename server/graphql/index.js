const {gql} = require("apollo-server-express");
const {productType, productQuery} = require("./products");
const {userType, userQuery, userMutation} = require("./users");
const {sizeType, sizeQuery} = require("./size");
const {favouriteType, favouriteQuery, favouriteMutation} = require("./favourites");
const {categoryQuery, categoryType} = require("./categories");
const {orderType, orderMutation} = require("./orders");
const {imageType} = require("./images");

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
const typeDefs = [schema, productType, userType, sizeType, favouriteType, categoryType, orderType, imageType];
const resolvers = {
    Query: {...productQuery, ...userQuery, ...sizeQuery, ...categoryQuery, ...favouriteQuery},
    Mutation: {
        ...userMutation, ...favouriteMutation, ...orderMutation
    }
}

console.log(resolvers)


module.exports = {
    typeDefs,
    resolvers
}