import {Box, Button, Container, styled, TextField, Typography} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import {NavLink} from "react-router-dom";
import "../App.css";
import { auth } from "../config/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

export default function ForgotPassword()  {
    const [showError, setShowError] = useState (false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
         
    });   

    const resetPassword = async (auth, email) => {

        await sendPasswordResetEmail(auth, email)
            .catch ((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if (errorCode.startsWith('auth/invalid-value-(email)')) {
                    setShowError(true);
                }
            });;
    }

    const ValidationTextField = useMemo(() => styled(TextField)({
        '& input': {
            color: '#FFFFFF',
            fontSize: 18,

        },
        '& label': {
            color: '#35A2E6',
            fontSize: 16,
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: '#35A2E6',

        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#35A2E6',
            },
            '&:hover fieldset': {
                borderColor: '#35A2E6',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#35A2E6',
            },
        },
    }), []);

    return (
        <Box sx={{ width: '100%', bgcolor: 'primary.main'}}>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        bgcolor: "#365466",
                        display: 'flex',
                        height: '100vh',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{
                        maxWidth: '540px',
                        mt: 30
                    }}>
                        <Typography sx={{
                            color: '#FFFFFF',
                            fontSize: 35,
                            fontWeight: '500',
                            textTransform: 'uppercase'
                        }}>
                            Reset your password
                        </Typography>

                        <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            resetPassword( auth, values);       
                        }}
                        >

                    {({ errors, touched}) => (
                        <Form >               
                            <Field name="email">
                            {(props) => (
                                <>
                                    <ValidationTextField
                                        sx={{mt: 5}}
                                        label="Email"
                                        {...props.field}
                                        margin="normal"
                                        fullWidth
                                        id={props.field.name}
                                        error={errors.email && touched.email ? true : false}
                                        helperText={errors.email && touched.email ? errors.email : ''}               
                                    />
                                </>
                            )}

                            </Field>

                            <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>

                            <Typography
                            sx={{
                                display: 'flex',
                                color: '#d32f2f',
                                fontSize: 18,
                                fontWeight: '500',
                                justifyContent: 'center',
                                visibility: showError ? "visible" : "hidden"
                            }}
                        >
                            Email does not exist
                            </Typography>

                            </Box>

                                <Button
                                    fullWidth
                                    color='primary'
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        mt:3,
                                        mb:2,
                                        color: '#FFFFFF',
                                        fontSize: 16,
                                        fontWeight: '400',
                                        fontFamily: "Roboto"
                                    }}>
                                    Reset Password
                                </Button>

                        </Form>
                        )}

                </Formik>  

                        <NavLink to='/sign-in'>
                            Back to login
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}