import React, {useState, useContext} from 'react';
import {
    TextField,
    Grid,
    Button
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import GlobalContext from '../context/GlobalContext';

const Form = () => {

    const [form, setForm] = useState({});
    const [send, setSend] = useState(1);
    const {user} = useContext(GlobalContext);

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setForm(oldForm => ({
            ...oldForm,
            [name]: value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setSend(2);
        setTimeout(() => {
            setSend(3);
        }, 500)
    }

    return (
        <div className={send==2 ? "loading" : ""}>
            {
                send == 3 ? <h2 style={{fontSize: "24px", marginTop: "40px", paddingBottom: "50px"}}>Message sent successfully!</h2> :
                (
                    <form onSubmit={submitHandler}>
                <Grid container spacing={3} className="mb-15">
                    {
                        user ? null :

                        (
                            <>

                        <Grid item xs={12} sm={6}>
                            <TextField label="Name" required name="name" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" required name="email" variant="outlined" fullWidth />
                        </Grid>

                            </>
                        )
                    }

                    <Grid item xs={12}>
                        <TextField label="Message" required name="message" variant="outlined" fullWidth rows={10} multiline/>
                    </Grid>
                </Grid>
                <div className="text-right">
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </div>
            </form>
                )
            }
            
        </div>
    );
}

export default Form;
