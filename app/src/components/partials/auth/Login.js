import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { useLoginLazyQuery } from './graphql';
import Alert from '@material-ui/lab/Alert';
import {toast} from 'react-toastify';
import GlobalContext from '../../context/GlobalContext';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontSize: "28px",
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: "30px"
    },
    forgotPassword: {
        color: theme.palette.primary.dark,
        marginTop: "10px",
        display: "inline-block"
    }
}))

const Login = () => {

    const classes = useStyles();
    const { pathname } = useLocation();
    const [login, {data, loading, error}] = useLoginLazyQuery();
    const {logUser} = useContext(GlobalContext);

    useEffect(() => {
        if(data && data.login) {
            window.localStorage.setItem("id", data.login.id);
            toast.success("Logged in!")
            logUser({
                variables: {id: data.login.id}
            })
        }
    }, [data])

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};

                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required'
                } else if (values.password.length < 6) {
                    errors.password = 'Minimum 6 symbols'
                }

                return errors;
            }}
            onSubmit={(values) => {
                login({
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
                    <form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
                        <h3 className={classes.title}>
                            Login
                    </h3>
                    {
                        error && <Alert severity="error" className="mb-30">{error.message}</Alert>
                    }
                        <TextField onChange={handleChange} onBlur={handleBlur} error={!!(errors.email && touched.email)} value={values.email} required label="Email" name="email" variant="outlined" fullWidth className="mb-15" helperText={(errors.email && touched.email && errors.email) || ""} />
                        <TextField required onChange={handleChange} onBlur={handleBlur} error={!!(errors.password && touched.password)} value={values.password} name="password" label="Password" type="password" variant="outlined" fullWidth className="mb-15" helperText={(errors.password && touched.password && errors.password) || ""} />

                        <div className="text-center">
                            <Button type="submit" variant="contained" color="primary" size="large" disabled={!(isValid && dirty)}>
                                Login
                            </Button>
                        </div>

                        <Link to={`${pathname}?modal=forgot-password`} className={classes.forgotPassword}>
                            Forgot Password?
            </Link>
                    </form>
                )}
        </Formik>
    );
}

export default Login;
