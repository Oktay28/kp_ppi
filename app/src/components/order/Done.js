import React, {useEffect, useContext} from 'react';
import {
    makeStyles
} from '@material-ui/core';
import Img from '../partials/Img'
import GlobalContext from '../context/GlobalContext';
import {useSaveCardMutation} from './graphql';
import Loader from '../partials/Loader';

const useStyles = makeStyles(theme => ({
    done: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center"
    },
    doneImg: {
        maxWidth: "100%",
        marginBottom: "50px"
    },
    doneMsg: {
        fontSize: "30px",
        color: theme.palette.primary.dark
    }
}))

const Done = ({data}) => {
    const classes = useStyles();
    const {clearCart, user} = useContext(GlobalContext);
    const [saveCard, {data: saveCardData}] = useSaveCardMutation();
    console.log(data)
    const isSave = data.form3.payment == 3 && data.form3.save_card;
    useEffect(() => {

        if(isSave) {
            saveCard({
                variables: {
                    name: data.form3.name,
                    cvv: data.form3.cvv,
                    month: data.form3.month,
                    year: data.form3.year,
                    number: data.form3.number,
                    user_id: user?.id
                }
            })
        } 

        clearCart();
    }, [isSave, user])

    if(isSave && !saveCardData) {
        return <Loader />;
    }

    return (
        <div className={classes.done}>
            <Img src="/public/images/orderDone.png" className={classes.doneImg} />
            <div className={classes.doneMsg}>
            The order is being processed and will be with you soon. 
                Thank you so much for shopping with us!
            </div>
        </div>
    )

}

export default Done;