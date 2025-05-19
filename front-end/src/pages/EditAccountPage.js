import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const EditAccountPage = () => {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserInfo = async () => {
            const token = await user.getIdToken();
            const response = await axios.get(`/users/${user.uid}`, {
                headers: { authtoken: token },
            });
            setName(response.data.name);
            setBio(response.data.bio);
        };

        if (user) {
            loadUserInfo();
        }
    }, [user]);

    const saveChanges = async () => {
        const token = await user.getIdToken();
        await axios.put(
            `/users/${user.uid}`,
            { updates: { name, bio } },
            { headers: { authtoken: token } }
        );
        navigate('/');
    };

    return (
        <>
            <h1>Edit Account</h1>
            <input 
                type="text"
                placeholder="Full name..."
                value={name}
                onChange={e => setName(e.target.value)} />
            <input 
                type="text"
                placeholder="Enter a short bio..."
                value={bio}
                onChange={e => setBio(e.target.value)} />
            <button onClick={saveChanges}>Save Changes</button>
        </>
    );
};