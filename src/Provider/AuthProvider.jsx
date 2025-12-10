import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase';
import { AuthContext } from '../Context/Context';


const AuthProvider = ({ children }) => {

const[user, setUser] = useState();



    function signInEmail(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser)
        })

        return () => unsubscribe;

    }, [])

    function passResetEmail(email){
        return sendPasswordResetEmail(auth, email);
    }




    function signOutCurrentUser() {
        return signOut(auth);
    }


    const userData= {
        signInEmail,
        signOutCurrentUser,
        passResetEmail,
        user
    }

    return (

        <AuthContext value={userData}>
            {children}
        </AuthContext>

    );
};

export default AuthProvider;