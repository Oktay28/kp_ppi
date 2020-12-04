import {gql} from '@apollo/client';

const PRODUCT = gql`
    query productQuery($id: ID!) {
        product(id: $id) {
            name
        }
    }
`;

export {
    PRODUCT
}