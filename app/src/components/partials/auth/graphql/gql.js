import {gql} from '@apollo/client';

const REGISTER_USER = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            error
        }
    }
`;

const LOGIN_USER = gql`
    query loginQuery($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
        }
    }
`;

export {
    REGISTER_USER,
    LOGIN_USER
}