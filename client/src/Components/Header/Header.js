import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Header.module.css";

export const Header = () => {
    const { isAuthenticated, userName } = useAuth();
    return (
        <header>
            {/* <!-- Navigation --> */}
            <div className={styles["container"]}>
                <Link to={"/"}>
                    <img
                        src={"/cclogo.png"}
                        alt="Code Comrades Logo"
                        className={styles["logo"]}
                    ></img>
                </Link>
                <nav>
                    {/* <!-- Logged-in users --> */}
                    {isAuthenticated && (
                        <div id="user">
                            <span style={{ margin: "60px" }}>
                                Hi, {userName}
                            </span>
                            <Link to="/forum">Forum</Link>
                            <Link to="/profile">Profile</Link>
                            <Link to="/settings">Settings</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div id="guest">
                            <Link to="/forum">Forum</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};


// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import styles from "./Header.module.css";

// import { AuthContext } from "../../contexts/AuthContext";

// export const Header = () => {
//     const { isAuthenticated, userName } = useContext(AuthContext);
//     return (
//         <header>
//             {/* <!-- Navigation --> */}
//             <div className={styles["container"]}>
//                 <Link to={"/"}>
//                     <img
//                         src={"/cclogo.png"}
//                         alt="Code Comrades Logo"
//                         className={styles["logo"]}
//                     ></img>
//                 </Link>
//                 <nav>
//                     {/* <!-- Logged-in users --> */}
//                     {isAuthenticated && (
//                         <div id="user">
//                             <span style={{ margin: "60px" }}>
//                                 Hi, {userName}
//                             </span>
//                             <Link to="/forum">Forum</Link>
//                             <Link to="/profile">Profile</Link>
//                             <Link to="/settings">Settings</Link>
//                             <Link to="/logout">Logout</Link>
//                         </div>
//                     )}

//                     {!isAuthenticated && (
//                         <div id="guest">
//                             <Link to="/forum">Forum</Link>
//                             <Link to="/login">Login</Link>
//                             <Link to="/register">Register</Link>
//                         </div>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );
// };
