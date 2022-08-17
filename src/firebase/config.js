import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCYxqOY__B8gNrOWmPxOuP5KlR89tvhuTQ",
  authDomain: "shine-playlist.firebaseapp.com",
  projectId: "shine-playlist",
  storageBucket: "shine-playlist.appspot.com",
  messagingSenderId: "818856402466",
  appId: "1:818856402466:web:e29eb7c7d1a446716db47b",
};

//firebase init
firebase.initializeApp(firebaseConfig);

//firebase init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
