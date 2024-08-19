import {
  auth,
  db,
  getDoc,
  doc,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  query, 
  where,
  deleteDoc
} from "../utils/utils.js";

const logout_btn = document.getElementById("logout_btn");
// const login_link = document.getElementById("login_link");
// const signup_link = document.getElementById("signup_link");
const user_img = document.getElementById("user_img");

const events_cards = document.getElementById("events_cards");

// console.log("auth==>", auth);
// console.log("firestore==>", db);
// console.log("storage==>", storage);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    //for image profile==>
    // login_link.style.display = "none";
    user_img.style.display = "block";
    // signup_link.style.display = "none";

    //recall function
    getUserInfo(uid);
    getMyEvents(user.uid)
    // ...
  } else {
    // window.location.href = "/login/login.html";
    // login_link.style.display = "block";
    user_img.style.display = "none";
    // signup_link.style.display = "block";

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
async function getMyEvents(uid) {
  try {
    const q = query(collection(db , 'events'), where("createdBy", "==", uid));
    // const querySnapshot = await getDocs(collection(db, "events"));
    const querySnapshot = await getDocs(q);
     events_cards.innerHTML = "";  
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const event = doc.data();

      console.log("event" , event);
      

      const {banner , title , location , createdByEmail ,
        desc , time , date , } = event;

// events cards
       const card = `
          <div class="max-w-sm rounded-lg shadow-lg bg-white h-100 ">
            <img class="w-full h-64 object-cover rounded-t-lg" src="${banner}" alt="Event Image">
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2">${title}</h3>
              <p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt">Location:</i> ${location}</p>
              <p class="text-gray-600 mb-2"><i class="fas fa-calendar-alt">Date:</i> ${date}</p>
              <p class="text-gray-600 mb-2"><i class="fas fa-info-circle"><b> Description:</b></i> </p>
              <p class="text-gray-700 text-sm mb-3">${desc}</p>

               <button id = ${doc.id}
               type="button"
                class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                   ${auth?.currentUser && event?.likes?.includes(auth?.currentUser.uid)
                   ? "Liked" : "Like"}
                   ${event?.likes?.length ? event?.likes?.length : ""}
                </button>
               <button id = ${doc.id}
               onclick = "deleteEvent(this)"
                type="button" 
                class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Delete
                </button>

               
              </div>
              </div>
        `
      window.deleteEvent = deleteEvent
      events_cards.innerHTML += card;
      console.log("event=>" ,event);
      
      
    });
  }catch(err) {
    alert(err);
    
  };
};

  
async function deleteEvent(e) {
  console.log(e);

  const docRef = doc(db , "events" , e.id)
  await deleteDoc(docRef);
  getMyEvents(auth.currentUser.uid)
  
  
}
