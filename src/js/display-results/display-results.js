import { getFilms } from '../service/firebaseStorage';
import { showingWarningText } from '../template/showing-warning-text';
import {
  renderMarkupCard,
  renderMarkupCardNoId,
} from '../template/renderMarkupCard';
import { refs } from '../service/refs';
import { MovieService } from '../service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from '../template/renderMarkup';
import { createPagination } from '../template/pagination';
import { getCurrentCardData, delFromList, addFilmToList } from '../library/library';
import { spinner } from '../spinner/spinner';

import { refs } from '../service/refs';

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
  spinner.show()
  MovieService._page = 1;

  MovieService._query = ev.target.elements.query.value.trim();
  if (!MovieService._query) {
    spinner.hide()
    return
  };

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
  spinner.hide()
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