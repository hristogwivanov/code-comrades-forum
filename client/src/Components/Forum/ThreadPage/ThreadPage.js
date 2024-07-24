
import { useForumContext } from '../../../contexts/ForumContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useForm } from '../../../hooks/useForm';

import { ThreadPosts } from './ThreadPosts/ThreadPosts';

export const ThreadPage = () => {
    const { onPostSubmit } = useForumContext();
    const { userEmail, isAuthenticated } = useAuth();

    const { values, changeHandler, onSubmit } = useForm({
        postTitle: '',
        postBody: '',
        userEmail,
    }, onPostSubmit);

    return (
        <section id="forum-page" className="">
            <ThreadPosts post />
            {isAuthenticated && (
                <form id="Post" method="POST" onSubmit={onSubmit}>
                    <div className="container">
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
            )}
        </section>
    );
};




// import { useForumContext } from '../../../contexts/ForumContext';
// import { useAuthContext } from '../../../contexts/AuthContext';
// import { useForm } from '../../../hooks/useForm';
// import { useAuth } from '../../../contexts/AuthContext';


// import { ThreadPosts } from './ThreadPosts/ThreadPosts';




// export const ThreadPage = (
// ) => {
//     const { onPostSubmit } = useForumContext();
    
//     const { userEmail, isAuthenticated } = useAuthContext();

//     const { values, changeHandler, onSubmit } = useForm({
//         postTitle: '',
//         postBody: '',
//         userEmail,
//     }, onPostSubmit);


    


//     return (
//         <section id="forum-page" className="">
//         <ThreadPosts post/>
//             {isAuthenticated && (<form id="Post" method="POST" onSubmit={onSubmit}>

//                 <div className="container">
//                     <div className='inputDiv'>
//                         <textarea
//                             id="postbody"
//                             name="postBody"
//                             value={values.postBody}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div className='inputDiv'>
//                         <input type="submit" className="btn submit" value="Post" />
//                     </div>
//                 </div>
//             </form>)}
//         </section>
//     );
// }
