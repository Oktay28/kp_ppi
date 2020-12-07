import {gql} from '@apollo/client';

const PRODUCT = gql`
    query productQuery($id: ID!, $userId: ID) {
        product(id: $id, userId: $userId) {
            id
            name
            price
            short_text
            description
            image
            old_price
            Favourites {
                id
            }
        }
        sizes {
            id
            name
        }
    }
`;

export {
    PRODUCT
}