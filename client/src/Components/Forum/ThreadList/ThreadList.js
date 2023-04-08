import { useForumContext } from '../../../contexts/ForumContext';

import { ThreadListItem } from './ThreadListItem/ThreadListItem';

export const ThreadList = () => {
    const { posts } = useForumContext();
    return (
        <section id="catalog-page">
            {posts.map(x =>
                <ThreadListItem key={x._id} {...x} />
            )}

            {posts.length === 0 && (
                <div className='postcontainer'>
                    <h2>No posts yet!</h2>
                </div>
            )}
        </section>
    );
}