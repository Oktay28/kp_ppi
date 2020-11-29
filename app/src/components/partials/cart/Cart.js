import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import useUrlParams from '../../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    cartDialog: {}
  }));
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const Cart = () => {

    const classes = useStyles();
    const params = useUrlParams();
    const {pathname} = useLocation();
    const {push} = useHistory();
    const modal = params.get("modal");

    const isCart = (modal == "cart");

    const handleClose = () => {
      push(pathname);
    };

    return (
        <div>
           <Link to={isCart ? pathname : `${pathname}?modal=cart`} className={`header-link ${isCart ? "active-header-link" : ""}`}>
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
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
        </div>
    );
}

export default Cart;
