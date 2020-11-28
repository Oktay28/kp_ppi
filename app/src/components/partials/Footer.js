import React from 'react';

import {
    Grid,
    makeStyles,
    IconButton
} from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme => ({
    footer: {
        color: theme.palette.primary.contrastText,
        textAlign: "center"
    },
    footerTitle: {
        fontSize: "30px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "20px"
    },
    footerTop: {
        backgroundColor: theme.palette.primary.main,
        padding: "50px 0"
    },
    footerText: {
        marginBottom: "5px",
        fontSize: "18px"
    },
    footerIcon: {
        color: theme.palette.primary.contrastText
    },
    footerBottom: {
        backgroundColor: theme.palette.primary.dark,
        padding: "10px"
    }
}))

const FooterCol = ({children}) => {
    return <Grid item xs={12} sm={4} md={3}>
        {children}
    </Grid>
}

const FooterTitle = ({children}) => {
    const classes = useStyles();
    return (
        <h4 className={classes.footerTitle}>
            {children}
        </h4>
    )
}

const FooterText = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.footerText}>
            {children}
        </div>
    )
}

const Footer = () => {

    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.footerTop}>
                <Grid container spacing={3} justify="center">
                   <FooterCol>
                       <FooterTitle>
                           Contact
                       </FooterTitle>
                       <FooterText>
                           asd
                       </FooterText>
                       <FooterText>
                           asdasdasd
                       </FooterText>
                   </FooterCol>

                   <FooterCol>
                       <FooterTitle>
                            Social Links
                       </FooterTitle>
                       <div>
                           <IconButton>
                                <FacebookIcon className={classes.footerIcon} />
                           </IconButton>
                           <IconButton>
                                <InstagramIcon className={classes.footerIcon} />
                           </IconButton>
                           <IconButton>
                                <TwitterIcon className={classes.footerIcon} />
                           </IconButton>
                       </div>
                   </FooterCol>

                   <FooterCol>
                       <FooterTitle>
                           About us
                       </FooterTitle>
                       <FooterText>
                           Who are we?
                       </FooterText>
                   </FooterCol>
                </Grid>
            </div>
            <div className={classes.footerBottom}>
                <FooterText>
                    &copy; 2020
                </FooterText>
            </div>
        </footer>
    );
}

export default Footer;
