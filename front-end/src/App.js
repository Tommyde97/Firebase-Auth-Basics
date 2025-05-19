import React from 'react';
//mport { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthedRoute } from './components/AuthedRoute';
import { UnauthedRoute } from './components/UnauthedRoute';
import { NavBar } from './components/NavBar';
import { useUser } from './hooks/useUser';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { EditAccountPage } from './pages/EditAccountPage';


function App() {
    const { isLoading, user } = useUser();

    return (
        <Router>
            <NavBar />
            <div className='centered-container'>
                {isLoading ? <p>Loading...</p> : (
                    <Routes>
                        <Route path="/" element={
                            <AuthedRoute>
                                <HomePage />
                            </AuthedRoute>
                        } />
                        <Route path="/edit-account" element={
                            <AuthedRoute>
                                <EditAccountPage />
                            </AuthedRoute>
                        } />
                        <Route path="/login" element={
                            <UnauthedRoute>
                                <LoginPage />
                            </UnauthedRoute>
                        } />
                        <Route path="/create-account" element={
                            <UnauthedRoute>
                                <CreateAccountPage />
                            </UnauthedRoute>
                        } />
                    </Routes>
                )} 
            </div>
        </Router>
    );
}

export default App;
