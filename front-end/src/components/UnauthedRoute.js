import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const UnauthedRoute = ({ children }) => {
    const { isLoading, user } = useUser();

    if (isLoading) {
        return <p>Loading...</p>
    }

    return !!user 
        ? <Navigate to="/" />
        : children;
}