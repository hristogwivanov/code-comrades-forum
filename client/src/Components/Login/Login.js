import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

const LoginFormKeys = {
    Username: "username",
    Password: "password",
};

export const Login = () => {
    const { login } = useAuth();  // Get the login function from AuthContext
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { values, changeHandler, onSubmit } = useForm(
        {
            [LoginFormKeys.Username]: "",  // Use username instead of email
            [LoginFormKeys.Password]: "",
        },
        async (formValues) => {
            try {
                setError('');
                await login(formValues.username, formValues.password);
                navigate('/forum');  // Redirect to Forum page after successful login
            } catch (err) {
                setError('Failed to log in. Please check your username and password.');
            }
        }
    );

    return (
        <section id="login-page" className="auth">
            <div className="container">
                <form id="login" method="POST" onSubmit={onSubmit}>
                    <div className="inputDiv">
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            name={LoginFormKeys.Username}
                            value={values[LoginFormKeys.Username]}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <input
                            type="password"
                            id="login-password"
                            name={LoginFormKeys.Password}
                            value={values[LoginFormKeys.Password]}
                            onChange={changeHandler}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <input
                            type="submit"
                            className="btn submit"
                            value="Login"
                        />
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
};