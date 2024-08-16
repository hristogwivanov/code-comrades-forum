import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { useService } from "../../../../hooks/useService";
import { postReducer } from "../../../../reducers/postReducer";
import { forumServiceFactory } from "../../../../services/forumService";

import { useAuth } from "../../../../contexts/AuthContext";
import { useForumContext } from "../../../../contexts/ForumContext";

import styles from "./ThreadPosts.module.css";

export const ThreadPosts = () => {
    const [post, dispatch] = useReducer(postReducer, {});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ postTitle: "", postBody: "" });

    const { postId } = useParams();
    const { userName } = useAuth();

    const forumService = useService(forumServiceFactory);
    const navigate = useNavigate();
    const { deleteThread } = useForumContext();

    useEffect(() => {
        let isMounted = true; // To prevent setting state if component unmounts during fetch
        console.log("render 1");
        
        forumService.getOne(postId).then((postData) => {
            if (postData && isMounted) {
                dispatch({ type: "POST_FETCH", payload: postData });
                
                // Only set editData if it's the first time the post data is fetched
                setEditData(prevData => {
                    // Avoid unnecessary setState call if the data hasn't changed
                    if (prevData.postTitle !== postData.postTitle || prevData.postBody !== postData.postBody) {
                        return { postTitle: postData.postTitle, postBody: postData.postBody };
                    }
                    return prevData;
                });
            }
        });

        return () => { isMounted = false }; // Cleanup if component unmounts
    }, [forumService, postId]);

    useEffect(() => {
        console.log("render 2");
        if (!isEditing) {
            setEditData({ postTitle: post.postTitle, postBody: post.postBody });
        }
    }, [post, isEditing]);

    const isOwner = post.userName === userName;

    const onDeleteClick = async () => {
        const result = window.confirm(
            `Are you sure you want to delete ${post.postTitle}`
        );
        if (result) {
            deleteThread(post._id);
            navigate(`/forum`);
        }
    };

    const onEditClick = () => {
        setIsEditing(true);
    };

    const onSaveClick = async () => {
        const updatedPost = {
            ...post,
            postTitle: editData.postTitle,
            postBody: editData.postBody,
        };
        await forumService.update(postId, updatedPost);
        dispatch({ type: "POST_FETCH", payload: updatedPost });
        setIsEditing(false);
    };

    const onCancelClick = () => {
        setIsEditing(false);
        setEditData({ postTitle: post.postTitle, postBody: post.postBody });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log("Rendered with editData:", editData);  // Debugging log

    return (
        <div className="container">
            <table className={styles["Table"]}>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="postTitle"
                                    value={editData.postTitle}
                                    onChange={handleChange}
                                    className={styles["edit-input"]}
                                />
                            ) : (
                                post.postTitle
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles["userinfo"]}>
                            <strong>{post.userName}</strong>
                            <br />
                            <img
                                src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                                alt="userpic"
                            ></img>
                            <br />
                        </td>
                        <td className={styles["post-cell"]}>
                            <div>
                                {isEditing ? (
                                    <textarea
                                        name="postBody"
                                        value={editData.postBody}
                                        onChange={handleChange}
                                        className={styles["edit-textarea"]}
                                    />
                                ) : (
                                    post.postBody
                                )}
                            </div>
                            <div id={styles["button-section"]}>
                                {isOwner && !isEditing && (
                                    <button onClick={onEditClick}>Edit</button>
                                )}
                                {isOwner && isEditing && (
                                    <>
                                        <button onClick={onSaveClick}>Save</button>
                                        <button onClick={onCancelClick}>Cancel</button>
                                    </>
                                )}
                                {isOwner && (
                                    <button onClick={onDeleteClick}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
    );
};
