
import firebaseConfig from '../config/firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "firebase/auth";
import { getUserId } from './firebaseStorage';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userId = null




const formRegEl = document.querySelector('.form-register')
const formAuthEl = document.querySelector('.form-authorization')
const exitBtn = document.querySelector('.js-exit-btn')
const logInBtn = document.querySelector('.js-site-nav')

formAuthEl.addEventListener('submit', SignUserEmailAndPasOnSubmit)
formRegEl.addEventListener('submit', RegUserEmailAndPasOnSubmit)
exitBtn.addEventListener('click', exitUser);



onAuthStateChanged(auth, (user )=> {
  if (user) {
    userId = user.uid;
    getUserId(userId)
    exitBtn.classList.remove('d-none')
    logInBtn.classList.add('d-none')
  } else {
    userId = null;
    exitBtn.classList.add('d-none')
    logInBtn.classList.remove('d-none')
    getUserId(null)
  }
});


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

function signUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function creatUser(email, password, name) {
createUserWithEmailAndPassword(auth, email, password, name)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
   displayName: name})
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
};

function exitUser(e) {
  e.preventDefault()
  signOut(auth)
    .then(() => {
        console.log('signoff')
      userId = null;
      getUserId(null)
      
    })
    .catch(error => {
    });
}








