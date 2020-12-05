import {useLazyQuery} from '@apollo/client';

import {
    PROFILE
} from './gql';

const useMeLazyQuery = () => {
    const query = useLazyQuery(PROFILE, {
        errorPolicy: "all",
        fetchPolicy: "no-cache"
    })

    return query;
}

export {
    useMeLazyQuery
}