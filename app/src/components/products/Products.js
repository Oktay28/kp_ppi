import React from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import ProductItem from './ProductItem';

const useStyles = makeStyles(theme => ({
    container: {
        padding: "30px"
    }
}))

const Products = () => {

    const classes = useStyles();

    return (
        <div>
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
