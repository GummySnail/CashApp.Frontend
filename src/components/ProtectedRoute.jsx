import {getCurrentUser} from "../helpers";
import {Navigate} from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({children}) => {
    const currentUser = getCurrentUser("access_token");

    if (!currentUser) {
        return <Navigate to="/sign-in" replace/>
    }
    return children;
};