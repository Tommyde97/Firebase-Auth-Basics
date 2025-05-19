import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

export const NavBar = () => {
    const { isLoading, user } = useUser();
    const { logOut } = useAuth();
    return (
        <nav>
            <Link classname="app-heading" to="/"><h1>Auth Example</h1></Link>
            {isLoading 
                ? <p>Loading...</p> 
                : user ? (
                <>
                <p>Logged in as {user.email}</p>
                    <div className="nav-button">
                        <button onClick={logOut}>Log Out</button>
                    </div>
                </>
            ) : (
                <>
                    <Link className="nav-button" to="/login"><button>Log In</button></Link>
                    <Link className="nav-button" to="/create-account"><button>Create Account</button></Link>
                </>
            )}
        </nav>
    )
}