import { refs } from '../service/refs';
const { toggle } = refs;

const initialState = localStorage.getItem('toggleState') == 'true';
toggle.checked = initialState;

toggle.addEventListener('change', addNightTheme);

function addNightTheme(evt) {
  evt.preventDefault();
  localStorage.setItem('toggleState', toggle.checked);
  const settings = JSON.parse(localStorage.getItem('toggleState'));

  if (settings) {
    document.body.classList.add('night-theme');

    // console.log(settings);
  } else {
    document.body.classList.remove('night-theme');

    // console.log(settings);
  }
}
