import React, { useContext, useState, useEffect } from "react";
import { auth } from "Utils/firebase";
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // Update
  function updateName(name) {
    return currentUser.updateProfile({
      displayName: name,
    });
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function getUserToken() {
    return firebase.auth().currentUser.getIdToken();
  }

  async function googleOAuth() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const userDetails = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .catch(error => console.log(error.message));
    return userDetails;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signin,
    signup,
    logout,
    resetPassword,
    updateName,
    updateEmail,
    updatePassword,
    getUserToken,
    googleOAuth,
  };

  console.log(currentUser);

  return (
    <AuthContext.Provider value={value}>
      {/* {loading ? <div>Loading</div> : children} */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
