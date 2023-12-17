import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useService } from "../../../../hooks/useService";
import { postReducer } from "../../../../reducers/postReducer";
import { forumServiceFactory } from "../../../../services/forumService";

import { useAuthContext } from "../../../../contexts/AuthContext";
import { useForumContext } from "../../../../contexts/ForumContext";

import styles from "./ThreadPosts.module.css";

export const ThreadPosts = () => {
    const [post, dispatch] = useReducer(postReducer, {});

    const { postId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();

    const forumService = useService(forumServiceFactory);
    const navigate = useNavigate();
    const { deleteThread } = useForumContext();

    useEffect(() => {
        Promise.all([forumService.getOne(postId)]).then(([postData]) => {
            const postState = {
                ...postData,
            };

            dispatch({ type: "POST_FETCH", payload: postState });
        });
    }, []);

    const isOwner = post.ownerId === userId;

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = window.confirm(
            `Are youse sure you want to delete ${post.postTitle}`
        );
        if (result) {
            await forumService.delete(post._id);
            deleteThread(post._id);
            navigate(`/forum`);
        }
    };

    return (
        <div className="container">
            <table className={styles["Table"]}>
                <thead>
                    <tr>
                        <th colSpan={2}>{post.postTitle}</th>
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
                            <div>{post.postBody}</div>
                            <div id={styles["button-section"]}>
                                <button>Edit</button>
                                <button onClick={onDeleteClick}>Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
    );
};
