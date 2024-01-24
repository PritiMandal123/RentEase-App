const firebaseConfig = {
  apiKey: "AIzaSyDppLVQlHkS6CI7oAWu7wx2bK4K5bbpEHU",
  authDomain: "rentease-app-cabb4.firebaseapp.com",
  projectId: "rentease-app-cabb4",
  storageBucket: "rentease-app-cabb4.appspot.com",
  messagingSenderId: "769916694225",
  appId: "1:769916694225:web:5fa00e3301b25187095ff0",
  measurementId: "G-PRT1JLJPK1"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const firestore = firebase.firestore();
const db = firebase.firestore();
