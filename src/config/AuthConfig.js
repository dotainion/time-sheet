import firebase from 'firebase';
import { FB_API_KEY, FB_APP_ID, FB_AUTH_DOMAIN, FB_MEASUREMENT_ID, FB_MESSAGING_SENDER_ID, FB_PROJECT_ID, FB_STORAGE_BUCKET } from '../security/EnvVariables';

export const fbConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID,
    measurementId: FB_MEASUREMENT_ID
};

const app = firebase.initializeApp(fbConfig);
export const auth = app.auth();
export const db = app.firestore();
db.enablePersistence().then(()=>{
    
}).catch(()=>{

});
