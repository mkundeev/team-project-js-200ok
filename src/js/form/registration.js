const refs = {
  btnAutorization: document.querySelector('.auth-btn'),
  btnRegistration: document.querySelector('.regist-btn'),
  formAutorization: document.querySelector('.form-authorization'),
  formRegistration: document.querySelector('.form-register'),
};

refs.btnAutorization.addEventListener('click', onAutorization);
refs.btnRegistration.addEventListener('click', onRegistration);

function onAutorization() {
  refs.formRegistration.classList.add('visually-hidden');
  refs.formAutorization.classList.remove('visually-hidden');
  refs.btnRegistration.classList.remove('is-active-btn');
  refs.btnAutorization.classList.add('is-active-btn');
}
function onRegistration() {
  refs.formAutorization.classList.add('visually-hidden');
  refs.formRegistration.classList.remove('visually-hidden');
  refs.btnAutorization.classList.remove('is-active-btn');
  refs.btnRegistration.classList.add('is-active-btn');
}

