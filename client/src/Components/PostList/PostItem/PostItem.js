// import { Link } from 'react-router-dom';
import styles from './PostItem.module.css'

export const PostItem = ({
    _id,
    postTitle,
    postBody,
    
}) => {
    return (
        <div className="allPosts">
            <div className="allPosts-info">
                {/* <img src={imageUrl}/> */}
                {/* <h6>{category}</h6> */}
                <p>{_id}</p>
                <h2>{postTitle}</h2>
                <h2>{postBody}</h2>
                {/* <Link to={`/catalog/${_id}`} className="details-button">Details</Link> */}
            </div>
        </div>
    );
}