import {
    useLazyQuery,
    useMutation
} from '@apollo/client';

import {
    REGISTER_USER,
    LOGIN_USER
} from './gql';

const useRegisterMutation = () => {
    const mutation = useMutation(REGISTER_USER, {
        errorPolicy: "all"
    });
    return mutation;
}

const useLoginLazyQuery = () => {
    const query = useLazyQuery(LOGIN_USER, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useRegisterMutation,
    useLoginLazyQuery
}