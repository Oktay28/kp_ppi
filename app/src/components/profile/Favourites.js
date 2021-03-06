import React, {useContext, useEffect} from 'react';
import {
    useFavouritesLazyQuery,
    useRemoveFavouriteMutation
} from './graphql';
import GlobalContext from '../context/GlobalContext';
import {Link} from 'react-router-dom';

import {
    makeStyles,
    Tooltip,
    IconButton
} from '@material-ui/core';
import Loader from '../partials/Loader';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Img from '../partials/Img';

const useStyles = makeStyles(theme => ({
    favourites: {
        padding: "50px",
        [theme.breakpoints.down("sm")]: {
            padding: "10px"
        }
    },
    productRow: {
        display: "flex",
        alignItems: "center",
        marginBottom: "30px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "flex-start"
        }
    },
    productLeft: {
        display: "flex",
        flex: "1",
        alignItems: "center",
        textDecoration: "none",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start"
        }
    },
    productImage: {
        width: "200px",
        height: "200px",
        objectFit: "cover",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "auto"
        }
    },
    productName: {
        fontSize: "30px",
        fontWeight: "bold",
        color: theme.palette.primary.dark,
        marginLeft: "30px"
    },
    noFavourites: {
        fontSize: "30px",
        textAlign: "center"
    }
}))

const Favourites = () => {
    const classes = useStyles();
    const {user} = useContext(GlobalContext);
    const [fetchFavourites, {data, refetch}] = useFavouritesLazyQuery();
    const [removeFavourite] = useRemoveFavouriteMutation(refetch)
    
    useEffect(() => {
        fetchFavourites({
            variables: {
                user_id: user.id
            }
        });
    }, [user])

    if(!data) {
        return <Loader />
    }

    const favourites = data.favourites;

    return (
        <div className={classes.favourites}>
            {
                favourites.length ? 
                favourites.map(product => (

                        <div className={classes.productRow} key={product.id}>
                        <Link to={`/products/${product.Product.id}`} className={classes.productLeft} >
                                <div>
                                    <Img src={product.Product.image} className={classes.productImage} />
                                </div>
                                <div className={classes.productName}>
                                    {product.Product.name}
                                </div>
                            </Link>
                            
                            <Tooltip title="remove">
                                    <IconButton  className="mb-15" onClick={() => removeFavourite({variables: {id: product.id}})}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </Tooltip>
                        </div>
                )) :
                <h2 className={classes.noFavourites}>There are no Favourites!</h2>
            }
        </div>
    )
    
}

export default Favourites;