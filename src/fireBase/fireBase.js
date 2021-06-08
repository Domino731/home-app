// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA6nMuDt3NN1Q-0Qp0dXjk05PFGkowIwio",
    authDomain: "domix-home-app.firebaseapp.com",
    projectId: "domix-home-app",
    storageBucket: "domix-home-app.appspot.com",
    messagingSenderId: "171839959595",
    appId: "1:171839959595:web:5689ef1b922a0d28bb306e",
    measurementId: "G-5HQG2SBC6H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth;