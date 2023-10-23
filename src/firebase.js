import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import config from "./configs/config";

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };


