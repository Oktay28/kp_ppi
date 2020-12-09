import {useLazyQuery} from '@apollo/client';

import {
    FEATURED_PRODUCTS
} from './gql';

const useFeaturedProductsLazyQuery = () => {
    const query = useLazyQuery(FEATURED_PRODUCTS, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useFeaturedProductsLazyQuery
}