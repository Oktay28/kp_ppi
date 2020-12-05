import React from 'react';
import {
    makeStyles,
    ButtonGroup,
    TextField,
    Button,
    IconButton,
    Tooltip,
    Divider
} from '@material-ui/core';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyle = makeStyles(theme => ({
    root: {
        padding: "50px",
        [theme.breakpoints.down("xs")]: {
            padding: "10px"
        }
    },
    productRow: {
        display: "flex",
        marginBottom: "60px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column"
        }
    },
    productImage: {
        width: "250px",
        height: "250px",
        objectFit: "cover",
        marginRight: "50px",
        [theme.breakpoints.down("xs")]: {
            marginRight: "0",
            width: "100%"
        }
    },
    optionButton: {
        backgroundColor: theme.palette.primary.dark,
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "24px",
        width: "40px",
        height: "40px",
        padding: 0,
        minWidth: "40px",
        "&:hover": {
            backgroundColor: theme.palette.primary.main
        }
    },
    counter: {
        "& input": {
            textAlign: "center",
            fontWeight: "bold",
            padding: "0px",
            width: "40px",
            height: "40px",
            backgroundColor: "#ffffff",
        }
    },
    productName: {
        fontSize: "34px",
        fontWeight: "bold",
        marginBottom: "20px"
    },
    productPrice: {
        fontSize: "20px",
        marginBottom: "15px"
    },
    productData: {
        display: "flex",
        flexDirection: "column",
        flex: "1"
    },
    productBottom: {
        flex: "1",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    totalPrice: {
        fontSize: "30px",
        marginBottom: "20px"
    }
}))

const Cart = () => {

    const classes = useStyle();

    const products = [1,2];

    return (
        <div className={classes.root}>
            {
                products.map(product => (
<div className={classes.productRow}>
                <img src="https://myoffices.com/code/images/pictures/5.jpg" className={classes.productImage} />

                <div className={classes.productData}>
                    <div className={classes.productName}>
                        Men's Suit
                    </div>
                    <div className={classes.productPrice}>
                        12.00 lv
                    </div>
                    <div className="mb-45">
                        Size: M
                    </div>
                    <div className={classes.productBottom}>
                    <div className="btn-group">
                        <Button size="small" variant="contained" color="primary" className={classes.optionButton}>+</Button>
                        <TextField value={1} className={classes.counter} name="asd" type="text" variant="outlined" />
                        <Button size="small" variant="contained" color="primary" className={classes.optionButton}>-</Button>
                    </div>

                    <Tooltip title="remove">
                      <IconButton  className="mb-15">
                        <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                    </div>
                </div>
            </div>
                ))
            }

            <Divider className="mb-30"/>
            <div className={classes.totalPrice}>
                Total price: <span className="font-weight-bold">12.00 lv</span>
            </div>
            <div className="d-flex justify-content-between">
                <span></span>

                <ButtonGroup>
                <Button size="large" variant="contained">Continue shopping</Button>
                <Button size="large" variant="contained" color="primary">Next</Button>
            </ButtonGroup>
            </div>
            
        </div>
    );
}

export default Cart;
