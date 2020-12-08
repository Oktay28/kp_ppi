import {useLazyQuery, useMutation} from '@apollo/client';

import {
    ME,
    SAVE_CARD
} from './gql';

const useMeLazyQuery = () => {
    const query = useLazyQuery(ME, {
        errorPolicy: "all"
    })

    return query;
}

const useSaveCardMutation = () => {
    const mutation = useMutation(SAVE_CARD, {
        errorPolicy: "all"
    })

    return mutation;
}

export {
    useMeLazyQuery,
    useSaveCardMutation
}