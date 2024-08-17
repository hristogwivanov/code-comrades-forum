import { useEffect, useReducer, useState, useCallback } from "react";
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
    const { deleteThread, getRepliesForPost, replies } = useForumContext();

    // Fetch post data on component mount
    useEffect(() => {
        let isMounted = true;

        const fetchPostData = async () => {
            try {
                const postData = await forumService.getOne(postId);
                if (postData && isMounted) {
                    dispatch({ type: "POST_FETCH", payload: postData });
                    setEditData({
                        postTitle: postData.postTitle,
                        postBody: postData.postBody,
                    });
                }
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();

        return () => {
            isMounted = false;
        };
    }, [postId, forumService]);

    // Fetch replies for the current post
    useEffect(() => {
        let isMounted = true;

        const fetchReplies = async () => {
            try {
                if (isMounted) {
                    await getRepliesForPost(postId);
                }
            } catch (error) {
                console.error("Error fetching replies:", error);
            }
        };

        fetchReplies();

        return () => {
            isMounted = false;
        };
    }, [postId, getRepliesForPost]);

    const isOwner = post.userName === userName;

    const onDeleteClick = useCallback(async () => {
        const result = window.confirm(
            `Are you sure you want to delete ${post.postTitle}`
        );
        if (result) {
            await deleteThread(post._id);
            navigate(`/forum`);
        }
    }, [post, deleteThread, navigate]);

    const onEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const onSaveClick = useCallback(async () => {
        const updatedPost = {
            ...post,
            postTitle: editData.postTitle,
            postBody: editData.postBody,
        };
        await forumService.update(postId, updatedPost);
        dispatch({ type: "POST_FETCH", payload: updatedPost });
        setIsEditing(false);
    }, [editData, forumService, post, postId]);

    const onCancelClick = useCallback(() => {
        setIsEditing(false);
        setEditData({ postTitle: post.postTitle, postBody: post.postBody });
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

                    {/* Display Replies */}
                    {replies.length > 0 &&
    replies
        .filter((reply) => reply.postId === postId)
        .sort((a, b) => a.createdAt - b.createdAt) // Sort replies by timestamp
        .map((reply) => (
            <tr key={reply._id}>
                <td className={styles["userinfo"]}>
                    <strong>{reply.userName}</strong>
                    <br />
                    <img
                        src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                        alt="userpic"
                    ></img>
                    <br />
                </td>
                <td className={styles["post-cell"]}>
                    <div>{reply.replyBody}</div>
                </td>
            </tr>
        ))}
                </tbody>
            </table>
            <br />
        </div>
    );
};
