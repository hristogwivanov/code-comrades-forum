import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForumContext } from "../../contexts/ForumContext";
import { useForm } from "../../hooks/useForm";
import { ThreadList } from "./ThreadList/ThreadList";

export const Forum = () => {
    const { onPostSubmit } = useForumContext();
    const { userName, userEmail, isAuthenticated } = useAuth();

    const { values, changeHandler, onSubmit } = useForm(
        {
            postTitle: "",
            postBody: "",
            userName: userName || "",
            userEmail: userEmail || "",
        },
        (data) => {
            if (data.userEmail) {
                onPostSubmit(data);
            } else {
                console.error("User email is undefined. Cannot submit post.");
            }
        }
    );

    return (
        <section id="forum-page" className="">
            <ThreadList />

            {isAuthenticated && (
                <form id="Post" method="POST" onSubmit={onSubmit}>
                    <div className="container">
                        <div className="inputDiv">
                            <input
                                type="text"
                                id="title"
                                placeholder="Title"
                                name="postTitle"
                                value={values.postTitle}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="inputDiv">
                            <textarea
                                id="postbody"
                                name="postBody"
                                placeholder="Write your post here..."
                                value={values.postBody}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="inputDiv">
                            <input
                                type="submit"
                                className="btn submit"
                                value="Post"
                            />
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
};

export default Forum;

// import { useForumContext } from '../../contexts/ForumContext';
// import { useAuthContext } from '../../contexts/AuthContext';
// import { useForm } from '../../hooks/useForm';

// import { ThreadList } from './ThreadList/ThreadList'

// export const Forum = (
// ) => {
//     const { onPostSubmit } = useForumContext();
//     const { userName, userEmail, isAuthenticated } = useAuthContext();
//     const { values, changeHandler, onSubmit } = useForm({
//         postTitle: '',
//         postBody: '',
//         userName,
//         userEmail,
//     }, onPostSubmit);

//     return (
//         <section id="forum-page" className="">

//             <ThreadList />

//             {isAuthenticated && (<form id="Post" method="POST" onSubmit={onSubmit}>

//                 <div className="container">
//                     <div className='inputDiv'>
//                         <input
//                             type="text"
//                             id="title"
//                             placeholder="Title"
//                             name="postTitle"
//                             value={values.postTitle}
//                             onChange={changeHandler}
//                         />
//                     </div>
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
