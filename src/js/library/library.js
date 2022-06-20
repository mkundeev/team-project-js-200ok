import { updateFilms, getFilms } from '../service/firebaseStorage';
import { renderMovieGallery } from '../template/renderMarkup';
import { refs as el } from '../service/refs';
import { getPageForLibrary } from '../template/pagination';
import { MovieService } from '../service/fetchItems';

let currentCardData = {};
let watchedFilmsArray = [];
let queueFilmsArray = [];

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
  showFilmList('watched', false);
});

refs.queueBtn.addEventListener('click', e => {
  if (refs.watchBtn.classList.contains('is-active')) {
    refs.watchBtn.classList.remove('is-active');
    refs.queueBtn.classList.add('is-active');
  }
  MovieService.changePage(1);
  showFilmList(false, 'queue');
})
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

export { getCurrentCardData, showFilmList };


