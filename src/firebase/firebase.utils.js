import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBrB_7T3z-91G5FhWNu7nZtDclKJ4lEN_0",
  authDomain: "crwn-react-db-8569e.firebaseapp.com",
  projectId: "crwn-react-db-8569e",
  storageBucket: "crwn-react-db-8569e.appspot.com",
  messagingSenderId: "802498160588",
  appId: "1:802498160588:web:cd18985a321895e4179f69",
  measurementId: "G-MG4KFLG1FZ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(`error creating user`, err.message);
    }
  }
  return userRef;
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
