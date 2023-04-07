import { useForumContext } from '../../contexts/ForumContext';
import { useForm } from '../../hooks/useForm';

import { PostList } from'../../Components/PostList/PostList'


export const Forum = (
) => {
    const { onPostSubmit } = useForumContext();
    const { values, changeHandler, onSubmit } = useForm({
        postTitle: '',
        postBody: '',
    }, onPostSubmit);

    return (
        <section id="forum-page" className="">

            <PostList />
      

            <form id="Post" method="POST" onSubmit={onSubmit}>

                <div className="container">
                    <div className='inputDiv'>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            name="postTitle"
                            value={values.postTitle}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='inputDiv'>
                        <textarea
                            id="postbody"
                            name="postBody"
                            value={values.postBody}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='inputDiv'>
                        <input type="submit" className="btn submit" value="Post" />
                    </div>
                </div>
            </form>
        </section>
    );
}
