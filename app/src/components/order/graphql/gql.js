import {gql} from '@apollo/client';

const ME = gql`
    query ME($id: ID!) {
        me(id: $id) {
            id
            name
            email
            address
            phone
            card
        }
    }
`;

const SAVE_CARD = gql`
    mutation saveCardMutation($name: String, $month: String, $year: String, $number: String, $user_id: ID!) {
        saveCart(name: $name, month: $month, year: $year, number: $number, user_id: $user_id)
    }
`;

export {
    ME,
    SAVE_CARD
}