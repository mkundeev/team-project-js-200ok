const toggle = document.querySelector('.toggle-input');
const initialState = localStorage.getItem('toggleState') == 'true';
toggle.checked = initialState;

toggle.addEventListener('change', function (evt) {
  localStorage.setItem('toggleState', toggle.checked);
  if (toggle.checked) {
    console.log('ok');
    document.body.classList.add('night-theme');
  } else {
    console.log('oops');
    document.body.classList.remove('night-theme');
  }
});
