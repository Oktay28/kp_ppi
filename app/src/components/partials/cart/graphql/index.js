import {useLazyQuery} from '@apollo/client';

import {
    CART_ITEMS
} from './gql';

const useCartLazyProducts = () => {
    const query = useLazyQuery(CART_ITEMS, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useCartLazyProducts
}