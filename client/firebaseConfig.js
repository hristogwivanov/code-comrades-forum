// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbmS9uZwwiYCWHZFWizgQW1oIFlDE0jLo",
    authDomain: "code-comrades-ad515.firebaseapp.com",
    databaseURL: "https://code-comrades-ad515-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "code-comrades-ad515",
    storageBucket: "code-comrades-ad515.appspot.com",
    messagingSenderId: "469194979645",
    appId: "1:469194979645:web:10b81c94a8cf79d74d2d54"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
