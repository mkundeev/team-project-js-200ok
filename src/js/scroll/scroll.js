import { refs } from '../service/refs';
import { paginationEl } from '../service/refs';
const { scrollEl } = refs;

const MIN_VIEWPORT_HEIGHT = 320;

scrollEl.addEventListener('click', () => window.scroll(0, 0));
window.addEventListener('scroll', onScrollClick);
paginationEl.addEventListener('click', scrolToTop);
function onScrollClick(e) {
  e.preventDefault();
  window.scrollY < MIN_VIEWPORT_HEIGHT
    ? scrollEl.classList.remove('isShown')
    : scrollEl.classList.add('isShown');
}
function scrolToTop(e) {
  if (e.target.classList.contains('pagination__number')) {
    window.scroll(0, 220);
  }
}
