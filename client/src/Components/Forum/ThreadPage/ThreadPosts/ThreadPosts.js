import { useEffect, useReducer} from 'react';
import { useParams } from 'react-router-dom';
import { useService } from '../../../../hooks/useService';
import { postReducer } from '../../../../reducers/postReducer';
import { forumServiceFactory } from '../../../../services/forumService';

import styles from './ThreadPosts.module.css';

export const ThreadPosts = ({
    userEmail,
}) => {
    const [post, dispatch] = useReducer(postReducer, {});

    const { postId } = useParams();
    const forumService = useService(forumServiceFactory);


    useEffect(() => {
        Promise.all([
            forumService.getOne(postId)
        ]).then(([postData]) => {
            const postState = {
                ...postData
            };

            dispatch({ type: 'POST_FETCH', payload: postState })
        })
    }, []);
    console.log(post)
    return (<>

        <table
            className={styles['Table']}
        >
            <th>{post.postTitle}</th>
            <tr><div className={styles['userinfo']}>
                <strong>
                {post.userName}
                </strong>
                <br />
                <img src='https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png' alt='userpic'></img>
                <br />
            </div>
                <div>{post.postBody}</div></tr>


        </table>
        <br />

    </>
    );
}




















