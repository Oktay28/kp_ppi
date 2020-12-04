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

    if(!data) {
        return "loading...";
    }

    console.log(data);
    const products = data.products?.products || [];

    return (
        <div>
            <Filter />
            <Grid container spacing={3} className={classes.container}>

                {
                    products.map(product => <ProductItem product={product} key={product.id}/>)
                }

            </Grid>
        </div>
    );
}

export default Products;
