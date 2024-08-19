import {
    auth ,
    createUserWithEmailAndPassword ,
    doc ,
    setDoc ,
    ref ,
    uploadBytes ,
    getDownloadURL ,
    storage, 
    db
 } from '.././utils/utils.js' 


   //  console.log(doc);
   //  console.log(setDoc);
   //  console.log(ref);
   //  console.log(uploadBytes);
   //  console.log(getDownloadURL);

   //1. creat account ==> createUserWithEmailAndPassword
   //2. upload image  ==>  ref ,uploadBytes ,  getDownloadURL 
   //3. set complete data info firestore ==>  doc ,setDoc 

   const signup_user_btn = document.getElementById("signup_form");
   const submit_btn = document.getElementById("submit_btn");

   signup_user_btn.addEventListener("submit" , function(e) {
      e.preventDefault();
      // console.log(e);
      // console.log(e.target);
      const img = e.target[0].files[0];
      const email = e.target[1].value;
      const password = e.target[2].value;
      const userInfo ={
         img,
         email,
         password
      };

   // creat account=========>>>
      submit_btn.disabled = true;
      submit_btn.innerText = "Please Wait"
      createUserWithEmailAndPassword(auth , email , password).then((user) => {
         console.log("user=>" , user.user.uid);
         // 1. upload image ======>

            const userRef = ref(storage , `user/${user.user.uid}`);
            uploadBytes(userRef , img).then(() => {
               console.log("user image uploaded")

               // 2. grtting url of image ====>
               getDownloadURL(userRef).then((url) => {
                  console.log("url succeess" , url)

               // 3. update user info object
               userInfo.img = url

               // 4. created user document refrence
               const userDbRef = doc(db , "users" , user.user.uid)
      
               // 5. set this document to db
               setDoc(userDbRef , userInfo).then(() => {
                  console.log("User object updated into DB")
                  window.location.href = ".././utils/index.html";
                  submit_btn.disabled = false;
                  submit_btn.innerText = "submit"
               });

               
               }).catch((err) => {
                  console.log("url not success" , url);
                  submit_btn.disabled = false;
                  submit_btn.innerText = "submit"
               }) ;

            }).catch((err) => {
               console.log("error user image not uploaded");
                 submit_btn.disabled = false;
                 submit_btn.innerText = "submit"
            });

      }).catch((err) => {
         alert(err), (submit_btn.disabled = false);
         submit_btn.innerText = "submit"
      });
      
      console.log(userInfo);
      
   });
