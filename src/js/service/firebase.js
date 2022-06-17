import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "firebase/auth";
import { getDatabase, ref, set, update, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDnwCZBeYmcTq0nXclQPrYar33DgzNWAw0",
  authDomain: "film-200ok.firebaseapp.com",
  databaseURL: "https://film-200ok-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "film-200ok",
  storageBucket: "film-200ok.appspot.com",
  messagingSenderId: "753579295585",
  appId: "1:753579295585:web:2ad7e6bbd602aac4027b20"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

let userId = null;


const formRegEl = document.querySelector('.form-register')
const formAuthEl = document.querySelector('.form-authorization')
const exitBtn = document.querySelector('.js-exit-btn')
const logInBtn = document.querySelector('.js-site-nav')



formAuthEl.addEventListener('submit', SignUserEmailAndPasOnSubmit)
formRegEl.addEventListener('submit', RegUserEmailAndPasOnSubmit)
exitBtn.addEventListener('click', exitUser);
// messageForm.addEventListener('submit', updateData);
// getDataForm.addEventListener('submit', getData);


function SignUserEmailAndPasOnSubmit(e) {
  e.preventDefault()
  const{email, password} = e.target.elements
  signUser(email.value, password.value)
   e.target.reset();
}
function RegUserEmailAndPasOnSubmit(e) {
    e.preventDefault()
    const{email, password, name} = e.target.elements
    creatUser(email.value, password.value, name.value)
    e.target.reset();
}



function creatUser(email, password, name) {
createUserWithEmailAndPassword(auth, email, password, name)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
   displayName: name})
    userId = user.uid;
      writeUserData(userId)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
};


  
function signUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log(userCredential)
      userId = user.uid;
      console.log(user)
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function exitUser(e) {
  e.preventDefault()
  signOut(auth)
    .then(() => {
        console.log('signoff')
        userId = null;
    })
    .catch(error => {
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    
    userId = user.uid;
    exitBtn.classList.remove('d-none')
    logInBtn.classList.add('d-none')
    
  } else {
    userId = null;
    exitBtn.classList.add('d-none')
    logInBtn.classList.remove('d-none')

  }
});


function writeUserData(userId) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    watched: [1,2,3],
    queue:[1,2,3]
  });
}



// function updateData(e) {
//     e.preventDefault()
//     const message = e.target.elements.message.value
//   update(ref(db, 'users/' + userId + '/watched'), 
//    { id1: null}
//   );
//     e.target.reset();
// }


// function getData(e) {
//   e.preventDefault()
//   get(ref(db, 'users/' + userId+ '/watched')).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// }




