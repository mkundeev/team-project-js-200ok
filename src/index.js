
import * as Modal from './js/modal-regist/registration';


import "./services/firebase"

import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from './js/template/renderMarkup';

// MovieService.getSearchMovieResult().then(response => console.log(response));
// MovieService.getGenres().then(response => console.log(response));

// запрос и отрисовка популярных фильмов
const movieTrending = async () => {
  try {
    refs.movieContainer.innerHTML = '';

    const { results } = await MovieService.getMovieTrend();
    renderMovieGallery(results);
  } catch (error) {
    console.error(error.message);
  }
};


document.addEventListener('DOMContentLoaded', movieTrending);

// запрос и отрисовка фильмов по поиску
const movieSearch = async ev => {
  ev.preventDefault();

  MovieService._query = ev.target.elements.query.value.trim();

  if (!MovieService._query) return;

  try {
    refs.movieContainer.innerHTML = '';
    const { results } = await MovieService.getSearchMovieResult();

    renderSearchResultMovie(results);
    refs.form.reset();
  } catch (error) {
    console.error(error.message);
  }
};

refs.form.addEventListener('submit', movieSearch);

document.addEventListener('DOMContentLoaded', moviePagination);

