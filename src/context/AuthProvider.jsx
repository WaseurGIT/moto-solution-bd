import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import axiosSecure from "../api/axiosSecure";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const registerUser = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    return result;
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = async () => {
    return await signOut(auth);
  };

  const googleLoginUser = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        if (currentUser) {
          const res = await axiosSecure.get(`/users/${currentUser.email}`);
          setRole(res.data.role);
        }
      } catch (error) {
        setUser(null);
        console.log("error setting user", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    role,
    user,
    registerUser,
    loginUser,
    logOutUser,
    googleLoginUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
