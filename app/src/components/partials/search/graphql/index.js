import {useLazyQuery} from '@apollo/client';

import {
    PRODUCTS
} from './gql';

const useSearchLazyQuery = () => {
    const query = useLazyQuery(PRODUCTS, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useSearchLazyQuery
}