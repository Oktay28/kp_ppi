import {useLazyQuery} from '@apollo/client';

import {
    PRODUCTS,
    CATEGORIES
} from './gql';

const useProductsLazyQuery = () => {
    const query = useLazyQuery(PRODUCTS, {
        errorPolicy: "all"
    })

    return query;
}

const useCategoriesLazyQuery = () => {
    const query = useLazyQuery(CATEGORIES, {
        errorPolicy: "all",
        fetchPolicy: "cache-and-network"
    })

    return query;
}

export {
    useProductsLazyQuery,
    useCategoriesLazyQuery
}