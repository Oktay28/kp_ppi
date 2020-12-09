import React, {useEffect, useContext} from 'react';
import ProductSlider from './ProductSlider';
import {useProductLazyQuery} from './graphql';
import {useParams} from 'react-router-dom';
import {
    Grid
} from '@material-ui/core';
import ProductData from './ProductData';
import GlobalContext from '../context/GlobalContext';
import Loader from '../partials/Loader';

const Product = () => {

    const {productId} = useParams();
    const [fetchProduct, {data}] = useProductLazyQuery();
    const {user, addToCart} = useContext(GlobalContext);

    useEffect(() => {
        fetchProduct({
            variables: {
                id: productId,
                userId: user?.id
            }
        })
    }, [user]);

    if(!data) {
        return <Loader />;
    }

    const product = data.product || {};
    const sizes = data.sizes || [];
    
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <ProductSlider images={product.images || []}/>
                </Grid>

                <Grid item xs={12} md={5}>
                    <ProductData addToCart={addToCart} user={user} product={product} sizes={sizes} />
                </Grid>

            </Grid>
        </div>
    );
}

export default Product;
