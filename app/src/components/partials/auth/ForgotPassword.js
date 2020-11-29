import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "40px"
    },
    alignCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
    }
}))

const ForgotPassword = () => {

    const classes = useStyles();

    return (
        <form className={classes.alignCenter}>
            <h3 className={classes.title}>
                Forgot Password
            </h3>
            <TextField label="Email" variant="outlined" fullWidth className="mb-45"/>
            <div className="text-center">
                <Button variant="contained" color="primary" size="large">
                    Restore
                </Button>
            </div>
      </form>
    );
}

export default ForgotPassword;
