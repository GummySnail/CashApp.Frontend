import {getCurrentUser} from "../helpers";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";

export const ProtectedRoute = () => {
    const currentUser = getCurrentUser("access_token");

    if (!currentUser) {
        return <Navigate to="/sign-in" replace/>
    }
    return <Outlet/>;
};