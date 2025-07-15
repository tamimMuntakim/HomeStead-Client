import React, { useEffect, useState } from 'react';

import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { app } from '../firebase/firebase.config';
import { AuthContext } from '../Contexts/AuthContext';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const updateInfo = (name, photo) => {
        setLoading(true);
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
        })
            .then(() => {
                setLoading(false);
            }).catch(() => {
                setLoading(false);

            });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        logIn,
        googleSignIn,
        logOut,
        updateInfo,
        loading,
        setLoading
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;