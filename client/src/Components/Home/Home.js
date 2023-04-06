import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <Link to={'/Forum'}> <img src="wellcome.png" alt="wellcome" style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '1200px'
        }} /></Link>
    );
};