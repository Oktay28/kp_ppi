import React, {useState} from 'react';
import {
    TextField,
    Grid,
    Button
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Form = () => {

    const [form, setForm] = useState({});

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setForm(oldForm => ({
            ...oldForm,
            [name]: value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(form);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <Grid container spacing={3} className="mb-15">
                    <Grid item xs={12} sm={6}>
                        <TextField label="Name" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Message" variant="outlined" fullWidth rows={10} multiline/>
                    </Grid>
                </Grid>
                <div className="text-right">
                <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Form;
