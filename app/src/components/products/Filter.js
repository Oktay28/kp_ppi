import React from 'react';

import {
    makeStyles,
    Button
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

import useUrlParams from '../../hooks/useUrlParams';
import {useLocation, Link, useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "all .3s",
        color: theme.palette.primary.dark,
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
            transform: "scale(1.1)"
        }
    },
    filter: {
        padding: "30px",
        display: "flex",
        justifyContent: "flex-end"
    }
}))

const Filter = () => {

    const classes = useStyles();
    const params = useUrlParams();
    const {pathname} = useLocation();
    const {push} = useHistory();
    const modal = params.get("modal");

    const handleClose = () => {
      push(pathname);
    };

    const isFilter = (modal == "filter");

    return (
        <div>
            <div className={classes.filter}>
                <Link className={classes.button} role="button" to={isFilter ? pathname : `${pathname}?modal=filter`}>
                    <FilterListRoundedIcon /> Filter
                </Link>
            </div>
            <Dialog
            maxWidth="md"
        open={isFilter}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default Filter;
