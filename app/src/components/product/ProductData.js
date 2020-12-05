import React from 'react';
import {
    Card,
    makeStyles,
    CardContent 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    rightSide: {
        padding: "30px"
    },
    inner: {
        padding: "30px"
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "20px"
    },
    price: {

    }
}))

const ProductData = ({product}) => {
    const classes = useStyles();

    return (
        <div className={classes.rightSide}>
            <Card className={classes.inner}>
                <CardContent>
                    <h3 className={classes.title}>
                        {product.name}
                    </h3>
                    <div>
                        {product.price}
                    </div>
                    <div>
                        {product.short_text}
                    </div>
                    <div>
                        {product.description}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductData;
