import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForumContext } from "../../contexts/ForumContext";
import { useForm } from "../../hooks/useForm";
import { ThreadList } from "./ThreadList/ThreadList";

export const Forum = () => {
    const { onPostSubmit } = useForumContext();
    const { userName, userEmail, isAuthenticated } = useAuth();

    const [refreshThreads, setRefreshThreads] = useState(false);

    const { values, changeHandler, onSubmit } = useForm(
        {
            postTitle: "",
            postBody: "",
            userName: userName || "",
            userEmail: userEmail || "",
        },
        async (data) => {
            if (data.userEmail) {
                await onPostSubmit(data);
                setRefreshThreads(prev => !prev); 
            } else {
                console.error("User email is undefined. Cannot submit post.");
            }
        }
    );

    return (
        <section id="forum-page" className="">
            <ThreadList refreshTrigger={refreshThreads} />

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
