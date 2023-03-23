import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAPbneNvLvnh3pT0s_c7Ns6KM2gIibmo_0',
  authDomain: 'rvlz-64386.firebaseapp.com',
  projectId: 'rvlz-64386',
  storageBucket: 'rvlz-64386.appspot.com',
  messagingSenderId: '276575291484',
  appId: '1:276575291484:web:e91e9ca6fe133723cc3e99',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
