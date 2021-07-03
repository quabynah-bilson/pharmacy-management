import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

const clientCredentials = {
    apiKey: "AIzaSyCel6G31JO02h7h_CaXQxj_yKyengtCEbg",
    authDomain: "pharmacare-project.firebaseapp.com",
    projectId: "pharmacare-project",
    storageBucket: "pharmacare-project.appspot.com",
    messagingSenderId: "806716475578",
    appId: "1:806716475578:web:f25a763ba2918335ff1a83",
    measurementId: "G-7WDKWVH2WN"
};

export default function firebaseInit() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);

    if (typeof window !== "undefined") {
      // enable analytics
      if ("measurementId" in clientCredentials) {
        firebase.analytics();
      }
    }
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    
    console.log("firebase was successfully initialized");
  }
}