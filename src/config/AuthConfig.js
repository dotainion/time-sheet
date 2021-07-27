import firebase from 'firebase';

export const fbConfig = {
    apiKey: "AIzaSyCNju7Xg6KXSmrDGi-Sl0NPihWdWue0pmA",
    authDomain: "time-sheet-b2950.firebaseapp.com",
    projectId: "time-sheet-b2950",
    storageBucket: "time-sheet-b2950.appspot.com",
    messagingSenderId: "263715555278",
    appId: "1:263715555278:web:3ec6c411410812fb678d9f",
    measurementId: "G-Z1WGN8N82Y"
};

const app = firebase.initializeApp(fbConfig);
export const auth = app.auth();
export const db = app.firestore();
