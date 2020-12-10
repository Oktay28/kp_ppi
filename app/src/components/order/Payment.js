import React, {useRef, useEffect} from 'react';
import {Formik} from 'formik';
import {
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid,
    Checkbox
} from '@material-ui/core';
import { PayPalButton } from "react-paypal-button-v2";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const Payment = ({next, submitForm, form = {}, user}) => {
    const formRef = useRef();

    useEffect(() => {
        if(next) {
            formRef.current.handleSubmit()
        }
    }, [next]);

    const card = (user && user.card) && JSON.parse(user.card);

    return (
        <div>
            <Formik
                innerRef={formRef}
                initialValues={{ 
                    payment: form.payment || "",
                    cvv: form.cvv || "",
                    month: form.month || card?.month || "",
                    year: form.year || card?.year || "",
                    name: form.name || card?.name || "",
                    number: form.number || card?.number || "",
                    save_card: false
                }}
                validate={values => {
                    const errors = {};
                    if (!values.payment) {
                        errors.payment = 'Required';
                    } else {
                        if(values.payment == 3) {
                            if(!values.number) {
                                errors.number = "Required"
                            } else if(values.number.length < 16) {
                                errors.number = "Invalid format"
                            }

                            if(!values.name) {
                                errors.name = "Required";
                            }

                            if(!values.month) {
                                errors.month = "Required";
                            }

                            if(!values.year) {
                                errors.year = "Required";
                            }

                            if(!values.cvv) {
                                errors.cvv =  "Required"
                            }
                        }
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    console.log(values)
                  submitForm({form3: values})
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>

                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">Payment</FormLabel>
                            <RadioGroup required aria-label="payment" name="payment" value={values.payment} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Pay on Delivery" />
                                <FormControlLabel value="2" control={<Radio color="primary" />} label="Paypal" />
                                    {
                                        (values.payment == 2) &&  
                                        <PayPalButton
                                        amount="0.01"
                                        onSuccess={(details, data) => {
                                            submitForm({form3: values})
                                        }}
                                    />  
                                    }
                                <FormControlLabel value="3" control={<Radio color="primary" />} label="Card" />
                                    {
                                        (values.payment == 3) && (
                                            <>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Cards
                                                    cvc={values.cvv}
                                                    expiry={`${values.month}/${values.year}`}
                                                    focused={values.focus}
                                                    name={values.name}
                                                    number={values.number} />
                                                </Grid>

                                                <Grid item xs={6}>
                                                <TextField size="small" onChange={(event) => {
                                                                    const value = event.target.value.replace(/\D/g,'').slice(0, 16);
                                                                    setFieldValue("number", value);
                                                                }} onBlur={handleBlur} error={!!(errors.number && touched.number)} value={values.number} required={values.payment == 3} label="Card number" name="number" variant="outlined" fullWidth className="mb-15" helperText={(errors.number && touched.number && errors.number) || ""} />
                                                <TextField size="small" onChange={handleChange} onBlur={handleBlur} error={!!(errors.name && touched.name)} value={values.name} required={values.payment == 3} label="Name" name="name" variant="outlined" fullWidth className="mb-15" helperText={(errors.name && touched.name && errors.name) || ""} />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                        <Grid container spacing={1} alignItems="center">
                                                            <Grid item xs={5}>
                                                                <TextField size="small" onChange={(event) => {
                                                                    const value = event.target.value.replace(/\D/g,'');
                                                                    let month = value;
                                                                    if(value < 1) {
                                                                        month = 1;
                                                                    } else if(value > 12) {
                                                                        month = 12;
                                                                    }
                                                                    setFieldValue("month", month);
                                                                }} onBlur={(event) => {
                                                                    const value = event.target.value.replace(/\D/g,'');
                                                                    let month = value;
                                                                    if(value < 10) {
                                                                        month = `0${value}`
                                                                    }
                                                                    setFieldValue("month", month);
                                                                }} error={!!(errors.month && touched.month)} value={values.month} required={values.payment == 3} label="Month" name="month" variant="outlined" fullWidth className="mb-15" helperText={(errors.month && touched.month && errors.month) || ""} />
                                                            </Grid>

                                                            <Grid className="text-center">
                                                                /
                                                            </Grid>

                                                            <Grid item xs={5}>
                                                                <TextField size="small" onChange={handleChange} onBlur={handleBlur} error={!!(errors.year && touched.year)} value={values.year} required={values.payment == 3} label="Year" name="year" variant="outlined" fullWidth className="mb-15" helperText={(errors.year && touched.year && errors.year) || ""} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <TextField size="small" onChange={(event) => {
                                                                    const value = event.target.value.slice(0, 3);
                                                                    setFieldValue("cvv", value);
                                                                }} onBlur={handleBlur} error={!!(errors.cvv && touched.cvv)} value={values.cvv} required={values.payment == 3} label="cvv" name="cvv" variant="outlined" type="password" fullWidth className="mb-15" helperText={(errors.cvv && touched.cvv && errors.cvv) || ""} />
                                                    </Grid>
                                                </Grid>
                                                </Grid>
                                                {
                                                    user ? (
                                                        <Grid item xs={12}>
                                                        <FormControlLabel
                                                            control={
                                                            <Checkbox
                                                                checked={values.save_card}
                                                                onChange={handleChange}
                                                                name="save_card"
                                                                value="1"
                                                                color="primary"
                                                            />
                                                            }
                                                            label="Save the Card"
                                                        />
                                                        </Grid>
                                                    ) : null
                                                }
                                              
                                            </Grid>

                                            </>
                                        )
                                    }
                            </RadioGroup>
                                <div>{errors.payment}</div>
                        </FormControl>
                       
                    </form>
                )}
                </Formik>
        </div>
    );
}

export default Payment;
