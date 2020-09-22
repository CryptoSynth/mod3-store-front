import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore/';
import 'firebase/firebase-storage';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SEND_ID,
  APP_ID
} from '../configs/firebase.config.json';

//Firebase - account configs
firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SEND_ID,
  appId: APP_ID
});

//utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

//collection references (optional/refactor later)

//export util/refs
export { db, auth, storage };
