import {useLazyQuery} from '@apollo/client';

import {
    PRODUCTS
} from './gql';

const useProductsLazyQuery = () => {
    const query = useLazyQuery(PRODUCTS, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useProductsLazyQuery
}