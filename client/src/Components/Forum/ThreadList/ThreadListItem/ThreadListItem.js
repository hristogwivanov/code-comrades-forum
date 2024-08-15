import { Link } from "react-router-dom";
import styles from "./ThreadListItem.module.css";

export const ThreadListItem = ({ _id, postTitle, userName }) => {
    return (
            <td className={styles["Item"]}>
                <Link to={`/thread/${_id}`} className={styles["Link"]}>
                    <strong>{postTitle}</strong>
                    <br />
                    published by <strong>{userName}</strong>
                </Link>
            </td>
    );
};