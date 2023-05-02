import './App.css';
import SignIn from "./components/sign-in";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";
const theme = createTheme({
    typography : {
        fontFamily: "Poppins"
    },
    palette:  {
        primary: {
            main: '#35A2E6'
        }
    }
}
);
export default function App() {
  return (<ThemeProvider theme={theme}>
      <CssBaseline/>
        <SignIn/>
    </ThemeProvider>);
}
