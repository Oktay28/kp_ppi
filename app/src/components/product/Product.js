import React, {useEffect} from 'react';
import ProductSlider from './ProductSlider';
import {useProductLazyQuery} from './graphql';
import {useParams} from 'react-router-dom';
import {
    Grid
} from '@material-ui/core';
import ProductData from './ProductData';

const Product = () => {

    const {productId} = useParams();
    const [fetchProduct, {data}] = useProductLazyQuery();

    useEffect(() => {
        fetchProduct({
            variables: {
                id: productId
            }
        })
    }, []);

    if(!data) {
        return "loading...";
    }

    const product = data.product || {};

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <ProductSlider />
                </Grid>

                <Grid item xs={12} md={5}>
                    <ProductData product={product} />
                </Grid>

            </Grid>
        </div>
    );
}

export default Product;
