const {gql} = require("apollo-server-express");

const imageType = gql`

    type Image {
        id: ID
        url: String
        product_id: ID
    }

`;

module.exports = {
    imageType
}