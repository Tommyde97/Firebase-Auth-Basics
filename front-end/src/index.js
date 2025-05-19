import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANUBTy7FCs-DtEk6QYYkYvR-RnjDvNe9Y",
  authDomain: "react-firebase-auth-basi-699c2.firebaseapp.com",
  projectId: "react-firebase-auth-basi-699c2",
  storageBucket: "react-firebase-auth-basi-699c2.firebasestorage.app",
  messagingSenderId: "549012458327",
  appId: "1:549012458327:web:73f1b571b79a1426400c12"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
