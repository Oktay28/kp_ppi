import React, {useRef, useEffect} from 'react';
import {Formik} from 'formik';
import {TextField } from '@material-ui/core';

const Delivery = ({next, submitForm, form = {}, user}) => {
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
                initialValues={{ address: form.address || user?.address || ""}}
                validate={values => {
                    const errors = {};

                    if (!values.address) {
                        errors.address = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                  submitForm({form1: values})
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
                        <TextField onChange={handleChange} onBlur={handleBlur} error={!!(errors.address && touched.address)} value={values.address} required label="Address" name="address" variant="outlined" fullWidth className="mb-15" helperText={(errors.address && touched.address && errors.address) || ""} />
                    
                    </form>
                )}
                </Formik>
        </div>
    );
}

export default Delivery;
