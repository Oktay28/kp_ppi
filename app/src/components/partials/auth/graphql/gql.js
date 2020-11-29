import {gql} from '@apollo/client';

const REGISTER_USER = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            error
        }
    }
`;

export {
    REGISTER_USER
}