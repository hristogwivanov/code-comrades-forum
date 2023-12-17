import styles from "./ThreadListItem.module.css";

export const ThreadListItem = ({ postTitle, userName }) => {
    return (
        <>
            <td className={styles["Item"]}>
                <strong>
                    {postTitle}
                    <br />
                </strong>
                published by <strong>{userName}</strong>
            </td>
        </>
    );
};
