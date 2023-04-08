// import { Link } from 'react-router-dom';
import styles from './ThreadListItem.module.css'




export const ThreadListItem = ({
    _id,
    postTitle,
    postBody,
    userEmail,
    // userEmail,
}) => {
    return (
        <div className={styles['ThreadListItem']}>
                <p>{userEmail}</p>
                <h2>{postTitle}</h2>
                <p>{postBody}</p>
                {/* <Link to={`/catalog/${_id}`} className="details-button">Details</Link> */}
            </div>
    );
}