import React from 'react';
import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    productItem: {
        boxShadow: "0 0 10px rgba(0, 0, 0, .3)",
        background: "#ffffff",
        borderRadius: "4px",
        padding: "30px 10px 20px",
        cursor: "pointer",
        transition: "all .3s",
        "&:hover": {
            marginTop: "-10px"
        }
    },
    productTitle: {
        fontSize: "18px",
        fontWeight: "bold"
    },
    shortText: {
        color: theme.palette.primary.main,
        fontSize: "11px",
        fontStyle: "italic",
        marginTop: "5px"
    },
    productImage: {
        width: "100%",
        height: "auto",
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
    }
}))

const ProductItem = () => {

    const classes = useStyles();

    return (
        <div className={classes.productItem}>
            <h4 className={classes.productTitle}>
                Product name
            </h4>
            <p className={classes.shortText}>
                Short text here
            </p>
            <div>
                <img src="https://wilderness-production.imgix.net/80a27c3287024f94f51fcd34e06d72aa/Marmot-Eldridge.jpg?auto=compress%2Cformat&fit=crop&h=500&ixlib=php-3.3.0&w=500&wpsize=square_med" className={classes.productImage}/>
            </div>
            <div className={classes.productFooter}>
                <span className={classes.productPrice}>
                    20.99 лв.
                </span>

                <span className={classes.oldPrice}>
                    30.99 лв.
                </span>
            </div>
        </div>
    );
}

export default ProductItem;
