import {useLazyQuery, useMutation} from '@apollo/client';
import {PRODUCT, ADD_FAVOURITE} from './gql';

const useProductLazyQuery = () => {
    const query = useLazyQuery(PRODUCT, {
        errorPolicy: "all"
    })

    return query;
}

const useAddFavouriteMutation = () => {
    const mutation = useMutation(ADD_FAVOURITE, {
        errorPolicy: "all"
    })

    return mutation;
}

export {
    useProductLazyQuery,
    useAddFavouriteMutation
}