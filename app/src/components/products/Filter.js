import React, {useState, usestate} from 'react';

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

const useStyles = makeStyles(theme => ({
    button: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "all .3s",
        color: theme.palette.primary.dark,
        fontWeight: "bold",
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
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <div className={classes.filter}>
                <span className={classes.button} role="button" onClick={handleClickOpen}>
                    <FilterListRoundedIcon /> Filter
                </span>
            </div>
            <Dialog
            maxWidth="md"
        open={open}
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
