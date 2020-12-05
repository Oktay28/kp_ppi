import React, {memo} from 'react';
import {
    makeStyles
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useUrlParams from '../../hooks/useUrlParams';

const useClasses = makeStyles({
    sidebarToggle: {
        backgroundColor: "rgba(0, 0, 0, .7)",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        right: 0,
        display: "none",
        zIndex: "5000",
        cursor: "pointer"
    }
})

const SidebarToggler = () => {
    const classes = useClasses();
    const [, , removeModal] = useUrlParams();

    return (
        <Link to={removeModal} id="sidebar-toggler" className={classes.sidebarToggle}>
            
        </Link>
    );
}

export default memo(SidebarToggler);
