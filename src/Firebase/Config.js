import firebase from 'firebase/compat/app';
import 'firebase/database';

import 'firebase/compat/analytics';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDLQsiKslw8KAa6n7sS7c-BLlfAAF8MZfE',
    authDomain: 'chat-app-afddb.firebaseapp.com',
    projectId: 'chat-app-afddb',
    storageBucket: 'chat-app-afddb.appspot.com',
    messagingSenderId: '562927265420',
    appId: '1:562927265420:web:4b0553a59f87dad0ff7da9',
    measurementId: 'G-XCDK88JGKJ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
