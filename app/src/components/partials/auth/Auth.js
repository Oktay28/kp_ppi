import React from 'react';
import { 
    makeStyles,
    Grid,
    IconButton
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Img from '../../partials/Img';
import useUrlParams from '../../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    leftSide: {
        backgroundColor: theme.palette.primary.main,
        padding: "50px 30px",
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    leftTitle: {
        fontSize: "30px",
        fontWeight: "bold",
        marginTop: "20px",
        color: theme.palette.primary.contrastText,
        textDecoration: "none"
    },
    active: {
        textDecoration: "underline"
    },
    dialog: {
        "& .MuiPaper-rounded": {
            borderRadius: "18px"
        }
    },
    rightSide: {
        padding: "30px 50px",
        backgroundColor: "#ffffff"
    },
    links: {
        display: "flex",
        justifyContent: "space-around"
    },
    loginLink: {
        color: theme.palette.primary.contrastText
    }
}))

const Auth = () => {

    const classes = useStyles();
    const params = useUrlParams();
    const {pathname} = useLocation();
    const {push} = useHistory();
    const modal = params.get("modal");

    let page = null;
    let isAuth = false;
    switch(modal) {
        case "login": {
            page = <Login />;
            isAuth = true;
            break;
        }
        case "register": {
            page = <Register />;
            isAuth = true;
            break;
        }
        case "forgot-password": {
            page = <ForgotPassword />;
            isAuth = true;
            break;
        }
    }
  
    const handleClose = () => {
      push(pathname);
    };

    return (
        <div>
             <Link to={isAuth ? pathname : `${pathname}?modal=login`} className={`header-link ${isAuth ? "active-header-link" : ""}`}>
                <IconButton color="inherit">
                    <ExitToAppIcon />
                </IconButton>
                </Link>
         

            <Dialog open={isAuth} onClose={handleClose} maxWidth="md" fullWidth className={classes.dialog}>
          <DialogContent className="p-0">

            <Grid container>
                <Grid item xs={12} md={5} className={classes.leftSide}>
                    <div>
                    <Img src="/public/images/logo.png" />
                    </div>
                    <div className={classes.links}>
                        <Link to={`${pathname}?modal=login`} className={`${classes.leftTitle} ${modal == "login" ? classes.active : ""}`}>
                            Login
                        </Link>
                        <Link to={`${pathname}?modal=register`} className={`${classes.leftTitle} ${modal == "register" ? classes.active : ""}`}>
                            Register
                        </Link>
                    </div>
                </Grid>

                <Grid item xs={12} md={7} className={classes.rightSide}>
                   {page}
                </Grid>
            </Grid>

          </DialogContent>
        </Dialog>
        </div>
    );
}

export default Auth;
