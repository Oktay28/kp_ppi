import React, {memo} from 'react';
import {
    makeStyles
} from '@material-ui/core';

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

const SidebarToggler = ({app}) => {
    const classes = useClasses();

    return (
        <div id="sidebar-toggler" className={classes.sidebarToggle} onClick={() => app.current.classList.toggle("sidebar-open")}>
            
        </div>
    );
}

export default memo(SidebarToggler);
