import firebase from  'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCE6fLPdSMBSRH7vA2WYjHbGCNl9pCeci0",
    authDomain: "email-client-5b9d0.firebaseapp.com",
    projectId: "email-client-5b9d0",
    storageBucket: "email-client-5b9d0.appspot.com",
    messagingSenderId: "650645615578",
    appId: "1:650645615578:web:0cf2e10b352d31b6d406e3",
    measurementId: "G-1EDKRZRPQE"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const  provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider};