import React from 'react';
import {
    Grid,
    makeStyles,
    IconButton
} from '@material-ui/core';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import Form from './Form';

const useStyles = makeStyles(theme => ({
    contacts: {
        padding: "50px 0"
    },
    colLeft: {
        backgroundColor: theme.palette.primary.main,
        padding: "50px",
        paddingRight: "100px",
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        [theme.breakpoints.down("md")]: {
            borderRadius: 0,
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            padding: "30px"
        }
    },
    cols: {
        padding: "20px",
        paddingBottom: "20px",
        marginBottom: "50px"
    },
    separator: {
        width: "100%",
        height: "4px",
        borderRadius: "8px",
        backgroundColor: theme.palette.primary.contrastText,
        margin: "10px 0 30px"
    },
    contactTitle: {
        fontSize: "30px",
        marginBottom: "30px",
        fontWeight: "bold"
    },
    contactIcon: {
        fontSize: "30px",
        marginRight: "15px",
        color: theme.palette.primary.contrastText
    },
    socialMediaIcon: {
        fontSize: "30px",
        color: theme.palette.primary.contrastText
    },
    link: {
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
        fontSize: "20px",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    text: {
        fontSize: "20px",
        lineHeight: 1.2
    },
    colRight: {
        padding: "50px",
        backgroundColor: "#ffffff",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        [theme.breakpoints.down("md")]: {
            borderRadius: 0,
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            padding: "30px"
        }
    },
    rightTitle: {
        color: theme.palette.primary.dark
    }
}))

const Contacts = () => {

    const classes = useStyles();

    return (
        <div className={classes.contacts}>
            <Grid container justify="center" className={classes.cols}>
                <Grid item xs={12} md={6} lg={4} xl={3} className={classes.colLeft}>
                    <h3 className={classes.contactTitle}>
                        Contact us
                    </h3>
                    <div className="d-flex mb-15 align-items-center">
                        <LocalPhoneIcon className={classes.contactIcon}/>
                        <a href="tel:08 7342 1818" className={classes.link}>08 7342 1818</a>
                    </div>
                    <div className={classes.separator} />

                    <div className="d-flex mb-15 align-items-center">
                        <LocationOnIcon className={classes.contactIcon}/>
                        <div className={classes.text}>
                            ул. „Студентска“ 1, 9010 Левски, Варна
                        </div>

                    </div>
                    <div className={classes.separator} />

                    <div className="d-flex mb-15 align-items-center">
                        <MailOutlineIcon className={classes.contactIcon}/>
                        <a href="mailto:iron.wolf@gmail.com" className={classes.link}>iron.wolf@gmail.com</a>
                    </div>
                    <div className={classes.separator} />

                    <div>
                            <IconButton >
                                <FacebookIcon className={classes.socialMediaIcon} />
                           </IconButton>
                           <IconButton>
                                <InstagramIcon className={classes.socialMediaIcon} />
                           </IconButton>
                           <IconButton>
                                <TwitterIcon className={classes.socialMediaIcon} />
                           </IconButton>
                    </div>
                    
                </Grid>

                <Grid item xs={12} md={6} lg={5} xl={4} className={classes.colRight}>
                    <h3 className={`${classes.contactTitle} ${classes.rightTitle}`}>
                        Send a message
                    </h3>
                   <Form />
                </Grid>
            </Grid>
            <iframe title="contact" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.3325213631815!2d27.9328809154839!3d43.22348747913847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4543ef7683cfb%3A0xbb9c00bf3e90d5d1!2z0KLQtdGF0L3QuNGH0LXRgdC60Lgg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiAtINCS0LDRgNC90LA!5e0!3m2!1sbg!2sbg!4v1606584614793!5m2!1sbg!2sbg" width="100%" height="600px" frameBorder="0"  allowFullScreen="1" aria-hidden="false" tabIndex="0"></iframe>
        </div>
    );
}

export default Contacts;
