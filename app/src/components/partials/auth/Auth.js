import React, {useContext} from 'react';
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
import Registered from './Registered';
import ForgotPassword from './ForgotPassword';
import Img from '../../partials/Img';
import useUrlParams from '../../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(theme => ({
    leftSide: {
        backgroundColor: theme.palette.primary.main,
        padding: "50px 30px",
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        [theme.breakpoints.down("md")]: {
            padding: "30px 20px"
        }
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
        backgroundColor: "#ffffff",
        [theme.breakpoints.down("md")]: {
            padding: "20px"
        }
    },
    links: {
        display: "flex",
        justifyContent: "space-around"
    },
    loginLink: {
        color: theme.palette.primary.contrastText
    },
    authLogo: {
        maxWidth: "100%",
        [theme.breakpoints.down("xs")]: {
            width: "100px",
            objectFit: "cover"
        }
    }
}))

const Auth = () => {

    const classes = useStyles();
    const params = useUrlParams();
    const {pathname} = useLocation();
    const {push} = useHistory();
    const modal = params.get("modal");
    const {registered} = useContext(GlobalContext);

    let page = null;
    let isAuth = false;
    switch(modal) {
        case "login": {
            page = <Login />;
            isAuth = true;
            break;
        }
        case "register": {
            if(registered) {
                page = <Registered />;
            } else {
                page = <Register />;
            }
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

            <Dialog open={isAuth} onClose={handleClose} maxWidth="md" className={classes.dialog}>
          <DialogContent className="p-0">

            <Grid container>
                <Grid item xs={12} md={5} className={classes.leftSide}>
                    <div>
                    <Img src="/public/images/logo.png" className={classes.authLogo} />
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
