import { updateFilms, getFilms } from '../service/firebaseStorage';
import { renderMovieGallery } from '../template/renderMarkup';
import { refs as el } from '../service/refs';
import { getPageForLibrary } from '../template/pagination';
import { MovieService } from '../service/fetchItems';

let currentCardData = {};

let watchedFilmsArray = [];


export const refs = {
  modalCard: document.querySelector('.modal__card'),
  watchBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  deletQueueBtn: document.querySelector('#js-queue-delete'),
};

refs.watchBtn.addEventListener('click', e => {
  if (refs.queueBtn.classList.contains('is-active')) {
    refs.watchBtn.classList.add('is-active');
    refs.queueBtn.classList.remove('is-active');
  }

  MovieService.changePage(1);

  // refs.watchBtn.classList.toggle('is-active');

  showFilmList('watched', false);
});


refs.watchBtn.addEventListener('click',(e)=> showFilmsOnClick("watched",false,e))
refs.queueBtn.addEventListener('click', (e)=> showFilmsOnClick(false ,"queue",e))
refs.modalCard.addEventListener('click', addFilmToDb)


  if (refs.watchBtn.classList.contains('is-active')) {
    refs.watchBtn.classList.remove('is-active');
    refs.queueBtn.classList.add('is-active');
  }

  MovieService.changePage(1);

  showFilmList(false, 'queue');
});
refs.modalCard.addEventListener('click', addFilmToDb);

function getCurrentCardData(data) {
  currentCardData = data;
}

function addFilmToDb(e) {
  e.preventDefault(e);
  if (e.target.classList.contains('js-watched-add')) {
    console.log(currentCardData);
    updateFilms(currentCardData, 'watched');
  } else if (e.target.classList.contains('js-queue-add')) {
    console.log(currentCardData);
    updateFilms(currentCardData, 'queue');
  }
}
function showFilmsOnClick(watched, queue, e) {
    showFilmList(watched, queue);
    changeActiveButton(e);
} 


async function showFilmList(watched, queue) {
  let results = [];

  try {
    watched
      ? (results = await getFilms(watched))
      : (results = await getFilms(queue));

    renderMovieGallery(getPageForLibrary(results), watched, queue);
  } catch (error) {
    console.error(error);
    el.movieContainer.innerHTML =
      '<li><p>There are no films in your library</p></li>';
  }
}

// async function showWatchedList() {
//     refs.watchBtn.classList.toggle('is-active')
//     refs.queueBtn.classList.toggle('is-active')
//     const results = await getFilms("watched")
//     renderMovieGallery((Object.values(results)),"watched",false)
// }
// async function showQueueList() {
//     refs.watchBtn.classList.toggle('is-active')
//     refs.queueBtn.classList.toggle('is-active')
//     const results = await getFilms("queue")
//     renderMovieGallery((Object.values(results)),false,"queue")
// }


export { getCurrentCardData, showFilmList };
