import {Box, Button, Container, styled, TextField, Typography} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import {NavLink} from "react-router-dom";
import "../App.css";
import { auth } from "../config/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword()  {
    const [email, setEmail] = useState('');
    const handleChangeEmail = useCallback( (event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const resetPassword = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
            .catch ((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
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
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                        <ValidationTextField
                            sx={{mt: 5}}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <Button
                            fullWidth
                            color='primary'
                            variant="contained"
                            onClick={resetPassword}
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
                        <NavLink to='/sign-in'>
                            Back to login
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}