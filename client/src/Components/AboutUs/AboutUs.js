import React from "react";
import styles from "./AboutUs.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export const AboutUs = () => {
    return (
        <section id={styles["about-page"]}>
            <div className="container">
                <table className={styles["Table"]}>
                    <thead>
                        <tr>
                            <td>
                                <center><strong>About Us</strong></center>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className={styles["userinfo"]}><center>
                                    <strong>
                                        <span>Hristo Ivanov</span>
                                    </strong>
                                    </center>
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D4D03AQG2n9E8eO_3gA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692967412766?e=1729728000&v=beta&t=Q-gHEnChH2uH7bAWRnRBsdJyYByW8eLG3F8PlYXCfR4"
                                        alt="userpic"
                                    />
                                    <br />
                                </div>
                                <div className={styles["about-info"]}>
                                    <p><strong>Occupation:</strong> Front-End Dev in Varna Free University</p><br />
                                    <p><strong>About me:</strong> Enthusiastic front-end developer with a strong passion for learning new technologies and a keen interest in algorithmic thinking. Possesses a solid engineering background within the cruise ship industry. A highly motivated team player dedicated to delivering exceptional results.</p><br />

                                    <div className={styles["social-icons"]}>
                                        <a href="https://www.linkedin.com/in/hristogwivanov/" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                                        </a>
                                        <a href="https://github.com/hristogwivanov" target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faGithub} size="2x" />
                                        </a>
                                    </div>
<br />
                                    <p> <a href="https://drive.google.com/file/d/1O5BBgQ1CWHjNw-sPNyE18WU1cjosfTag/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFilePdf} /> View My CV
                                    </a></p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
