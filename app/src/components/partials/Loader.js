import React, {memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
   loader: {
       width: "100%",
       maxHeight: "100%",
       height: "200px",
       display: "flex",
       justifyContent: "center",
       alignItems: "center"
   }
  }));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.loader}>
            <CircularProgress/>
        </div>
    );
}

export default memo(Loader);
