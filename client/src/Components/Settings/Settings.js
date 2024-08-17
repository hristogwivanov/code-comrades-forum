import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import styles from "./Settings.module.css";

export const Settings = () => {
    const { currentUser } = useAuth(); // Directly access currentUser from useAuth
    const [userInfo, setUserInfo] = useState(null);
    const [newProfilePic, setNewProfilePic] = useState("");
    const [newDescription, setNewDescription] = useState(""); // State for the new description

    const fetchUserInfo = async () => {
        if (!currentUser) {
            console.error("No current user. Cannot fetch user info.");
            return;
        }

        const userId = currentUser.uid;

        try {
            const userDocRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setUserInfo(userDoc.data());
                setNewProfilePic(userDoc.data().profilePic || "");
                setNewDescription(userDoc.data().description || ""); // Set description state
            } else {
                console.error("No such user document!");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
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
            await fetchUserInfo(); // Refetch user info to rerender the page with updated data
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    };

    const handleDescriptionSubmit = async () => {
        if (!currentUser) {
            console.error("No current user. Cannot update description.");
            return;
        }

        const userId = currentUser.uid;

        try {
            const userDocRef = doc(firestore, "users", userId);
            await updateDoc(userDocRef, { description: newDescription });
            alert("Description updated successfully!");
            await fetchUserInfo(); // Refetch user info to rerender the page with updated data
        } catch (error) {
            console.error("Error updating description:", error);
        }
    };

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    const { username, profilePic } = userInfo;

    return (
        <section id={styles["settings-page"]}>
            <div className="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <td>
                                <center><strong>Settings</strong></center>
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
                                <input
                                    name="newProfilePic"
                                    value={newProfilePic}
                                    onChange={handleProfilePicChange}
                                />
                                <br />
                                <button onClick={handleProfilePicSubmit}>
                                    Change Avatar
                                </button>
                                <br />
                                <textarea
                                    name="newDescription"
                                    value={newDescription}
                                    onChange={handleDescriptionChange}
                                    placeholder="Update your about info"
                                />
                                <br />
                                <button onClick={handleDescriptionSubmit}>
                                    Change About Info
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
