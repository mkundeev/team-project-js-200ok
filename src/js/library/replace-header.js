import { movieTrending } from '../../index'
import { showFilmList } from './library';

const libraryLinkEl = document.querySelector('.js-library');
const homeLinkEl = document.querySelector('.js-home');
const headerFormEl = document.querySelector('.form-wrap');
const headerListEl = document.querySelector('.library__list');
const headerEl = document.querySelector('.header');

libraryLinkEl.addEventListener('click', onReplaceHeaderByLibrary);
homeLinkEl.addEventListener('click', onReplaceHeaderByHome);

function onReplaceHeaderByLibrary(event) {
  event.preventDefault();
  showFilmList("watched",false)
  headerFormEl.classList.add('header-none');
  headerListEl.classList.remove('header-none');

  libraryLinkEl.classList.add('site-nav__link-current');
  homeLinkEl.classList.remove('site-nav__link-current');

  headerEl.classList.add('library-bg');
  headerEl.classList.remove('home-bg');
}

function onReplaceHeaderByHome(event) {
  event.preventDefault();
  movieTrending()
  headerFormEl.classList.remove('header-none');
  headerListEl.classList.add('header-none');

  libraryLinkEl.classList.remove('site-nav__link-current');
  homeLinkEl.classList.add('site-nav__link-current');

  headerEl.classList.remove('library-bg');
  headerEl.classList.add('home-bg');
}
