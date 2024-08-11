import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <section id="register-page" className="content auth">
            <div className="container">
                <h2>Register</h2>
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




// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { auth, firestore } from '../../firebase';

// import { useForm } from '../../hooks/useForm';
// import { AuthContext } from '../../contexts/AuthContext';


// export const Register = () => {
//     const { onRegisterSubmit } = useContext(AuthContext);
//     const { values, changeHandler, onSubmit } = useForm({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',

//     }, onRegisterSubmit);

//     return (
//         <section id="register-page" className="content auth">
//             <form id="register" method="post" onSubmit={onSubmit}>
//                 <div className="container">
//                     <div className='inputDiv'>

//                         <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             placeholder="Username"
//                             value={values.username}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div className='inputDiv'>

//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="Email"
//                             value={values.email}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div className='inputDiv'>

//                         <input
//                             type="password"
//                             name="password"
//                             id="register-password"
//                             value={values.password}
//                             onChange={changeHandler}
//                             placeholder="Password"
//                         />
//                     </div>
//                     <div className='inputDiv'>

//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             id="confirm-password"
//                             value={values.confirmPassword}
//                             onChange={changeHandler}
//                             placeholder="Repeat password"
//                         />
//                     </div>
//                     <div className='inputDiv'>

//                         <input className="btn submit" type="submit" value="Register" />
//                     </div>

//                     <p className="field">
//                         <span>If you already have profile click <Link to="/login">here</Link></span>
//                     </p>
//                 </div>
//             </form>
//         </section>
//     );
// };