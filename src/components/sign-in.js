import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
    Box,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    styled,
    TextField,
    Checkbox,
    Typography,
    Button
} from "@mui/material"
import "../App.css";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState, useCallback, useMemo} from "react";
import {NavLink, useNavigate} from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();
    //перенести в App.js (праз params)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeEmail = useCallback( (event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const handleChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const signIn = async (e) => {
        e.preventDefault();

            //await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //navigate("/dashboard");
            })
            .catch ((error) => {
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
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <ValidationTextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handleChangePassword}
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
                            <Link href="#" sx={{ color: '#7CC0EA'}}>
                                Forgot password?
                            </Link>
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
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}