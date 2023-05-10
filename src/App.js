import './App.css';
import SignIn from "./components/sign-in";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";
import SignUp from "./components/sign-up";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import ForgotPassword from "./components/forgot-password";
const theme = createTheme({
    typography : {
        fontFamily: "Poppins",
    },
    palette:  {
        primary: {
            main: '#35A2E6'
        },
        warning: {
            main: '#E64C4D'
        }
    }
}
);
export default function App() {
  return (<ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
          <Routes>
            <Route index path='/sign-in' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>);
}
