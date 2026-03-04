import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";
import { AuthContext } from "../Context/Context";
import { useAxios } from "../Hooks/Api/useAxios";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [reload, setReload] = useState(false);
  const axiosSecure = useAxios();

  function signInEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        axiosSecure.post("/jwt", { email: currentUser?.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          } else {
            localStorage.removeItem("access-token");
          }
          axiosSecure
            .get(`/user-data?email=${currentUser?.email}`)
            .then((res) => {
              setUserData(res.data);
              setLoading(false);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: error.message,
                confirmButtonColor: "#4f46e5",
              });
              setLoading(false);
            });
        });
      }
    });

    return () => unsubscribe();
  }, [axiosSecure, reload]);

  function passResetEmail(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function signOutCurrentUser() {
    return signOut(auth);
  }

  const userInfo = {
    signInEmail,
    signOutCurrentUser,
    passResetEmail,
    user,
    loading,
    userData,
    setReload,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
