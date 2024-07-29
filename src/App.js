import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {
    auth,
    provider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success('Login successful!');
                setUser(result.user);
                getUserLocation();
            })
            .catch((error) => {
                toast.error('Login failed:', error.message);
            });
    };

    const handleLoginWithEmail = (e) => {
        e.preventDefault();

        if (isNewUser) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    toast.success('Sign up successful!');
                    setUser(result.user);
                    getUserLocation();
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email already in use');
                    }

                    if (error.code === 'auth/weak-password') {
                        toast.error('Weak password');
                    }
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    toast.success('Login successful!');
                    setUser(result.user);
                    getUserLocation();
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        toast.error('User not found');
                    }

                    if (error.code === 'auth/invalid-credential') {
                        toast.error('Wrong password');
                    }
                });
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    toast.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="container">
                {!user ? (
                    <div className="auth-section">
                        <form onSubmit={handleLoginWithEmail}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">
                                {isNewUser ? 'Sign Up' : 'Login'}
                            </button>
                        </form>
                        <p onClick={() => setIsNewUser(!isNewUser)}>
                            {isNewUser
                                ? 'Already have an account? Login'
                                : 'New user? Sign up'}
                        </p>
                        <p onClick={handleLoginWithGoogle}>Login with Google</p>
                    </div>
                ) : (
                    <div>
                        <h1>Welcome, {user.displayName || user.email}</h1>
                        {isLoaded && location && (
                            <div className="map-container">
                                <GoogleMap
                                    mapContainerStyle={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    center={location}
                                    zoom={15}
                                >
                                    <Marker position={location} />
                                </GoogleMap>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <ToastContainer
                autoClose={5000}
                closeOnClick={false}
                closeButton={false}
                bodyStyle={{
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    fontSize: '13px',
                }}
            />
        </div>
    );
};

export default App;
