import * as Modal from './js/modal-regist/registration';
import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import { renderMovieGallery } from './js/template/renderMarkup';

// MovieService.getMovieTrend().then(response => console.log(response));
// MovieService.getGenres().then(response => console.log(response));

const moviePagination = async event => {
  try {
    refs.MovieTrendContainer.innerHTML = '';

    const { results } = await MovieService.getMovieTrend();
    renderMovieGallery(results);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', moviePagination);
