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

import { deletFilm, getFilms } from './js/service/firebaseStorage';
import { showingWarningText } from './js/template/showing-warning-text';
import { VisibleComponent } from './js/spinner/spinner';
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
import { getCurrentCardData, addFilmToDb } from './js/library/library';
import { libraryLinkEl } from './js/library/replace-header';

import { renderOneFilm } from './js/template/renderMarkup';


export const spinner = new VisibleComponent({
  selector: '.js-spinner',
  className: 'visually-hidden',
  isHide: true,
});
let userId = null;


const watchBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');

// запрос и отрисовка популярных фильмов
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

// запрос и отрисовка фильма по ID

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

    userId
      ? renderMarkupCard(response, key, watched, queue)
      : renderMarkupCardNoId(response, key);
    spinner.hide()

  }
};

// добавить слушателя на отрисованую разметку
const creatModal = async e => {
  spinner.show()
  const showModal = await movieSearchOneFilm(e).then(() => {
    const addWatchBtn = document.querySelector('.js-watched-add');
    const addQueueBtn = document.querySelector('.js-queue-add');
    const delWatchBtn = document.querySelector('.js-watched-del');
    const delQueueBtn = document.querySelector('.js-queue-del');


  addWatchBtn.addEventListener('click', e => addFilmToList(e, 'watched'));
  addQueueBtn.addEventListener('click', e => addFilmToList(e, 'queue'));
  delWatchBtn.addEventListener('click', e => delFromList(e, 'watched'));
  delQueueBtn.addEventListener('click', e => delFromList(e, 'queue'));}
);
spinner.hide()
};

async function delFromList(e, src) {
  userId && addSelector(e);
  const id = e.target.dataset.id;
  deletFilm(id, src);

  if(src==='watched' && watchBtn.classList.contains('is-active') || src==='queue' && queueBtn.classList.contains('is-active'))
 { if(libraryLinkEl.classList.contains('site-nav__link-current'))
  {refs.movieContainer.querySelector(`[data-id="${id}"]`).remove();}

  }

  };
async function addFilmToList(e, src) {
  userId && addSelector(e)
  addFilmToDb(e)
  if(src==='watched' && watchBtn.classList.contains('is-active') || src==='queue' && queueBtn.classList.contains('is-active'))
 { const id = e.target.dataset.id;

  const result = await MovieService.getSearchMovieById(id);
  const markup = renderOneFilm(result)
  refs.movieContainer.insertAdjacentHTML("beforeend", markup )}


}

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

function getUserId(id) {
  userId = id;
}

refs.movieOneCardContainer.addEventListener('click', e => {
  e.target.tagName !== 'UL' && creatModal(e);
});

export { movieTrending, getUserId };
