import React, {useRef, useEffect} from 'react';
import {Formik} from 'formik';
import {TextField } from '@material-ui/core';

const General = ({next, submitForm, form = {}}) => {
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
                initialValues={{ name: form.name || "", email: form.email || "", phone: form.phone || "" }}
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

                    if(!values.phone) {
                        errors.phone = "Required"
                    } else if(!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.phone))) {
                        errors.phone = "Invalid format"
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                  submitForm({form0: values})
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
                        <TextField onChange={handleChange} onBlur={handleBlur} error={!!(errors.phone && touched.phone)} value={values.phone} required label="Phone" name="phone" variant="outlined" fullWidth className="mb-15" helperText={(errors.phone && touched.phone && errors.phone) || ""} />
                    </form>
                )}
                </Formik>
        </div>
    );
}

export default General;
