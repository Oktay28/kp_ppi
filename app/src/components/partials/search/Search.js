import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import useUrlParams from '../../../hooks/useUrlParams';
import {Link, useHistory} from 'react-router-dom';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({

}));

const Search = () => {
    const [modal, addModal, removeModal] = useUrlParams();
    const {push} = useHistory();
    const classes = useStyles();
  
    const handleClose = () => {
      push(removeModal);
    };

    const isSearch = (modal == "search");

    return (
      <div>
          <Link to={isSearch ? removeModal : addModal("search")} className={`header-link ${isSearch ? "active-header-link" : ""}`}>
            <IconButton color="inherit">
                <SearchIcon />
            </IconButton>
          </Link>

        <Dialog open={isSearch} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
        </Dialog>
      </div>
    );
}

export default Search;
