import {
  auth,
  db,
  getDoc,
  doc,
  storage,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  updateDoc ,
  arrayUnion ,
  arrayRemove ,
} from "../utils/utils.js";

const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const signup_link = document.getElementById("signup_link");
const user_img = document.getElementById("user_img");

const events_cards = document.getElementById("events_cards");

// console.log("auth==>", auth);
// console.log("firestore==>", db);
// console.log("storage==>", storage);
getAllEvents()
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    //for image profile==>
    login_link.style.display = "none";
    user_img.style.display = "block";
    signup_link.style.display = "none";
    logout_btn.style.display = "block";

    //recall function
    getUserInfo(uid);
    // ...
  } else {
    // window.location.href = "/login/login.html";
    login_link.style.display = "block";
    user_img.style.display = "none";
    signup_link.style.display = "block";
    logout_btn.style.display = "none";

    // ...
  }
});

logout_btn.addEventListener("click", () => {
  signOut(auth);
});

// function for profile image=>
function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    console.log("data==>", data.id);
    console.log("data==>", data.data());
    user_img.src = data.data().img;
  });
}
// events
async function getAllEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    // events_cards.innerHTML = "";  
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const event = doc.data();

      console.log("event" , event);
      

      const {banner , title , location , createdByEmail ,
        desc , time , date , } = event;

// events cards
       const card = `
          <div class="max-w-sm rounded-lg shadow-lg bg-white h-100">
            <img class="w-full h-64 object-cover rounded-t-lg" src="${banner}" alt="Event Image">
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2">${title}</h3>
              <p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt">Location:</i> ${location}</p>
              <p class="text-gray-600 mb-2"><i class="fas fa-calendar-alt">Date:</i> ${date}</p>
              <p class="text-gray-600 mb-2"><i class="fas fa-info-circle"><b> Description:</b></i> </p>
              <p class="text-gray-700 text-sm mb-3">${desc}</p>
            <button id = ${doc.id}
            onclick = "likeEvent(this)" 
             class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
             ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
               ? "Liked" : "Like"}
               ${event?.likes?.length ? event?.likes?.length : ""}
             </button>
              </div>
          </div>
        `
     window.likeEvent = likeEvent;
      events_cards.innerHTML += card;
      console.log("event=>" ,event);
      
      
    });
  }catch(err) {
    alert(err);
    
  };
};
async function likeEvent(e) {
   if(auth.currentUser) {
    e.disabled = true
     const docRef = doc(db , "events" , e.id);
     if(e.innerText == "Liked...") {
      updateDoc(docRef , {
        likes : arrayRemove(auth.currentUser.uid),
      })
      .then(() => {
        e.innerText = 'Like';
        e.disabled = false
      })
      .catch((err) => console.log(err));
     } else {
       updateDoc(docRef , {
         likes : arrayUnion(auth.currentUser.uid),
       })
       .then(() => {
        e.innerText = 'Liked...'
       })
       .catch((err) => console.log(err));
     }
   }else{
    window.location.href = '/login/login.html'
   }

  
}

