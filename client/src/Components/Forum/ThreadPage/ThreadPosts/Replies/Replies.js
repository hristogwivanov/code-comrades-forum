import React, { useState } from "react";
import styles from "../ThreadPosts.module.css";

export const Replies = ({
    replies,
    postId,
    userProfilePics,
    userNames,
    currentUser, // Pass currentUser to identify the owner of the replies
    onUpdateReply, // Function to update reply
    onDeleteReply, // Function to delete reply
}) => {
    const [isEditing, setIsEditing] = useState(null);
    const [editData, setEditData] = useState("");

    const handleEditClick = (replyId, postBody) => {
        setIsEditing(replyId);
        setEditData(postBody);
    };

    const handleSaveClick = (replyId) => {
        onUpdateReply(replyId, { postBody: editData });
        setIsEditing(null);
    };

    const handleCancelClick = () => {
        setIsEditing(null);
        setEditData("");
    };

    const handleChange = (e) => {
        setEditData(e.target.value);
    };

    return (
        <>
            {replies.length > 0 &&
                replies
                    .filter((reply) => reply.postId === postId)
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((reply, index) => (
                        <tr key={`${reply._id}-${index}`}>
                            <td className={styles["userinfo"]}>
                                <strong>
                                    {userNames[reply.userId] || "Unknown User"}
                                </strong>
                                <br />
                                <img
                                    src={
                                        userProfilePics[reply.userId] ||
                                        "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                                    }
                                    alt="userpic"
                                />
                                <br />
                                <small>
                                    {new Date(
                                        reply.createdAt?.seconds * 1000
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    <br />
                                    {new Date(
                                        reply.createdAt?.seconds * 1000
                                    ).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}
                                </small>
                            </td>
                            <td className={styles["post-cell"]}>
                                <div>
                                    {isEditing === reply._id ? (
                                        <textarea
                                            value={editData}
                                            onChange={handleChange}
                                            className={styles["edit-textarea"]}
                                        />
                                    ) : (
                                        reply.postBody
                                    )}
                                </div>
                                {reply.userId === currentUser?.uid && (
                                    <div id={styles["button-section"]}>
                                        {isEditing === reply._id ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleSaveClick(
                                                            reply._id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(
                                                            reply._id,
                                                            reply.postBody
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        onDeleteReply(reply._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
        </>
    );
};
