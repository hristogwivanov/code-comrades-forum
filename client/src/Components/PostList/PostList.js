import { useForumContext } from '../../contexts/ForumContext';

import { PostItem } from './PostItem/PostItem';

export const PostList = () => {
    const { posts } = useForumContext();
    console.log(posts);
    return (
        <section id="catalog-page">
            {posts.map(x =>
                <PostItem key={x._id} {...x} />
            )}

            {posts.length === 0 && (
                      <div className='postcontainer'>
                      <h2>No posts yet!</h2>
                      </div>
            )}
        </section>
    );
}