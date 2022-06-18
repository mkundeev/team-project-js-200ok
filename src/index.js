
import './js/service/firebaseStorage';
import './js/service/firebaseAuth';
import './js/modal/modal';
import './js/form/registration';
import { VisibleComponent } from './js/spinner/spinner';
import { refs } from './js/service/refs';
import { MovieService } from './js/service/fetchItems';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from './js/template/renderMarkup';

const spinner = new VisibleComponent({
  selector: '.js-spinner',
  className: 'visually-hidden',
  isHide: true,
});
// spinner.show();  //спинер додається
// spinner.hide()  //спінер удаляється

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
