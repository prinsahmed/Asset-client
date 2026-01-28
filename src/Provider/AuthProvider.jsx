import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase';
import { AuthContext } from '../Context/Context';
import { useAxios } from '../Hooks/Api/useAxios';
import { useQuery } from '@tanstack/react-query';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [roleUser, setRoleUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userCompany, setUserCompany] = useState(null)
    const axiosSecure = useAxios();


    function signInEmail(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser?.email) {

                axiosSecure.post('jwt', { email: currentUser?.email })
                    .then((res) => {

                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                        else {
                            localStorage.removeItem('access-token');
                        }
                        
                        axiosSecure.get(`user-role?email=${currentUser?.email}`)
                            .then((res) => {
                                setRoleUser(res.data)

                                axiosSecure.get(`/user-company?email=${currentUser?.email}`)
                                    .then(res => {
                                        setUserCompany(res.data)
                                        setLoading(false)
                                    })
                                    .catch(err => {
                                        console.log("Company Fetch Error:", err.message)
                                        setLoading(false)
                                    })

                            })
                            .catch(err => console.log(err.message))
                    })


            }
            else {
                setRoleUser(null);
            }
        })

        return () => unsubscribe;

    }, [axiosSecure])

    function passResetEmail(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function signOutCurrentUser() {
        return signOut(auth);
    }


    const userData = {
        signInEmail,
        signOutCurrentUser,
        passResetEmail,
        user,
        roleUser,
        loading,
        userCompany
    }

    return (

        <AuthContext value={userData}>
            {children}
        </AuthContext>

    );
};

export default AuthProvider;