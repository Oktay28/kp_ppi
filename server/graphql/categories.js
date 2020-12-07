const {gql} = require("apollo-server-express");

const categoryType = gql`

    type Category {
        id: ID
        name: String
    }

    extend type Query {
        categories: [Category]
    }

`;

const categoryQuery = {
    categories: async(parent, args, {models}) => {
        return await models.Category.findAll({raw: true});
    }
}

module.exports = {
    categoryQuery,
    categoryType
}