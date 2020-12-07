const {gql} = require("apollo-server-express");

const favouriteType = gql`
    type Favourite {
        id: ID
        product_id: ID
        user_id: ID
    }

    extend type Query {
        favourites(user_id: ID!): [Product]
    }

    extend type Mutation {
        addToFavourite(product_id: ID!, user_id: ID!): Boolean 
    }
`;

const favouriteQuery = {
    favourites: async (parent, {user_id}, {models}) => {
        const products = await models.Products.findAll({

        })

        return products;
    }
}

const favouriteMutation = {
    addToFavourite: async(parent, {user_id, product_id}, {models}) => {
        const isUpdated = await models.Favourites.create({
            user_id,
            product_id
        })

        return !!isUpdated;
    }
}

module.exports = {
    favouriteType,
    favouriteQuery,
    favouriteMutation
}