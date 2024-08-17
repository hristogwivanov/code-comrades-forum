import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import styles from "./Profile.module.css";

export const Profile = () => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [postCount, setPostCount] = useState(0);

    const fetchUserInfo = async () => {
        try {
            const userDocRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUserInfo(userDoc.data());
            } else {
                console.error("No such user document!");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const fetchUserPostsAndRepliesCount = async () => {
        try {
            // Query posts collection
            const postsRef = collection(firestore, "posts");
            const postsQuery = query(postsRef, where("userId", "==", userId));
            const postsSnapshot = await getDocs(postsQuery);

            // Query replies collection
            const repliesRef = collection(firestore, "replies");
            const repliesQuery = query(repliesRef, where("userId", "==", userId));
            const repliesSnapshot = await getDocs(repliesQuery);

            // Combine post and reply counts
            const totalCount = postsSnapshot.size + repliesSnapshot.size;
            setPostCount(totalCount);
        } catch (error) {
            console.error("Error fetching posts and replies count:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
        fetchUserPostsAndRepliesCount();
    }, [userId]);

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    const { username, profilePic, description } = userInfo;

    return (
        <section id={styles["profile-page"]}>
            <div className="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <td>
                                <center><strong>{username}'s Profile</strong></center>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles["userinfo"]}>
                                    <strong>
                                        <span>{username}</span>
                                    </strong>
                                    <br />
                                    <img
                                        src={
                                            profilePic ||
                                            "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                                        }
                                        alt="userpic"
                                    />
                                    <br />
                                </div>
                                <div>
                                    <p>About: {description || "This user has not provided a description."}</p>
                                    <p>Posts: {postCount}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
