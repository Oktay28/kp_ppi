import {gql} from '@apollo/client';

const PROFILE = gql`
    query meQuery($id: ID!) {
        me(id: $id) {
            name
            email
            birth_year
            address
            phone
        }
    }
`;

export {
    PROFILE
}