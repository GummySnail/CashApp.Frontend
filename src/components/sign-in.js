import {
    Box,
    Container,
    IconButton, InputAdornment,
    styled,
    TextField,
    Typography
} from "@mui/material"
import "../App.css";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState, useCallback, useMemo} from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const ValidationTextField = useMemo(() => styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: '#35A2E6',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: '#35A2E6',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderColor: '#35A2E6',
            borderLeftWidth: 6,
            padding: '4px !important',
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
                    <Box component="form" autoComplete="off" mt={5}>
                        <ValidationTextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            variant="outlined"
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
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                    </Box>
                </Box>
            </Container>
        </Box>
    )
}