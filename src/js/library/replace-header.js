import { movieTrending } from '../display-results/display-results';
import { showFilmList } from './library';
import { MovieService } from '../service/fetchItems';
import {refs} from '../service/refs';


import {
  libraryLinkEl,
  homeLinkEl,
  headerFormEl,
  headerListEl,
  headerEl,
} from '../service/refs';


libraryLinkEl.addEventListener('click', onReplaceHeaderByLibrary);
homeLinkEl.addEventListener('click', onReplaceHeaderByHome);

function onReplaceHeaderByLibrary(event) {
  event.preventDefault();

  MovieService.library = true;
  MovieService.changePage(1);
  showFilmList('watched', false);

  refs.watchBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  refs.recommendBtn.classList.remove('is-active');
  headerFormEl.classList.add('header-none');
  headerListEl.classList.remove('header-none');

  libraryLinkEl.classList.add('site-nav__link-current');
  homeLinkEl.classList.remove('site-nav__link-current');

  headerEl.classList.add('library-bg');
  headerEl.classList.remove('home-bg');
}

function onReplaceHeaderByHome(event) {
  event.preventDefault();
  MovieService.library = false;
  MovieService._query = '';
  MovieService.changePage(1);

  movieTrending();
  refs.libraryBtns.forEach(btn => btn.classList.remove('is-active'))
  headerFormEl.classList.remove('header-none');
  headerListEl.classList.add('header-none');

  libraryLinkEl.classList.remove('site-nav__link-current');
  homeLinkEl.classList.add('site-nav__link-current');

  headerEl.classList.remove('library-bg');
  headerEl.classList.add('home-bg');
}

export { libraryLinkEl };
