export const refs = {
  form: document.querySelector('.search-form'),
  movieContainer: document.querySelector('.films__gallery'),
  movieOneCardContainer: document.querySelector('.films__gallery'),
  cardModalMovie: document.querySelector('.js-modal-card'), //на один фильм
  backdropMovie: document.querySelector('.movie-backdrop'),
  closeBtn: document.querySelector('.video__close-icon'),
  modalWindowBehind: document.querySelector('.modal__card'),
  videoIframe: document.querySelector('#player'),
  playBtn: document.querySelector('.modal__play-bacground'),
  btnAutorization: document.querySelector('.auth-btn'),
  btnRegistration: document.querySelector('.regist-btn'),
  formAutorization: document.querySelector('.form-authorization'),
  formRegistration: document.querySelector('.form-register'),
  scrollEl: document.querySelector('.js-scroll'),
  closeModalBtn: document.querySelector('.js-close-button'),
  modal: document.querySelector('.js-backdrop'),
  body: document.querySelector('body'),
  toggle: document.querySelector('.toggle-input'),
 exitBtn:document.querySelector('.js-exit-btn'),
 logInBtn: document.querySelector('.js-site-nav'),
 authModal: document.querySelector('.js-auth-modal'),
  watchBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),
  recommendBtn: document.querySelector('#recommend'),
  libraryBtns: document.querySelectorAll('.library__btn'),
  libraryLinkEl: document.querySelector('.js-library'),
  footer: document.querySelector('footer'),

};

////////////////masiania////////////////////

export const masianiaEl = document.querySelector('.masiania');
export const masianiaMessage = document.querySelector('.masiania__wrapp');
export const masianiaTextEl = document.querySelector('.masiania__text');
export const masianiaBtnListEl = document.querySelector('.masiania__list');
export const masianiaBtnCloseEl = document.querySelector(
  '.masiania__close-btn'
);
export const masianiaLinkEl = document.querySelector('.masiania__link');
export const masianiaRightEl = document.querySelector('.masiania-right');

////////////////pagination////////////////////

export const paginationEl = document.querySelector('.pagination__list');
export const queueBtn = document.querySelector('#queue');
export const watchBtn = document.querySelector('#watched');
export const recommendBtn = document.querySelector('#recommend');

////////////////header////////////////////

export const libraryLinkEl = document.querySelector('.js-library');
export const homeLinkEl = document.querySelector('.js-home');
export const headerFormEl = document.querySelector('.form-wrap');
export const headerListEl = document.querySelector('.library__list');
export const headerEl = document.querySelector('.header');
