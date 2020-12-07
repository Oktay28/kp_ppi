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

const ADD_FAVOURITE = gql`
    mutation addToFavourites($user_id: ID!, $product_id: ID!) {
        addToFavourite(user_id: $user_id, product_id: $product_id)
    }
`;

export {
    PRODUCT,
    ADD_FAVOURITE
}