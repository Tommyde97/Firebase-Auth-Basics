import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';

const errorMessages = {
    'Firebase: Error (auth/invalid-email).': 'Invalid email address',
    'Firebase: Error (auth/wrong-password).': 'That\'s the wrong password',
    'Firebase: Error (auth/user-not-found).': 'There is no account with that email address',
};

export const useAuth = () => {
    const [error, setError] = useState('');

    const logIn = async (email, password) => {
        setError('');

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            setError(errorMessages[e.message] || e.message);
        }
    }

    const createAccount = async (email, password, confirmPassword, name, bio) => {
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords must match');
            return;
        }

        try {
            await axios.post('/users', {
                email, 
                password,
                userInfo: { name, bio },
            });
            await logIn(email, password);
        } catch (e) {
            setError(errorMessages[e.message] || e.message);
        }
    }

    const logOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
        } catch (e) {
            setError(e.message);
        }
    }

    return { logIn, logOut, createAccount, error };
}