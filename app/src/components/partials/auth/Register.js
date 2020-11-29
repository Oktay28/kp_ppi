import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "30px"
    }
}))

const Login = () => {

    const classes = useStyles();

    return (
        <form>
            <h3 className={classes.title}>
                Register
            </h3>
            <TextField label="Name" variant="outlined" fullWidth className="mb-15"/>
            <TextField label="Email" variant="outlined" fullWidth className="mb-15"/>
            <TextField label="Password" type="password" variant="outlined" fullWidth className="mb-15" />
            <TextField label="Repeat Password" type="password" variant="outlined" fullWidth className="mb-15" />
            <div className="text-center">
                <Button variant="contained" color="primary" size="large">
                    Register
                </Button>
            </div>
      </form>
    );
}

export default Login;
