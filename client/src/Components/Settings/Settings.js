import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import styles from "./Settings.module.css";

export const Settings = () => {
    const { currentUser, userName, userEmail } = useAuth(); // Directly access these values
    const [userInfo, setUserInfo] = useState(null);
    const [newProfilePic, setNewProfilePic] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!currentUser) {
                console.error("No current user. Cannot fetch user info.");
                return;
            }

            const userId = currentUser.uid;

            console.log("Fetching user info for userId:", userId);

            try {
                const userDocRef = doc(firestore, "users", userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    console.log("User data found:", userDoc.data());
                    setUserInfo(userDoc.data());
                    setNewProfilePic(userDoc.data().profilePic || "");
                } else {
                    console.error("No such user document!");
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        if (currentUser) {
            fetchUserInfo();
        }
    }, [currentUser]);

    const handleProfilePicChange = (event) => {
        setNewProfilePic(event.target.value);
    };

    const handleProfilePicSubmit = async () => {
        if (!currentUser) {
            console.error("No current user. Cannot update profile pic.");
            return;
        }

        const userId = currentUser.uid;

        try {
            const userDocRef = doc(firestore, "users", userId);
            await updateDoc(userDocRef, { profilePic: newProfilePic });
            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    const handleDescriptionChange = async (event) => {
        const newDescription = event.target.value;
        if (!currentUser) {
            console.error("No current user. Cannot update description.");
            return;
        }

        const userId = currentUser.uid;

        try {
            const userDocRef = doc(firestore, "users", userId);
            await updateDoc(userDocRef, { description: newDescription });
            alert("Description updated successfully!");
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    const { username, description, profilePic } = userInfo;

    return (
        <section id={styles["settings-page"]}>
            <div className="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <td>
                                <strong>Settings</strong>
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
                                        src={profilePic}
                                        alt="userpic"
                                    ></img>
                                    <br />
                                </div>
                                <input
                                    name="newProfilePic"
                                    defaultValue={profilePic}
                                    onChange={handleProfilePicChange}
                                />
                                <br />
                                <button onClick={handleProfilePicSubmit}>
                                    Change Avatar
                                </button>
                                <br />
                                <textarea defaultValue={description} />
                                <br />
                                <button>Change About Info</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
