import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyByBF-LP2-nUkMdd-EU9wSC2HyON7QXSDQ',
    authDomain: 'test-7d7a8.firebaseapp.com',
    projectId: 'test-7d7a8',
    storageBucket: 'test-7d7a8.appspot.com',
    messagingSenderId: '1001951439783',
    appId: '1:1001951439783:web:3c9d9aca0915171f0a6482',
    measurementId: 'G-GLY7XMNHWD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, analytics };
