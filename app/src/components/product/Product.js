import React, {useEffect} from 'react';
import ProductSlider from './ProductSlider';
import {useProductLazyQuery} from './graphql';
import {useParams} from 'react-router-dom';
import {
    Grid
} from '@material-ui/core';

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
            <ProductSlider />
        </div>
    );
}

export default Product;
