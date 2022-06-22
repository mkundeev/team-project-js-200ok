import {
  updateFilms,
  getFilms,
  updateRecommendFilms,
  getRecomendedFilms,
} from '../service/firebaseStorage';
import {
  renderMovieGallery,
  renderSearchResultMovie,
} from '../template/renderMarkup';
import { refs as el } from '../service/refs';
import { getPageForLibrary, getPageForRecommend } from '../template/pagination';
import { MovieService } from '../service/fetchItems';
import {spinner} from '../../'

let currentCardData = {};

let recommendId = null;

export const refs = {
  modalCard: document.querySelector('.modal__card'),
  watchBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  recommendBtn: document.querySelector('#recommend'),
  deletQueueBtn: document.querySelector('#js-queue-delete'),
};

refs.watchBtn.addEventListener('click', showWatchedFilms);
refs.queueBtn.addEventListener('click', showQueueFilms);
refs.recommendBtn.addEventListener('click', showRecomendedFilmsAndReplacePage);

function showWatchedFilms() {
  MovieService.changePage(1);

  if (
    refs.queueBtn.classList.contains('is-active') ||
    refs.recommendBtn.classList.contains('is-active')
  ) {
    refs.watchBtn.classList.add('is-active');
    refs.recommendBtn.classList.remove('is-active');
    refs.queueBtn.classList.remove('is-active');
  }


  showFilmList('watched', false);

}
function showQueueFilms() {
  MovieService.changePage(1);

  if (
    refs.watchBtn.classList.contains('is-active') ||
    refs.recommendBtn.classList.contains('is-active')
  ) {
    refs.watchBtn.classList.remove('is-active');
    refs.recommendBtn.classList.remove('is-active');
    refs.queueBtn.classList.add('is-active');
  }


  showFilmList(false, 'queue');

}

function showRecomendedFilmsAndReplacePage() {
  MovieService.changePage(1);

  if (
    refs.watchBtn.classList.contains('is-active') ||
    refs.queueBtn.classList.contains('is-active')
  ) {
    refs.watchBtn.classList.remove('is-active');
    refs.recommendBtn.classList.add('is-active');
    refs.queueBtn.classList.remove('is-active');
  }

  showRecomendedFilms();
}

async function showRecomendedFilms() {
  if (recommendId) {

    spinner.show()
    const results = await MovieService.getRecommendMovies(recommendId);

    updateRecommendFilms(results);
    renderSearchResultMovie(results);
    spinner.hide()
  } else {

    spinner.show()
    try {
      const results = await getRecomendedFilms();

      MovieService.total_pages = Math.ceil(results.length / 20);

      renderSearchResultMovie(getPageForLibrary(results));
    } catch (error) {
      console.log(error.message);
      el.movieContainer.innerHTML =
        '<li><p>There are no recommend films</p></li>';
    }spinner.hide()
  }

}

// refs.modalCard.addEventListener('click', addFilmToDb);

function getCurrentCardData(data) {
  currentCardData = data;
}

function getRecommendId(id) {
  recommendId = id;
}

function addFilmToDb(e) {
  e.preventDefault();
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
  spinner.show()
  try {
    if (watched) {
      results = await getFilms(watched);
    }
    if (queue) {
      results = await getFilms(queue);
    }

    results = Object.values(results);
    results = results.map(result => ({
      ...result,
      genre_ids: result.genres.map(({ name }) => name).join(', '),
    }));
    results = Object.values(results);
    renderMovieGallery(getPageForLibrary(results), watched, queue);
  } catch (error) {
    console.log(error.message);
    el.movieContainer.innerHTML =
      '<li><p>There are no films in your library</p></li>';
  }
  spinner.hide()
}

export {
  getCurrentCardData,
  showFilmList,
  getRecommendId,
  addFilmToDb,
  showRecomendedFilms,
};
