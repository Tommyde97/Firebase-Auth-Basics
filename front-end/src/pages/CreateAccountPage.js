import React from 'react';
import { useState }  from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const { error, createAccount } = useAuth();

    return (
        <>
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Enter a new password..."
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <input
            type="password"
            placeholder="Re-enter your password..."
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
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
        <button onClick={() => createAccount(email, password, confirmPassword, name, bio)}>Create Account</button>
        <Link to="/login">Already have an acount? Log In</Link>
        </>
   ) 
}