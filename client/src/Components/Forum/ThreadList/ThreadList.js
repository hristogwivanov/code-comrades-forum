import styles from './ThreadList.module.css';
import { Link } from 'react-router-dom';

import { useForumContext } from '../../../contexts/ForumContext';

import { ThreadListItem } from './ThreadListItem/ThreadListItem';

export const ThreadList = () => {
    const { posts } = useForumContext();
    return (
        <section id="threads-page">
            <table className={styles['Table']}>
                <th>Title/Author</th>
                {/* <th>Statistics</th>
                <th>Last</th> */}
                {posts.map(x =>
                    <tr>
                        <Link to={x._id}>
                            <ThreadListItem key={x._id} {...x} />
                        </Link>
                    </tr>
                )}
            </table>
            <br />

            {posts.length === 0 && (
                <div className='postcontainer'>
                    <h2>No posts yet!</h2>
                </div>
            )}
        </section>
    );
}