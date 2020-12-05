import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import useUrlParams from '../../../hooks/useUrlParams';

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
    const [, addModal] = useUrlParams();

    return (
        <div>
            <h3 className={classes.title}>
                You have been successfully registered!
            </h3>
            <Link to={addModal("login")} className={classes.gotoLogin}>
                Login
            </Link>
      </div>
    );
}

export default Registered;
