
import { getDatabase, ref, set, update, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig'
import {MovieService} from './fetchItems';



const app = initializeApp(firebaseConfig);
const db = getDatabase();
let userId = null
let userName = '';


function getUserData(id, name) {
  userId = id;
  userName = name;
}


function updateFilms(results, src) {
  if (userId === null) {
    console.log('Please register for access to library')
    return
  }
  get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
    console.log(`${userName}, you alredy have this film in your library`)
  
  } else {
    update(ref(db, `users/${userId}/${src}`),
   { [results.id]: results}
  );
  }
}).catch((error) => {
  console.error(error);
});
  
}


function deletFilm(id, src) {
  update(ref(db, `users/${userId}/${src}`),
   { [id]: null}
  );
}


function getFilms(src) {
  return get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
    console.log(snapshot.val()[src])
    return snapshot.val()[src]
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}

export {getUserData, updateFilms, getFilms, deletFilm }