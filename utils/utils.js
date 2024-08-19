  // Import the functions you need from the SDKs you need
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  //  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
   import { 
    getAuth ,
    onAuthStateChanged ,
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    signOut
      } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
   import { 
    getFirestore ,
    doc ,
    setDoc ,
    getDoc , 
    collection ,
    addDoc ,
    getDocs , 
    updateDoc ,
    arrayUnion ,
    arrayRemove ,
    query , 
    where ,
    deleteDoc
      } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
   import {
    getStorage ,
    ref ,
    uploadBytes ,
    getDownloadURL ,
          } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
   
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
   // Your web app's Firebase configuration
   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
   const firebaseConfig = {
    apiKey: "AIzaSyDosAyqDTXIRpH8REEkFbeqf0YELhe0yN4",
    authDomain: "my-first-project-6783f.firebaseapp.com",
    projectId: "my-first-project-6783f",
    storageBucket: "my-first-project-6783f.appspot.com",
    messagingSenderId: "814886795960",
    appId: "1:814886795960:web:80d61476db23c9bb98124d",
    measurementId: "G-3SJFWH6STS"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  
  
  
  // Export from Firebase
  export { 
     auth ,
     signInWithEmailAndPassword ,
     signOut ,
     db ,
     storage ,
     onAuthStateChanged ,
     createUserWithEmailAndPassword ,
     doc ,
     setDoc ,
     getDoc ,
     ref ,
     uploadBytes ,
     getDownloadURL ,
     collection ,
     addDoc ,
     getDocs ,
     updateDoc ,
     arrayUnion ,
     arrayRemove ,
     query , 
     where ,
     deleteDoc
     };
