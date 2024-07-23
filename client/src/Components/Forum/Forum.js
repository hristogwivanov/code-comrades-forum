import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Correct the path

function Forum() {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* Your forum code */}
      {currentUser && <p>Welcome, {currentUser.email}</p>}
    </div>
  );
}

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
