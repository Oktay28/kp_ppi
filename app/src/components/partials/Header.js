import React, {useContext, useState} from 'react';
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
import {useLocation, Link, NavLink, useHistory} from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import {
  Menu,
MenuItem
} from '@material-ui/core';

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
  },
  profileDropdown: {
    zIndex: "30000 !important",
    "& .MuiPaper-root": {
      top: "60px !important"
    }
  }
}));

function Header() {
  const classes = useStyles();
  const [modal, addModal, removeModal] = useUrlParams();
  const {user, logout} = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {push} = useHistory();

  const isMenu = (modal == "menu");

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const goToProfile = () => {
    push("/profile");
    handleMenuClose();
  }

  const logoutUser = () => {
    setAnchorEl(null);
    logout();
  }

  const menuId = "profile-dropdown";

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{zIndex: "15000"}}>
        <Toolbar>
        <Link to={isMenu ? removeModal : addModal("menu")} className={`header-link ${isMenu ? "active-header-link" : ""}`}>
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
              {
                user ?
                <IconButton
                edge="end"
                aria-label="profile dropdown"
                color="inherit"
                onClick={handleProfileMenuOpen}
                aria-controls={menuId}
              aria-haspopup="true"
              >
                <AccountCircle />
                </IconButton> 


              :
                <Auth />
              }

          </div>
        </Toolbar>
      </AppBar>

      <Menu
       anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      id={menuId}
      onClose={handleMenuClose}
      className={classes.profileDropdown}
    >
      <MenuItem onClick={goToProfile}>Profile</MenuItem>
      <MenuItem onClick={logoutUser}>Log out</MenuItem>
    </Menu>

    </div>
  );
}

export default Header;