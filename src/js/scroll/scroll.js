const scrollEl = document.querySelector('.js-scroll');

scrollEl.addEventListener('click', () => window.scroll(0, 0));
window.addEventListener('scroll', onScrollClick);

function onScrollClick(e) {
  e.preventDefault();
  window.scrollY < 320
    ? scrollEl.classList.remove('isShown')
    : scrollEl.classList.add('isShown');
}
