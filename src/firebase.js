import firebase from 'firebase';
// import firebase from 'react-native-firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBVP5OKdgGaOvFzScDzaGNKG-vuprfzIY8",
    authDomain: "login-71846.firebaseapp.com",
    databaseURL: "https://login-71846.firebaseio.com",
    projectId: "login-71846",
    storageBucket: "",
    messagingSenderId: "195486089840"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();