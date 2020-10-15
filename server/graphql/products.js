const {gql} = require("apollo-server-express");

const productType = gql`
    
    type Product {
        id: ID!
        name: String
    }

    extend type Query {
        getProduct: Product
    }

`

const productQuery = {
    getProduct: async(parent, args, {models}) => {
        const product = await models.Products.findOne({raw: true});
        return product;
    }
}

module.exports = {
    productType,
    productQuery
}