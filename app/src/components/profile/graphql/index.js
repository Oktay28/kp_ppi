import {useLazyQuery, useMutation} from '@apollo/client';

import {
    PROFILE,
    FAVOURITES,
    REMOVE_FAVOURITE,
    UPDATE_ME,
    REMOVE_CARD
} from './gql';

import {toast} from 'react-toastify';

const useMeLazyQuery = () => {
    const query = useLazyQuery(PROFILE, {
        errorPolicy: "all",
        fetchPolicy: "no-cache"
    })

    return query;
}

const useFavouritesLazyQuery = () => {
    const query = useLazyQuery(FAVOURITES, {
        errorPolicy: "all"
    })

    return query;
}

const useRemoveFavouriteMutation = (onComplete) => {
    const mutation = useMutation(REMOVE_FAVOURITE, {
        errorPolicy: "all",
        onCompleted: async() => {
            await onComplete();
            toast.info("Removed from Favourites!");
        }
    })

    return mutation;
}

const useUpdateMeMutation = (onComplete) => {
    const mutation = useMutation(UPDATE_ME, {
        errorPolicy: "all",
        onCompleted: async () => {
            await onComplete();
            toast.info("Profile Updated!");
        }
    })

    return mutation;
}

const useRemoveCardMutation = (onComplete) => {
    const mutation = useMutation(REMOVE_CARD, {
        errorPolicy: "all",
        onCompleted: async () => {
            await onComplete();
            toast.info("Card Removed!");
        }
    })

    return mutation;
}

export {
    useMeLazyQuery,
    useFavouritesLazyQuery,
    useRemoveFavouriteMutation,
    useUpdateMeMutation,
    useRemoveCardMutation
}