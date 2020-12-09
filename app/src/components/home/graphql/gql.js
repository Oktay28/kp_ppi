import {gql} from '@apollo/client';

const FEATURED_PRODUCTS = gql`
    query {
        featuredProducts {
            id
            name
            image
            price
        }
    }
`;

export {
    FEATURED_PRODUCTS
}