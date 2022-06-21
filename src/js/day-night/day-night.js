import { refs } from '../service/refs';
const { toggle } = refs;

const initialState = localStorage.getItem('toggleState') == 'true';
toggle.checked = initialState;

toggle.addEventListener('change', function (evt) {
  evt.preventDefault();
  localStorage.setItem('toggleState', toggle.checked);
  if (toggle.checked) {
    document.body.classList.add('night-theme');
  } else {
    document.body.classList.remove('night-theme');
  }
});
