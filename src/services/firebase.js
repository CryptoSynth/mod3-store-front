import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore/';
import 'firebase/firebase-storage';
import 'firebase/firebase-functions';

//default to development configs
const firebaseConfig = {
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
};

firebase.initializeApp(firebaseConfig); // init firebase configurations

//firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

//collection references (optional/refactor later)

//export firebase util/refs
export { db, auth, storage };
