import React, {createContext, useState} from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [registered, setRegistered] = useState(false);

    return (
        <GlobalContext.Provider value={{
            registered,
            setRegistered
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
export {
    GlobalProvider
}
