import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import PasswordStrengthBar from 'react-password-strength-bar';
import {useRegisterMutation} from './graphql';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "30px"
    }
}))

const Login = () => {

    const classes = useStyles();
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [register, {loading, data}] = useRegisterMutation();
    const {setRegistered} = useContext(GlobalContext);

    useEffect(() => {
        if(data && data.register && (!data.register.error)) {
            setRegistered(true);
        }
    }, [data, loading])

    return (
        <div className={loading ? "loading" : ""}>

            <h3 className={classes.title}>
                Register
             </h3>
            <Formik
                initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}
                validate={values => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.name) {
                        errors.name = 'Required'
                    }

                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (values.password.length < 6) {
                        errors.password = 'Minimum 6 symbols'
                    }

                    if (!values.repeatPassword) {
                        errors.repeatPassword = 'Required'
                    } else if (values.repeatPassword != values.password) {
                        errors.repeatPassword = "Passwords do not match"
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    register({
                        variables: values
                    })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    dirty
                }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField onChange={handleChange} onBlur={(event) => handleBlur(event)} error={!!(errors.name && touched.name)} value={values.name} required label="Name" name="name" variant="outlined" fullWidth className="mb-15" helperText={(errors.name && touched.name && errors.name) || ""} />
                            <TextField onChange={handleChange} onBlur={handleBlur} error={!!(errors.email && touched.email)} value={values.email} required label="Email" name="email" variant="outlined" fullWidth className="mb-15" helperText={(errors.email && touched.email && errors.email) || ""} />
                            <TextField required onChange={handleChange} onBlur={(event) => { handleBlur(event); setPasswordFocus(false) }} onFocus={() => setPasswordFocus(true)} error={!!(errors.password && touched.password)} value={values.password} name="password" label="Password" type="password" variant="outlined" fullWidth className="mb-15" helperText={(errors.password && touched.password && errors.password) || ""} />
                            {
                                (passwordFocus && (!errors.password)) ?
                                    <PasswordStrengthBar className="mb-15" password={values.password} /> : ""
                            }

                            <TextField required onChange={handleChange} onBlur={handleBlur} error={!!(errors.repeatPassword && touched.repeatPassword)} name="repeatPassword" label="Repeat Password" type="password" variant="outlined" fullWidth className="mb-15" helperText={(errors.repeatPassword && touched.repeatPassword && errors.repeatPassword) || ""} />
                            <div className="text-center">
                                <Button type="submit" variant="contained" color="primary" size="large" disabled={!(isValid && dirty)}>
                                    Register
                                </Button>
                            </div>
                        </form>
                    )}
            </Formik>
        </div>
    );
}

export default Login;
