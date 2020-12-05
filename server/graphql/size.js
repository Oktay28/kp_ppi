const {gql} = require("apollo-server-express");

const sizeType = gql`
    
    type Size {
        id: ID!
        name: String!
    }

    extend type Query {
        sizes: [Size]
    }
    
`;

const sizeQuery = {
    sizes: async(parent, args, {models}) => {
        return await models.Size.findAll({
            raw: true
        })
    }
}

module.exports = {
    sizeType,
    sizeQuery
}