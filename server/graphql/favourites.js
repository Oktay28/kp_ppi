const {gql} = require("apollo-server-express");

const favouriteType = gql`
    type Favourite {
        id: ID
        product_id: ID
        user_id: ID
        Product: Product
    }

    extend type Query {
        favourites(user_id: ID!): [Favourite]
    }

    extend type Mutation {
        addToFavourite(product_id: ID!, user_id: ID!): Boolean
        removeFromFavourites(id: ID!): Boolean
    }
`;

const favouriteQuery = {
    favourites: async (parent, {user_id}, {models}) => {

        const products = await models.Favourites.findAll({
            where: {
                user_id
            },
            raw: true,
            nest: true,
            include: [
                {
                    model: models.Products,
                    left: true
                }
            ]
        })

        console.log(products)

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
    },
    removeFromFavourites: async(parent, {id}, {models}) => {
        const isRemoved = models.Favourites.destroy({
            where: {
                id
            }
        })

        return !!isRemoved;
    }
}

module.exports = {
    favouriteType,
    favouriteQuery,
    favouriteMutation
}