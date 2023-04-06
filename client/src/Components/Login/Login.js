import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = (
    //  {auth,}
) => {
    //   const { onLoginSubmit } = auth; 
    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    return (
        <section id="login-page" className="auth">
            <form id="login" method="POST" onSubmit={onSubmit}>

                <div className="container">
                    <div className='inputDiv'>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            name={LoginFormKeys.Email}
                            value={values[LoginFormKeys.Email]}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='inputDiv'>
                        <input
                            type="password"
                            id="login-password"
                            name={LoginFormKeys.Password}
                            value={values[LoginFormKeys.Password]}
                            onChange={changeHandler}
                            placeholder="Password"
                        />
                    </div>
                    <div className='inputDiv'>

                        <input type="submit" className="btn submit" value="Login" />
                    </div>
                    <p className="field">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

// export default withAuth(Login);