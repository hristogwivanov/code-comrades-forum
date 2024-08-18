import { Link } from "react-router-dom";
import styles from "./ThreadListItem.module.css";

export const ThreadListItem = ({ _id, postTitle, userName, createdAt }) => {
    // Convert the timestamp to a readable date and time format
    const formattedTime = createdAt
        ? new Date(createdAt.seconds * 1000).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "Unknown time";

    return (
        <td className={styles["Item"]}>
            <Link to={`/forum/${_id}`} className={styles["Link"]}>
                <div className={styles["ItemHeader"]}>
                    <strong>{postTitle}</strong>
                    <span className={styles["Time"]}>{formattedTime}</span>
                </div>
                <div>
                    published by <strong>{userName}</strong>
                </div>
            </Link>
        </td>
    );
};
