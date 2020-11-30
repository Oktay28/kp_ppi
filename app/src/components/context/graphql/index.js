import {useLazyQuery} from '@apollo/client';

import {
    ME
} from './gql';

const useMeLazyQuery = () => {
    const query = useLazyQuery(ME, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useMeLazyQuery
}