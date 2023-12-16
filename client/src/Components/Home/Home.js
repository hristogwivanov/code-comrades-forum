import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <Link to={'/Forum'}> <img src="welcome.png" alt="welcome" style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            margin: '0 auto',
            padding: '16px',
            maxWidth: '1200px'
        }} /></Link>
    );
};