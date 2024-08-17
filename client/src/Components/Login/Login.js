import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { login, authError, clearAuthError } = useAuth();  // Get the login function, authError, and clearAuthError from AuthContext
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Clear any errors when the component mounts
    useEffect(() => {
        clearAuthError();  // Ensure no previous error is displayed on initial load
    }, [clearAuthError]);

    // Set error message when authError changes
    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');  // Clear any previous errors
            setLoading(true);
            await login(usernameRef.current.value, passwordRef.current.value);
            navigate('/forum');  // Redirect to Forum page after successful login
        } catch (error) {
            setError(authError || 'Failed to log in. Please check your username and password.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="login-page" className="auth">
            <div className="container">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form id="login" method="POST" onSubmit={handleSubmit}>
                    <div className="inputDiv">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            ref={usernameRef}
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <button disabled={loading} type="submit" className="btn submit">
                            Login
                        </button>
                    </div>
                    <p className="field">
                        <span>
                            If you don't have a profile, click <Link to="/register">here</Link>
                        </span>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;
