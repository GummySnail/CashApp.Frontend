import React, {useMemo, useState} from "react";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    styled,
    TextField,
    Typography
} from "@mui/material";
import "../App.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from '@mui/icons-material/Google';
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../config/firebase.js"
import {NavLink} from "react-router-dom";
import { useSignUpFormValidator } from "../hooks/useSignUpFormValidator";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { errors, validateForm, onBlurField} = useSignUpFormValidator(form);

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };

        setForm(nextFormState);
        if (errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signUp = async (e) => {
        e.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true});
        if (!isValid) return;
        await createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);
                //navigate('/dashboard')
            })
            .catch ((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const signUpWithGoogle = async (e) => {
        e.preventDefault();
        await signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                //navigate("dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

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
                        alignItems: 'center'
                    }}
                >
                    <Typography mt={10}>
                        <span className="cash">Cash</span><span className="app">App</span>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#FFFFFF',
                            mt: 10,
                            fontSize: 35,
                            fontWeight: '500'
                        }}>
                        Create an Account
                    </Typography>
                    <Typography
                        sx={{
                            color: '#7CC0EA',
                            fontSize: 20,
                            fontWeight: '500'
                        }}
                    >
                        Sign up by entering information below
                    </Typography>
                    <Box component="div" autoComplete="off" mt={5} sx={{maxWidth: '540px'}}>
                        <ValidationTextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            helperText={errors.email.dirty && errors.email.error ? (
                                <Typography component={'span'}>{errors.email.message}</Typography>
                            ) : null}
                            error={!!errors.email.error}
                            value={form.email}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                        />

                        <ValidationTextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            helperText={errors.password.dirty && errors.password.error ? (
                                <Typography component={'span'}>{errors.password.message}</Typography>
                            ) : null}
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            error={!!errors.password.error}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="primary"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <ValidationTextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            helperText={errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                                <Typography component={'span'}>{errors.confirmPassword.message}</Typography>
                            ) : null}
                            type={showConfirmPassword ? "text" : "password"}
                            value={form.confirmPassword}
                            error={!!errors.confirmPassword.error}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="primary"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            fullWidth
                            color='primary'
                            variant="contained"
                            onClick={signUp}
                            sx={{
                                mt:3,
                                mb:2,
                                color: '#FFFFFF',
                                fontSize: 16,
                                fontWeight: '400',
                                fontFamily: "Roboto"
                            }}>Sign Up</Button>
                        <Typography
                            sx={{
                                display: 'flex',
                                color: '#7CC0EA',
                                fontSize: 20,
                                fontWeight: '500',
                                justifyContent: 'center',
                            }}
                        >
                            Already have an account? Sign In&nbsp;<NavLink to="/sign-in">Here</NavLink>
                        </Typography>
                        <h2><span>or</span></h2>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={signUpWithGoogle} size="large" startIcon={<GoogleIcon/>}>
                                <Typography sx={{color: '#35A2E6', fontSize: 24, textTransform: 'none'}}>
                                    Sign Up with Google
                                </Typography>
                            </Button>
                        </Box>
                        <Typography sx={{
                            position: 'fixed',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            textAlign: 'center',
                            padding: '10px',
                            color: '#7CC0EA',
                        }}>
                            @2023 CashApp
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}