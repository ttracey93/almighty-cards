import firebase from 'firebase/dist/index.cjs';

const config = {
  apiKey: 'AIzaSyCc2Tj67XzK56m88_FEBSIIZ1Ps36ZEe5U',
  authDomain: 'cards-78983.firebaseapp.com',
  databaseURL: 'https://cards-78983.firebaseio.com',
  projectId: 'cards-78983',
  storageBucket: 'cards-78983.appspot.com',
  messagingSenderId: '410230590418',
};

firebase.initializeApp(config);

// Firebase
export default firebase;

// Auth
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const Auth = firebase.auth();
