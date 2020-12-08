import React, { useContext, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import GlobalContext from '../context/GlobalContext';
import { useMeLazyQuery } from './graphql';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';


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
    }
}));

let isSubmit = false;

const General = () => {
    const classes = useStyles();
    const { user } = useContext(GlobalContext);
    const [fetchProfile, { data }] = useMeLazyQuery();
    const [edit, setEdit] = useState(false);
    useEffect(() => {
       
        fetchProfile({
            variables: {
                id: user?.id
            }
        })
    }, [user])

    if (!data) {
        return "loading...";
    }

    const me = data.me || {};

    return (
        <Formik
            initialValues={{ name: me.name, email: me.email, birth_year: me.birth_year, address: me.address, phone: me.phone }}
            validate={values => {
                const errors = {};

                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (!values.name) {
                    errors.name = 'Required'
                } else if (!(/^[a-zA-Z ]+$/.test(values.name))) {
                    errors.name = "Invalid format"
                }

                return errors;
            }}
            onReset={resetForm => {
                isSubmit = false
                setEdit(false);
            }}
            onSubmit={(values) => {
                if(isSubmit) {
                    console.log(11)
                } else {
                    isSubmit = true;
                }
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
                dirty,
                handleReset,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Profile
                            </Typography>
                            <div className={classes.inner}>

                        
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableBody>


                                                <TableRow>
                                                    <TableCell component="th" scope="row" className="font-weight-bold">
                                                        Name
                                                    </TableCell>
 
                                                           
                                                            <TableCell align="right">
                                                                {
                                                                edit ?
                                                                 <TextField onChange={handleChange} onBlur={(event) => handleBlur(event)} error={!!(errors.name && touched.name)} value={values.name} required label="Name" name="name" fullWidth helperText={(errors.name && touched.name && errors.name) || ""} /> :
                                                                me.name
                                                                }
                                                                </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row" className="font-weight-bold">
                                                        Email
                                                    </TableCell>
                                                    <TableCell align="right">
                                                                {
                                                                edit ?
                                                                <TextField onChange={handleChange} onBlur={handleBlur} error={!!(errors.email && touched.email)} value={values.email} type="email" required label="Email" name="email" fullWidth helperText={(errors.email && touched.email && errors.email) || ""} /> :
                                                                me.email
                                                                }
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row" className="font-weight-bold">
                                                        Birth date
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {
                                                            edit ? 
                                                            <TextField
                                                            fullWidth
                                                            id="date"
                                                            label="Birthday"
                                                            type="date"
                                                            defaultValue={values.date_year || ""}
                                                            className={classes.textField}
                                                            InputLabelProps={{
                                                              shrink: true,
                                                            }}
                                                          />: 
                                                          me.birth_year
                                                        }
                                                        </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row" className="font-weight-bold">
                                                        Address
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {
                                                            edit ? 
                                                            <TextField onChange={handleChange} value={values.address || ""} label="Address" name="address" fullWidth /> :
                                                            me.address
                                                        }
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row" className="font-weight-bold">
                                                        Phone
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {
                                                            edit ? 
                                                            <TextField onChange={handleChange} value={values.phone || ""} label="Phone" name="phone" type="tel" fullWidth /> :
                                                            me.phone
                                                        }
                                                    </TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>


                            </div>

                        </CardContent>
                        <CardActions>
                            <Button type={edit ? "submit" : "button"} size="small" variant="contained" color="primary" onClick={() => (edit ? null : setEdit(true))}>{edit ? "Save" : "Edit" }</Button>

                            {
                                edit ? <Button type="button" size="small" variant="contained" color="primary" onClick={resetForm}>Cancel</Button> : null
                            }
                            
                        </CardActions>
                    </Card>
                    </form>
                )}
        </Formik>
    );
}

export default General;
