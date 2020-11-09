import React, {memo} from 'react';
import {
    makeStyles
} from '@material-ui/core';

const useClasses = makeStyles((theme) => ({
    root: {
        width: "0",
        backgroundColor: theme.palette.primary.main,
        overflow: "hidden",
        position: "fixed",
        transition: "all .2s linear",
        minHeight: "100vh",
        clipPath: "polygon(0 0, 75% 0, 100% 100%, 0% 100%)",
        zIndex: "10000"
    },
    sidebarContent: {
        marginTop: "100px",
        padding: "0 100px 0"
    },
    sidebarLink: {
        color: theme.palette.primary.contrastText,
        fontSize: "50px",
        marginBottom: "10px",
        fontWeight: "bold"
    }
}))

const Sidebar = () => {

    const classes = useClasses();

    return (
        <div id="main-sidebar" className={classes.root}>
            <div className={classes.sidebarContent}>
                <ul>
                    <li className={classes.sidebarLink}>Home</li>
                    <li className={classes.sidebarLink}>Shop</li>
                </ul>
            </div>
        </div>
    );
}

export default memo(Sidebar);
