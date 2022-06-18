const btnAutorization = document.querySelector('.auth-btn');
const btnRegistration = document.querySelector('.regist-btn');
const formAutorization = document.querySelector('.form-authorization');
const formRegistration = document.querySelector('.form-register');

btnAutorization.addEventListener('click', onAutorization);
btnRegistration.addEventListener('click', onRegistration);
const visually = 'visually-hidden';
const active = 'is-active-btn';

function onAutorization() {
  addClass(formRegistration, visually);
  removeClass(formAutorization, visually);
  removeClass(btnRegistration, active);
  addClass(btnAutorization, active);
}
function onRegistration() {
  addClass(formAutorization, visually);
  removeClass(formRegistration, visually);
  removeClass(btnAutorization, active);
  addClass(btnRegistration, active);
}
function addClass(element, clas) {
  element.classList.add(clas);
}
function removeClass(element, clas) {
  element.classList.remove(clas);
}
