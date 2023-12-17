import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useService } from "../../../../hooks/useService";
import { postReducer } from "../../../../reducers/postReducer";
import { forumServiceFactory } from "../../../../services/forumService";

import styles from "./ThreadPosts.module.css";

export const ThreadPosts = ({ userEmail }) => {
    const [post, dispatch] = useReducer(postReducer, {});

    const { postId } = useParams();
    const forumService = useService(forumServiceFactory);

    useEffect(() => {
        Promise.all([forumService.getOne(postId)]).then(([postData]) => {
            const postState = {
                ...postData,
            };

            dispatch({ type: "POST_FETCH", payload: postState });
        });
    }, []);
    console.log(post);
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
                                <button>Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>
    );
};
