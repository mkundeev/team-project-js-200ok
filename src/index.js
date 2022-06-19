import './js/service/firebaseStorage';
import './js/service/firebaseAuth';
import './js/modal/modal';
import './js/form/registration';
import './js/template/pagination';
import './js/library/library';
import './js/scroll/scroll';
import './js/modal/renderMarkupCard';
import './js/template/pagination';

import './js/library/replace-header';


import { VisibleComponent } from './js/spinner/spinner';
import { renderMarkupCard } from './js/modal/renderMarkupCard';
import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from './js/template/renderMarkup';
import { createPagination } from './js/template/pagination';
import { getCurrentCardData } from './js/library/library';

const spinner = new VisibleComponent({
  selector: '.js-spinner',
  className: 'visually-hidden',
  isHide: true,
});

let currentCardData = {};

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
const movieSearchOneFilm = async ev => {
  console.log(ev.target.tagName);

  if (ev.target.tagName === 'IMG') {
    const response = await MovieService.getSearchMovieById(
      ev.target.dataset.id
    );
    const key = await MovieService.getVideo(ev.target.dataset.id);
    getCurrentCardData(response);
    renderMarkupCard(response, key);
  }
};

refs.movieOneCardContainer.addEventListener('click', movieSearchOneFilm);

// добавить слушателя на отрисованую разметку
// const creatModal = ev => {
//   movieSearchOneFilm(ev).then(()=>{const addWatchBtn = document.querySelector('#js-watched-add');
//   addWatchBtn.addEventListener('click',()=>console.log(1))
//   })
// }
