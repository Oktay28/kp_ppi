import {useLazyQuery} from '@apollo/client';
import {PRODUCT} from './gql';

const useProductLazyQuery = () => {
    const query = useLazyQuery(PRODUCT, {
        errorPolicy: "all"
    })

    return query;
}

export {
    useProductLazyQuery
}