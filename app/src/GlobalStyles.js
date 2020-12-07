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
        },
        ".color-text": {
            color: theme.palette.primary.contrastText
        },
        ".color-dark": {
            color: theme.palette.primary.dark
        },
        ".Toastify__toast--info": {
            backgroundColor: `${theme.palette.primary.dark} !important`
        }
    }
}))

const GlobalStyles = () => {
    useStyles();
    return null;
}

export default GlobalStyles;
