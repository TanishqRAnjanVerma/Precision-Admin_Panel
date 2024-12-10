// src/components/AdminLogin.jsx
import React from 'react';
import LoginPopup from '../LoginPopup/LoginPopup';

const AdminLogin = ({ setShowLogin, showLogin }) => {
    return (
        <div className="admin-login-container">
            <h1>Welcome to Admin Panel</h1>
            <button onClick={() => setShowLogin(true)}>Go to Admin Panel</button>
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        </div>
    );
};

export default AdminLogin;