// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl2oocVFW7Jld7w-cGa9Jf4LO9yVCWeds",
  authDomain: "crud-exam-56a87.firebaseapp.com",
  databaseURL: "https://crud-exam-56a87-default-rtdb.firebaseio.com",
  projectId: "crud-exam-56a87",
  storageBucket: "crud-exam-56a87.firebasestorage.app",
  messagingSenderId: "343235969453",
  appId: "1:343235969453:web:3ba9957b7ee5e0eb052124"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default firebaseConfig