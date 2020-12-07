import {gql} from '@apollo/client';

const PRODUCTS = gql`
    query SearchQuery($name: String) {
        products(filter: {
            name: $name,
            limit: 5
        }) {
            products {
                id
                image
                name
            }
            count
        }
    }
`;

export {
    PRODUCTS
}