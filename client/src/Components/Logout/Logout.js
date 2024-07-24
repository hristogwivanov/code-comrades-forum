import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';

import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout();

    }, [logout])

    return <Navigate to="/" />
};