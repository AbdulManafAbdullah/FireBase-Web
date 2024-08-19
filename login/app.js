import {
    auth ,
    createUserWithEmailAndPassword ,
   signInWithEmailAndPassword ,  
 } from '.././utils/utils.js' 
     
    // console.log(auth);
    // console.log(createUserWithEmailAndPassword);
    // console.log(signInWithEmailAndPassword);
  
    //  console.log(doc);
    //  console.log(setDoc);
    //  console.log(ref);
    //  console.log(uploadBytes);
    //  console.log(getDownloadURL);
    
    //1. creat account ==> createUserWithEmailAndPassword
    //2. upload image  ==>  ref ,uploadBytes ,  getDownloadURL 
    //3. set complete data info firestore ==>  doc ,setDoc 
    
  
   const login_form = document.getElementById("login_form");
   

   login_form.addEventListener("submit" , function (e) {
       e.preventDefault();
      // console.log(e);
      // console.log(e.target);
      const email = e.target[0].value;
      const password = e.target[1].value;
      // console.log("email=>" , email);
      // console.log("password=>" , password);

      signInWithEmailAndPassword(auth , email , password).then(() => {
        window.location.href = '.././utils/index.html'
      }).catch((err) => {
        alert("error");
      });
    });
      

 