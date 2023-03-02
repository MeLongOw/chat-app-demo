import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAvHo3qkmJG7OpV76_GEFiofXh9zjA1P9s",
    authDomain: "chat-app-7f115.firebaseapp.com",
    projectId: "chat-app-7f115",
    storageBucket: "chat-app-7f115.appspot.com",
    messagingSenderId: "188867497791",
    appId: "1:188867497791:web:048c267bba83b01b3ccd8a",
    measurementId: "G-JXQMFZE1GQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

    // if (window.location.hostname === 'localhost') {
    //     connectFirestoreEmulator(db, 'localhost', 8080);
    //     connectAuthEmulator(auth, "http://localhost:9099");
    //   }

export {db, auth, analytics}

