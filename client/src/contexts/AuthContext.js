import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase'; // Ensure the correct path

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}





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
