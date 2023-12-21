// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZBSpaO2OwBTNFbZscwJW6GnGajO6Fhq0",
  authDomain: "task-management-client-2d46e.firebaseapp.com",
  projectId: "task-management-client-2d46e",
  storageBucket: "task-management-client-2d46e.appspot.com",
  messagingSenderId: "137780834929",
  appId: "1:137780834929:web:248a21381b8177e6d9e1d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;