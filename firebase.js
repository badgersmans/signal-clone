import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAskx0Qa8d8n2jG2p4vY34yRUaZBN5ZMNo",
  authDomain: "tinder-clone-368510.firebaseapp.com",
  projectId: "tinder-clone-368510",
  storageBucket: "tinder-clone-368510.appspot.com",
  messagingSenderId: "46940775425",
  appId: "1:46940775425:web:8e91108e5ea20e09b78c00"
};

let app;

// Initialize Firebase
firebase.apps.length === 0 ? app = firebase.initializeApp(firebaseConfig) : app = firebase.app();

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };