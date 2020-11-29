import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "30px",
        textAlign: "left",
        fontWeight: "bold",
        marginBottom: "30px",
        marginTop: "50px"
    },
    gotoLogin: {
        color: theme.palette.primary.dark,
        marginTop: "10px",
        display: "inline-block",
        fontSize: "20px"
    }
}))

const Registered = () => {

    const classes = useStyles();
    const {pathname} = useLocation();

    return (
        <div>
            <h3 className={classes.title}>
                You have been successfully registered!
            </h3>
            <Link to={`${pathname}?modal=login`} className={classes.gotoLogin}>
                Login
            </Link>
      </div>
    );
}

export default Registered;
