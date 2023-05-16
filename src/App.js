import './App.css';
import SignIn from "./components/SignIn";
import {ThemeProvider, createTheme, CssBaseline, Modal, Typography, TextField} from "@mui/material";
import SignUp from "./components/SignUp";
import {BrowserRouter, Route, Routes, Navigate, Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ForgotPassword from "./components/ForgotPassword";
import {getCurrentUser} from "./helpers";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Main from "./Main";

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
    const currentUser = getCurrentUser("access_token");

    return (<ThemeProvider theme={theme}>
      <CssBaseline/>
          <BrowserRouter>
              <Routes>
                  {!currentUser &&
                      <>
                        <Route path='/sign-in' element={<SignIn/>}/>
                        <Route path='/sign-up' element={<SignUp/>}/>
                        <Route path='/forgot-password' element={<ForgotPassword/>}/>
                      </>
                  }
                  <Route path="*" element={
                      <ProtectedRoute>
                      <Main/>
                      </ProtectedRoute>
                  }/>
              </Routes>
          </BrowserRouter>
    </ThemeProvider>);
}
