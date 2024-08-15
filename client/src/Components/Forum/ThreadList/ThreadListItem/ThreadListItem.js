import { Link } from "react-router-dom";
import styles from "./ThreadListItem.module.css";

export const ThreadListItem = ({ _id, postTitle, userName }) => {
    return (
        <td className={styles["Item"]}>
            <Link to={`/forum/${_id}`} className={styles["Link"]}>
                <div>
                    <strong>{postTitle}</strong>
                    <br />
                    published by <strong>{userName}</strong>
                </div>
            </Link>
        </td>
    );
};
