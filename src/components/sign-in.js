import { auth, googleProvider } from "../config/firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
    Box,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    styled,
    TextField,
    Checkbox,
    Typography,
    Button
} from "@mui/material"
import "../App.css";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {useState, useMemo} from "react";
import {NavLink} from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useSignInFormValidator } from "../hooks/useSignInFormValidator";
import {useNavigate} from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const {errors, validateForm, onBlurField} = useSignInFormValidator(form);

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

    const signIn = async (e) => {
        e.preventDefault();
        const {isValid} = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, form.email, form.password)
            .then(async (userCredentials) => {
                const accessToken = await userCredentials.user.getIdToken();
                localStorage.setItem("access_token", JSON.stringify(accessToken));
                navigate("/");
            })
            .catch ((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();

        await signInWithPopup(auth, googleProvider)
            .then(async (userCredentials) => {
                const accessToken = await userCredentials.user.getIdToken();
                localStorage.setItem("access_token", JSON.stringify(accessToken));
                navigate("/");
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
                        Welcome Back
                    </Typography>
                    <Typography
                        sx={{
                            color: '#7CC0EA',
                            fontSize: 20,
                            fontWeight: '500'
                        }}
                    >
                        Sign in by entering information below
                    </Typography>
                    <Box component="div" autoComplete="off" mt={5} noValidate sx={{maxWidth: '540px'}}>
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
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                        defaultChecked
                                        sx={{color: '#35A2E6'}}/>
                                    }
                                    label="Remember Me"
                                    sx={{
                                        color: '#7CC0EA',
                                        fontSize: 13,
                                    }}
                                />
                            <NavLink to='/forgot-password'>
                                Forgot password?
                            </NavLink>
                        </Box>
                        <Button
                            fullWidth
                            color='primary'
                            variant="contained"
                            onClick={signIn}
                            sx={{
                                mt:3,
                                mb:2,
                                color: '#FFFFFF',
                                fontSize: 16,
                                fontWeight: '400',
                                fontFamily: "Roboto"
                            }}>Sign In</Button>
                        <Typography
                            sx={{
                                display: 'flex',
                                color: '#7CC0EA',
                                fontSize: 20,
                                fontWeight: '500',
                                justifyContent: 'center',
                            }}
                        >
                            Don’t have an account? Create one&nbsp;<NavLink to="/sign-up">Here</NavLink>
                        </Typography>
                        <h2><span>or</span></h2>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button onClick={signInWithGoogle} size="large" startIcon={<GoogleIcon/>}>
                                <Typography sx={{color: '#35A2E6', fontSize: 24, textTransform: 'none'}}>
                                    Sign In with Google
                                </Typography>
                            </Button>
                        </Box>
                        <Typography sx={{position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center', padding: '10px', color: '#7CC0EA'}}>
                            @2023 CashApp
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}