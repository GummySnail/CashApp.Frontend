import './App.css';
import SignIn from "./components/sign-in";
import {ThemeProvider, createTheme, CssBaseline, Modal, Typography, TextField} from "@mui/material";
import SignUp from "./components/sign-up";
import {BrowserRouter, Route, Routes, Navigate, Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ForgotPassword from "./components/forgot-password";
import Dashboard from "./components/dashboard";
import {getCurrentUser} from "./helpers";
import {ProtectedRoute} from "./components/ProtectedRoute";

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
                  <Route element={<ProtectedRoute />}>
                      <Route index element={<Dashboard/>}/>
                  </Route>
                  <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Routes>
          </BrowserRouter>
    </ThemeProvider>);
}
