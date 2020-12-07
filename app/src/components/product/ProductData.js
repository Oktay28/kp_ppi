import React, {useState, useEffect} from 'react';
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
import {useAddFavouriteMutation} from './graphql';
import {toast} from 'react-toastify';

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

const ProductData = ({product = {}, sizes, user, addToCart}) => {
    const classes = useStyles();
    const [size, setSize] = useState("");
    const [addFavourite, {data, loading}] = useAddFavouriteMutation();

    useEffect(() => {
       if(data) {
        toast.info("Added to Favourites");
       }
    }, [data]);

    const appendToCart = () => {
        addToCart(product.id, size)
    }

    const makeFavourite = () => {
        addFavourite({
            variables: {
                user_id: user?.id,
                product_id: product.id
            }
        })
    }

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
                                sizes.map(size => <MenuItem value={size.name} key={size.id}>{size.name}</MenuItem>)
                            }
                        
                        </Select>
                    </FormControl>
                    </div>
                    <div className="d-flex">
                        {
                            !data && (user && !product.Favourites?.id) && (
                                <Tooltip title="Add to favourites">
                                    <IconButton className={loading ? "loading" : ""} onClick={makeFavourite}>
                                        <FavoriteIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }

                        <Button onClick={appendToCart} variant="contained" color="primary" size="large" className={classes.addToCart} disabled={!size}>
                            Add to cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductData;
