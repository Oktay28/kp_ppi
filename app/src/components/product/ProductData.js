import React, {useState} from 'react';
import {
    Card,
    makeStyles,
    CardContent,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    rightSide: {
        padding: "30px",
        [theme.breakpoints.down("md")]: {
            padding: "10px"
        }
    },
    inner: {
        padding: "30px",
        [theme.breakpoints.down("md")]: {
            padding: "10px"
        }
    },
    title: {
        fontSize: "30px",
        fontWeight: "bold",
        marginBottom: "20px"
    },
    price: {

    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
        margin: 0
    },
    addToCart: {
        display: "block",
        width: "100%"
    }
}))

const ProductData = ({product, sizes}) => {
    const classes = useStyles();
    const [size, setSize] = useState("");

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
                    <div className="mb-30">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="size">Size</InputLabel>
                        <Select
                        labelId="size"
                        value={size}
                        onChange={event => setSize(event.target.value)}
                        label="Size"
                        >
                            {
                                sizes.map(size => <MenuItem value={size.id} key={size.id}>{size.name}</MenuItem>)
                            }
                        
                        </Select>
                    </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" size="large" className={classes.addToCart}>
                            Add to cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductData;
