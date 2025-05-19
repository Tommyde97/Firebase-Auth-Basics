import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const errorMessages = {
    'Firebase: Error (auth/invalid-email).': 'Invalid email address',
    'Firebase: Error (auth/wrong-password).': 'That\'s the wrong password',
    'Firebase: Error (auth/user-not-found).': 'There is no account with that email address',
};

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn, error } = useAuth();

    const handleLogin = async () => {
        await logIn(email, password);
    };

    return (
        <div className="auth-form">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Log In</button>
            <Link to="/create-account">
                Don't have an account? Create one 
            </Link>
        </div>
    );
};