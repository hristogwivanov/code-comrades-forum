import { Link } from "react-router-dom";
import styles from "./ThreadListItem.module.css";

export const ThreadListItem = ({ ...x}) => {
    return (
        <td className={styles["Item"]}>
            <Link to={x._id}>
                <div className={styles["Link"]}>
                <strong>
                    {x.postTitle}
                    <br />
                </strong>
                published by <strong>{x.userName}</strong>
                </div>
            </Link>
        </td>
    );
};
