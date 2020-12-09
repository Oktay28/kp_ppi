import React from 'react';
import {
    makeStyles,
    Grid
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Img from '../partials/Img';

const useStyles = makeStyles(theme => ({
    productItem: {
        boxShadow: "0 0 10px rgba(0, 0, 0, .3)",
        background: "#ffffff",
        borderRadius: "4px",
        padding: "30px 10px 20px",
        cursor: "pointer",
        transition: "all .3s",
        position: "relative",
        "&:hover": {
            marginTop: "-10px"
        },
        "&.special": {
            boxShadow: "0 0 13px rgba(0, 0, 0, .6)"
        },
        "&.special::after": {
            content: '"\\2605"',
            color: "#ffffff",
            position: "absolute",
            right: "-10px",
            fontSize: "24px",
            top: "-10px",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            backgroundColor: theme.palette.primary.dark,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    },
    productTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        height: "36px"
    },
    shortText: {
        color: theme.palette.primary.main,
        fontSize: "11px",
        fontStyle: "italic",
        marginTop: "5px",
        height: "11px"
    },
    productImage: {
        width: "100%",
        height: "300px",
        objectFit: "cover",
        marginTop: "30px"
    },
    productPrice: {
        fontSize: "16px",
        fontWeight: "bold"
    },
    oldPrice: {
        fontSize: "13px",
        color: theme.palette.primary.main,
        textDecoration: "line-through",
        display: "inline-block",
        marginLeft: "5px"
    },
    productFooter: {
        marginTop: "30px"
    },
    productLink: {
        color: theme.palette.primary.dark,
        textDecoration: "none"
    }
}))

const ProductItem = ({product = {}}) => {

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3} lg={2}>
            <Link to={`/products/${product.id}`} className={classes.productLink}>
            <div className={`${classes.productItem} ${product.is_featured ? "special" : ""}`}>
                <h4 className={classes.productTitle}>
                    {product.name}
                </h4>
                <p className={classes.shortText}>
                    {product.short_text}
                </p>
                <div>
                    <Img alt="product" src={product.image} className={classes.productImage}/>
                </div>
                <div className={classes.productFooter}>
                    <span className={classes.productPrice}>
                        {(+product.price).toFixed(2)} лв.
                    </span>
                    {
                        product.old_price && 
                        <span className={classes.oldPrice}>
                            {(+product.old_price).toFixed(2)} лв.
                        </span>
                    }
                    
                </div>
            </div>
            </Link>
        </Grid>

    );
}

export default ProductItem;
