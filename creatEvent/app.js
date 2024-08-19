import {
    ref ,
    storage , 
    uploadBytes ,
    getDownloadURL , 
    collection ,
    db , 
    addDoc , 
    auth ,
 } from '../utils/utils.js' 
//  console.log(ref);
//  console.log(storage);
//  console.log(uploadBytes);
//  console.log(getDownloadURL);
//  console.log(db);
//  console.log(collection);
// console.log(addDoc)
console.log(auth);


 const event_form = document.getElementById("event_form");

 event_form.addEventListener("submit" , (e) => {
    e.preventDefault()
    console.log(e);
 
    const eventInfo = {
        banner : e.target[0].files[0],
        title : e.target[1].value,
        desc : e.target[2].value,
        location : e.target[3].value,
        date : e.target[4].value,
        time : e.target[5].value,
        createdBy : auth.currentUser.uid,
        createdByEmail : auth.currentUser.email,
        likes : []

    };
    console.log("eventInfo-->" , eventInfo);

     const imgRef = ref(storage , eventInfo.banner.name)
     uploadBytes(imgRef , eventInfo.banner).then(() => {
        console.log("URL Upload Done");!
        
        getDownloadURL(imgRef).then((url) => {
            console.log("Url ajayae" , url);
            eventInfo.banner  = url;

            // // add document to events collection
            const eventCollection = collection(db , 'events')
            addDoc(eventCollection , eventInfo).then(() => {
              console.log("Document ADDED");
              window.location.href = '../utils/index.html'
            })  .catch((error) => {
                console.error('Error adding document: ', error);
           });
        });
     });
   });

