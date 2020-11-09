import React, {createRef, useState, memo} from 'react';
import {
    makeStyles,
    IconButton,
    Tooltip
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(theme => ({
    root: {
        width: "40px",
        height: "40px",
        position: "fixed",
        right: "-100px",
        transition: "all .4s",
        bottom: "50px",
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        fontSize: "20px",
        borderRadius: "50%",
        zIndex: 10
    },
    activeButton: {
        right: "50px",
    }
}))

const goTopref = createRef();

const GoTop = () => {

    const classes = useStyles();
    const [disable, setDisable] = useState(true);

    goTopref.current = setDisable;

    return (
            <Tooltip title="Go Top" className={`${classes.root} ${disable ? "" : classes.activeButton}`} onClick={() => window.scrollTo(0, 0)}>
                <IconButton>
                    <PublishIcon />
                </IconButton>
            </Tooltip>
    );
}

export default memo(GoTop);
export {
    goTopref
}
