import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "40px"
    },
    alignCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
    },
    restoreMsg: {
        fontSize: "30px",
        fontWeight: "bold"
    }
}))

const ForgotPassword = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [submit, setSubmit] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setSubmit(true);
    }

    if(submit) {
        return (
            <div className={classes.alignCenter}>
                <h2 className={classes.restoreMsg}>
                    Restore Password Email Sent!
                </h2>
            </div>
        )
    }

    return (
        <form className={classes.alignCenter} onSubmit={submitHandler}>
            <h3 className={classes.title}>
                Forgot Password
            </h3>
            <TextField type="email" label="Email" required variant="outlined" name="email" value={email} fullWidth className="mb-45" onChange={event => setEmail(event.target.value)}/>
            <div className="text-center">
                <Button variant="contained" color="primary" size="large" type="submit">
                    Restore
                </Button>
            </div>
      </form>
    );
}

export default ForgotPassword;
