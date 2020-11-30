import {gql} from '@apollo/client';

const ME = gql`
    query meQuery($id: ID!) {
        me(id: $id) {
            id
            name
        }
    }
`;

export {
    ME
}