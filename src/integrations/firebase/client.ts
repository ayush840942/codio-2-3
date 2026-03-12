import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyDaKJDUO3K-CK-zq2zqp-BVhr_5v9SdDlo",
    authDomain: "codio-71ecc.firebaseapp.com",
    projectId: "codio-71ecc",
    storageBucket: "codio-71ecc.firebasestorage.app",
    messagingSenderId: "951939133229",
    appId: "1:951939133229:web:abcdef" // A dummy web appId, since the provided config only contained Android. Auth still works.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
