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
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);
    const clearAuthError = () => {
        setAuthError(null);
    };
    

    const signup = async (email, password, username) => {
        try {
            setAuthError(null); // Clear previous errors
    
            // Check if the username already exists
            const usersRef = collection(firestore, 'users');
            const usernameQuery = query(usersRef, where('username', '==', username));
            const usernameSnapshot = await getDocs(usernameQuery);
    
            if (!usernameSnapshot.empty) {
                setAuthError('Username already exists');
                throw new Error('auth/username-already-exists');
            }
    
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            // Save additional user info in Firestore
            await setDoc(doc(firestore, 'users', userCredential.user.uid), {
                email: email,
                username: username,
            });
    
            setCurrentUser(userCredential.user);
            setUserName(username);
            setUserEmail(email);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setAuthError('Email already in use');
            } else if (error.message === 'auth/username-already-exists') {
                setAuthError('Username already exists');
            } else {
                setAuthError('Failed to create an account');
            }
            throw error; // Re-throw to allow the component to handle it
        }
    };
    

    const login = async (username, password) => {
        try {
            clearAuthError(); // Clear any existing errors before login attempt
            const usersRef = collection(firestore, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                setAuthError('No user found with this username');
                throw new Error('auth/user-not-found');
            }
    
            const userDoc = querySnapshot.docs[0];
            
            const email = userDoc.data().email;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setCurrentUser(userCredential.user);
                setUserName(username);
                setUserEmail(email);
            } catch (authError) {
                let errorMessage;
                switch (authError.code) {
                    case 'auth/invalid-credential':
                        errorMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this username.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'The email address is not valid.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed login attempts. Please try again later.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection and try again.';
                        break;
                    default:
                        errorMessage = 'An unexpected error occurred. Please try again.';
                }
                setAuthError(errorMessage);
                throw new Error(authError.code);
            }
        } catch (error) {
            throw error; // Re-throw the error to be caught by the component
        }
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
            setLoading(false);
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
        authError,
        clearAuthError, // Expose clearAuthError in context
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
