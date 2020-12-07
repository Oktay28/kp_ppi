import {gql} from '@apollo/client';

const CART_ITEMS = gql`
    query cartItemsQuery($ids: [ID]!) {
        cartItems(ids: $ids) {
            id
            name
            image
            price
        }
    }
`;

export {
    CART_ITEMS
}