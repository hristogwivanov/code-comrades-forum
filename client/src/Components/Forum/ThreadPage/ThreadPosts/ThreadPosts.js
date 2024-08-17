import { useEffect, useReducer, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useService } from "../../../../hooks/useService";
import { postReducer } from "../../../../reducers/postReducer";
import { forumServiceFactory } from "../../../../services/forumService";

import { useAuth } from "../../../../contexts/AuthContext";
import { useForumContext } from "../../../../contexts/ForumContext";

import styles from "./ThreadPosts.module.css";
import { Replies } from "./Replies/Replies";

export const ThreadPosts = () => {
    const [post, dispatch] = useReducer(postReducer, {});
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ postTitle: "", postBody: "" });
    const [userProfilePics, setUserProfilePics] = useState({});
    const [userNames, setUserNames] = useState({});

    const { postId } = useParams();
    const { currentUser } = useAuth(); // Get currentUser from useAuth

    const forumService = useService(forumServiceFactory);
    const navigate = useNavigate();
    const { deleteThread, getRepliesForPost, replies, updateReply, deleteReply } = useForumContext(); // Add updateReply and deleteReply from context

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

                    if (!userNames[postData.userId]) {
                        const userInfo = await forumService.getUserInfo(
                            postData.userId
                        );
                        if (userInfo) {
                            setUserProfilePics((prev) => ({
                                ...prev,
                                [postData.userId]: userInfo.profilePic,
                            }));
                            setUserNames((prev) => ({
                                ...prev,
                                [postData.userId]: userInfo.username,
                            }));
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();

        return () => {
            isMounted = false;
        };
    }, [postId, forumService, userNames]);

    useEffect(() => {
        let isMounted = true;

        const fetchReplies = async () => {
            try {
                if (isMounted) {
                    await getRepliesForPost(postId);

                    for (const reply of replies) {
                        if (!userNames[reply.userId]) {
                            const userInfo = await forumService.getUserInfo(
                                reply.userId
                            );
                            if (userInfo) {
                                setUserProfilePics((prev) => ({
                                    ...prev,
                                    [reply.userId]: userInfo.profilePic,
                                }));
                                setUserNames((prev) => ({
                                    ...prev,
                                    [reply.userId]: userInfo.username,
                                }));
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching replies:", error);
            }
        };

        fetchReplies();

        return () => {
            isMounted = false;
        };
    }, [postId, getRepliesForPost, replies, forumService, userNames]);

    const isOwner = post.userId === currentUser?.uid;

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

    const handleUpdateReply = async (replyId, updatedData) => {
        try {
            await updateReply(replyId, updatedData);
        } catch (error) {
            console.error("Error updating reply:", error);
        }
    };

    const handleDeleteReply = async (replyId) => {
        const result = window.confirm(
            `Are you sure you want to delete this reply?`
        );
        if (result) {
            try {
                await deleteReply(replyId);
            } catch (error) {
                console.error("Error deleting reply:", error);
            }
        }
    };

    return (
        <div className="container">
            <table className={styles["Table"]}>
                <thead>
                    <tr>
                        <th colSpan={2}><center>
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
                            )}</center>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles["userinfo"]}>
                            <strong>
                                {userNames[post.userId] || "Unknown User"}
                            </strong>
                            <br />
                            <img
                                src={
                                    userProfilePics[post.userId] ||
                                    "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                                }
                                alt="userpic"
                            />
                            <br />
                            <small>
                                {new Date(
                                    post.createdAt?.seconds * 1000
                                ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                                <br />
                                {new Date(
                                    post.createdAt?.seconds * 1000
                                ).toLocaleTimeString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                            </small>
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
                                        <button onClick={onSaveClick}>
                                            Save
                                        </button>
                                        <button onClick={onCancelClick}>
                                            Cancel
                                        </button>
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

                    <Replies
                        replies={replies}
                        postId={postId}
                        userProfilePics={userProfilePics}
                        userNames={userNames}
                        currentUser={currentUser}
                        onUpdateReply={handleUpdateReply}
                        onDeleteReply={handleDeleteReply}
                    />
                </tbody>
            </table>
            <br />
        </div>
    );
};
