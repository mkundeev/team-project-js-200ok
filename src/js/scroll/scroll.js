import { refs } from '../service/refs';
const { scrollEl } = refs;

const MIN_VIEWPORT_HEIGHT = 320;

scrollEl.addEventListener('click', () => window.scroll(0, 0));
window.addEventListener('scroll', onScrollClick);

function onScrollClick(e) {
  e.preventDefault();
  window.scrollY < MIN_VIEWPORT_HEIGHT
    ? scrollEl.classList.remove('isShown')
    : scrollEl.classList.add('isShown');
}
