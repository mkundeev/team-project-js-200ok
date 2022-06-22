import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getDatabase, ref,  update, get} from 'firebase/database';


import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';
import { notifyConfigs } from '../config/notifyConfig';
import { getRecommendId } from '../library/library';

const app = initializeApp(firebaseConfig);
const db = getDatabase();
let userId = null;
let userName = '';

function getUserData(id, name) {
  userId = id;
  userName = name;
}


function getRecomendedFilms(){
return get(ref(db, `users/${userId}/recommend/results`)).then((snapshot) => {
  if (snapshot.exists()) 
    return snapshot.val()
}).catch((error) => {
  console.log(error.message);
  return []
});}

function getFilms(src){
  return get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      if (snapshot.val()[src]) {
        return snapshot.val()[src]
      } else return []
    
    } else return []
 
}).catch((error) => {
  console.log(error.message);
  return []
});}


function updateRecommendFilms(results) {
  update(ref(db, `users/${userId}/recommend`), { results }).catch(error => {
    console.log(error.message);
    
  });
}

function updateFilms(results, src) {
  if (userId === null) {
    Notify.failure('Please register for access to library', notifyConfigs);
    return;
  }
  get(ref(db, `users/${userId}/${src}/${[results.id]}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        Notify.info(
          `${userName}, you alredy have this film in your library`,
          notifyConfigs
        );
      } else {
        if (src === 'queue') {
          getRecommendId(results.id);
        }
        update(ref(db, `users/${userId}/${src}`), {
          [results.id]: results,
        }).then(() =>
          Notify.success(
            `${userName}, you have add film to your library`,
            notifyConfigs
          )
        );
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}

function deletFilm(id, src) {
  update(ref(db, `users/${userId}/${src}`), { [id]: null }).then(() =>
    Notify.warning(
      `${userName}, you have delet film from your library`,
      notifyConfigs
    )
  );
}

export {
  getUserData,
  updateFilms,
  getFilms,
  deletFilm,
  updateRecommendFilms,
  getRecomendedFilms,
};
