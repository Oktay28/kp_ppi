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

const FAVOURITES = gql`
    query favouritesQuery($user_id: ID!) {
        favourites(user_id: $user_id) {
            id
            Product {
                id
                name
                image
            }
        }
    }
`

const REMOVE_FAVOURITE = gql`
    mutation removeFavouriteMutation($id: ID!) {
        removeFromFavourites(id: $id)
    }
`;

export {
    PROFILE,
    FAVOURITES,
    REMOVE_FAVOURITE
}