import { Notify } from 'notiflix/build/notiflix-notify-aio';
import firebaseConfig from '../config/firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile} from "firebase/auth";
import { getUserData } from './firebaseStorage';
import { libraryLinkEl } from '../library/replace-header';
import { notifyConfigs } from '../config/notifyConfig';
import { getRecommendId } from '../library/library';
import { getUserId } from '../..';
import { refs } from './refs'; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userId = null
let userName = '';


refs.formAutorization.addEventListener('submit', SignUserEmailAndPasOnSubmit)
refs.formRegistration.addEventListener('submit', RegUserEmailAndPasOnSubmit)
refs.exitBtn.addEventListener('click', exitUser);

onAuthStateChanged(auth, (user )=> {
  if (user) {
    userId = user.uid;
    userName= user.displayName
    getUserData(userId, userName)
    getUserId(userId)
    refs.exitBtn.classList.remove('d-none')
    refs.logInBtn.classList.add('d-none')
    libraryLinkEl.parentNode.classList.remove('d-none')
  } else {
    userId = null;
    userName = null;
    refs.exitBtn.classList.add('d-none')
    refs.logInBtn.classList.remove('d-none')
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
  refs.authModal.classList.add('is-hidden');
  refs.body.classList.toggle('modal-open');
    e.target.reset();
}

function signUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      refs.authModal.classList.add('is-hidden');
      refs.body.classList.toggle('modal-open');
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
     refs.authModal.classList.add('is-hidden'); 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name
    })
    Notify.success(`Welcome!`, notifyConfigs)
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








