import React, {createContext, useState, useEffect} from 'react';
import {useMeLazyQuery} from './graphql';
import {useHistory, useLocation} from 'react-router-dom';

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [registered, setRegistered] = useState(false);
    const id = window.localStorage.getItem("id");
    const [fetchUser, {data}] = useMeLazyQuery();
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if(id) {
            fetchUser({
                variables: {id}
            })
        }
    }, [])
    console.log(!logged, id, !data)
    if(!logged && id && !data) {
        return "loading...";
    }

    function logUser(data) {
        setLogged(true)
        fetchUser(data);
    }

    const user = data && data.me;
    console.log(user);

    return (
        <GlobalContext.Provider value={{
            registered,
            setRegistered,
            user,
            logUser,
            logged
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
export {
    GlobalProvider
}
