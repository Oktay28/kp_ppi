import React, {useContext, useEffect} from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import useUrlParams from '../../../hooks/useUrlParams';
import {Link, useHistory} from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import GlobalContext from '../../context/GlobalContext';
import {useCartLazyProducts} from './graphql';
import Loader from '../Loader';
import Img from '../Img';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    cartDialog: {},
    list: {
      padding: "50px",
      [theme.breakpoints.down("xs")]: {
        padding: "20px"
      }
    },
    img: {
      width: "200px",
      height: "200px",
      marginRight: "30px",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginRight: 0
      }
    },
    productName: {
      fontSize: "40px",
      marginRight: "15px"
    },
    productRow: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.primary.dark,
      height: "100%"
    },
    productImageRow: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "flex-start"
      }
    },
    productPrice: {
      fontSize: "30px",
      color: theme.palette.primary.dark,
      fontWeight: "bold",
      marginBottom: "10px"
    },
    totalPrice: {
      fontSize: "26px",
      marginBottom: "15px"
    },
    empty: {
      fontWeight: "bold",
      color: theme.palette.primary.dark,
      fontSize: "40px",
      marginBottom: "30px",
      textAlign: "center"
    },
    cartBottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start"
      }
    },
    dot: {
      backgroundColor: theme.palette.primary.dark,
      position: "absolute",
      right: "0",
      bottom: "0",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      fontSize: "14px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #ffffff"
    },
    size: {
      fontSize: "16px",
      marginLeft: "10px"
    },
    count: {
      fontSize: "16px",
      marginTop: "10px"
    },
    priceColumn: {
      flex: "1"
    }
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const Cart = () => {

    const classes = useStyles();
    const [modal, addModal, removeModal] = useUrlParams();
    const {push} = useHistory();
    const {cart, removeFromCart} = useContext(GlobalContext);
    const [fetchProducts, {data, loading}] = useCartLazyProducts();

    const isCart = (modal == "cart");

    const handleClose = () => {
      push(removeModal);
    };

    useEffect(() => {
      if(isCart) {
        fetchProducts({
          variables: {
            ids: cart.map(item => item.id)
          }
        })
      }
    }, [isCart])
    if(loading) {
      return <Loader />
    }


    const products = (data && data.cartItems) || [];
    let total = 0;

    return (
        <div>
           <Link to={isCart ? removeModal : addModal("cart")} className={`header-link position-relative${isCart ? "active-header-link" : ""}`}>
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                  {
                    cart.length ? <span className={classes.dot}>{cart.length}</span> : null
                  }
                </IconButton>
            </Link>

            <Dialog fullScreen open={isCart} onClose={handleClose} TransitionComponent={Transition} style={{zIndex: "30000"}} id="cart-dialog">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cart
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List className={classes.list}>

          {
            (cart.length && products.length) ? 

            <>

            {
              cart.map((item, i) => {
                const product = products.find(product => product.id == item.id) || {}
                total += (item.count * +product.price);
                return(
                <ListItem key={i}>
       
            <Grid container spacing={2} className="mb-30">
              <Grid item xs={12} md={8}>
                  <div className={`${classes.productRow} ${classes.productImageRow}`}>
                    <Img src={product.image} className={classes.img} />
                    <div className={classes.productName}>
                      {product.name} <span className={classes.size}>{item.size}</span> 
                    </div>
                </div>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <div className={classes.productRow}>
                  <div className={classes.priceColumn}>
                  <div className={classes.productPrice}>
                     
                    {(item.count * +product.price).toFixed(2)} лв.
                    </div>
                    <div>
                      {
                        (item.count != 1) &&<span className={classes.count}>({item.count} x {(+product.price).toFixed(2)} лв.)</span>
                      }
                    </div>
                  </div>

                    <Tooltip title="remove">
                      <IconButton  className="mb-15" onClick={() => removeFromCart(product.id, item.size)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                </div>
              </Grid>
  
            </Grid>
        
          </ListItem>
              )})
            }

          <Divider className="mb-30"/>
          <div className={classes.cartBottom}>
            <div className={classes.totalPrice}>
              Total cost: <span className="font-weight-bold">{total.toFixed(2)} лв.</span>
            </div>

            <Link to="/cart" className="no-decoration">
            <Button
              variant="contained"
              color="primary"
              endIcon={<ShoppingCartIcon />}
            >
              Shop Now
            </Button>
            </Link>
          </div>
            </>
             :
            <h2 className={classes.empty}>
              Empty cart
            </h2>
          }

        </List>
      </Dialog>
        </div>
    );
}

export default Cart;
