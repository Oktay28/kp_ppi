import React, {useRef, useEffect, useState} from 'react';
import {Formik} from 'formik';
import {
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid
} from '@material-ui/core';
import { PayPalButton } from "react-paypal-button-v2";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ExpiryDateInput from "credit-card-expiry-date";

const Payment = ({next, submitForm, form = {}}) => {
    const formRef = useRef();
    useEffect(() => {
        if(next) {
            formRef.current.handleSubmit()
        }
    }, [next]);

    return (
        <div>
            <Formik
                innerRef={formRef}
                initialValues={{ 
                    payment: form.payment || "",
                    cvc: form.cvc || "",
                    expiry: form.expiry || "",
                    name: form.name || "",
                    number: form.number || ""
                }}
                validate={values => {
                    const errors = {};

                    if (!values.payment) {
                        errors.payment = 'Required';
                    } else {
                        if(values.payment == 3) {
                            values.number = values.number.replace(/\D/g,'');
                            values.cvc = values.cvc.replace(/\D/g,'');
                        }
                    }

                    return errors;
                }}
                onSubmit={(values) => {
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
                }) => (
                    <form onSubmit={handleSubmit}>

                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">Payment</FormLabel>
                            <RadioGroup aria-label="gender" name="payment" value={values.payment} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Pay on Delivery" />
                                <FormControlLabel value="2" control={<Radio color="primary" />} label="Paypal" />
                                    {
                                        (values.payment == 2) &&  
                                        <PayPalButton
                                        amount="0.01"
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);
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
                                                    cvc={values.cvc}
                                                    expiry={values.expiry}
                                                    focused={values.focus}
                                                    name={values.name}
                                                    number={values.number} />
                                                </Grid>

                                                <Grid item xs={6}>
                                                <TextField size="small" onChange={handleChange} onBlur={handleBlur} error={!!(errors.address && touched.address)} value={values.address} required label="Cart number" name="cart_number" variant="outlined" fullWidth className="mb-15" helperText={(errors.address && touched.address && errors.address) || ""} />
                                                <TextField size="small" onChange={handleChange} onBlur={handleBlur} error={!!(errors.address && touched.address)} value={values.address} required label="Name" name="cart_name" variant="outlined" fullWidth className="mb-15" helperText={(errors.address && touched.address && errors.address) || ""} />
                                                <Grid container spacing={2}>
                                                    <Grid item xs={8}>
                                                    <ExpiryDateInput
                                                        label="Expiry Date"
                                                        onChange={date => {}}
                                                        value={""}
                                                        disabled={false}
                                                        onBlur={date => {}}
                                                        />
                                                        
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <TextField size="small" onChange={handleChange} onBlur={handleBlur} error={!!(errors.address && touched.address)} value={values.address} required label="CVC" name="address" variant="outlined" fullWidth className="mb-15" helperText={(errors.address && touched.address && errors.address) || ""} />
                                                    </Grid>
                                                </Grid>
                                                </Grid>
                                            </Grid>

                                            </>
                                        )
                                    }
                            </RadioGroup>
                        </FormControl>
                       
                    </form>
                )}
                </Formik>
        </div>
    );
}

export default Payment;
