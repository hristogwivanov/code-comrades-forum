import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useService = (serviceFactory) => {
    const { token } = useAuth();

    const service = serviceFactory(token);

    return service;
};