import {gql} from '@apollo/client';

const PRODUCT = gql`
    query productQuery($id: ID!) {
        product(id: $id) {
            id
            name
            price
            short_text
            description
            image
            old_price
        }
    }
`;

export {
    PRODUCT
}