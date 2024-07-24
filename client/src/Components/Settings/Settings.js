import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext";

import styles from "./Settings.module.css";

export const Settings = () => {
    const { users, changeProfilePic } = useUserContext();
    const { userId } = useAuth();
    const myUserPublicInfoArray = users.filter(
        (user) => user._ownerId === userId
    );
    const myUserPublicInfo = myUserPublicInfoArray[0];

    const [newProfilePic, setNewProfilePic] = useState("");

    const handleProfilePicChange = (event) => {
        setNewProfilePic(event.target.value);
    };

    const handleProfilePicSubmit = () => {
        changeProfilePic(newProfilePic, userId);
    };
    console.log("settings")
    if (myUserPublicInfo) {
        console.log("info available")
        const { username, description, profilePic } = myUserPublicInfo;

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
    }
};
