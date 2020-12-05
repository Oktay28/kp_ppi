import React from 'react';
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
      fontSize: "40px"
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
      flex: "1"
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
    }
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const Cart = () => {

    const classes = useStyles();
    const [modal, addModal, removeModal] = useUrlParams();
    const {push} = useHistory();

    const isCart = (modal == "cart");

    const handleClose = () => {
      push(removeModal);
    };

    const products = [1];

    return (
        <div>
           <Link to={isCart ? removeModal : addModal("cart")} className={`header-link ${isCart ? "active-header-link" : ""}`}>
                <IconButton color="inherit">
                  <ShoppingCartIcon />
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
            products.length ? 

            <>

            {
              products.map(product => (
                <ListItem key={product}>
       
            <Grid container spacing={2} className="mb-30">
              <Grid item xs={12} md={8}>
                  <div className={`${classes.productRow} ${classes.productImageRow}`}>
                    <img src="https://photojournal.jpl.nasa.gov/jpeg/PIA23689.jpg" className={classes.img} />
                    <div className={classes.productName}>
                      product name here
                    </div>
                </div>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <div className={classes.productRow}>
                    <div className={classes.productPrice}>
                      20 lv.
                    </div>
                    <Tooltip title="remove">
                      <IconButton  className="mb-15">
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                </div>
              </Grid>
  
            </Grid>
        
          </ListItem>
              ))
            }

          <Divider className="mb-30"/>
          <div className={classes.cartBottom}>
            <div className={classes.totalPrice}>
              Total cost: <span className="font-weight-bold">123.45 lv</span>
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
