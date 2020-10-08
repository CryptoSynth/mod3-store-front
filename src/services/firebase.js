import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore/';
import 'firebase/firebase-storage';

import { development, production } from '../environments/firebase.env.json';

//default to development configs
let firebaseConfig = {
  apiKey: development.API_KEY,
  authDomain: development.AUTH_DOMAIN,
  databaseURL: development.DATABASE_URL,
  projectId: development.PROJECT_ID,
  storageBucket: development.STORAGE_BUCKET,
  messagingSenderId: development.MESSAGING_SEND_ID,
  appId: development.APP_ID
};

//if the env is set to production then switch over to production configs
if (process.env === 'production') {
  firebaseConfig = {
    apiKey: production.API_KEY,
    authDomain: production.AUTH_DOMAIN,
    databaseURL: production.DATABASE_URL,
    projectId: production.PROJECT_ID,
    storageBucket: production.STORAGE_BUCKET,
    messagingSenderId: production.MESSAGING_SEND_ID,
    appId: production.APP_ID
  };
}

firebase.initializeApp(firebaseConfig); // init firebase configurations

//firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

//collection references (optional/refactor later)

//export firebase util/refs
export { db, auth, storage };
