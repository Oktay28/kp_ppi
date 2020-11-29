import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "30px"
    },
    forgotPassword: {
        color: theme.palette.primary.dark
    }
}))

const Login = () => {

    const classes = useStyles();
    const {pathname} = useLocation();

    return (
        <form>
            <h3 className={classes.title}>
                Login
            </h3>
            <TextField label="Email" variant="outlined" fullWidth className="mb-30"/>
            <TextField label="Password" type="password" variant="outlined" fullWidth className="mb-30" />
            <div className="text-center">
                <Button variant="contained" color="primary" size="large">
                    Login
                </Button>
            </div>
            <Link to={`${pathname}?modal=forgot-password`} className={classes.forgotPassword}>
                Forgot Password?
            </Link>
      </form>
    );
}

export default Login;
