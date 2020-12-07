import React, {memo} from 'react';
import {Link, NavLink} from 'react-router-dom';
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
        marginBottom: "20px",
        fontWeight: "bold",
        textDecoration: "none",
        display: "inline-block"
    },
    activeSidebar: {
        color: theme.palette.primary.dark
    }
}))

const SidebarLink = ({to, children, ...rest}) => {
    const classes = useClasses();
    return (
        <NavLink to={to} className={classes.sidebarLink} activeClassName={classes.activeSidebar} {...rest}>{children}</NavLink>
    )
}

const Sidebar = () => {
    const classes = useClasses();

    return (
        <div id="main-sidebar" className={classes.root}>
            <div className={classes.sidebarContent}>
                <ul>
                    <li>
                        <SidebarLink to="/" exact>Home</SidebarLink>
                    </li>
                    <li>
                        <SidebarLink to="/products">Products</SidebarLink>
                    </li>
                    <li>
                        <SidebarLink to="/contacts">Contacts</SidebarLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default memo(Sidebar);
