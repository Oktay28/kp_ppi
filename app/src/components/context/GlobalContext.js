import React, {createContext, useState, useEffect} from 'react';
import {useMeLazyQuery} from './graphql';
import {toast} from 'react-toastify';

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [registered, setRegistered] = useState(false);
    const id = window.localStorage.getItem("id");
    const [fetchUser, {data}] = useMeLazyQuery();
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem("cart");
        return localCart ? JSON.parse(localCart) : [];
    });

    useEffect(() => {
        if(id) {
            fetchUser({
                variables: {id}
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    useEffect(() => {
        if(data) {
            setUser(data.me);
        } else {
            setUser(null);
        }
    }, [data]);

    if(!logged && id && !data) {
        return "loading...";
    }

    function logUser(data) {
        setLogged(true)
        fetchUser(data);
    }

    const addToCart = (id, size) => {
        setCart(prevCart => {
            let updated = false;
            const newCart = prevCart.map((item) => {
                if((item.id == id) && (item.size == size)){
                    updated = true;
                    return {...item, count: item.count + 1};
                }
                return item;
            });
            toast.info("Added to Cart!");
            if(updated) {
                return newCart;
            }
            return [...prevCart, {id, size, count: 1}]
        })
    }

    const removeFromCart = (id, size) => {
       setCart(prevCart => prevCart.filter(item => !((item.id == id) && (item.size == size))));
    }

    const changeCount = (id, size, value) => {
        setCart(prevCart => prevCart.map(item => ((item.id == id) && (item.size == size)) ? {...item, count: item.count + value} : item))
    }

    const logout = () => {
        window.localStorage.removeItem("id");
        setLogged(false);
        setRegistered(false);
        setUser(null);
        toast.info("Logged out!");
    }

    return (
        <GlobalContext.Provider value={{
            registered,
            setRegistered,
            user,
            logUser,
            logged,
            addToCart,
            cart,
            removeFromCart,
            changeCount,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;
export {
    GlobalProvider
}
