import React, {useEffect} from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import ProductItem from './ProductItem';
import Filter from './Filter';
import {useProductsLazyQuery} from './graphql';
const useStyles = makeStyles(theme => ({
    container: {
        padding: "30px"
    }
}))

const Products = () => {

    const classes = useStyles();
    const [fetchProducts, {data}] = useProductsLazyQuery();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <Filter />
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <ProductItem />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <ProductItem />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <ProductItem />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <ProductItem />
                </Grid>
            </Grid>
        </div>
    );
}

export default Products;
