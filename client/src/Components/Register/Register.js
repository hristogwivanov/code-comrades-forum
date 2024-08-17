import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const { signup, authError, clearAuthError } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        clearAuthError();  // Clear any previous errors when this component is loaded
    }, [clearAuthError]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        if (passwordRef.current.value.length < 6) {
            return setError("Password should be at least 6 characters");
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value);
            navigate('/');
        } catch (error) {
            setError(authError || 'Failed to create an account');
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="register-page" className="content auth">
            <div className="container">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form id="register" onSubmit={handleSubmit}>
                    <div className='inputDiv'>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            ref={usernameRef}
                            required
                        />
                    </div>
                    <div className='inputDiv'>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className='inputDiv'>
                        <input
                            type="password"
                            name="password"
                            id="register-password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                        />
                    </div>
                    <div className='inputDiv'>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            placeholder="Repeat password"
                            ref={passwordConfirmRef}
                            required
                        />
                    </div>
                    <div className='inputDiv'>
                        <button disabled={loading} type="submit" className="btn submit">
                            Register
                        </button>
                    </div>
                    <p className="field">
                        <span>
                            If you already have a profile, click <Link to="/login">here</Link>
                        </span>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Register;
