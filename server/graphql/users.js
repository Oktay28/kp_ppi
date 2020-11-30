const {gql} = require("apollo-server-express");

const userType = gql`

    type User {
        id: ID!
        name: String!
        email: String!
        born_year: String
        password: String
        address: String
        phone: String
        cart_number: String
    }

    extend type Query {
        me(id: ID!): User
        login(email: String!, password: String!): User
    }

    extend type Mutation {

        register(name: String!, email: String!, password: String!): Response

    }

`;

const userQuery = {
    me: async (parent, {id}, {models}) => {
        return await models.User.findOne({
            where: {
                id
            },
            raw: true,
            limit: 1
        })
    },
    login: async (parent, args, {models}) => {
        const user = await models.User.findOne({
            where: args
        })
        if(!user) {
            throw new Error("Wrong email or password!")
        }

        return user;
    }
}

const userMutation= {
    register: async (parent, {name, email, password}, {models}) => {
        try {
            await models.User.create({
                name,
                email,
                password
            })

            return {
                error: null
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }
}

module.exports = {
    userType,
    userQuery,
    userMutation
}