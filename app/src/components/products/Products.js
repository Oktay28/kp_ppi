import React, {useEffect} from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import ProductItem from './ProductItem';
import Filter from './Filter';
import {useProductsLazyQuery} from './graphql';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        padding: "30px"
    },
    empty: {
        fontSize: "26px",
        textAlign: "center",
        width: "100%"
    }
}))

const Products = () => {

    const classes = useStyles();
    const [fetchProducts, {data}] = useProductsLazyQuery();
    const {search} = useLocation();
    const query = new URLSearchParams(search);
    query.delete("modal");
    
    useEffect(() => {
        fetchProducts({
            variables: {
                name: query.get("name"),
                new: +query.get("new"),
                featured: +query.get("featured"),
                page: +query.get("page"),
                min: +query.get("min"),
                max: +query.get("max"),
                category_id: query.get("category")
            }
        });
    }, [query.toString()]);

    if(!data) {
        return "loading...";
    }

    const products = data.products?.products || [];

    return (
        <div>
            <Filter />
            <Grid container spacing={3} className={classes.container}>

                {
                    products.length ? 
                    products.map(product => <ProductItem product={product} key={product.id}/>) : 
                    <h2 className={classes.empty}>No Items Found!</h2>
                }

            </Grid>
        </div>
    );
}

export default Products;
