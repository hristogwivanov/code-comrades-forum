import { useForumContext } from '../../../contexts/ForumContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';
import { useParams } from 'react-router-dom'; // Import useParams to get the postId

import { ThreadPosts } from './ThreadPosts/ThreadPosts';

export const ThreadPage = () => {
    const { onReplySubmit } = useForumContext();
    const { userName, isAuthenticated } = useAuth();
    const { postId } = useParams(); // Get the postId from the URL

    const { values, changeHandler, onSubmit } = useForm({
        postBody: '',
        userName,
    }, (data) => {
        if (data.postBody.trim()) {
            onReplySubmit({ ...data, postId }); // Include postId when submitting a reply
        }
    });

    return (
        <section id="forum-page" className="">
            <ThreadPosts />
            {isAuthenticated && (
                <form id="Post" method="POST" onSubmit={onSubmit}>
                    <div className="container">
                        <div className='inputDiv'>
                            <textarea
                                id="postbody"
                                name="postBody"
                                value={values.postBody}
                                onChange={changeHandler}
                                placeholder="Write your reply here..."
                                required
                            />
                        </div>
                        <div className='inputDiv'>
                            <input type="submit" className="btn submit" value="Reply" />
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
};
