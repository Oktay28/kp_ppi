import React, {useEffect, useContext} from 'react';
import {
    makeStyles,
    ButtonGroup,
    TextField,
    Button,
    IconButton,
    Tooltip,
    Divider
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useCartLazyProducts} from "../partials/cart/graphql";
import Loader from '../partials/Loader';

const useStyle = makeStyles(theme => ({
    root: {
        padding: "50px",
        [theme.breakpoints.down("xs")]: {
            padding: "10px"
        }
    },
    productRow: {
        display: "flex",
        marginBottom: "60px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column"
        }
    },
    productImage: {
        width: "250px",
        height: "250px",
        objectFit: "cover",
        marginRight: "50px",
        [theme.breakpoints.down("xs")]: {
            marginRight: "0",
            width: "100%"
        }
    },
    optionButton: {
        backgroundColor: theme.palette.primary.dark,
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "24px",
        width: "40px",
        height: "40px",
        padding: 0,
        minWidth: "40px",
        "&:hover": {
            backgroundColor: theme.palette.primary.main
        }
    },
    counter: {
        "& input": {
            textAlign: "center",
            fontWeight: "bold",
            padding: "0px",
            width: "40px",
            height: "40px",
            backgroundColor: "#ffffff",
        }
    },
    productName: {
        fontSize: "34px",
        fontWeight: "bold",
        marginBottom: "20px"
    },
    productPrice: {
        fontSize: "20px",
        marginBottom: "15px"
    },
    productData: {
        display: "flex",
        flexDirection: "column",
        flex: "1"
    },
    productBottom: {
        flex: "1",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    totalPrice: {
        fontSize: "30px",
        marginBottom: "20px"
    }
}))

const Cart = () => {

    const classes = useStyle();
    const {cart, removeFromCart, changeCount} = useContext(GlobalContext);
    const [fetchProducts, {data, loading}] = useCartLazyProducts();

    useEffect(() => {
          fetchProducts({
            variables: {
              ids: cart.map(item => item.id)
            }
          })
      }, [])
      if(loading) {
        return <Loader />;
      }
  
      const products = (data && data.cartItems) || [];
      let total = 0;
    return (
        <div className={classes.root}>
            {
                cart.map((item, i) => {
                    const product = products.find(product => product.id == item.id) || {}
                    total += (item.count * +product.price);
                    return(
                        <div className={classes.productRow} key={i}>
                        <img src="https://myoffices.com/code/images/pictures/5.jpg" className={classes.productImage} />

                        <div className={classes.productData}>
                            <div className={classes.productName}>
                                {product.name}
                            </div>
                            <div className={classes.productPrice}>
                                {
                                    (item.count * +product.price).toFixed(2)
                                } лв.
                            </div>
                            <div className="mb-45">
                                Size: M
                            </div>
                            <div className={classes.productBottom}>
                            <div className="btn-group">
                                <Button size="small" variant="contained" color="primary" className={classes.optionButton} onClick={() => changeCount(product.id, item.size, +1)}>+</Button>
                                <TextField value={item.count} className={classes.counter} name="asd" type="text" variant="outlined" readOnly />
                                <Button size="small" variant="contained" color="primary" className={classes.optionButton} onClick={() => item.count == 1 ? null : changeCount(product.id, item.size, -1)}>-</Button>
                            </div>

                            <Tooltip title="remove">
                                <IconButton  className="mb-15" onClick={() => removeFromCart(product.id, item.size)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Tooltip>
                            </div>
                        </div>
                    </div>
                )}
                )
            }

            <Divider className="mb-30"/>
            <div className={classes.totalPrice}>
                Total price: <span className="font-weight-bold">
                    {total.toFixed(2)} лв.
                </span>
            </div>
            <div className="d-flex justify-content-between">
                <span></span>

            <ButtonGroup>
            <Button size="large" variant="contained">  
                <Link to="/products" className="no-decoration color-dark">
                    Continue shopping
                </Link>
            </Button>
                
                {
                    (cart.length != 0) && 
                    (
                        <Button size="large" variant="contained" color="primary">
                            <Link to="/order" className="no-decoration color-text">
                                Next
                            </Link>
                        </Button>
                    )
                }

            </ButtonGroup>
            </div>
            
        </div>
    );
}

export default Cart;
