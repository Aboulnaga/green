// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQIUJYtqPyx8pEyyrc1ZmhxiNSjUbnJ70",
  authDomain: "green-store-7d0ef.firebaseapp.com",
  projectId: "green-store-7d0ef",
  storageBucket: "green-store-7d0ef.appspot.com",
  messagingSenderId: "261563955043",
  appId: "1:261563955043:web:36737b0ebf88e622ddc556",
  measurementId: "G-42XTNGGT4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const authUser = getAuth(app);
