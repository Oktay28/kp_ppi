import {
    useMutation
} from '@apollo/client';

import {
    REGISTER_USER
} from './gql';

const useRegisterMutation = () => {
    const mutation = useMutation(REGISTER_USER, {
        errorPolicy: "all"
    });
    return mutation;
}

export {
    useRegisterMutation
}