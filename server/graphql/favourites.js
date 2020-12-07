const {gql} = require("apollo-server-express");

const favouriteType = gql`
    type Favourite {
        id: ID
        product_id: ID
        user_id: ID
    }
`;

module.exports = {
    favouriteType
}