import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");

    const signup = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                email: email,
                username: username  // Store the username in Firestore
            });
            return userCredential;
        } catch (error) {
            console.error("Error during signup:", error.message, error.code, error);
            throw error;
        }
    };

    const login = async (username, password) => {
        try {
            // Look up the user document by username
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error('No user found with this username');
            }

            // Assuming username is unique, there should be only one user
            const userDoc = querySnapshot.docs[0];
            const email = userDoc.data().email;

            // Now authenticate with the email
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // After successful login, store the username in context
            setUserName(username);
            setCurrentUser(userCredential.user);

            return userCredential;
        } catch (error) {
            console.error("Error during login:", error.message, error.code, error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        setUserName(""); // Clear the username on logout
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                // Fetch and set the username if the user is already logged in
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().username);
                }
            } else {
                setCurrentUser(null);
                setUserName("");
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userName,  // Expose the username to the rest of the app
        isAuthenticated: !!currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};




// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from './firebase'; // assuming your firebase configuration is in firebase.js

// const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             setCurrentUser(user);
//             setLoading(false);
//         });

//         return unsubscribe;
//     }, []);

//     function signup(email, password) {
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     function login(email, password) {
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     function logout() {
//         return signOut(auth);
//     }

//     const value = {
//         currentUser,
//         signup,
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// }

























// import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import { AuthServiceFactory } from "../services/authService";
// import { userServiceFactory } from "../services/userService";

// import { useLocalStorage } from "../hooks/useLocalStorage";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useLocalStorage("auth", {});
//     const navigate = useNavigate();

//     const authService = AuthServiceFactory(auth.accessToken);
//     const userService = userServiceFactory();

//     const onLoginSubmit = async (data) => {
//         try {
//             const result = await authService.login(data);

//             setAuth(result);

//             navigate("/forum");
//         } catch (error) {
//             console.log("There is a problem");
//         }
//     };

//     const onRegisterSubmit = async (values) => {
//         const { confirmPassword, ...registerData } = values;

//         if (confirmPassword !== registerData.password) {
//             return;
//         }

//         try {
//             const result = await authService.register(registerData);
//             setAuth(result);
//             //console.log(result)

//             const { password, ...publicUserData } = registerData;
//             //console.log('publicUserData:');
//             // console.log(publicUserData);
//             publicUserData.description = "";
//             publicUserData.profilePic =
//                 "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png";

//             const userPublicDataResult = await userService.create(
//                 publicUserData
//             );
//             //console.log('publicUserDataResult:');
//             //console.log(userPublicDataResult);

//             navigate("/forum");
//         } catch (error) {
//             console.log("There is a problem in registration");
//         }
//     };

//     const onLogout = async () => {
//         await authService.logout();

//         setAuth({});
//     };

//     const contextValues = {
//         onLoginSubmit,
//         onRegisterSubmit,
//         onLogout,
//         userId: auth._id,
//         token: auth.accessToken,
//         userName: auth.username,
//         userEmail: auth.email,
//         userProfilePic: auth.profilePic,
//         isAuthenticated: !!auth.accessToken,
//     };

//     return (
//         <>
//             <AuthContext.Provider value={contextValues}>
//                 {children}
//             </AuthContext.Provider>
//         </>
//     );
// };

// export const useAuthContext = () => {
//     const context = useContext(AuthContext);

//     return context;
// };
