import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

export const HomePage = () => {
    const { user } = useUser();
    const { logOut } = useAuth();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const loadUserInfo = async () => {
            const token = await user.getIdToken();
            const response = await axios.get(`/users/${user.uid}`, {
                headers: { authtoken: token },
            });
            setUserInfo(response.data);
        }

        if (user) {
            loadUserInfo();
        }
    }, [user]);

    const deleteAccount = async () => {
        const token = await user.getIdToken();
        await axios.delete(`/users/${user.uid}`, {
            headers: { authtoken: token },
        });
        await logOut();
    }

    return (
        <>
        <h1>Home</h1>
        {user && <p>You are logged in at {user.metadata.lastSignInTime}</p>}
        {user && <p>Youruser id is {user.uid}</p>}
        {userInfo && <p>Your name is: {userInfo.name}</p>}
        {userInfo && <p>Your bio is: {userInfo.bio}</p>}
        <buttton onClick={logOut}>Log Out</buttton>
        <Link to="/edit-account">
            <button>Edit My Account</button>
        </Link>
        <button onClick={deleteAccount}>Delete My Account</button>
        </>
    );
}