import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);
    return (
        <header>
            {/* <!-- Navigation --> */}
            <Link to={'/'}><img src={'cclogo.png'} alt='Code Comrades Logo' style={{height: 160}}></img></Link>
            <nav>
                {/* <!-- Logged-in users --> */}
                {isAuthenticated && (
                    <div id="user">
                        <span style={{margin: '60px'}}>Hi, {userEmail}</span>
                        <Link to="/forum">Forum</Link> 
                        <Link to="create-game">Profile</Link>
                        <Link to="create-game">Settings</Link>
                        <Link to="logout">Logout</Link>
                    </div>
                )}

                {!isAuthenticated && (
                <div id="guest">
                        <Link to="/forum">Forum</Link> 
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                     )} 
            </nav>
        </header>
    );
}