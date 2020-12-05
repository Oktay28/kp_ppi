import React, {useState} from 'react';
import {
    Card,
    makeStyles,
    CardContent,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
    rightSide: {
        padding: "30px",
        [theme.breakpoints.down("md")]: {
            padding: "10px"
        }
    },
    inner: {
        padding: "30px",
        color: theme.palette.primary.dark,
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
        fontSize: "24px",
        marginBottom: "20px"
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
        margin: 0
    },
    addToCart: {
        flex: "1"
    },
    oldPrice: {
        textDecoration: "line-through",
        display: "inline-block",
        marginLeft: "30px",
        fontSize: "20px"
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
                    <div className={classes.price}>
                        {product.price} lv.

                        <span className={classes.oldPrice}>
                            {product.old_price} lv.
                        </span>
                    </div>
                    <div className="mb-15">
                        {product.short_text}
                    </div>
                    <div className="mb-45">
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
                    <div className="d-flex">

                        <Tooltip title="Add to favourites">
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>

                        <Button variant="contained" color="primary" size="large" className={classes.addToCart} disabled={!size}>
                            Add to cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductData;
