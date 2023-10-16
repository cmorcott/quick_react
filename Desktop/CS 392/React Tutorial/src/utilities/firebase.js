// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUngq960FrlwAXeM1CfJIKzzoKtxwbZHo",
    authDomain: "reacttutorial-161cm.firebaseapp.com",
    databaseURL: "https://reacttutorial-161cm-default-rtdb.firebaseio.com",
    projectId: "reacttutorial-161cm",
    storageBucket: "reacttutorial-161cm.appspot.com",
    messagingSenderId: "67684638847",
    appId: "1:67684638847:web:8c99b6dd7840d7c0961f4a"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export const firebaseSignOut = () => signOut(getAuth(firebase));

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};