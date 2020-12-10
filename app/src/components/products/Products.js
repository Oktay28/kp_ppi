import React, {useEffect} from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import ProductItem from './ProductItem';
import Filter from './Filter';
import {useProductsLazyQuery} from './graphql';
import {useLocation, useHistory} from 'react-router-dom';
import Loader from '../partials/Loader';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    container: {
        padding: "30px",
        marginBottom: "50px"
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
    const {push} = useHistory();
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
                category: +query.get("category") || null ,
                discount: +query.get("discount")
            }
        });
    }, [query.toString()]);

    const pageChange = (event, page) => {
        query.set("page", page);
        const redirect = query.toString();
        console.log(redirect);
        push(`/products?${redirect}`)
    }

    if(!data) {
        return <Loader />
    }
    

    const products = data.products?.products || [];
    const count = data.products?.count || 0;

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
            <div className="d-flex justify-content-center mb-45">
                {
                    count > 30 ? (
                        <Pagination count={Math.ceil(count / 30)} page={+(query.get("page")) || 1} onChange={pageChange} color="primary" />
                    ) : null
                }
                
            </div>
        </div>
    );
}

export default Products;
