import React from 'react';
import {
    makeStyles,
    createStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => createStyles({
    '@global': {
        ".active-header-link": {
            color: `${theme.palette.primary.dark} !important`
        },
        ".header-link": {
            color: theme.palette.primary.contrastText
        }
    }
}))

const GlobalStyles = () => {
    useStyles();
    return null;
}

export default GlobalStyles;
