import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getDatabase, ref, set, update, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig'
import { notifyConfigs } from '../config/notifyConfig';



const app = initializeApp(firebaseConfig);
const db = getDatabase();
let userId = null
let userName = '';


function getUserData(id, name) {
  userId = id;
  userName = name;
}

function getFilms(src) {
  return get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
    return snapshot.val()[src]
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.log(error.message);
});
}

function updateFilms(results, src) {
  if (userId === null) {
    console.log('Please register for access to library')
    return
  }
  get(ref(db, `users/${userId}/${src}/${[results.id]}`)).then((snapshot) => {
    if (snapshot.exists()) {
      Notify.info(`${userName}, you alredy have this film in your library`, notifyConfigs)
  } else {
    update(ref(db, `users/${userId}/${src}`),
   { [results.id]: results}
  ).then(()=>Notify.success(`${userName}, you have add film to your library`, notifyConfigs));
  }
}).catch((error) => {
  console.log(error.message);
});
  
}


function deletFilm(id, src) {
  update(ref(db, `users/${userId}/${src}`),
   { [id]: null}
  ).then(()=>Notify.success(`${userName}, you have add film to your library`, notifyConfigs));
}




export {getUserData, updateFilms, getFilms, deletFilm }