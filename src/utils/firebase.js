// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7GVTtHxAg6EaVMC74DKPLlTaSpG8AHbM",
  authDomain: "netflixgpt-d00a2.firebaseapp.com",
  projectId: "netflixgpt-d00a2",
  storageBucket: "netflixgpt-d00a2.appspot.com",
  messagingSenderId: "845719309464",
  appId: "1:845719309464:web:41e8b487a260567d0d54ed",
  measurementId: "G-D3JJZLDR5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();