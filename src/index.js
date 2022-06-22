import './js/service/firebaseStorage';
import './js/service/firebaseAuth';
import './js/modal/modal';
import './js/template/showing-warning-text';
import './js/form/registration';
import './js/template/pagination';
import './js/library/library';
import './js/scroll/scroll';
import './js/template/renderMarkupCard';
import './js/template/pagination';
import './js/modal/videoplayer';
import './js/day-night/day-night';
import './js/library/replace-header';
import './js/template/masiania';

import {  getFilms } from './js/service/firebaseStorage';
import { showingWarningText } from './js/template/showing-warning-text';
import {
  renderMarkupCard,
  renderMarkupCardNoId,
} from './js/template/renderMarkupCard';
import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from './js/template/renderMarkup';
import { createPagination } from './js/template/pagination';
import { getCurrentCardData, delFromList, addFilmToList } from './js/library/library';
import { spinner } from './js/spinner/spinner';

import { refs } from './js/service/refs';

let userId = null;


function getUserId(id) {
  userId = id;
}


// запрос и отрисовка популярных фильмов (отправляеться сразу при загрузге стартовой страницы )
const movieTrending = async () => {
  spinner.show()
  try {
    refs.movieContainer.innerHTML = '';

    const { results, total_pages } = await MovieService.getMovieTrend();
    MovieService.total_pages = total_pages;

    createPagination();

    renderMovieGallery(results);
  } catch (error) {
    console.error(error.message);
  }
  spinner.hide()
};

document.addEventListener('DOMContentLoaded', movieTrending);

// запрос и отрисовка фильмов по поиску
const movieSearch = async ev => {
  ev.preventDefault();
  MovieService._page = 1;

  MovieService._query = ev.target.elements.query.value.trim();
  if (!MovieService._query) return;

  try {
    refs.movieContainer.innerHTML = '';
    const { results, total_pages } = await MovieService.getSearchMovieResult();

    showingWarningText(total_pages);

    MovieService.total_pages = total_pages;

    renderSearchResultMovie(results);
    createPagination();
    refs.form.reset();
  } catch (error) {
    console.error(error.message);
  }
  
};
refs.form.addEventListener('submit', movieSearch);

// запрос и отрисовка фильма для модального окна с детальной инфомацией

const movieSearchOneFilm = async e => {
  spinner.show()
  const watchedFilms = await getFilms('watched');
  const queueFilms = await getFilms('queue');
  let watched = false;
  let queue = false;
  const response = await MovieService.getSearchMovieById(e.target.dataset.id);
  const key = await MovieService.getVideo(e.target.dataset.id);
  getCurrentCardData(response);
  if (watchedFilms) {
    watched = Object.keys(watchedFilms).includes(response.id.toString());
    if (queueFilms) {
      queue = Object.keys(queueFilms).includes(response.id.toString());
    }  
    if (userId) { renderMarkupCard(response, key, watched, queue) } else {
      renderMarkupCardNoId(response, key);
    };

    spinner.hide()

  }
};


refs.movieOneCardContainer.addEventListener('click', e => {
  e.target.tagName !== 'UL' && creatModal(e);
});

const creatModal = async e => {
  spinner.show()
  movieSearchOneFilm(e).then(() => {
    // добавить слушателей и ссылок на елементы отрисованоой модалки
    const addWatchBtn = document.querySelector('.js-watched-add');
    const addQueueBtn = document.querySelector('.js-queue-add');
    const delWatchBtn = document.querySelector('.js-watched-del');
    const delQueueBtn = document.querySelector('.js-queue-del');


  addWatchBtn.addEventListener('click', e => addFilmToList(e, 'watched', userId));
  addQueueBtn.addEventListener('click', e => addFilmToList(e, 'queue', userId));
  delWatchBtn.addEventListener('click', e => delFromList(e, 'watched', userId));
  delQueueBtn.addEventListener('click', e => delFromList(e, 'queue', userId));}
);
spinner.hide()
};

// добавить слушателя на отрисованую разметку
function addSelector(e) {
  const addWatchBtn = document.querySelector('.js-watched-add');
  const addQueueBtn = document.querySelector('.js-queue-add');
  const delWatchBtn = document.querySelector('.js-watched-del');
  const delQueueBtn = document.querySelector('.js-queue-del');

  if (e.target.classList.contains('js-watched')) {
    addWatchBtn.classList.toggle('visually-hidden');
    delWatchBtn.classList.toggle('visually-hidden');
  }
  if (e.target.classList.contains('js-queue')) {
    addQueueBtn.classList.toggle('visually-hidden');
    delQueueBtn.classList.toggle('visually-hidden');
  }
}



export { movieTrending, getUserId, addSelector };
