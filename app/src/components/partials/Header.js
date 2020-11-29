import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Cart from './cart/Cart';
import Search from './search/Search';
import Auth from './auth/Auth';
import Img from '../partials/Img';
import useUrlParams from '../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  headerIcons: {
    display: "flex"
  },
  logo: {
    height: "100%",
    width: "70px"
  }
}));

function Header() {
  const classes = useStyles();
  const params = useUrlParams();
  const {pathname} = useLocation();
  const {push} = useHistory();
  const modal = params.get("modal");

  const isMenu = (modal == "menu");

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{zIndex: "15000"}}>
        <Toolbar>
        <Link to={isMenu ? pathname : `${pathname}?modal=menu`} className={`header-link ${isMenu ? "active-header-link" : ""}`}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Link>

          <Link to="/">
            <Img src="/public/images/logo.png" className={classes.logo} />
          </Link>

          <div className={classes.grow} />
          <div className={classes.headerIcons}>
              <Search />
              <Cart />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Auth />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;