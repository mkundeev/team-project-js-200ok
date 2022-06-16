import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, update, onValue } from 'firebase/database';

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


const formRegEl = document.querySelector('.fb-register-form')
const regBtn = document.querySelector('.reg-button')
const signBtn = document.querySelector('.sign-button')
const exitBtn = document.querySelector('.exit')
const messageForm = document.querySelector('.fb-message-form')
const getDataForm = document.querySelector('.fb-getdata-form')

signBtn.addEventListener('click', SignUserEmailAndPasOnSubmit)
regBtn.addEventListener('click', RegUserEmailAndPasOnSubmit)
exitBtn.addEventListener('click', exitUser);
messageForm.addEventListener('submit', updateData);



function SignUserEmailAndPasOnSubmit(e) {
  signUser(formRegEl.elements.email.value, formRegEl.elements.password.value)
   formRegEl.reset();
}
function RegUserEmailAndPasOnSubmit(e) {
    creatUser(formRegEl.elements.email.value, formRegEl.elements.password.value, formRegEl.elements.name.value)
    formRegEl.reset();
}



function creatUser(email, password, name){
createUserWithEmailAndPassword(auth, email, password, name)
  .then((userCredential) => {
      const user = userCredential.user;
      userId = user.uid;
      writeUserData(userId, name)
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
        userId = user.uid;   
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function exitUser() {
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
      exitBtn.classList.toggle('d-none')
    regBtn.classList.toggle('d-none')
    getData(userId)
  } else {
    userId = null;
    exitBtn.classList.toggle('d-none')
    regBtn.classList.toggle('d-none')

  }
});


function writeUserData(userId, name) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    name,
  });
}



function updateData(e) {
    e.preventDefault()
    const message = e.target.elements.message.value
  update(ref(db, 'users/' + userId), {
    data: message,
  });
    e.target.reset();
}


function getData(userId) {
  const dataRef = ref(db, 'users/' + userId+ '/data');
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    return;
  }
 getDataForm.elements.data.value = data

});
}




