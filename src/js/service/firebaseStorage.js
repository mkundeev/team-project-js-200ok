
import { getDatabase, ref, set, update, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig'
import {MovieService} from './fetchItems';



const app = initializeApp(firebaseConfig);
const db = getDatabase();
let userId=null



function getUserId(id) {
  userId = id;
}

async function updateFilms(src) {
  console.log(userId)
  try {

    const result = await MovieService.getMoviebyId()

    update(ref(db, `users/${userId}/${src}`),
      {b: result});
    
    }catch (error) {
    console.error(error.message);
  }
  
}

// function updateFilms(id, src) {
//   update(ref(db, `users/${userId}/${src}`),
//    { [id]: id}
//   );
// }
function deletFilm(id, src) {
  update(ref(db, `users/${userId}/${src}`),
   { [id]: null}
  );
}

const test = document.querySelector('.test')
test.addEventListener('click',()=> updateFilms('watched'))


// function getFilms(src) {
//   get(ref(db, `users/${userId}/${src}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
// }


export {getUserId}