import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import firebaseConfig from '../db/firebaseConfig'

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase conectado');
}

export default firebase;
