// src/App.js
import React, { useState } from 'react';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const App = () => {
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyD6KKKu50n2CYhYyz8rzv33AmovFUfxV9w',
    });

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);

                setUser(result.user);
                getUserLocation();
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
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
                    console.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            {!user ? (
                <button onClick={handleLogin}>Login with Google</button>
            ) : (
                <div>
                    <h1>Welcome, {user.displayName}</h1>
                    {isLoaded && location && (
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '500px',
                            }}
                            center={location}
                            zoom={15}
                        >
                            <Marker position={location} />
                        </GoogleMap>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
