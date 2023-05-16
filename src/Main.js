import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function Main() {
    return (
        <>
            <Sidebar/>
            <Routes>
                <Route index element={<Dashboard/>}/>
            </Routes>
        </>
    );
}

export default Main;