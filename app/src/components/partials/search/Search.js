import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import useUrlParams from '../../../hooks/useUrlParams';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  searchDialog: {
    "& .MuiPaper-root": {
      padding: "20px 20px 50px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px"
      }
    },
    "& .MuiDialogContent-root": {
      [theme.breakpoints.down("xs")]: {
        padding: "10px"
      }
    }
  },
  title: {
    "& h2": {
      fontSize: "30px !important"
    }
  },
  nothingFound: {
    fontSize: "30px",
    fontWeight: "bold"
  },
  searchRow: {
    display: "flex",
    marginBottom: "10px",
    cursor: "pointer",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText
    }
  },
  searchImg: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    marginRight: "20px"
  },
  searchName: {
    fontSize: "24px",
    color: theme.palette.primary.dark
  },
  loadMore: {
    width: "100%",
    display: "block"
  },
  totalFound: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px"
  }
}));

const Search = () => {
    const [modal, addModal, removeModal] = useUrlParams();
    const {push} = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("");

    useEffect(() => {
      if(name) {

      }
    }, [name])
  
    const handleClose = () => {
      push(removeModal);
    };

    const isSearch = (modal == "search");

    const products = [1, 2, 3];

    return (
      <div>
          <Link to={isSearch ? removeModal : addModal("search")} className={`header-link ${isSearch ? "active-header-link" : ""}`}>
            <IconButton color="inherit">
                <SearchIcon />
            </IconButton>
          </Link>

        <Dialog open={isSearch} onClose={handleClose} fullWidth maxWidth="md" className={classes.searchDialog}>
          <DialogTitle className={classes.title}><SearchIcon /> Search</DialogTitle>
          <DialogContent>
            <TextField onChange={event => setName(event.target.value)} value={name} name="name" label="Search by name" type="text" variant="outlined" fullWidth className="mb-30" />
            {
              name && (products.length ? 

              <>
              <h2 className={classes.totalFound}>Total 42 items found</h2>
                {
                  products.map(product => (
                    <Link to="/" className="no-decoration" key={product} >
                      <div className={classes.searchRow}>
                      <img src="https://s23527.pcdn.co/wp-content/uploads/2020/01/100k-moon.jpg.optimal.jpg" className={classes.searchImg} />
                      <span className={classes.searchName}>
                        Product name here
                      </span>
                    </div>
                    </Link>
                  ))
                }
                <Link to="/" className="no-decoration">
                  <Button className={classes.loadMore} size="large" variant="contained" color="primary">
                    Load more
                  </Button>
                </Link>
              </> :
              <h2 className={classes.nothingFound}>
                  No items found
              </h2>)
            }

          </DialogContent>
        </Dialog>
      </div>
    );
}

export default Search;
