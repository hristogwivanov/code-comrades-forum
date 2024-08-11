import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true); // Added loading state

    const signup = async (email, password, username) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
            email: email,
            username: username,
        });
        setCurrentUser(userCredential.user);
        setUserName(username);
        setUserEmail(email);
    };

    const login = async (username, password) => {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('No user found with this username');
        }

        const userDoc = querySnapshot.docs[0];
        const email = userDoc.data().email;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        setCurrentUser(userCredential.user);
        setUserName(username);
        setUserEmail(email);
    };

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        setUserName("");
        setUserEmail("");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserName(userDoc.data().username);
                    setUserEmail(userDoc.data().email);
                }
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
                setUserName("");
                setUserEmail("");
            }
            setLoading(false); // Auth state has been resolved
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userName,
        userEmail,
        isAuthenticated: !!currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Render children only when not loading */}
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
