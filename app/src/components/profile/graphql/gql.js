import {gql} from '@apollo/client';

const PROFILE = gql`
    query meQuery($id: ID!) {
        me(id: $id) {
            name
            email
            birth_year
            address
            phone
            card
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

const UPDATE_ME = gql`
    mutation updateMeMutation($id: ID!, $name: String, $email: String, $birth_year: String, $password: String, $address: String, $phone: String) {
        updateMe(id: $id, name: $name, email: $email, birth_year: $birth_year, password: $password, address: $address, phone: $phone) 
    }
`;

const REMOVE_CARD = gql`
    mutation removeCardMutation($id: ID!) {
        removeCard(id: $id)
    }
`;

export {
    PROFILE,
    FAVOURITES,
    REMOVE_FAVOURITE,
    UPDATE_ME,
    REMOVE_CARD
}