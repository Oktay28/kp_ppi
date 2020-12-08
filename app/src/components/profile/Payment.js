import React, { useContext, useEffect } from 'react';
import { 
    makeStyles,
    Card,
    CardContent,
    Typography,
    Tooltip,
    IconButton
} from '@material-ui/core';
import { useMeLazyQuery, useRemoveCardMutation } from './graphql';
import GlobalContext from '../context/GlobalContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Loader from '../partials/Loader';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: [theme.breakpoints.values.md],
        margin: "0 auto"
    },
    title: {
        fontSize: 14,
    },
    inner: {
        padding: "30px 0"
    },
    noCardMsg: {
        fontSize: "24px",
        color: theme.palette.primary.dark,
        fontWeight: "bold",
        textAlign: "center"
    },
    savedCard: {
        fontSize: "20px",
        color: theme.palette.primary.dark,
        textAlign: "center"
    }
}));


const Payment = () => {

    const classes = useStyles();
    const { user } = useContext(GlobalContext);
    const [fetchProfile, { data, loading, refetch }] = useMeLazyQuery();
    const [removeCard, { loading: updateLoading }] = useRemoveCardMutation(refetch);

    useEffect(() => {
       
        fetchProfile({
            variables: {
                id: user?.id
            }
        })
    }, [user])

    if (!data) {
        return <Loader />;
    }

    let card;

    const me = data.me;
    try {
        card = me.card ? JSON.parse(me.card) : null;
    } catch {
        card = null;
    }

    return (
        <Card className={`${classes.root} ${(loading || updateLoading) ? "loading" : ""}`}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Saved Card
                </Typography>
                <div className={classes.inner}>

                    {
                        card ? 
                        (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className={classes.savedCard}>
                                    xxxx xxxx xxxx {card.number.slice(12, 16)}
                                </div>

                                <Tooltip title="remove">
                                    <IconButton  className="mb-15" onClick={() => removeCard({variables: {id: user.id}})}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) :
                        (
                            <h2 className={classes.noCardMsg}>No saved Card!</h2>
                        )
                        
                    }

                </div>

            </CardContent>
        </Card>
    )

}

export default Payment;