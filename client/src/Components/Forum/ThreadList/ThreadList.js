import styles from "./ThreadList.module.css";
import { useForumContext } from "../../../contexts/ForumContext";
import { ThreadListItem } from "./ThreadListItem/ThreadListItem";

export const ThreadList = () => {
    const { posts } = useForumContext();
    return (
        <section id="thread-list">
            <div className="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <th>Title/Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((x) => (
                            <tr key={x._id}>
                                <ThreadListItem {...x} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            {posts.length === 0 && (
                <div className="postcontainer">
                    <h2>No posts yet!</h2>
                </div>
            )}
        </section>
    );
};