import styles from "./ThreadList.module.css";
import { Link } from "react-router-dom";

import { useForumContext } from "../../../contexts/ForumContext";

import { ThreadListItem } from "./ThreadListItem/ThreadListItem";

export const ThreadList = () => {
    const { posts } = useForumContext();
    return (
        <section id="thread-list">
            <div class="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <th>Title/Author</th>
                        </tr>
                    </thead>
                    {/* <th>Statistics</th>
                <th>Last</th> */}
                    <tbody>
                        {posts.map((x) => (
                            <tr>
                                <Link to={x._id}>
                                    <ThreadListItem key={x._id} {...x} />
                                </Link>
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
