import './js/service/firebaseStorage';
import './js/service/firebaseAuth';
import './js/modal/modal';
import './js/template/showing-warning-text';
import './js/form/registration';
import './js/template/pagination';
import './js/library/library';
import './js/scroll/scroll';
import './js/modal/renderMarkupCard';
import './js/template/pagination';

import './js/library/replace-header';

import { deletFilm, getFilms } from './js/service/firebaseStorage';
import { showingWarningText } from './js/template/showing-warning-text';
import { VisibleComponent } from './js/spinner/spinner';
import { renderMarkupCard, renderMarkupCardNoId} from './js/modal/renderMarkupCard';
import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from './js/template/renderMarkup';
import { createPagination } from './js/template/pagination';
import { getCurrentCardData, addFilmToDb  } from './js/library/library';
import { libraryLinkEl} from './js/library/replace-header';

const spinner = new VisibleComponent({
  selector: '.js-spinner',
  className: 'visually-hidden',
  isHide: true,
});
let userId = null

// spinner.show();  //спинер додається
spinner.hide(); //спінер удаляється

MovieService.getMovieTrend().then(response => console.log(response));
// MovieService.getGenres().then(response => console.log(response));

// запрос и отрисовка популярных фильмов
const movieTrending = async () => {
  try {
    refs.movieContainer.innerHTML = '';

    const { results, total_pages } = await MovieService.getMovieTrend();
    MovieService.total_pages = total_pages;

    createPagination();

    renderMovieGallery(results);
  } catch (error) {
    console.error(error.message);
  }
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
  const watchedFilms = await getFilms('watched');
  const queueFilms = await getFilms('queue');
  let watched = [];
  let queue = [];
  const response = await MovieService.getSearchMovieById(e.target.dataset.id);
  const key = await MovieService.getVideo(e.target.dataset.id);
  getCurrentCardData(response);
  if (watchedFilms) {
    watched = Object.keys(watchedFilms).includes(response.id.toString());
    if (queueFilms) { queue = Object.keys(queueFilms).includes(response.id.toString()) };

    userId ? renderMarkupCard(response, key, watched, queue) : renderMarkupCardNoId(response, key);
  }
}
// добавить слушателя на отрисованую разметку
const creatModal = e => { 
movieSearchOneFilm(e).then(() => {
  const addWatchBtn = document.querySelector('.js-watched-add');
  const addQueueBtn = document.querySelector('.js-queue-add');
  const delWatchBtn = document.querySelector('.js-watched-del');
  const delQueueBtn = document.querySelector('.js-queue-del');

  addWatchBtn.addEventListener('click', addFilmToList);
  addQueueBtn.addEventListener('click', addFilmToList);
  delWatchBtn.addEventListener('click', e => delFromList(e, 'watched'));
  delQueueBtn.addEventListener('click', e => delFromList(e, 'queue'));}
);
};

function addFilmToList(e) {
  const addWatchBtn = document.querySelector('.js-watched-add');
    const addQueueBtn = document.querySelector('.js-queue-add');
    const delWatchBtn = document.querySelector('.js-watched-del');
    const delQueueBtn = document.querySelector('.js-queue-del');
  e.preventDefault()
  if (e.target.classList.contains('js-watched')) {
      addWatchBtn.classList.toggle('visually-hidden');
    delWatchBtn.classList.toggle('visually-hidden');
    }
    if (e.target.classList.contains('js-queue')) {
      addQueueBtn.classList.toggle('visually-hidden');
      delQueueBtn.classList.toggle('visually-hidden');
    }
    addFilmToDb(e)
}


async function delFromList(e, src) {
  const addWatchBtn = document.querySelector('.js-watched-add');
    const addQueueBtn = document.querySelector('.js-queue-add');
    const delWatchBtn = document.querySelector('.js-watched-del');
    const delQueueBtn = document.querySelector('.js-queue-del');
  console.log(e.target.classList)
  // console.log(addWatchBtn, addQueueBtn, delWatchBtn,delQueueBtn )
  e.preventDefault()
  if (e.target.classList.contains('js-watched')) {
      addWatchBtn.classList.toggle('visually-hidden');
    delWatchBtn.classList.toggle('visually-hidden');
    console.log(1)
    }
    if (e.target.classList.contains('js-queue')) {
      addQueueBtn.classList.toggle('visually-hidden');
      delQueueBtn.classList.toggle('visually-hidden');
      console.log(2)
    }
  const id = e.target.dataset.id;
  deletFilm(id, src);
  if(libraryLinkEl.classList.contains('site-nav__link-current'))
  {refs.movieContainer.querySelector(`[data-id="${id}"]`).remove();
  if (refs.movieContainer.childNodes.length <= 1) {
    refs.movieContainer.innerHTML =
      '<li><p>There are no films in your library</p></li>';
  }}
  };


function getUserId(id) {
    userId=id
  }

refs.movieOneCardContainer.addEventListener('click',(e)=>{e.target.tagName!=='UL' && creatModal(e)} );

export { movieTrending, getUserId };
