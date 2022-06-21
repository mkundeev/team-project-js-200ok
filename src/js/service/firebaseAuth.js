import { Notify } from 'notiflix/build/notiflix-notify-aio';
import firebaseConfig from '../config/firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "firebase/auth";
import { getUserData } from './firebaseStorage';
import { libraryLinkEl } from '../library/replace-header';
import { notifyConfigs } from '../config/notifyConfig';
import { getRecommendId } from '../library/library';
import { getUserId } from '../..';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userId = null
let userName = '';

const formRegEl = document.querySelector('.form-register')
const formAuthEl = document.querySelector('.form-authorization')
const exitBtn = document.querySelector('.js-exit-btn')
const logInBtn = document.querySelector('.js-site-nav')
const authModal = document.querySelector('.js-auth-modal')
const body = document.querySelector('body')

formAuthEl.addEventListener('submit', SignUserEmailAndPasOnSubmit)
formRegEl.addEventListener('submit', RegUserEmailAndPasOnSubmit)
exitBtn.addEventListener('click', exitUser);

onAuthStateChanged(auth, (user )=> {
  if (user) {
    userId = user.uid;
    userName= user.displayName
    getUserData(userId, userName)
    getUserId(userId)
    exitBtn.classList.remove('d-none')
    logInBtn.classList.add('d-none')
    libraryLinkEl.parentNode.classList.remove('d-none')
  } else {
    userId = null;
    userName = null;
    exitBtn.classList.add('d-none')
    logInBtn.classList.remove('d-none')
    libraryLinkEl.parentNode.classList.add('d-none')
    getUserData(null, '')
    getRecommendId(null)
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
  authModal.classList.add('is-hidden');
  body.classList.toggle('modal-open');
    e.target.reset();
}

function signUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      authModal.classList.add('is-hidden');
      body.classList.toggle('modal-open');
      const user = userCredential.user;
      Notify.success(`Welcome back ${userName}!`, notifyConfigs);
      
    })
    .catch(error => {
      console.log(error.message);
      Notify.failure('Wrong password or e-mail',notifyConfigs);
    });
}

function creatUser(email, password, name) {
createUserWithEmailAndPassword(auth, email, password, name)
  .then((userCredential) => {
     authModal.classList.add('is-hidden'); 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name
    });
    Notify.success(`Welcome ${userName}!`, notifyConfigs);
  })
  .catch((error) => {
    Notify.failure('Such e-mail alredy exist',notifyConfigs);
    console.log(error.message);
  })
};

function exitUser(e) {
  e.preventDefault()
  signOut(auth)
    .then(() => {
      Notify.success(`Waiting for you to come back!`, notifyConfigs);
      userId = null;
      getUserId(null);
    })
    .catch(error => {console.log(error.message);
    });
}








