const {gql} = require("apollo-server-express");

const orderType = gql`

    type Card {
        name: String
        valid_month: Int
        valid_year: Int
        number: Int
    }

    extend type Mutation {
        order(
            user_id: ID,
            name: String,
            email: String,
            phone: String,
            address: String,
            payment: Int,
            card: String
        ): Boolean

        saveCart(name: String, month: String, year: String, number: String, user_id: ID!): Boolean
    }

`;

const orderMutation = {
    order: async(parent, args, {models}) => {

    },

    saveCart: async(parent, {user_id, ...rest}, {models}) => {
        const isUpdated = models.User.update({
            card: JSON.stringify(rest)
        }, {
            where: {
                id: user_id
            }
        })

        return !!isUpdated;
    }
}

module.exports = {
    orderType,
    orderMutation
}