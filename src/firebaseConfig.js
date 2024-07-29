import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: 'test-7d7a8',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: '1001951439783',
    appId: '1:1001951439783:web:3c9d9aca0915171f0a6482',
    measurementId: 'G-GLY7XMNHWD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    auth,
    provider,
    analytics,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
};
