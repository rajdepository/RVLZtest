import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyAPbneNvLvnh3pT0s_c7Ns6KM2gIibmo_0",
    authDomain: "rvlz-64386.firebaseapp.com",
    projectId: "rvlz-64386",
    storageBucket: "rvlz-64386.appspot.com",
    messagingSenderId: "276575291484",
    appId: "1:276575291484:web:e91e9ca6fe133723cc3e99"
  };

  // console.log(firebaseConfig)
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const app = initializeApp(firebaseConfig);
// const db = firebase.firestore();

export {  };
